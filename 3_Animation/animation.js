

window.addEventListener('resize', draw, false);
//instantiate the canvas
var canvas = new fabric.Canvas('canvas');
//instantiate a rectangle
var rect = new fabric.Rect({
    top: 100,
    left: 100,
    width: 20,
    height: 20,
});

//add rect to the canvas
canvas.add(rect);

//this will run when mouse is over an object in the canvas
canvas.on('mouse:over', function(options){
    var pointer=canvas.getPointer(options.e);
    var rad=(rect.angle*Math.PI)/180;

    figXPos=pointer.x;
    figYPos=pointer.y;
    //We get the rotation matrix of the contrary angle at which the object has been rotated in order to get a relative
    //position of the pointer
    rotMatrix={'xRot': [Math.cos(-rad), Math.sin(-rad)], 'yRot': [-Math.sin(-rad), Math.cos(-rad)]};
    //Here we get the new relative position of the pointer in x and y
    pointerFixedX = (rotMatrix.xRot[0]*(figXPos-rect.left)+rotMatrix.yRot[0]*(figYPos-rect.top)) + rect.left;
    pointerFixedY = (rotMatrix.xRot[1]*(figXPos-rect.left)+rotMatrix.yRot[1]*(figYPos-rect.top)) + rect.top;
    

    
    if(((rect.left)<=pointerFixedX && (rect.left+rect.width+1)>=pointerFixedX) && 
        ((rect.top)<=pointerFixedY && (rect.top+rect.height+1)>=pointerFixedY)){
        // if the pointer gets inside the object it runs the animation
        startAnimation();
    }

});

//Function to resize the canvas depending on the windows size
function draw()
{
    var m_width = window.innerWidth;
    var m_heigth = window.innerHeight;
    canvas.setWidth(m_width*3/4);
    canvas.setHeight(m_heigth*3/4); 
}

//This is the function that activates the rotation animation
function startAnimation(){
    rect.animate('angle', rect.angle+45, {
        onChange: canvas.renderAll.bind(canvas),
        onComplete: function () {//when the animation is completed we evaluate if the rectangle angle has reached the 360 degrees
            if (rect.angle >= 360) {
                rect.set('angle', rect.angle-360);//set angle to 0 if the angle has reached the 360 dregrees
                console.log('angle reset: ', rect.angle);
                rect.dirty = true;
                canvas.renderAll();
              }
        },
    });
}
function fall(){
    rect.animate('top', canvas.height-rect.height, {
        onChange: canvas.renderAll.bind(canvas),
        duration: 1000,
        easing: fabric.util.ease.easeOutBounce
      });
}

//the first time it runs we draw the canvas acording to the windows size
draw();


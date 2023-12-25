
//creating canvas instance and seting drawing mode to false
var canvas = new fabric.Canvas('canvas', {
    isDrawingMode: false
});

//set canvas free draw properties
canvas.freeDrawingBrush.width = 5;
canvas.freeDrawingBrush.color = '#000';

var selectedFigure="";//this specifies the selected figure it should match one of availableFigures
var availableFigures=["square","circle","triangle"];//set all available figures here

//Function to enable or disable freeDraw, it is a toggle
function freeDrawChange(){
    canvas.isDrawingMode= !canvas.isDrawingMode;
}



//event which is trigered when you click an object inside the canvas, specificaly when the button is pushed down
canvas.on('mouse:down', function(options){
    pointer=canvas.getPointer(options.e);//get pointer object
    figXPos=pointer.x;//get the x property from pointer
    figYPos=pointer.y;//get the y property from pointer
    switch (selectedFigure) {//selected figure has one of: "square","circle","triangle"
        case availableFigures[0]:
            var fig=new fabric.Rect(
                {
                    left: figXPos,
                    top: figYPos,
                    fill: 'red',
                    width: 20,
                    height: 20
                }
            );
            canvas.add(fig);
            break;
        case availableFigures[1]:
            var fig=new fabric.Circle(
                {
                    radius: 20,
                    left: figXPos,
                    top: figYPos,
                    fill: 'blue'
                }
            );
            canvas.add(fig);
            break;
        case availableFigures[2]:
            var fig=new fabric.Triangle(
                {
                    left: figXPos,
                    top: figYPos,
                    fill: 'green',
                    width: 30,
                    height: 20
                }
            );
            canvas.add(fig);
            break;
        default:
            break;
    }
});

//figure is an string
function setFigure(figure){
    //if the string figure is one of the availableFigures then one of two antions is performed
    if(availableFigures.includes(figure)) {
        if(figure==selectedFigure){//if the figure string matches the selectedFigure then errase selectedFigure
            selectedFigure="";
        }else{
            selectedFigure=figure;//if the figure string was different than selectedFigure, then set figure as the new selectedFigure
        }
    }
    console.log(selectedFigure);
}


//this function draws a rectangle in the usual way for canvas
function draw(){
    var canvasEl = document.getElementById("c");
    var ctx = canvasEl.getContext("2d")
    ctx.fillStyle = "red";
    ctx.fillRect(100,100,20,20);
}







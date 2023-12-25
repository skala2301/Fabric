var canvas = new fabric.Canvas("canvas");
//Instanciating the fabric image
myImage = new fabric.Image("myImage"), {
    left : 100,
    top : 100,
};
//setting image width and height to be a 50% of the original
myImage.set('scaleX',0.5);
myImage.set('scaleY',0.5);
canvas.add(myImage);



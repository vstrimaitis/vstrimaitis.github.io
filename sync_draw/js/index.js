var canvas;
var ctx;
var socket;
var drawing;
var server = 'https://nodejs-drawing.herokuapp.com/';

function resizeCanvasToFullScreen(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function drawRectangle(x, y, w, h){
    ctx.beginPath();
    ctx.rect(x,y,w,h);
    ctx.fillStyle = 'black';
    ctx.fill();
    ctx.closePath();
}


var paint;
function background(){
    drawRectangle(0, 0, canvas.width, canvas.height);
}

function draw(drawing){
    ctx.strokeStyle = drawing.color;
    ctx.lineJoin = "round";
    ctx.lineWidth = 5;

    for(var i=0; i < drawing.points.length; i++) {
        ctx.beginPath();
        if(drawing.points[i].isDragging && i){
            ctx.moveTo(drawing.points[i-1].x, drawing.points[i-1].y);
        }else{
            ctx.moveTo(drawing.points[i].x-1, drawing.points[i].y);
        }
        ctx.lineTo(drawing.points[i].x, drawing.points[i].y);
        ctx.closePath();
        ctx.stroke();
    }
}

function drawAll(data){
    background();
    for(var i = 0; i < data.length; i++)
        draw(data[i])
    drawing.draw();
}

function mousePressed(e){
    var mouseX = (e.changedTouches ? e.changedTouches[0].pageX : e.pageX) - this.offsetLeft;
    var mouseY = (e.changedTouches ? e.changedTouches[0].pageY : e.pageY) - this.offsetTop;
    paint = true;
    drawing.addPoint(mouseX, mouseY);
}

function mouseMoved(e){
    var mouseX = (e.changedTouches ? e.changedTouches[0].pageX : e.pageX) - this.offsetLeft;
    var mouseY = (e.changedTouches ? e.changedTouches[0].pageY : e.pageY) - this.offsetTop;
    if(paint){
        drawing.addPoint(mouseX, mouseY, true);
        socket.emit('update', drawing);
    }
    e.preventDefault();
}

function mouseReleased(e){
    paint = false;
}

function mouseLeft(e){
    paint = false;
}


// entry point
window.onload = function(){
    canvas = document.getElementById('mainCanvas');
    ctx = canvas.getContext('2d');;
    drawing = new Drawing();
    resizeCanvasToFullScreen()
    background();

    socket = io.connect(server);
    socket.emit('start', drawing);
    socket.on('update', drawAll);

    canvas.addEventListener('mousedown', mousePressed, false);
    canvas.addEventListener('mousemove', mouseMoved, false);
    canvas.addEventListener('mouseup', mouseReleased, false);
    canvas.addEventListener('mouseout', mouseLeft, false);

    canvas.addEventListener("touchstart", mousePressed, false);
    canvas.addEventListener("touchmove", mouseMoved, false);
    canvas.addEventListener("touchend", mouseReleased, false);
    canvas.addEventListener("touchcancel", mouseLeft, false);
}

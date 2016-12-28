var canvas;
var ctx;

var commands = [];

var lineLength = 1;
var lineWidth = 1;
var lineColor = 'white';
var generation = 20;

window.onload = function(){
    canvas = document.getElementById('mainCanvas');
    ctx = canvas.getContext('2d');
    makeCanvasFullScreen();
    background();

    initDragonCommands(20);

    lineLength = $('#lineLengthSlider').val();
    generation = $('#generationSlider').val();
    lineWidth = $('#lineWidthSlider').val();
    lineColor = $('#colorPicker').val();

    $('#lineLengthSlider').on('input', function(){
        lineLength = this.value;
        drawDragonCurve();
    });
    $('#generationSlider').on('input', function(){
        generation = this.value;
        drawDragonCurve();
    });
    $('#lineWidthSlider').on('input', function(){
        lineWidth = this.value;
        drawDragonCurve();
    });
    $('#colorPicker').change(function(){
        lineColor = this.value;
        drawDragonCurve();
    });
    drawDragonCurve();
}

function drawDragonCurve(){
    background();
    new Turtle(canvas.width/2, canvas.height/2, Direction.up, lineLength, lineWidth, lineColor).walk(commands[generation]);
}

function initDragonCommands(numberOfGenerations){
    commands[0] = '';
    for(var i = 1; i <= numberOfGenerations; i++){
        commands[i] = commands[i-1];
        commands[i] += 'L';
        commands[i] += flip(commands[i-1].split('').reverse().join(''));
    }
}

function flip(command){
    var out = '';
    for(var i = 0; i < command.length; i++)
        if(command[i] === 'L')
            out += 'R';
        else
            out += 'L';
    return out;
}

function makeCanvasFullScreen(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight*.9;
}

function background(){
    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgb(51,51,51)';//'black';
    ctx.fill();
    ctx.closePath();
}

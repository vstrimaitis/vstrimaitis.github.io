var canvas;
var ctx;
var lineWeight = 5;
var lineColor = 'white';
var cellSize = 50;
var rows;
var cols;

window.onload = function(){
    canvas = document.getElementById('mainCanvas');
    ctx = canvas.getContext('2d');
    makeCanvasFullScreen();
    initParameters();
    var maze = vstrimaitis.generateMaze(cols, rows);
    for(var y = 0; y < rows; y++){
        for(var x = 0; x < cols; x++){
            var xx = x*cellSize + lineWeight;
            var yy = y*cellSize + lineWeight;
            var corners = {
                topleft: {x: xx, y: yy},
                topright: {x: xx+cellSize, y:yy},
                bottomright: {x:xx+cellSize, y: yy+cellSize},
                bottomleft: {x: xx, y: yy+cellSize},
            };
            drawWalls(maze[y][x].walls, corners);
        }
    }
    /*var angle = 0;
    var x0 = canvas.width/2;
    var y0 = canvas.height/2;
    var len = 300;
    var interval = setInterval(function(){
        var r = (angle*100)%256;
        var g = (angle*50)%256;
        var b = (angle*150)%256;
        lineColor = 'rgb('+r+', '+g+', '+b+')';
        background();
        drawDiamond({x: x0, y: y0}, {x: len*Math.sin(angle) + x0, y: len*Math.cos(angle) + y0});
        angle += 0.01;
    }, 10);*/
}

function initParameters(){
    rows = 9*3;
    cols = 16*3;
    if(canvas.height > canvas.width){
        var tmp = rows;
        rows = cols;
        cols = tmp;
    }
    cellSize = Math.min((canvas.width-2*lineWeight)/cols, (canvas.height-2*lineWeight)/rows);
}

function background(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgb(51,51,51)';
    ctx.fill();
}

function makeCanvasFullScreen(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function drawWalls(walls, corners){
    if(walls & vstrimaitis.wall.up.val){
        drawLine(corners.topleft, corners.topright);
    }
    if(walls & vstrimaitis.wall.left.val){
        drawLine(corners.topleft, corners.bottomleft);
    }
    if(walls & vstrimaitis.wall.down.val){
        drawLine(corners.bottomleft, corners.bottomright);
    }
    if(walls & vstrimaitis.wall.right.val){
        drawLine(corners.topright, corners.bottomright);
    }
}

function drawDiamond(p1, p2){
    ctx.beginPath();

    var start = new vstrimaitis.Vector2(p1.x, p1.y);
    var end = new vstrimaitis.Vector2(p2.x, p2.y);
    var n = end.subtract(start).normalize().multiply(lineWeight/2);
    var nn = n.rotate(90);
    var points = [];
    points.push(start.add(n).add(nn));
    points.push(end.subtract(n).add(nn));
    points.push(end);
    points.push(end.subtract(n).subtract(nn));
    points.push(start.add(n).subtract(nn));
    ctx.moveTo(start.x, start.y);
    for(var i = 0; i < points.length; i++){
        ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.closePath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = lineColor;
    //ctx.fillStyle = 'white';
    ctx.stroke();
    //ctx.fill();
}

function drawLine(p1, p2){
    /*ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.lineWidth = lineWeight;
    ctx.strokeStyle = 'white';
    ctx.stroke();*/
    drawDiamond(p1, p2);
}

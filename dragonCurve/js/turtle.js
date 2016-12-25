var Direction = {
    up: 0,
    right: 1,
    down: 2,
    left: 3
};

function Turtle(startX, startY, startDir, lineLength, lineWeight, lineColor){
    this.startX = startX;
    this.startY = startY;
    this.startDir = startDir;
    this.lineLength = lineLength;
    this.lineWeight = lineWeight;
    this.lineColor = lineColor;
}

Turtle.prototype.walk = function(command){
    ctx.beginPath();
    ctx.moveTo(this.startX, this.startY);
    var dir = this.startDir;
    var x = this.startX;
    var y = this.startY;
    command = 'L' + command;
    dir = (dir + 1) % 4;
    for(var i = 0; i < command.length; i++){
        var change = command[i];
        if(change === 'L')
            dir = dir-1 >= 0 ? dir-1 : 3;
        else if(change === 'R')
            dir = (dir + 1) % 4;
        var dx = 0;
        var dy = 0;
        if(dir === Direction.up){
            dy = -1;
        } else if(dir === Direction.right){
            dx = 1;
        } else if(dir === Direction.down){
            dy = 1;
        } else if(dir === Direction.left){
            dx = -1;
        }
        x += dx * this.lineLength;
        y += dy * this.lineLength;
        ctx.lineTo(x, y);
    }
    //ctx.closePath();
    // color and weight
    ctx.strokeStyle = this.lineColor;
    ctx.lineWidth = this.lineWeight;
    ctx.stroke();
}

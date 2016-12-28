var v;
var vd;

var lineWidth = 2;
var lineColor = 'rgba(200,200,200,1)';
var fillColor = 'rgba(200,200,200,1)';
var backgroundColor = 'rgb(51,51,51)';
var clock;

window.onload = function(){
    v = vstrimaitis;
    vd = v.drawing;
    vd.setCanvas('mainCanvas');
    vd.makeCanvasFullScreen();


    var center = new v.Point2(vd.canvas.width/2, vd.canvas.height/2);
    var radius = Math.min(vd.canvas.width/2, vd.canvas.height/2)*2/3;

    backgroundColor = vd.ctx.createRadialGradient(vd.canvas.width/2, vd.canvas.height/2,radius, vd.canvas.width/2,vd.canvas.height/2, 0);
    backgroundColor.addColorStop(0, 'black');
    backgroundColor.addColorStop(1, 'rgb(51,51,51)');

    clock = new v.Clock(center, radius, new Date());
    var prev = null;
    window.requestAnimationFrame(function a(timestamp){
        if(!prev)
            prev = timestamp;
        var dt = timestamp - prev;
        prev = timestamp;
        vd.background(backgroundColor);
        drawClock();
        clock.update(dt);
        window.requestAnimationFrame(a);
    });

}

function drawClock(){
    /*vd.circle(clock.center, clock.radius);
    vd.stroke(lineWidth*5, lineColor);*/
    vd.circle(clock.center, clock.radius);
    vd.stroke(lineWidth, lineColor);
    vd.circle(clock.center, clock.radius + lineWidth*4);
    vd.stroke(lineWidth, lineColor);
    vd.circle(clock.center, clock.radius*.02);
    vd.fill(lineColor);
    drawNumbers();
    drawHands();
}

function drawHands(){
    vd.rupee(clock.center, clock.hoursHand.end, 30, 10);
    vd.stroke(lineWidth, lineColor);
    //vd.fill(fillColor);
    vd.rupee(clock.center, clock.minutesHand.end, 30, 10);
    vd.stroke(lineWidth, lineColor);
    //vd.fill(fillColor);
    vd.rupee(clock.center, clock.secondsHand.end, 30, 10);
    vd.stroke(lineWidth, lineColor);
    //vd.fill(fillColor);
}

function drawNumbers(){
    var ang;
    var num;
    vd.ctx.font = clock.radius*0.15 + "px arial";
    vd.ctx.textBaseline="middle";
    vd.ctx.textAlign="center";
    vd.ctx.save();
    vd.ctx.translate(clock.center.x, clock.center.y);
    for(num = 1; num < 13; num++){
        ang = num * Math.PI / 6;
        vd.ctx.rotate(ang);
        vd.ctx.translate(0, -clock.radius*0.85);
        vd.ctx.rotate(-ang);
        vd.ctx.fillStyle = fillColor;
        vd.ctx.fillText(num.toString(), 0, 0);
        vd.ctx.rotate(ang);
        vd.ctx.translate(0, clock.radius*0.85);
        vd.ctx.rotate(-ang);
    }
    vd.ctx.restore();
}

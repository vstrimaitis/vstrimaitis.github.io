var v;
var vd;
var backgroundColor = 'rgb(51, 51, 51)';
var charges = [];
var maxCharge = 50;
var drag = 0;//0.01;

window.onload = function(){
    v = vstrimaitis;
    vd = v.drawing;
    vd.setCanvas('mainCanvas');
    vd.makeCanvasFullScreen();

    /*for(var i = 0; i < 200; i++){
		var r = 30;
        var q = randomInRange(-maxCharge, maxCharge);
        charges[i] = new v.Charge(q, r, new v.Point2(randomInRange(r, vd.canvas.width-r), randomInRange(r, vd.canvas.height-r)));
    }*/

    charges[0] = new v.Charge(100, 50, new v.Point2(vd.canvas.width/2, vd.canvas.height/2), true);
    charges[1] = new v.Charge(-1, 10, new v.Point2(charges[0].pos.x + 100, charges[0].pos.y));
    charges[1].v = new v.Point2(0, 2.9);


    charges[2] = new v.Charge(-1, 10, new v.Point2(charges[0].pos.x - 200, charges[0].pos.y));
    charges[2].v = new v.Point2(0, -2.7);


    charges[3] = new v.Charge(-1, 10, new v.Point2(charges[0].pos.x, charges[0].pos.y-150));
    charges[3].v = new v.Point2(2, 0);


    var prev = null;
    window.requestAnimationFrame(function a(timestamp){
        if(!prev)
            prev = timestamp;
        var dt = timestamp - prev;
        prev = timestamp;
        update();
        draw();
        window.requestAnimationFrame(a);
    });
}

function update(){
    for(var i = 0; i < charges.length; i++){
        for(var j = 0; j < charges.length; j++){
            charges[i].applyForce(charges[j]);
        }
        charges[i].applyDrag(drag);
    }
    for(var i = 0; i < charges.length; i++){
        for(var j = i+1; j < charges.length; j++){
            if(i !== j && charges[i].collidesWith(charges[j])){
                charges[i].v.multiply(-1);
                charges[j].v.multiply(-1);

                //charges[i].v = new v.Point2(0,0);
            }
        }
    }
    for(var i = 0; i < charges.length; i++){
        charges[i].move();
        charges[i].restrict(new v.Point2(charges[i].r, charges[i].r), new v.Point2(vd.canvas.width-charges[i].r, vd.canvas.height-charges[i].r));
    }
}

function draw(){
    vd.background(backgroundColor);
    for(var i = 0; i < charges.length; i++){
        drawCharge(charges[i]);
        drawVelocity(charges[i]);
    }
}

function chooseColor(c){
    var r, g, b;
    if(c.q <= 0){
        r = 255;
        g = Math.floor((c.q + maxCharge) * 255 / maxCharge);
        b = g;
    } else{
        r = g = Math.floor((c.q-maxCharge) * 255 / (-maxCharge));
        b = 255;
    }
    //var r = Math.floor((c.q-maxCharge)*255/(-2*maxCharge));
    //var b = 255 - r;
    return 'rgb(' + r + ', '+g+', ' + b + ')';
    //var b = Math.floor(c.q) * 255/maxCharge;
    //var r = 255 - b;    return 'rgb('+r+', 0, '+b+')';
}

function randomInRange(min, max){
    return Math.random() * (max - min) + min;
}

function drawVelocity(c){
    var p1 = c.pos;
    var p2 = c.pos.add(c.v.multiply(10));
    vd.arrow(p1, p2);
    vd.stroke(2, 'black');
}

function drawCharge(c){
    vd.circle(new v.Point2(c.pos.x, c.pos.y), c.r);
    vd.fill(chooseColor(c));

    /*vd.ctx.font = "30px Arial";
    vd.ctx.fillStyle = 'white';
    var vel = "(" + Math.round(c.v.x*100)/100 + ", " + Math.round(c.v.y*100)/100 + ")";
    vd.ctx.fillText(vel, c.pos.x, c.pos.y);*/
}

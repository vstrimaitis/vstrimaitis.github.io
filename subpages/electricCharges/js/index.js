var v;
var vd;
var backgroundColor = 'rgb(51, 51, 51)';
var charges = [];
var maxCharge = 10;

window.onload = function(){
    v = vstrimaitis;
    vd = v.drawing;
    vd.setCanvas('mainCanvas');
    vd.makeCanvasFullScreen();

    for(var i = 0; i < 80; i++){
        var r = randomInRange(10, 30);//30;
        var b = (3-maxCharge)/2;
        var a = 1-b;
        var q = r/10 * a + b;
        //var q = randomInRange(1, maxCharge);
        charges[i] = new v.Charge(q, r, new v.Point2(randomInRange(r, vd.canvas.width-r), randomInRange(r, vd.canvas.height-r)));
    }
    var interval = setInterval(function(){
        console.log('frame');
        for(var i = 0; i < charges.length; i++){
            for(var j = 0; j < charges.length; j++){
                charges[i].applyForce(charges[j]);
            }
        }
        //console.log(charges[0].pos);
        vd.background(backgroundColor);
        for(var i = 0; i < charges.length; i++){
            drawCharge(charges[i]);
            drawForce(charges[i]);
            charges[i].move();
            charges[i].restrict(new v.Point2(r, r), new v.Point2(vd.canvas.width-r, vd.canvas.height-r));
        }
    }, 10);

}

function chooseColor(c){
    var b = Math.floor(c.q) * 255/maxCharge;
    var r = 255 - b;    return 'rgb('+r+', 0, '+b+')';
}

function randomInRange(min, max){
    return Math.random() * (max - min) + min;
}

function drawCharge(c){
    vd.circle(new v.Point2(c.pos.x, c.pos.y), c.r);
    vd.fill(chooseColor(c));
}

function drawForce(c){
    var p1 = c.pos;
    var p2 = c.pos.add(c.f);
    vd.line(p1, p2);
    vd.stroke(1, 'red');
}

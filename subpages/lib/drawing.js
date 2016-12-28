var vstrimaitis = vstrimaitis || {};
vstrimaitis.drawing = vstrimaitis.drawing || {};

vstrimaitis.drawing.line = function (p1, p2, weight, style){
    vstrimaitis.drawing.ctx.beginPath();
    vstrimaitis.drawing.ctx.moveTo(p1.x, p1.y);
    vstrimaitis.drawing.ctx.lineTo(p2.x, p2.y);
}

vstrimaitis.drawing.stroke = function (lineWidth, strokeStyle){
    vstrimaitis.drawing.ctx.lineWidth = lineWidth;
    vstrimaitis.drawing.ctx.strokeStyle = strokeStyle;
    vstrimaitis.drawing.ctx.stroke();
}

vstrimaitis.drawing.fill = function(fillStyle){
    vstrimaitis.drawing.ctx.fillStyle = fillStyle;
    vstrimaitis.drawing.ctx.fill();
}

vstrimaitis.drawing.rupee = function(start, end, angle, width){
    var n = end.subtract(start).normalize().multiply(width/2);
    var nn = n.multiply(Math.tan(Math.radians(angle))).rotate(90);
    var points = [start];
    points.push(start.add(n).add(nn));
    points.push(end.subtract(n).add(nn));
    points.push(end);
    points.push(end.subtract(n).subtract(nn));
    points.push(start.add(n).subtract(nn));

    vstrimaitis.drawing.polygon(points);
}

vstrimaitis.drawing.circle = function(center, radius){
    vstrimaitis.drawing.ctx.beginPath();
    vstrimaitis.drawing.ctx.arc(center.x, center.y, radius, 0, 2*Math.PI);
}

vstrimaitis.drawing.polygon = function(points){
    vstrimaitis.drawing.ctx.beginPath();
    vstrimaitis.drawing.ctx.moveTo(points[0].x, points[0].y);
    for(var i = 1; i < points.length; i++){
        vstrimaitis.drawing.ctx.lineTo(points[i].x, points[i].y);
    }
    vstrimaitis.drawing.ctx.closePath();
}

vstrimaitis.drawing.rectangle = function(topLeft, w, h){
    vstrimaitis.drawing.ctx.rect(topLeft.x, topLeft.y, w, h);
}

vstrimaitis.drawing.background = function(color){
    vstrimaitis.drawing.ctx.clearRect(0, 0, vstrimaitis.drawing.canvas.width, vstrimaitis.drawing.canvas.height);
    vstrimaitis.drawing.rectangle(new vstrimaitis.Point2(0, 0), vstrimaitis.drawing.canvas.width, vstrimaitis.drawing.canvas.height);
    vstrimaitis.drawing.fill(color);
}

vstrimaitis.drawing.makeCanvasFullScreen = function(){
    vstrimaitis.drawing.canvas.width = window.innerWidth;
    vstrimaitis.drawing.canvas.height = window.innerHeight;
}

vstrimaitis.drawing.setCanvas = function(id){
    vstrimaitis.drawing.canvas = document.getElementById(id);
    vstrimaitis.drawing.ctx = vstrimaitis.drawing.canvas.getContext('2d');
}

function Drawing(color){
    this.color = color || randomColor();
    this.points = [];

    this.addPoint = function(x, y, isDragging){
        this.points.push({x: x, y: y, isDragging: isDragging});
    }

    this.draw = function(){
        ctx.strokeStyle = this.color;
        ctx.lineJoin = "round";
        ctx.lineWidth = 5;

        for(var i=0; i < this.points.length; i++) {
            ctx.beginPath();
            if(this.points[i].isDragging && i){
                ctx.moveTo(this.points[i-1].x, this.points[i-1].y);
            }else{
                ctx.moveTo(this.points[i].x-1, this.points[i].y);
            }
            ctx.lineTo(this.points[i].x, this.points[i].y);
            ctx.closePath();
            ctx.stroke();
        }
    }

    this.clear = function(){
        this.points = [];
    }
}

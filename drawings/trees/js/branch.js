function Branch(begin, end, width, color){    
    //alert(begin+", "+end+", "+width);
    this.begin = begin;
    this.end = end;
    this.width = width;
    this.color = color;
    this.left = null;
    this.right = null;
    
    this.grow = function(){
        var leftMul = shrink_factor * (Math.random()+4.5)*.2;
        var rightMul = shrink_factor*(Math.random()+4.5)*.2;
        if(this.left !== null){ // grow recursively
            this.left.grow();
        }else{
            var dir = this.end.subtract(this.begin);
            var newEnd = dir.rotate(-angle);
            newEnd = this.end.add(newEnd.multiply(leftMul));
            if(newEnd.subtract(this.begin).length >= min_length)
                this.left = new Branch(this.end, newEnd, this.width*leftMul, this.color);
        }
        
        if(this.right !== null){
            this.right.grow();
        }else{
            var dir = this.end.subtract(this.begin);
            var newEnd = dir.rotate(angle);
            newEnd = this.end.add(newEnd.multiply(rightMul));
            if(newEnd.subtract(this.begin).length >= min_length)
                this.right = new Branch(this.end, newEnd, this.width*(rightMul), this.color);
        }
    };
    
    this.draw = function(ctx){
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.lineWidth = 1;
        var n = this.end.subtract(this.begin).normalize();
        var v = (n.multiply(this.width/2)).rotate(-90);
        var p1 = this.begin.add(v);
        var p4 = this.begin.add(v.rotate(180));
        
        v = (n.multiply(this.width*shrink_factor/2)).rotate(-90);
        var p2 = this.end.add(v);
        var p3 = this.end.add(v.rotate(180));
        
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.lineTo(p3.x, p3.y);
        ctx.lineTo(p4.x, p4.y);
        
        ctx.closePath();
        ctx.fill();
        if(this.left !== null)
            this.left.draw(ctx);
        else{
            ctx.beginPath();
            ctx.arc(this.end.x, this.end.y, leafRadius, 0, 2 * Math.PI, false);
            ctx.fillStyle = '#5d7a43';
            ctx.fill();
        }
        if(this.right !== null)
            this.right.draw(ctx);
        else{
            ctx.beginPath();
            ctx.arc(this.end.x, this.end.y, leafRadius, 0, 2 * Math.PI, false);
            ctx.fillStyle = '#5d7a43';
            ctx.fill();
        }
    }
}
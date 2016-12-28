Branch = function(begin, end, width, shrink_factor, branching_angle, min_branch_length, leaf_radius, wood_color, leaf_color){    
    //alert(begin+", "+end+", "+width);
    this.begin = begin;
    this.end = end;
    this.width = width;
    this.wood_color = wood_color;
    this.leaf_color = leaf_color;
    this.branching_angle = branching_angle;
    this.shrink_factor = shrink_factor;
    this.leaf_radius = leaf_radius;
    this.min_branch_length = min_branch_length;
}

Branch.prototype.left = null;
Branch.prototype.right = null;

Branch.prototype.grow = function(){
    var leftMul = this.shrink_factor * (Math.random()+4.5)*.2;
    var rightMul = this.shrink_factor * (Math.random()+4.5)*.2;
    if(this.left === null){
        var dir = this.end.subtract(this.begin);
        var newEnd = dir.rotate(-this.branching_angle);
        newEnd = this.end.add(newEnd.multiply(leftMul));
        if(newEnd.subtract(this.begin).length >= this.min_branch_length)
            this.left = new Branch(this.end, newEnd, this.width*leftMul, this.shrink_factor, this.branching_angle, this.min_branch_length, this.leaf_radius, this.wood_color, this.leaf_color);
    }
    if(this.left !== null)
        this.left.grow();

    if(this.right === null){
        var dir = this.end.subtract(this.begin);
        var newEnd = dir.rotate(this.branching_angle);
        newEnd = this.end.add(newEnd.multiply(rightMul));
        if(newEnd.subtract(this.begin).length >= this.min_branch_length)
            this.right = new Branch(this.end, newEnd, this.width*(rightMul), this.shrink_factor, this.branching_angle, this.min_branch_length, this.leaf_radius, this.wood_color, this.leaf_color);
    }
    if(this.right !== null)
        this.right.grow();
};

Branch.prototype.draw = function(ctx){
    ctx.beginPath();
    ctx.fillStyle = this.wood_color;
    ctx.lineWidth = 1;
    var n = this.end.subtract(this.begin).normalize();
    var v = (n.multiply(this.width/2)).rotate(-90);
    var p1 = this.begin.add(v);
    var p4 = this.begin.add(v.rotate(180));

    v = (n.multiply(this.width*this.shrink_factor/2)).rotate(-90);
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
        ctx.arc(this.end.x, this.end.y, this.leaf_radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = this.leaf_color;
        ctx.fill();
        ctx.closePath();
    }
    if(this.right !== null)
        this.right.draw(ctx);
    else{
        ctx.beginPath();
        ctx.arc(this.end.x, this.end.y, this.leaf_radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = this.leaf_color;
        ctx.fill();
        ctx.closePath();
    }
};
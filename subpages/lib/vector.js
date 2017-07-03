var vstrimaitis = vstrimaitis || {}

vstrimaitis.Vector2 = function(x, y){
    this.x = x;
    this.y = y;
    this.length2 = x*x + y*y;
    this.length = Math.sqrt(this.length2);
    this.angle = Math.degrees(Math.atan2(y, x))
}

Math.radians = function(degrees) {
    return degrees * Math.PI / 180;
};

Math.degrees = function(radians) {
    return radians * 180 / Math.PI;
};

vstrimaitis.Vector2.prototype.add = function(other){
    return new vstrimaitis.Vector2(this.x + other.x, this.y + other.y);
}

vstrimaitis.Vector2.prototype.subtract = function(other){
    return new vstrimaitis.Vector2(this.x - other.x, this.y - other.y);
}

vstrimaitis.Vector2.prototype.multiply = function(num){
    return new vstrimaitis.Vector2(this.x * num, this.y * num);
}

vstrimaitis.Vector2.prototype.divide = function(num){
    return new vstrimaitis.Vector2(this.x / num, this.y / num);
}

vstrimaitis.Vector2.prototype.normalize = function(){
    if(this.length <= 0.01)
        return this;
    return this.divide(this.length);
}

vstrimaitis.Vector2.prototype.dot = function(other){
    return this.x * other.x + this.y * other.y;
}

vstrimaitis.Vector2.prototype.rotate = function(angle){
    var newX = this.x * Math.cos(Math.radians(angle)) - this.y * Math.sin(Math.radians(angle));
    var newY = this.y * Math.cos(Math.radians(angle)) + this.x * Math.sin(Math.radians(angle));
    return new vstrimaitis.Vector2(newX, newY);
}

vstrimaitis.Vector2.prototype.flip = function(){
    return new vstrimaitis.Vector2(-this.x, -this.y);
}

vstrimaitis.Vector2.prototype.flipX = function(){
    return new vstrimaitis.Vector2(-this.x, this.y);
}

vstrimaitis.Vector2.prototype.flipY = function(){
    return new vstrimaitis.Vector2(this.x, -this.y);
}

vstrimaitis.Point2 = function(x, y){
    return new vstrimaitis.Vector2(x, y);
}

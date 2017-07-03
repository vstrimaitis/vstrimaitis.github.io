/*
var vstrimaitis = vstrimaitis || {};
vstrimaitis.physics = vstrimaitis.physics || {};

vstrimaitis.physics.Spring = function(k, len, damping, obj1, obj2){
    this.k = k;
    this.len = len;
    this.b = damping;
    if(obj1 && obj2){
        this.obj1 = obj1;
        this.obj2 = obj2;
    }
}

vstrimaitis.physics.Spring.prototype.connect = function(obj1, obj2){
    if(this.obj1 && this.obj2){
        return;
    }
    this.obj1 = obj1;
    this.obj2 = obj2;
}

vstrimaitis.physics.Spring.prototype.disconnect = function(){
    this.obj1 = null;
    this.obj2 = null;
}

vstrimaitis.physics.Spring.prototype.update = function(){
    var deltaPos = obj1.position.subtract(obj2.position);
    var distPos = deltaPos.length;
    var unitPos = deltaPos.normalize();
    var springForce = unitPos.multiply(this.k*(distPos - this.length));
    var deltaVel = obj1.velocity.subtract(obj2.velocity);
    var dampForce = 
}
*/
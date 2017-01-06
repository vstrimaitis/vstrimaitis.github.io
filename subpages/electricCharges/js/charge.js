var vstrimaitis = vstrimaitis || {};

vstrimaitis.Charge = function(charge, radius, pos){
    this.q = charge;
    this.r = radius;
    this.pos = pos;
    this.k = 1000;
    this.f = new vstrimaitis.Vector2(0, 0);
    this.applyForce = function(other){
        if(this.pos == other.pos)
            return;
        var R = this.pos.subtract(other.pos);
        var fMagnitude = this.k * this.q * other.q / (R.length2);
        var F = R.normalize().multiply(fMagnitude);
        this.f = this.f.add(F);
    }

    this.move = function(){
        this.pos = this.pos.add(this.f);
        this.f = new vstrimaitis.Vector2(0, 0);
    }

    this.restrict = function(topLeft, bottomRight){
        if(this.pos.x < topLeft.x){
            this.pos = new vstrimaitis.Vector2(topLeft.x, this.pos.y);
        }
        if(this.pos.x >= bottomRight.x){
            this.pos = new vstrimaitis.Vector2(bottomRight.x, this.pos.y);
        }
        if(this.pos.y < topLeft.y){
            this.pos = new vstrimaitis.Vector2(this.pos.x, topLeft.y);
        }
        if(this.pos.y >= bottomRight.y){
            this.pos = new vstrimaitis.Vector2(this.pos.x, bottomRight.y);
        }
    }
}

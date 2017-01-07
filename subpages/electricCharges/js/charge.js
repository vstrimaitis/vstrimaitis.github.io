var vstrimaitis = vstrimaitis || {};

vstrimaitis.maxSpeed = 10;

vstrimaitis.Charge = function(charge, radius, pos, isFixed){
    this.q = charge;
    this.r = radius;
    this.pos = pos;
    this.isFixed = isFixed;
    this.k = 10;
    this.v = new vstrimaitis.Vector2(0, 0);
    this.applyForce = function(other){
        if(this.pos == other.pos || this.isFixed)
            return;
        var R = this.pos.subtract(other.pos);
		if(R.length2 <= Number.EPSILON)
			return;
        var fMagnitude = this.k * this.q * other.q / (R.length2);
        var F = R.normalize().multiply(fMagnitude);
        this.v = this.v.add(F);
        if(this.v.length > vstrimaitis.maxSpeed){
            this.v = this.v.normalize().multiply(vstrimaitis.maxSpeed);
        }
    }

    this.move = function(){
        this.pos = this.pos.add(this.v);
    }

    this.collidesWith = function(other){
        var r = this.pos.subtract(other.pos);
        if(r.length <= this.r + other.r){
            return true;
        }
        return false;
    }

    this.restrict = function(topLeft, bottomRight){
        /*if(this.pos.x < topLeft.x || this.pos.y < topLeft.y || this.pos.x > bottomRight.x || this.pos.y > bottomRight.y){
            this.v = this.v.multiply(-1);
        }*/





            if(this.pos.x < topLeft.x){
                this.pos = new vstrimaitis.Vector2(topLeft.x, this.pos.y);
            }
            if(this.pos.x > bottomRight.x){
                this.pos = new vstrimaitis.Vector2(bottomRight.x, this.pos.y);
            }
            if(this.pos.y < topLeft.y){
                this.pos = new vstrimaitis.Vector2(this.pos.x, topLeft.y);
            }
            if(this.pos.y > bottomRight.y){
                this.pos = new vstrimaitis.Vector2(this.pos.x, bottomRight.y);
            }
    }

    this.applyDrag = function(mag){
        this.v = this.v.multiply(1-mag);
    }
}

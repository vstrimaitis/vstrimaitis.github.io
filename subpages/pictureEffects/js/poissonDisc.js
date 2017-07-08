/**
 * options.canvas
 * options.image
 * options.r - min distance between two points
 * options.d - size of points
 * options.speed - generation speed
 */

function PoissonDiscEffect(/*canvas, image*/options){
    this.canvasUtil = new CanvasUtil(options.canvas);
    
    /*this.r = 5;
    this.generationSpeed = 100;*/
    this.r = options.r;
    this.generationSpeed = options.generationSpeed;
    this.d = options.d;

    this.k = 30;
    this.grid = [];
    this.active = [];
    this.w = this.r/Math.sqrt(2);
    this.rows = Math.floor(this.canvasUtil.getHeight() / this.w);;
    this.cols = Math.floor(this.canvasUtil.getWidth() / this.w);
    this.newPoints = [];
    this.pixels = this.canvasUtil.getImagePixels(options.image);

    for(var i = 0; i < this.cols*this.rows; i++){
        this.grid[i] = undefined;
    }

    this._initialize();
}

PoissonDiscEffect.prototype._initialize = function(){
    var x = Math.random()*this.canvasUtil.getWidth();
    var y = Math.random()*this.canvasUtil.getHeight();
    var pos = {x: x, y: y};
    var i = Math.floor(y/this.w);
    var j = Math.floor(x/this.w);
    this.grid[j+i*this.cols] = pos;
    this.active.push(pos);
    this.newPoints.push(pos);
}

PoissonDiscEffect.prototype.update = function(){
    for(var it = 0; it < this.generationSpeed; it++){
        if(this.active.length > 0){
            var i = Math.floor(Math.random()*this.active.length);
            var pos = this.active[i];
            var foundAny = false;
            for(var n = 0; n < this.k; n++){
                var angle = Math.random()*Math.PI*2;
                var dist = Math.random()*this.r+this.r;
                var newPos = {x: pos.x + dist*Math.cos(angle),
                            y: pos.y + dist*Math.sin(angle)};
                var row = Math.floor(newPos.y / this.w);
                var col = Math.floor(newPos.x / this.w);
                if(row >= 0 && col >= 0 && col < this.cols && row < this.rows && !this.grid[col+row*this.cols]){
                    var ok = true;
                    for(var ii = -1; ii <= 1; ii++){
                        for(var jj = -1; jj <= 1; jj++){
                            var idx = (col+ii) + (row+jj) * this.cols;
                            if(this.grid[idx]){
                                var dx = this.grid[idx].x - newPos.x;
                                var dy = this.grid[idx].y - newPos.y;
                                var d = dx*dx+dy*dy;
                                if(d < this.r*this.r){
                                    ok = false;
                                    break;
                                }
                            }
                        }
                    }
                    if(ok){
                        this.newPoints.push(newPos);
                        this.active.push(newPos);
                        this.grid[col+row*this.cols] = newPos;
                        foundAny = true;
                        break;
                    }
                }
            }
            if(!foundAny){
                this.active.splice(i, 1);
            }
        }
    }
}

PoissonDiscEffect.prototype.draw = function(){
    if(this.newPoints.length === 0){
        return;
    }

    for(var i = 0; i < this.newPoints.length; i++){
        var x = this.newPoints[i].x;
        var y = this.newPoints[i].y;
        var jj = Math.floor(x);
        var ii = Math.floor(y);
        var idx = (jj + ii*this.canvasUtil.getWidth())*4;
        var d = [this.pixels[idx], this.pixels[idx+1], this.pixels[idx+2], this.pixels[idx+3]];
        this._drawCircle(x, y, this.d, d);
    }
    this.newPoints = [];
}

PoissonDiscEffect.prototype._drawCircle = function(x, y, r, color){
    var ctx = this.canvasUtil.getContext();
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2*Math.PI, false);
    ctx.fillStyle = 'rgba('+color[0]+','+color[1]+','+color[2]+','+color[3]+')';
    ctx.fill();
}
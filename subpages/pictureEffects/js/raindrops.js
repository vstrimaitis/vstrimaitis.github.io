/**
 * options.canvas
 * options.image
 * options.minR - minimum radius of a circle
 * options.maxR - maximum radius of a circle
 * options.minTTL - minimum TTL of a circle
 * options.maxTTL - maximum TTL of a circle
 * options.minTiemout - minimum time interval between two circle spawns
 * options.maxTimeout - maximum time interval between two circle spawns
 */
function RaindropEffect(options){
    this.canvasUtil = new CanvasUtil(options.canvas);
    this.pixels = this.canvasUtil.getImagePixels(options.image);

    /*this.minR = 10;
    this.maxR = 100;
    this.minTTL = 50;
    this.maxTTL = 1000;
    this.minTimeout = 10;
    this.maxTimeout = 100;*/
    this.minR = options.minR;
    this.maxR = options.maxR;
    this.minTTL = options.minTTL;
    this.maxTTL = options.maxTTL;
    this.minTimeout = options.minTimeout;
    this.maxTimeout = options.maxTimeout;
    this.droplets = [];
    this.alpha = [];
    this.timeout = 0;

    for(var i = 0; i < this.canvasUtil.getHeight(); i++){
        var row = [];
        for(var j = 0; j < this.canvasUtil.getWidth(); j++){
            row[j] = 0;
        }
        this.alpha[i] = row;
    }

}

RaindropEffect.prototype.update = function(){
    this.timeout--;
    if(this.timeout <= 0){
        this.timeout = Math.floor(Math.random(this.maxTimeout- this.minTimeout) + this.minTimeout);
        var t = Math.random() * (this.maxTTL - this.minTTL) + this.minTTL;
        var droplet = {
            x: Math.floor(Math.random() * this.canvasUtil.getWidth()),
            y: Math.floor(Math.random() * this.canvasUtil.getHeight()),
            r: Math.random() * (this.maxR - this.minR) + this.minR,
            ttl: t,
            initialTtl: t
        };
        this.droplets.push(droplet);
    }
    for(var i = 0; i < this.canvasUtil.getHeight(); i++){
        for(var j = 0; j < this.canvasUtil.getWidth(); j++){
            this.alpha[i][j] = 0;
        }
    }

    for(var k = this.droplets.length-1; k >= 0; k--){
        this.droplets[k].ttl--;
        if(this.droplets[k].ttl <= 0){
            this.droplets.splice(k, 1);
            continue;
        }
        for(var yy = Math.floor(this.droplets[k].y - this.droplets[k].r); yy <= Math.floor(this.droplets[k].y+this.droplets[k].r); yy++){
            for(var xx = Math.floor(this.droplets[k].x - this.droplets[k].r); xx <= Math.floor(this.droplets[k].x+this.droplets[k].r); xx++){
                if(yy < 0 || yy >= this.canvasUtil.getHeight() || xx < 0 || xx >= this.canvasUtil.getWidth()){
                    continue;
                }
                var d2 = (xx-this.droplets[k].x)*(xx-this.droplets[k].x) + (yy-this.droplets[k].y)*(yy-this.droplets[k].y);
                if(d2 <= this.droplets[k].r*this.droplets[k].r){
                    this.alpha[yy][xx] += this._getOpacity(this.droplets[k].ttl, this.droplets[k].initialTtl);
                    if(this.alpha[yy][xx] > 255){
                        this.alpha[yy][xx] = 255;
                    }
                }
            }
        }
    }
}

RaindropEffect.prototype.draw = function(){
    for(var i = 0; i < this.canvasUtil.getHeight(); i++){
        for(var j = 0; j < this.canvasUtil.getWidth(); j++){
            var idx=  (j+i*this.canvasUtil.getWidth())*4;
            var r = this.pixels[idx];
            var g = this.pixels[idx+1];
            var b = this.pixels[idx+2];
            var a = this.alpha[i][j];
            this.canvasUtil.setPixel(j, i, r, g, b, a);
        }
    }
    this.canvasUtil.updateCanvas();
}

RaindropEffect.prototype._getOpacity = function(current, max){
    return Math.floor(current * 255 / max);
}
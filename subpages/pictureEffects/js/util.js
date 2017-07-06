function CanvasUtil(canvas){
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.canvasData = this.ctx.getImageData(0, 0, canvas.width, canvas.height);
}

CanvasUtil.prototype.getImagePixels = function(image){
    this.canvasData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.drawImage(image, 0, 0);
    var pixels = this.ctx.getImageData(0, 0, image.width, image.height).data;
    this.updateCanvas();
    return pixels;
}

CanvasUtil.prototype.setPixel = function(x, y, r, g, b, a){
    var idx = (x+y*this.canvas.width)*4;
    this.canvasData.data[idx  ] = r;
    this.canvasData.data[idx+1] = g;
    this.canvasData.data[idx+2] = b;
    this.canvasData.data[idx+3] = a;
}

CanvasUtil.prototype.updateCanvas = function(){
    this.ctx.putImageData(this.canvasData, 0, 0);
}

CanvasUtil.prototype.getHeight = function(){
    return this.canvas.height;
}

CanvasUtil.prototype.getWidth = function(){
    return this.canvas.width;
}

CanvasUtil.prototype.getContext = function(){
    return this.ctx;
}
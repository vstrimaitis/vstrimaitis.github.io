var angle = 50;
var shrink_factor = 2/3;
var initial_length = 200;
var min_length = 10;
var trunk_width = 50;
var leafRadius = 10;

paper.install(window);

window.onload = function(){
    function drawEverything(){
        var c = document.getElementById("mainCanvas");
        var ctx = c.getContext("2d");
        var w = window.innerWidth;
        var h = window.innerHeight-50;
        paper.setup(c);
        ctx.canvas.width  = w;
        ctx.canvas.height = h;

        //drawRectNoStroke(ctx, 0, 0, w, h, '#777777');
        //drawLine(ctx, 0, 0, 500, 600, 10, 'red');

        var b = new Branch(new Point(w/2, h), new Point(w/2, h-initial_length), trunk_width, '#59342f');
        for(var i = 0; i < 20; i++)
            b.grow();
        b.draw(ctx);
    }
    $("#angleSlider").mousemove(function () {
        angle = $("#angleSlider").val();
        $("#angleValue").text(angle);
        drawEverything();
    });
    //drawEverything();
    
    angle = 180;
    function doMagic(){
        drawEverything();
        if(angle === 35)
            return;
        setTimeout(function(){
            angle--;
            doMagic();
        }, 10);
    }
    doMagic();
    
};

function saveCanvas(){
    var image = document.getElementById("mainCanvas").toDataURL("image/png");
    window.location.href=image;
}

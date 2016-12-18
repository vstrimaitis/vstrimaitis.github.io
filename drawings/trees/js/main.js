paper.install(window);

var trees = [];
var trunkColors = ['#422607', '#59342f', '#914f15', '#C19A6B', '#663300', '#285100', '#4c463e', '#87765e', '#ad9066'];
var leafColors = ['#0e4207', '#5c7a41', '#a54417', '#afa015', '#98039e', '#9e1203', '#039e7c', '#07c607', '#ba9800', '#ba004a'];
var ctx;
var c;

function getRand(arr){
    return arr[Math.floor(Math.random()*arr.length)];
}

function inRange(a, b){
    return Math.random() * (b-a) + a;
}

function onLeftClick(e){
    var tree = new Tree(e.pageX, e.pageY, inRange(35, 60), inRange(2/3, 3/4), inRange(50, 250), inRange(10, 50), inRange(3, 10), inRange(0, 5), getRand(trunkColors), getRand(leafColors));
    console.log(JSON.stringify(tree));
    tree.build();
    tree.draw(ctx);
    trees.push(tree);
}

function clearScreen(){
    ctx.beginPath();
    ctx.rect(0, 0, c.width, c.height);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.closePath();
}

function onRightClick(e){
    clearScreen();
    e.preventDefault();
}

function onSaveButtonClick(e){
    var dt = c.toDataURL('image/jpeg');
    this.href = dt;
}

function drawEverything(){
    c = document.getElementById("mainCanvas");
    c.addEventListener('click', onLeftClick, false);
    c.addEventListener('contextmenu', onRightClick, false);
    document.getElementById("saveButton").addEventListener('click', onSaveButtonClick, false);
    ctx = c.getContext("2d");
    var w = window.innerWidth;
    var h = window.innerHeight-50;
    paper.setup(c);
    ctx.canvas.width  = w;
    ctx.canvas.height = h;
    clearScreen();
}


window.onload = function(){
    drawEverything();
    /*$("#angleSlider").mousemove(function () {
        angle = $("#angleSlider").val();
        $("#angleValue").text(angle);
        drawEverything();
    });*/
    /*angle = 180;
    function doMagic(){
        drawEverything();
        if(angle === 35)
            return;
        setTimeout(function(){
            angle--;
            doMagic();
        }, 10);
    }
    doMagic();*/
    
};

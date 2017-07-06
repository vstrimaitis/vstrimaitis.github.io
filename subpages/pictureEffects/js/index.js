var canvas;
var createEffect = {
    poisson: function(canvas, image){
        return new PoissonDiscEffect(canvas, image);
    },
    raindrops: function(canvas, image){
        return new RaindropEffect(canvas, image);
    }
}
var effect = null;
var currImage = null;

document.getElementById('imageInput').onchange = function(evt){
    var tgt = evt.target || window.event.srcElement,
        files = tgt.files;

    if (FileReader && files && files.length) {
        var fr = new FileReader();
        fr.onload = function () {
            var img = new Image();
            img.src = fr.result;
            img.onload = function(){
                currImage = this;
            };
        }
        fr.readAsDataURL(files[0]);
    }
    else {
        alert("Your browser does not support the FileReader API.");
    }
}

function launchEffect(){
    var type = document.querySelector('input[name="effectType"]:checked').value;
    if(!createEffect[type]){
        alert("Something went very wrong :/");
        return;
    }

    canvas.width = currImage.width;
    canvas.height = currImage.height;
    effect = createEffect[type](canvas, currImage);
}

function animate(timestamp){
    if(effect){
        effect.update();
        effect.draw();
    }
    requestAnimationFrame(animate);
}

function main(){
    document.effectForm.reset(); 
    canvas = document.getElementById('mainCanvas');
    animate();
}
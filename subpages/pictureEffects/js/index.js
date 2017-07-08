var canvas;
var createEffect = {
    poisson: function(options){
        options.r = document.getElementById('poissonR').value-0;
        options.d = document.getElementById('poissonD').value-0;
        options.generationSpeed = document.getElementById('poissonS').value-0;
        return new PoissonDiscEffect(options);
    },
    raindrops: function(options){
        options.minR = document.getElementById('raindropsMinR').value-0;
        options.maxR = document.getElementById('raindropsMaxR').value-0;
        options.minTTL = document.getElementById('raindropsMinTTL').value-0;
        options.maxTTL = document.getElementById('raindropsMaxTTL').value-0;
        options.minTimeout = document.getElementById('raindropsMinTimeout').value-0;
        options.maxTimeout = document.getElementById('raindropsMaxTimeout').value-0;
        return new RaindropEffect(options);
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
    effect = createEffect[type]({canvas: canvas, image: currImage});
}

function animate(timestamp){
    if(effect){
        effect.update();
        effect.draw();
    }
    requestAnimationFrame(animate);
}

function hideForms(radio){
    var els = document.getElementsByClassName('optionsInput');
    for(var i = 0; i < els.length; i++){
        els[i].style.display = 'none';
    }
    if(radio.checked){
        var id = radio.value + 'Input';
        document.getElementById(id).style.display = 'initial';
    }
}

function main(){
    document.effectForm.reset(); 
    hideForms(document.querySelector('input[name="effectType"]:checked'));
    canvas = document.getElementById('mainCanvas');
    animate();
}
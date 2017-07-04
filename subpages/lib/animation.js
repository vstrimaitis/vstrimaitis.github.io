var vstrimaitis = vstrimaitis || {};
vstrimaitis._framesPerSecond = 60;
vstrimaitis._previousTimestamp;

vstrimaitis.setFramerate = function(fps){
    vstrimaitis._framesPerSecond = fps;
}

vstrimaitis.animate = function(timestamp){
    setTimeout(function(){
        if(!vstrimaitis._previousTimestamp){
            vstrimaitis._previousTimestamp = timestamp;
        }
        var dt = timestamp - vstrimaitis._previousTimestamp;
        vstrimaitis._previousTimestamp = timestamp;
        update(dt);
        draw();
        requestAnimationFrame(vstrimaitis.animate);
    }, 1000/vstrimaitis._framesPerSecond);
}
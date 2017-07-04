var vstrimaitis = vstrimaitis || {};
vstrimaitis._framesPerSecond = 60;

vstrimaitis.setFramerate = function(fps){
    vstrimaitis._framesPerSecond = fps;
}

vstrimaitis.animate = function(timestamp){
    setTimeout(function(){
        timestamp = timestamp || 0;
        if(!vstrimaitis._previousTimestamp){
            vstrimaitis._previousTimestamp = timestamp;
        }
        vstrimaitis._dt = timestamp - vstrimaitis._previousTimestamp;
        vstrimaitis._previousTimestamp = timestamp;
        update(vstrimaitis._dt);
        draw();
        requestAnimationFrame(vstrimaitis.animate);
    }, 1000/vstrimaitis._framesPerSecond);
}
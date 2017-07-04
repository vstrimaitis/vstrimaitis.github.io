var vstrimaitis = vstrimaitis || {};
vstrimaitis._framesPerSecond = 60;
vstrimaitis._dt = 1/vstrimaitis._framesPerSecond;
vstrimaitis._accumulator = 0;
vstrimaitis._previousTimestamp;

vstrimaitis.setFramerate = function(fps){
    vstrimaitis._framesPerSecond = fps;
    vstrimaitis._dt = 1/fps;
}

vstrimaitis.animate = function(timestamp){
    setTimeout(function(){
        timestamp = timestamp || new Date().getTime();
        if(!vstrimaitis._previousTimestamp){
            vstrimaitis._previousTimestamp = timestamp;
        }
        vstrimaitis._accumulator += timestamp - vstrimaitis._previousTimestamp;
        vstrimaitis._previousTimestamp = timestamp;
        if(vstrimaitis._accumulator > 0.2){
            vstrimaitis._accumulator = 0.2;
        }
        while(vstrimaitis._accumulator > vstrimaitis._dt){
            update(vstrimaitis._dt);
            vstrimaitis._accumulator -= vstrimaitis._dt;
        }
        draw();
        requestAnimationFrame(vstrimaitis.animate);
    }, 1000/vstrimaitis._framesPerSecond);
}
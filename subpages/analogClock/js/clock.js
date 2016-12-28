var vstrimaitis = vstrimaitis || {};

vstrimaitis.Clock = function(center, radius, time){
    this.milliseconds = time.getMilliseconds();
    this.radius = radius;
    this.center = center;
    this.hoursHand = new vstrimaitis.ClockHand(center,(time.getHours()%12)/12*360,radius*.3,12*60*60*1000);
    this.minutesHand = new vstrimaitis.ClockHand(center,time.getMinutes()/60*360,radius*.6,60*60*1000);
    this.secondsHand = new vstrimaitis.ClockHand(center,time.getSeconds()/60*360,radius*.7,60*1000);
    this.update = function(dt){
        this.milliseconds++;
        this.hoursHand.move(dt);
        this.minutesHand.move(dt);
        this.secondsHand.move(dt);
    }
}

vstrimaitis.ClockHand = function(start, angle, length, period){
    this.start = start;
    this.end = start.add(new vstrimaitis.Vector2(0, -1 * length).rotate(angle));
    this.period = period;
    this.direction = this.end.subtract(this.start);
    this.move = function(dt){
        var dAlpha = 360/this.period * dt;
        this.direction = this.direction.rotate(dAlpha);
        this.end = this.start.add(this.direction);
    }
}

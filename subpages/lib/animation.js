var vstrimaitis = vstrimaitis || {};

vstrimaitis.animate = function(t){
    update();
    draw();
    requestAnimationFrame(animate);
}
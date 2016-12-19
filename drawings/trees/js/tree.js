Tree = function(params/*base_x, base_y, branching_angle, shrink_factor, trunk_length, trunk_width, min_branch_length, leaf_radius, wood_color, leaf_color*/){
    this.base_x = params.base_x || window.innerWidth/2;
    this.base_y = params.base_y || window.innerHeight/2;
    this.branching_angle = params.branching_angle || inRange(35, 60);
    this.shrink_factor = params.shrink_factor || inRange(2/3, 3/4);
    this.trunk_length = params.trunk_length || inRange(50, 250);
    this.trunk_width = params.trunk_width || inRange(10, 50);
    this.min_branch_length = params.min_branch_length || inRange(3, 10);
    this.leaf_radius = params.leaf_radius || inRange(0, 5);
    this.wood_color = params.wood_color || getRand(trunkColors);
    this.leaf_color = params.leaf_color || getRand(leafColors);
}

Tree.prototype.root = null;

Tree.prototype.build = function(){
    //begin, end, width, shrink_factor, branching_angle, min_branch_length, leaf_radius, wood_color, leaf_color
    this.root = new Branch(new Point(this.base_x, this.base_y), new Point(this.base_x, this.base_y - this.trunk_length),
                           this.trunk_width, this.shrink_factor, this.branching_angle,
                           this.min_branch_length, this.leaf_radius, this.wood_color, this.leaf_color);
    this.root.grow();
}

Tree.prototype.draw = function(ctx){
    this.root.draw(ctx);
}
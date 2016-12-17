function Tree(base_x, base_y, branching_angle, shrink_factor, trunk_length, trunk_width, min_branch_length, leaf_radius, wood_color, leaf_color){
    this.base_x = base_x;
    this.base_y = base_y;
    this.branching_angle = branching_angle;
    this.shrink_factor = shrink_factor;
    this.trunk_length = trunk_length;
    this.trunk_width = trunk_width;
    this.min_branch_length = min_branch_length;
    this.leaf_radius = leaf_radius;
    this.wood_color = wood_color;
    this.leaf_color = leaf_color;
    this.root = null;
    
    this.build = function(){
        //begin, end, width, shrink_factor, branching_angle, min_branch_length, leaf_radius, wood_color, leaf_color
        this.root = new Branch(new Point(this.base_x, this.base_y), new Point(this.base_x, this.base_y - this.trunk_length),
                               this.trunk_width, this.shrink_factor, this.branching_angle,
                               this.min_branch_length, this.leaf_radius, this.wood_color, this.leaf_color);
        this.root.grow();
    }
    
    this.draw = function(ctx){
        this.root.draw(ctx);
    }
}
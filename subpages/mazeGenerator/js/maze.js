var vstrimaitis = vstrimaitis || {}

vstrimaitis.wall = {
    up: {val: 1, di: -1, dj: 0},
    right: {val: 2, di: 0, dj: 1},
    down: {val: 4, di: 1, dj: 0},
    left: {val: 8, di: 0, dj: -1}
};

vstrimaitis.getOppositeWall = function(wall){
    if(wall === vstrimaitis.wall.up)
        return vstrimaitis.wall.down;
    if(wall === vstrimaitis.wall.right)
        return vstrimaitis.wall.left;
    if(wall === vstrimaitis.wall.down)
        return vstrimaitis.wall.up;
    if(wall === vstrimaitis.wall.left)
        return vstrimaitis.wall.right;
    return undefined;
}

vstrimaitis.Cell = function(i, j){
    this.i = i;
    this.j = j;
    this.walls = 15; // all walls
}

vstrimaitis.Cell.prototype.removeWall = function(wall){
    this.walls &= ~wall.val;
}

// add ability to generate different types of mazes (triangular, pentagonal, hexagonal, ...)
vstrimaitis.generateMaze = function(w, h){
    function chooseWall(i, j){
        var possible = [];
        for(var p in vstrimaitis.wall){
            var ii = i + vstrimaitis.wall[p].di;
            var jj = j + vstrimaitis.wall[p].dj;
            if(ii >= 0 && ii < h && jj >= 0 && jj < w && !visited[ii][jj])
                possible.push(vstrimaitis.wall[p]);
        }
        if(possible.length === 0)
            return -1;
        return possible[Math.floor(Math.random() * possible.length)];
    }

    var startI = Math.floor(h/2), startJ = Math.floor(w/2);
    var grid = [], visited = [];
    var visitedCnt = 0;
    for(var i = 0; i < h; i++){
        var row = [], v = [];
        for(var j = 0; j < w; j++){
            row[j] = new vstrimaitis.Cell(i, j);
            v[j] = false;
        }
        visited[i] = v;
        grid[i] = row;
    }
    var currCell = grid[startI][startJ];
    var stack = [];
    while(visitedCnt < w*h){
        if(!visited[currCell.i][currCell.j]){
            visited[currCell.i][currCell.j] = true;
            visitedCnt++;
        }
        var dir = chooseWall(currCell.i, currCell.j);
        if(dir !== -1){
            stack.push(currCell);
            currCell.removeWall(dir);
            var nextCell = grid[currCell.i + dir.di][currCell.j + dir.dj];
            nextCell.removeWall(vstrimaitis.getOppositeWall(dir));
            currCell = nextCell;
            if(!visited[currCell.i][currCell.j]){
                visited[currCell.i][currCell.j] = true;
                visitedCnt++;
            }
        } else{
            currCell = stack.pop();
        }
    }
    return grid;
}

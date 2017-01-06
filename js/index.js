var Link = function(name, description, date, path, isDirect){
    this.name = name;
    this.description = description;
    this.path = path;
    this.isDirect = isDirect;
    this.date = date;
}

Link.prototype.toHtml = function(){
    var l = this.isDirect ? this.path : 'subpages/' + this.path + '/index.html';
    var img = this.isDirect ? 'img/partyHard2.gif' : 'subpages/' + this.path + '/preview.png';
    var possibleEffects = ['effect5 left_to_right', 'effect5 right_to_left', 'effect5 left_to_right', 'effect5 right_to_left', 'effect13 left_to_right', 'effect13 right_to_left', 'effect13 top_to_bottom', 'effect13 bottom_to_top', 
                          'effect15 left_to_right', 'effect15 right_to_left', 'effect15 top_to_bottom', 'effect15 bottom_to_top', 'effect17', 'effect17', 'effect17', 'effect17' ];
    var effect = getRandomElement(possibleEffects);
    console.log(effect);
    var html =  '<div class="col-xs-12 col-sm-4 col-lg-3">' +
                    '<div class="link ih-item circle '+effect+'">' +
                        '<a href="'+l+'">' +
                            '<div class="img"><img src="'+img+'" title="'+this.name+'" alt="'+this.name+'"></div>' +
                            '<div class="info">' +
                                '<div class="info-back">' +
                                    '<h3>'+this.name+'</h3>' +
                                    '<p>'+this.description+'</p>' +
                                    '<p>'+this.date+'</p>' +
                                '</div>' +
                            '</div>' +
                        '</a>' +
                    '</div>' + 
                '</div>';
    return html;
}

function getRandomElement(arr){
    return arr[Math.floor(Math.random()*arr.length)];
}

var links = [
    new Link("Electric charges", "A simulation of interaction of electric charges", "2017/01", "electricCharges"),
    new Link("Analog clock", "An implementation of an animated analog clock.", "2016/12", "analogClock"),
    new Link("Maze generator", "A demonstration of a maze generation algorithm.", "2016/12", "mazeGenerator"),
    new Link("Dragon curve", "A visualization of the dragon curve.", "2016/12", "dragonCurve"),
    new Link("Synced drawing", "An attempt of synchronizing drawings with Node.js.", "2016/12", "syncDraw"),
    new Link("Solver", "A solver for word-search puzzles.", "2016/12", "wordSearchSolver"),
    new Link("Idea bank", "A page for saving my ideas for future projects.", "2016/12", "ideas"),
    new Link("Fractal trees", "A fractal tree generator.", "2016/12", "fractalTrees"),
    new Link("University work", "A page for storing some of my uni work.", "2016/11", "vu"),
    new Link("Visualgo", "A great page full of algorithm visualizations.", "2016/04", "https://visualgo.net/", true),
    new Link("Cramer", "A solver for systems of linear equations using the Cramer's rule.", "2015/10", "krameris"),
    new Link("Matrices", "Implementations of various operations for matrices.", "2015/10", "matricos"),
    new Link("Permutation mult.", "A little script for multiplying permutations.", "2015/10", "daugintKelinius"),
    new Link("LineBall", "A little game made with Unity3D.", "2015/10", "lineball"),
    new Link("Prime factors", "A little script for factoring a number into prime numbers.", "2015/10", "factors"),
    new Link("Prime checker", "A program for checking, whether a number is prime or not.", "2015/10", "isPrime"),
    new Link("π", "Get the desired number of digits of π.", "2015/10", "piGen"),
    new Link("Triangle calc.", "A program for calculating parameters of any triangle.", "2012/10", "triCalc"),
    new Link("Angle converter", "Converts an angle between radians and degrees.", "2012/10", "rad"),
    new Link("Quad. eq. calc.", "A quadratic equation solver.", "2012/10", "quad"),
    new Link("Mult. table", "A multiplication table generator.", "2012/10", "dauglent"),
];

window.onload = function(){
    lastEdit();
    var row = $('#linksRow');
    for(var i = 0; i < links.length; i++){
        row.append(links[i].toHtml());
    }
}


function lastEdit(){
    document.getElementById("lastEdited").innerHTML = "Last edited: "+document.lastModified;
}
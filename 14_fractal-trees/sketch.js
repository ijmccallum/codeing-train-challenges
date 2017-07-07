var angle = 0;
var dim = 0.7;
var weightDim = 0.6;
var opacityDim = 0.95;
var limit = 1;
var button;
var tree = []; //an array of branch layers. each layer is an array of branches...
var lenTracker = 100;
var initLayers = 5;

function setup() {
    width = document.documentElement.clientWidth * 0.95;
    height = document.documentElement.clientHeight * 0.95;
    createCanvas(width, height);
    var center = createVector(width/2, height/2);
    var topRoot = createVector(width/2, (height/2) - 80);
    var bottomRoot = createVector(width/2, (height/2) + 80);
    var leftRoot = createVector((width/2) - 80, height/2);
    var rightRoot = createVector((width/2) + 80, height/2);
    tree[0] = [
        new Branch(center, topRoot, 2, 1), 
        new Branch(center, bottomRoot, 2, 1),
        new Branch(center, leftRoot, 2, 1),
        new Branch(center, rightRoot, 2, 1)
    ]; //root has only one element, the trunk!
    angle = PI / 4;
    button = createButton('Add branches');
    button.mousePressed(newLayer);
    button = createButton('Remove branches');
    button.mousePressed(removeLayer);
    for (var i = 0; i < initLayers; i++) {
        newLayer();
    }
}

var newLayer = function(){
    //add another layer of branches
    //from the last layer, iterate through all the branches in that layer, get it's descendents and add them to the next layer
    var nextLayer = [];
    var lastLayer = tree[tree.length - 1];

    //first check how small we are
    if (lastLayer[0].length < limit) {
        return;
    } 

    lastLayer.forEach(function(branch){
        nextLayer = nextLayer.concat(branch.grow());
    }); 

    //add the next layer to the tree!
    tree.push(nextLayer);
}
var removeLayer = function(){
    if (tree.length > 2) {
        var secondLastLayer = tree[tree.length - 2];
        secondLastLayer.forEach(function(branch){
            branch.prune();
        });
        tree.pop();
    }
}

function draw() {
    background(30);
    //angle = slider.value();
    angle = angle + 0.01;
    //iterate through every layer of the tree's branches
    tree.forEach(function(layer, i){
        i = i + 1;
        layer.forEach(function(branch){
            branch.draw(1/i);
        });
    });
}

function Branch(begin, end, weight, opacity){
    this.begin = begin; //the starting point
    this.end = end;
    this.weight = weight;
    this.opacity = opacity;

    this.rightChild = false;
    this.leftChild = false;

    this.draw = function(){
        strokeWeight(this.weight);
        stroke(255 * this.opacity);
        
        line(this.begin.x, this.begin.y, this.end.x, this.end.y);

        //before drawing the children, tweak their properties!
        if (this.rightChild) {
            var dir = p5.Vector.sub(this.end, this.begin);
            
            //right
            dir.rotate(angle);
            dir.mult(dim);
            var rightEnd = p5.Vector.add(this.end, dir);
            this.rightChild.end = rightEnd;
            this.rightChild.begin = this.end;

            dir.rotate(- (angle * 2)); //rotate to face the other way
            var leftEnd = p5.Vector.add(this.end, dir);
            this.leftChild.end = leftEnd;
            this.leftChild.begin = this.end;

            this.rightChild.draw();
            this.leftChild.draw();
        }
    }

    //create 2 additional branch objects, and save them as kids
    this.grow = function(){
        var dir = p5.Vector.sub(this.end, this.begin);
        //right
        dir.rotate(angle);
        dir.mult(dim);
        var rightEnd = p5.Vector.add(this.end, dir);
        this.rightChild = new Branch(this.end, rightEnd, this.weight * weightDim, this.opacity * opacityDim);

        //left
        dir.rotate(- (angle * 2)); //rotate to face the other way
        var leftEnd = p5.Vector.add(this.end, dir);
        this.leftChild = new Branch(this.end, leftEnd, this.weight * weightDim, this.opacity * opacityDim);

        return [this.rightChild, this.leftChild];
    }

    this.prune = function(){
        this.rightChild = false;
        this.leftChild = false;
    }
}

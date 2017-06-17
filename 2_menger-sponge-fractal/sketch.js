var canvasWidth = 640; var canvasHeight = 480;
var a = 4;
var img;
var originBox;
var sponge = [];
var gap = 0;
var cutoff = 10;
var lastTime = 0;

// function preload(){
//   img = loadImage("texture.jpg");
// }

function setup() {
    createCanvas(canvasWidth, canvasHeight, WEBGL);
    perspective();
    sponge = [new SpongeBox(0,0,0,100)];
}

function draw() {
    //background(100);
    //texture(img);
    //fill('rgba(255,255,255, 0.25)');
    stroke(255);
    //ambientLight(255,0,0);
    rotateX(a);
    rotateY(a / 3);
    rotateZ(a / 2);
    a += 0.01;

    sponge.forEach(function(spongeBox){
        spongeBox.draw();
    });
}

//on click- fractalize!
function mousePressed() {
    if (lastTime > cutoff) {
        if (!confirm('the last time this took ' + Math.ceil(lastTime) + ' ms... this one might break your computer...  ')){
            return;
        }
    }
    var newSponge = [];
    var t0 = performance.now();
    sponge.forEach(function(box){
        var fractalArray = box.fractalize();
        newSponge = newSponge.concat(fractalArray);
    });
    var t1 = performance.now();
    lastTime = t1 - t0;
    sponge = newSponge;
}
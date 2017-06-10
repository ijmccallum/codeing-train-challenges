var width = 640 * 2; //these are the theoretical boundries of our cube
var height = 480 * 2; //make the width and height bigger as we want the back face to fill the viewport (think about perspective)
var depth = 700;
var stars  = []; //holds all the stars!
var starCount = 500;
var speed;

function setup() {
  createCanvas(640, 480);
  for (var i = 0; i < starCount; i++){
    stars[i] = new Star();//initialize a star randomly!
    stars[i].init();
  }
}

function draw() {
  speed = map(mouseX, 0, width, -10, 10);
  background(0);
  translate(width / 2, height / 2);
  for (var i = 0; i < starCount; i++){
    stars[i].update();
    stars[i].draw();
  }
}
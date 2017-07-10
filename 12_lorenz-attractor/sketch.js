var zoom = 10;

var x = 0.5;
var y = 0.5;
var z = 0.5;

//constants
var rho = 28;
var sigma = 10;
var beta = 8 / 3;

var points = [];

//orbit
var orbitX = 0;
var orbitY = 0;

function setup() {
    width = document.documentElement.clientWidth;
    height = document.documentElement.clientHeight;
    createCanvas(width, height, WEBGL);
    translate(width/2, height/2, 100);
}

function mousePressed() {
    //document.body.className = "mousedown";
}

function mouseDragged(e){
    //orbit!
    orbitY += e.movementX / (width / 2);
    orbitX += e.movementY / (height / 2);
}

function draw() {
    background(30);
    var dt = 0.01;
    rotateY(orbitY);
    rotateX(orbitX);

    var dx = (sigma * (y - x)) * dt;
    x += dx;

    var dy = (x * (rho - z) - y) * dt;
    y += dy;

    var dz = (x * y - beta * z) * dt;
    z += dz;

    points.push({x: (x * zoom), y: (y * zoom), z: (z * zoom)});

    //plot it!
    points.forEach(function(point, i){
        stroke(255);
        translate(point.x, point.y, point.z);
        sphere(1);
        translate(-point.x, -point.y, -point.z);
        if (i + 1 < points.length) {
            mx = (points[i + 1].x - point.x) / 10;
            my = (points[i + 1].y - point.y) / 10;
            mz = (points[i + 1].z - point.z) / 10;
            point.x += mx;
            point.y += my;
            point.z += mz;
        }
        

        //fun bit - make each point move a bit towards the next point
    });
}


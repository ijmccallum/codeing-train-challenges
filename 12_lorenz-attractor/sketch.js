
//pick a random attractor!
//var attractor = Lorenz;
//var attractor = Aizawa;
var attractor = Halvorsen;

//each attractor sets it's own defaults
var zoom = attractor.zoom;
var dt = attractor.dt;
var max_length = attractor.max_length;

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

function mouseDragged(e){
    //orbit!
    orbitY += e.movementX / (width / 2);
    orbitX += e.movementY / (height / 2);
}

function draw() {
    background(30);
    rotateY(orbitY);
    rotateX(orbitX);

    var nextPoint = attractor.nextPoint(dt);

    points.push({x: (nextPoint.x * zoom), y: (nextPoint.y * zoom), z: (nextPoint.z * zoom)});
  
    if (points.length > max_length) {
        //remove the first one
        points.shift();
    }

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


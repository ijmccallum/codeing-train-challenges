

//pick a random attractor!
//var attractor = Lorenz;
//var attractor = Aizawa;
//var attractor = Halvorsen;
//var attractor = Sakarya;
var attractor = GenesioTesi;

//each attractor sets it's own defaults
var zoom = attractor.zoom;
var max_length = attractor.max_length;

var points = [];
var expire = false;

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

    //Getting the point
    if (!expire) {
        //get the next point
        var nextPoint = attractor.nextPoint();

        //if the next point is false, the attractor has expireds
        if (!nextPoint) { expire = true; }
    }

    //updating the array
    if (expire) {
        //slowly collapse the array
        points.shift();
        points.pop();
    } else {
        //add the point to the array
        points.push({x: (nextPoint.x * zoom), y: (nextPoint.y * zoom), z: (nextPoint.z * zoom)});

        if (points.length > max_length) {
            //remove the first one & shift their indexes (like snake)
            points.shift();
        }
    }

    //draw!!
    if (points.length == 0){
        //the array must have collapsed
        expire = false;
        attractor.reset();
    } else {
        //plot it!
        points.forEach(function(point, i){
            stroke(255);
            //move to the point
            translate(point.x, point.y, point.z);
            //draw it
            sphere(1);
            //move back
            translate(-point.x, -point.y, -point.z);

            //move points towards the one further on - this makes them process!
            if (i + 1 < points.length) {
                mx = (points[i + 1].x - point.x) / 10;
                my = (points[i + 1].y - point.y) / 10;
                mz = (points[i + 1].z - point.z) / 10;
                point.x += mx;
                point.y += my;
                point.z += mz;
            }
        });
    }
}
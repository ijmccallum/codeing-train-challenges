var X_PAN = -0.455;
var Y_PAN = 0.1625;
var ZOOM = 0.5;
var MAX_ITERATIONS = 100;

var isZoomingIn = false;
var isZoomingOut = false;

function setup() {
    width = document.documentElement.clientWidth;
    height = document.documentElement.clientHeight;
    width = 600;
    height = 400;
    createCanvas(width, height);
    pixelDensity(1);
    interationSlider = 100;

    zoomInBtn = createButton('Zoom in');
    zoomInBtn.mousePressed(function(){ isZoomingIn = true; });
    zoomInBtn.mouseReleased(function(){ isZoomingIn = false; });

    zoomOutBtn = createButton('Zoom out');
    zoomOutBtn.mousePressed(function(){ isZoomingOut = true; });
    zoomOutBtn.mouseReleased(function(){ isZoomingOut = false; });
    loadPixels();
}

var zoomIn = function(){
    //to zoom in, the value of ZOOM gets smaller at increasingly smaller increments
    ZOOM -= (ZOOM / 10);
    //the number of iterations also has to go up
    MAX_ITERATIONS += 1;
}
var zoomOut = function(){
    ZOOM += (ZOOM / 10);
    MAX_ITERATIONS -= 1;
}

//pan
function mouseDragged(e){
    // movementX / movementY are increments from the last drag eve
    X_PAN -= (e.movementX / (width / 2)) * ZOOM;
    Y_PAN -= (e.movementY / (height / 2)) * ZOOM;
}

function draw() {
    //loads pixel values into a giant array, r1, g1, b1, a1, r2, g2, b2, a2 ...
    loadPixels();
    if (isZoomingIn) {
        zoomIn();
    }
    if (isZoomingOut) {
        zoomOut();
    }

    //loop through all the pixels on the screen - wooft
    for (var x = 0; x < width; x++) {
        for (var y = 0; y < height; y++) {

            //map x and y which are iterating over all the pixels on the screen
            //to the zoomed in set
            var xMapped = map(x, 0, width, (ZOOM * -4) + X_PAN, (ZOOM * 4) + X_PAN); //map x (which goes from 0 to width) to -2 to 2
            var yMapped = map(y, 0, height, (ZOOM * -3) + Y_PAN, (ZOOM * 3) + Y_PAN);
            
            var n = 0;
            
            var a = xMapped;
            var b = yMapped;
            
            while(n < MAX_ITERATIONS){
                var nextGenA = a*a - b*b;
                var nextGenB = 2 * a * b; 

                a = nextGenA + xMapped;
                b = nextGenB + yMapped;

                if (abs(a + b) > 16) {
                    break;
                }

                n++;
            }

            if (n == MAX_ITERATIONS) {
                n = 255;
            } else {
                n = map(n, 0, MAX_ITERATIONS, 0, 1); //normalize it
                n = map(sqrt(n), 0, 1, 0, 255);
            }
            
            var pix = (x + y * width) * 4; // ?
            pixels[pix + 0] = n;
            pixels[pix + 1] = n;
            pixels[pix + 2] = n + 20;
            pixels[pix + 3] = 255;
        }
    }
    updatePixels();
}

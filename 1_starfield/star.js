//global var speed is mapped to the mouse position on the screen
function Star(){
    this.x; this.sx; //sx and sy update over time, x and y don't. 
    this.y; this.sy; //That way the initial x & y can be used to extrapolate sx and sy as z changes
    this.xv; this.xy; //random vectors to add into the mix!
    this.px; this.py; //past x and past y - used to make the line!
    this.justReset; //used to toggle the line off when the partical is reset
    this.z; this.size; //size will be linked to z
    this.color;

    //stars have to init themselves as they'll return once they leave the boundries, and they should know themselves when that happenss
    this.init = function(){
        //Start off at some random point in the screen (it's been moved so 0 is at the center)
        this.x = random(-(width / 2), width / 2);
        this.y = random(-(height / 2), height / 2);
        this.z = random(0, depth); //a random large number
        this.xv = random(-wanderSpeed,wanderSpeed);
        this.yv = random(-wanderSpeed,wanderSpeed);
        this.size = map(this.z, 0, depth, sizeVariance, 0);
        var colorSeed = random(255);
        var thisColorVariance = random(50);
        this.color = color(
            random(colorSeed - thisColorVariance, colorSeed + thisColorVariance),
            random(colorSeed - thisColorVariance, colorSeed + thisColorVariance),
            random(colorSeed - thisColorVariance, colorSeed + thisColorVariance)
        );
        //take a number and map it from one range to another
    }

    this.reset = function(){
        this.init();
        this.z = random(depth, (depth - depth / 4)); //give a bit of variation
        this.justReset = true;
    }

    this.update = function(){
        this.z = this.z - (1 + speed); //z so=lowly decreaces as the depth of the star slowly approaces 0 (the "camera"'s location)

        //if the star has passed behind the camera
        if (this.z <= 0) {
            this.reset();
        }

        //if the star has gone beyond the extent of our "cube" put it back to 0 (because the mouse can rewind)
        if (this.z > depth) {
            this.init();
            this.z = 0;
        }

        this.size = map(this.z, 0, depth, 8, 0);

        this.px = this.sx; this.py = this.sy;
        this.sx = map( (this.x / this.z), 0, 1, 0, width) + this.xv;//the resullt should be between 0 and the width
        this.sy = map( (this.y / this.z), 0, 1, 0, height) + this.yv;//negative numbers should work here too
    }

    this.draw = function(){
        fill(this.color);
        noStroke();
        ellipse(this.sx, this.sy, this.size, this.size);
        if (!this.justReset) {
            stroke(this.color);
            line(this.sx, this.sy, this.px, this.py);
        } else {
            this.justReset = false;
        }
    }
}
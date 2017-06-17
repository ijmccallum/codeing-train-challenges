/*
Each box will generate it's own grid of boxes from which to remove the non-edge boxes
For each layer:
-1 0 1
-1 0 1
-1 0 1

*/


function SpongeBox(x, y, z, size){
    this.x = x, this.y = y, this.z = z; //the position in 3d space
    this.size = size; //cubes, each side is the same :)
    this.fractal = []; //will hold the boxes within this box

    this.draw = function(){
        translate(this.x, this.y, this.z); //move to the box
        box(size);
        translate(-this.x, -this.y, -this.z) //move back to the origin
    }

    //creates the boxes within this box. 3 dimensions, 3 nested arrays
    this.fractalize = function(){
        var fractalBoxes = [];
        var newSize = this.size / 3;
        
        for (var x = -1; x < 2; x++) {
            var px = this.x + (x * (newSize + gap));


            for (var y = -1; y < 2; y++) {
                var py = this.y + (y * (newSize + gap));

                for (var z = -1; z < 2; z++) {
                    var pz = this.z + (z * (newSize + gap));

                    //if 2 or more of x / y / z are 0, it's to be removed!
                    var vectorSum = Math.abs(x) + Math.abs(y) + Math.abs(z);
                    if (vectorSum > 1) {
                        fractalBoxes.push(new SpongeBox(px,py,pz,newSize));
                    }
                }
            }
        }

        return fractalBoxes;
    }
}
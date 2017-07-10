var Halvorsen = (function(){
    var a = 1.4;

    var x = -5;
    var y = 0;
    var z = 0;

    var nextPoint = function(dt){

		var dx = -a * x - 4 * y - 4 * z - y * y;
		var dy = -a * y - 4 * z - 4 * x - z * z;
		var dz = -a * z - 4 * x - 4 * y - x * x; 

        x += (dx * dt);
        y += (dy * dt);
        z += (dz * dt);

        return {
            x:x, y:y, z:z
        }
    }

    return {
        nextPoint: nextPoint,
        zoom: 20,
        dt: 0.005,
        max_length: 3000
    }
})()
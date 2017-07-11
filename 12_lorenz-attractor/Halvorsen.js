var Halvorsen = (function(){
    var a = 1.4;
    var zoom = 20;
    var dt = 0.005;
    var max_length = 3000;

    var x, y, z;
    var reset = function(){
        x = -5;
        y = 0;
        z = 0;
    }


    var nextPoint = function(){

		var dx = -a * x - 4 * y - 4 * z - y * y;
		var dy = -a * y - 4 * z - 4 * x - z * z;
		var dz = -a * z - 4 * x - 4 * y - x * x; 

        x += (dx * dt);
        y += (dy * dt);
        z += (dz * dt);

        if (!isFinite(x * zoom) || !isFinite(y * zoom) || !isFinite(z * zoom)) {
            return false;
        }

        return {
            x:x, y:y, z:z
        }
    }

    return {
        nextPoint: nextPoint,
        zoom: zoom,
        max_length: max_length,
        reset: reset
    }
})()
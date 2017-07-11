var Sakarya = (function(){
    var a = 0.4;
    var b = 0.3;
    var zoom = 20;
    var dt = 0.01;
    var max_length = 3000;

    var x, y, z;
    var reset = function(){
        x = -5;
        y = 0;
        z = 0;
    }


    var nextPoint = function(){

		var dx = -x + y + (y * z);
		var dy = -x - y + (a * x * z);
		var dz = z - (b * x * y); 

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
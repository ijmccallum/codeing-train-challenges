var GenesioTesi = (function(){
    var a = 0.44;
    var b = 1.1;
    var c = 1;
    var zoom = 300;
    var dt = 0.05;
    var max_length = 3000;

    var x, y, z;
    var reset = function(){
        x = -0.99;
        y = 0;
        z = 0;
    }

    var nextPoint = function(points){

		var dx = y;
		var dy = z;
        var dz = - a * z - b * y - x * (1+x);

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
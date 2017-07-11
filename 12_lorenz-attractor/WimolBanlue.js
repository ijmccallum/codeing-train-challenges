var WimolBanlue = (function(){
    var a = 2;
    var zoom = 30;
    var dt = 0.05;
    var max_length = 3000;

    var x, y, z;
    var reset = function(){
        x = -0.99;
        y = 0;
        z = 0;
    }

    var nextPoint = function(points){

		var dx = y - x;
		var dy = -z * Math.tanh(x);
        var dz = -a + (x * y) + y;

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
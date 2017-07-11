var TSUCS1 = (function(){
    var a = 40;
    var b = 0.833;
    var g = 0.5;
    var e = 0.65;
    var zeta = 20;
    var f = 0;

    // var a = 40;
    // var b = 1.833;
    // var g = 55;
    // var e = 0.16;
    // var zeta = 0.65;
    // var f = 20;

    var zoom = 4;
    var dt = 0.001;
    var max_length = 3000;

    var x, y, z;
    var reset = function(){
        x = 0.1;
        y = 0.1;
        z = 0.1;
    }

    var nextPoint = function(points){

		var dx = a * (y - x) + g * x * z;
		var dy = zeta * y - x * z;
        var dz = b * z + x * y - e * (x*x);

        // var dx = a * (y - x) + (e *x*z);
        // var dy = (g * x) - (x * z) + (f * y);
        // var dz = (b * z) + (x * y) - (zeta * x * x);

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
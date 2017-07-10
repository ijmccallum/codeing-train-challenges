var Aizawa = (function(){
    var epsilon = 0.25;
    var alpha = 0.95;
    var gamma = 0.6;
    var delta = 3.5;
    var beta = 0.7;
    var zeta = 0.1;

    var x = 0.1;
    var y = 0;
    var z = 0;



    var a = 0.95, b = 0.7, c = 0.6, d = 3.5, e = 0.25, f = 0.1;

    var nextPoint = function(deltaT){

        // var deltaX = ( ((z - beta) * x) - (delta * y) ) * deltaT;
        // x += deltaX;

        // var deltaY = ( (delta * x) + ((z - beta) * y) ) * deltaT;
        // y += deltaY;

        // //var deltaZ = ( gamma + (alpha * z) - ((z*z*z)/3) - (((x*x) + (y*y)) * (1 + (epsilon * z))) ) * deltaT;
        // var deltaZ = ( gamma + (alpha * z) - ((z*z*z)/3) - (x*x) + epsilon * z * (x*x*x) ) * deltaT;
        // z += deltaZ;

        // var dx = (z - b) * x - d*y;
        // var dy = d * x + (z-b) * y;
        // var dz = c + a*z - (z*z*z)/3 - (x*x) + f * z * (x*x*x);


		var dx = (z-b)*x - d*y;
		var dy = d * x + (z - b) * y;
		var dz = c + a*z - ((z * z * z)/3 ) - ((x * x) + (y * y)) * (1 + e * z) + f * z * (x * x * x); 


        x += (dx * deltaT);
        y += (dy * deltaT);
        z += (dz * deltaT);



        return {
            x:x, y:y, z:z
        }
    }

    return {
        nextPoint: nextPoint,
        zoom: 200,
        dt: 0.01,
        max_length: 2000
    }
})()
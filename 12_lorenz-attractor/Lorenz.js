var Lorenz = (function(){
    var rho = 28;
    var sigma = 10;
    var beta = 8 / 3;
    var zoom = 5;
    var dt = 0.01;
    var max_length = 2000;

    var x, y, z;
    var reset = function(){
        x = 0.5;
        y = 0.5;
        z = 0.5;
    }


    var nextPoint = function(){
        var deltaX = (sigma * (y - x)) * dt;
        x += deltaX;

        var deltaY = (x * (rho - z) - y) * dt;
        y += deltaY;

        var deltaZ = (x * y - beta * z) * dt;
        z += deltaZ;

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
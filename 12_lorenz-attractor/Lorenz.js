var Lorenz = (function(){
    var rho = 28;
    var sigma = 10;
    var beta = 8 / 3;

    var x = 0.5;
    var y = 0.5;
    var z = 0.5;

    var nextPoint = function(delatT){
        var deltaX = (sigma * (y - x)) * delatT;
        x += deltaX;

        var deltaY = (x * (rho - z) - y) * delatT;
        y += deltaY;

        var deltaZ = (x * y - beta * z) * delatT;
        z += deltaZ;

        return {
            x:x, y:y, z:z
        }
    }

    return {
        nextPoint: nextPoint,
        zoom: 5,
        dt: 0.01,
        max_length: 2000
    }
})()
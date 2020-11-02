/*
    A vector is an array that is structured as follows:
    [x, y, z]
*/

var VectorMath = {};

VectorMath.add = function(a, b) { // returns a + b
    return [
        a[0] + b[0],
        a[1] + b[1],
        a[2] + b[2]
    ];
}

VectorMath.sub = function(a, b) { // returns a - b
    return [
        a[0] - b[0],
        a[1] - b[1],
        a[2] - b[2]
    ];
}

VectorMath.mult = function(a, s) { // returns sa, where s is a scalar and a is a vector
    return [
        a[0] * s,
        a[1] * s,
        a[2] * s
    ];
}

VectorMath.dot = function(a, b) { // returns a . b
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

VectorMath.mag = function(a) { // returns ||a||
    return Math.sqrt(a[0] * a[0] + a[1] * a[1] + a[2] * a[2]);
}

VectorMath.norm = function(a) { // returns the normalised vector of a
    return VectorMath.mult(a, 1 / VectorMath.mag(a));
}

// ---- projection code ----

/*
    function project.
    n: normal vector (i.e. the camera direction vector) (normalised),
    d: 'down' vector of camera (normalised),
    r: 'right' vector of camera (normalised),
    o: position vector of camera,
    t: position vector of the target vertex,
    w: width of the screen,
    h: height of the screen,
    scaleFunc: a function which, given the perpendicular distance to the projection plane that the target lies in,
        returns a certain scaling factor which corresponds to how many pixel should a metre on the plane
        be displayed as.
    
    returns 'screen coordinates', [x, y].
*/

var vm = VectorMath;

function project(n, d, r, o, t, w, h, scaleFunc) {
    var disp = vm.sub(t, o);
    var perpDist = vm.dot(disp, n);

    if(perpDist < 0) { return undefined; }

    var dispOnPlane = vm.sub(disp, vm.mult(n, perpDist));
    var screenX = vm.dot(r, dispOnPlane) * scaleFunc(perpDist) + w/2;
    var screenY = vm.dot(d, dispOnPlane) * scaleFunc(perpDist) + h/2;

    return [screenX, screenY];
}

// --- mapping code ----

var Mapping = {};

Mapping.mapPos = function(pos, scale, offset) { // converts spatial coordinates to map coordiates
    return [
        pos[0] * scale + offset[0],
        - pos[1] * scale + offset[1]
    ];
}
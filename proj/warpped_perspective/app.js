var cvs;
var ctx;

var width;
var height;

var theta = 0;
var lambda = 0;
var cosTheta = 1;
var sinTheta = 0;
var cosLambda = 1;
var sinLambda = 0;

var isWDown = false;
var isADown = false;
var isSDown = false;
var isDDown = false;
var speed = 0.07;
var mouseSensitivity = 0.00125;

var vertices = [];

/*for(var x = 0; x < 30; x += 0.5) { // create a 'corridor'
    vertices = vertices.concat([
        [x, -1, 0],
        [x, 1, 0],
        [x, -1, 3.6],
        [x, 1, 3.6]
    ]);
}*/

for(var x = -3; x <= 26; x += 35/29) {
    for(var y = -15; y <= 15; y += 35/30) {
        for(var z = 0; z < 7; z += 3) {
            vertices.push([x,y,z]);
        }
    }
}

/*
for(var x = 20; x <= 26; x += 1) {
    for(var y = -15; y <= 15; y += 1) {
        for(var z = 0; z < 7; z += 3) {
            vertices.push([x,y,z]);
        }
    }
}
*/

var pos = [-6, 0, 1.8];
var dir = [1, 0, 0];
var down = [0, 0, -1];
var right = [0, -1, 0];

var fovFact = Math.tan(50 / 180 * Math.PI)

var scaleFuncs = [
    function(d) { return height / (fovFact * d)},
    function(d) { return height / (fovFact * d + 0.4 * Math.sin(1/0.7 * d))},
    function(d) { return height / (Math.pow(1.5, d) - 1)},
    function(d) { return height * (0.005 * d)}
];

//var scaleFunc = function(d) { return height / (fovFact * d)}; // perspective scaling (FOV approx. 70)
//var scaleFunc = function(d) { return height * (0.005 * d)}; // 'inverse' perspective scaling
var scaleFunc = scaleFuncs[1]; // 'wavy' perspective scaling (FOV approx. 70)
//var scaleFunc = function(d) { return height / (fovFact * d * (Math.sin(d) + 1))};
//var scaleFunc = function(d) { return height / (Math.pow(1.5, d) - 1)}; // exponential perspective scaling
//var scaleFunc = function(d) { return height / Math.pow(d, 0.79)};

var setScaleFunc = function(id) {
    scaleFunc = scaleFuncs[id];
};

var display = function() {
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, width, height);

    for(var i = 0; i < vertices.length; i++) {
        var vertexZgrad = (vertices[i][2]) / 6;
        var vertexXgrad = (vertices[i][0] + 3) / 32;

        ctx.fillStyle = "rgb("+ (vertexXgrad * 255) + "," + (127 + vertexZgrad * 50) + "," + (127 + (1-vertexZgrad) * 50) + ")";
        var screenPos = project(dir, down, right, pos, vertices[i], width, height, scaleFunc);

        if(screenPos) {
            ctx.fillRect(screenPos[0] - 2.5, screenPos[1] - 2.5, 5, 5);
        }
    }
}

window.onload = function() {
    cvs = document.getElementById("cvs");
    ctx = cvs.getContext("2d");
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    width = ctx.canvas.width;
    height = ctx.canvas.height;
    mapCvs = document.getElementById("map");
    mapCtx = mapCvs.getContext("2d");
    var veil = document.getElementById("veil");

    veil.onclick = function() {
        veil.style.display = "none";
    };

    cvs.onclick = function() {
        if(!isMouseLocked) {
            cvs.requestPointerLock = cvs.requestPointerLock ||
                cvs.mozRequestPointerLock ||
                cvs.webkitRequestPointerLock;
            cvs.requestPointerLock();
        } else {
            document.exitPointerLock = document.exitPointerLock ||
                document.mozExitPointerLock ||
                document.webkitExitPointerLock;
            document.exitPointerLock();
        }
    };

    var perspControls = document.getElementById("toolbanner").getElementsByTagName("a");

    for(var i = 0; i < perspControls.length; i++) {
        perspControls[i].onclick = function() {
            var ctl = document.getElementById("toolbanner").getElementsByTagName("a");
            for(var j = 0; j < ctl.length; j++) {
                ctl[j].style.color = "#537528";
            }
            this.style.color = "#d3ff99";
            setScaleFunc([...ctl].indexOf(this));
            display();
        };
    }
    
    document.getElementById("about").onclick = function() {
        document.getElementById("info").style.display = "block";
    };

    document.getElementById("exitinfo").onclick = function() {
        document.getElementById("info").style.display = "none";
    }

    document.addEventListener("pointerlockchange", changeCallback, false);
    document.addEventListener("mozpointerlockchange", changeCallback, false);
    document.addEventListener("webkitpointerlockchange", changeCallback, false);

    display();
    drawMap();
};
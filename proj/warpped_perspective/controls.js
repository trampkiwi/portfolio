var isMouseLocked = false;

var mouseMoveCallback = function(event) {

    var movementX = event.movementX ||
        event.mozMovementX          ||
        event.webkitMovementX       ||
        0,
    movementY = event.movementY ||
        event.mozMovementY      ||
        event.webkitMovementY   ||
        0;

    var newTheta = theta - movementY * mouseSensitivity;
    var newLambda = lambda - movementX * mouseSensitivity;

    theta = Math.abs(newTheta) > Math.PI / 2 ? theta : newTheta;
    lambda = newLambda % (2*Math.PI);

    cosTheta = Math.cos(theta);
    sinTheta = Math.sin(theta);
    cosLambda = Math.cos(lambda);
    sinLambda = Math.sin(lambda);

    dir = [
        cosTheta * cosLambda,
        cosTheta * sinLambda,
        sinTheta
    ];

    down = [
        sinTheta * cosLambda,
        sinTheta * sinLambda,
        - cosTheta
    ];

    right = [
        sinLambda,
        - cosLambda,
        0
    ];

    display();
    drawMap();
};

var changeCallback = function() { // https://www.html5rocks.com/en/tutorials/pointerlock/intro/
    if (document.pointerLockElement === cvs ||
        document.mozPointerLockElement === cvs ||
        document.webkitPointerLockElement === cvs) {
        // Pointer was just locked
        // Enable the mousemove listener
        document.addEventListener("mousemove", mouseMoveCallback, false);
        isMouseLocked = true;
    } else {
        // Pointer was just unlocked
        // Disable the mousemove listener
        document.removeEventListener("mousemove", mouseMoveCallback, false);
        isMouseLocked = false;
    }
}

document.onkeydown = function(event) {
    if(event.isComposing || event.keyCode == 229) { return; }
    else if(event.keyCode == 87) { isWDown = true; }
    else if(event.keyCode == 65) { isADown = true; }
    else if(event.keyCode == 83) { isSDown = true; }
    else if(event.keyCode == 68) { isDDown = true; }
};

document.onkeyup = function(event) {
    if(event.isComposing || event.keyCode == 229) { return; }
    else if(event.keyCode == 87) { isWDown = false; }
    else if(event.keyCode == 65) { isADown = false; }
    else if(event.keyCode == 83) { isSDown = false; }
    else if(event.keyCode == 68) { isDDown = false; }
};

async function move() {
    var flag = false;

    if(isWDown && !isSDown) {
        pos = vm.add(pos, vm.mult([cosLambda, sinLambda, 0], speed));
        flag = true;
    } else if(isSDown && !isWDown) {
        pos = vm.add(pos, vm.mult([-cosLambda, -sinLambda, 0], speed));
        flag = true;
    }
    
    if(isADown && !isDDown) {
        pos = vm.add(pos, vm.mult([-sinLambda, cosLambda, 0], speed));
        flag = true;
    } else if(isDDown && !isADown) {
        pos = vm.add(pos, vm.mult([sinLambda, -cosLambda, 0], speed));
        flag = true;
    } 

    if(flag) { display(); drawMap(); }

    setTimeout(move, 10);
}

move();
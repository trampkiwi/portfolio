var mapCvs;
var mapCtx;

var mapScale = 100 / 23; // the number of pixels per metre in the map
var mapOffset = [50, 100]; // the [x, y] offset, in pixels. this is the point where [0,0] on the space coordinate will be mapped to.

var boxX = 29 * mapScale; // the dimension of the 'boxes' placed in the space, with map scaling.
var boxY = 30 * mapScale;

var posOnMap;
var arrowVec;

function drawMap() {
    mapCtx.fillStyle = "#000000";
    mapCtx.fillRect(0, 0, 200, 200);

    /*var box1Corner = Mapping.mapPos([-3, 15, 0], mapScale, mapOffset);
    var box2Corner = Mapping.mapPos([20, 15, 0], mapScale, mapOffset);
    mapCtx.fillStyle = "#007F7F";
    mapCtx.fillRect(box1Corner[0], box1Corner[1], boxX, boxY);
    mapCtx.fillStyle = "#FF7F7F";
    mapCtx.fillRect(box2Corner[0], box2Corner[1], boxX, boxY);*/

    var boxCorner = Mapping.mapPos([-3, 15, 0], mapScale, mapOffset);
    var grd = mapCtx.createLinearGradient(0, 0, boxX, 0);
    grd.addColorStop(0, "#007F7F");
    grd.addColorStop(1, "#FF7F7F");
    mapCtx.fillStyle = grd;
    mapCtx.fillRect(boxCorner[0], boxCorner[1], boxX, boxY);
    
    posOnMap = Mapping.mapPos(pos, mapScale, mapOffset);
    mapCtx.fillStyle = "#FFFFFF";
    mapCtx.fillRect(posOnMap[0] - 2.5, posOnMap[1] - 2.5, 5, 5);

    arrowVec = vm.mult(dir, 30);
    mapCtx.strokeStyle = "#FF0000";
    mapCtx.beginPath();
    mapCtx.moveTo(posOnMap[0], posOnMap[1]);
    mapCtx.lineTo(posOnMap[0] + arrowVec[0], posOnMap[1] - arrowVec[1]);
    mapCtx.stroke();
}


/**
 * Created by pierreportejoie on 17/09/2016.
 */

var refCanard = document.getElementById('refCanvas');
var refcitiX = refCanard.getContext("2d");

var mainCanard = document.getElementById('mainCanvas');
var maincitixxX = mainCanard.getContext("2d");

// F  A  N  C  Y
for (var i=1;i<7;i++){
    for (var j=1;j<7;j++){
        refcitiX.fillStyle = 'rgb(' + Math.floor(255-30*i) + ',' + Math.floor(255-30*j) + ',150)';
        refcitiX.fillRect(j*25,i*25,25,25);
    }
}

var canvas = new fabric.Canvas('mainCanvas');

//canvas.renderOnAddRemove = false;

var imgElement = document.getElementById('refCanvas');

var imgInstance = new fabric.Image(imgElement, {
    top: mainCanard.width/2-refCanard.width/2-400,
    left: mainCanard.height/2-refCanard.height/2-400,
    /*width: 100,
    height: 100*/
});


canvas.add(imgInstance);

imgInstance.centeredRotation = false;
//imgInstance.centeredScaling = true;

clones=[];
clones[1] = imgInstance;

function cloneClones() {
    for (i=2; i<25*2; i++){


        if (window.Worker){
            var myWorker = new Worker("worker.js");
            myWorker.postMessage(canvasData);

            myWorker.onmessage = function(e) {
                drawGrid(mainCanvas, e.data)
            }
        }


        if (clones[i] != undefined) clones[i].remove();
        var previousClone = clones[i-1];
        var clone = fabric.util.object.clone(previousClone);
        //clone.top = previousClone.top + 5;
        //clone.left = previousClone.left + 5;
        clone.rotate(previousClone.angle-16);
        //clone.angle = previousClone.angle - 30;
        //clone.width = previousClone.width*(1+0.02);
        //clone.height = previousClone.height*(1+0.02);
        //clone.scale(1/i);

        //perfs
        clone.selectable = false;
        clone.hasControls = false;
        clone.hasBorders = false;
        clone.hasRotatingPoint = false;

        clone.filters.push(
            //new fabric.Image.filters.Brightness({brightness: 5})
            //new fabric.Image.filters.Tint({color: '#'+Math.floor(Math.random()*16777215).toString(16), opacity: 0.1})
        );

        clone.applyFilters(canvas.renderAll.bind(canvas));

        canvas.add(clone);
        canvas.moveTo(clone,-i); //send backwards
        clones[i] = clone;
    }
}

function copyToTop() {
    canvas.deactivateAll();
    canvas.renderAll();

    var ctx = canvas.getContext("2d");
    var myImageData = ctx.getImageData(0, 0, 1400, 1400);

    var tempCanvas = document.createElement('canvas');
    tempCanvas.width = 1400;
    tempCanvas.height = 1400;
    var tempCtx = tempCanvas.getContext("2d");

    tempCtx.putImageData(myImageData,0,0);

    refcitiX.clearRect(0,0,200,200);
    //refcitiX.scale(1/7,1/7);
    refcitiX.drawImage(tempCanvas,0,0,1400,1400,0,0,200,200);

    canvas.setActiveObject(clones[1]);
}


canvas.on('object:modified', function(e) {
    cloneClones();
});
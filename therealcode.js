/**
 * Created by pierreportejoie on 16/09/16.
 */

/**
 * ˓(ᑊᘩᑊ⁎)﻿ y-your donger senpai˓(ᑊᘩᑊ⁎)﻿
 *
 * @param {string} orig - original image (or canvas or w/e)
 * @param {int} x - x coord of orig start
 * @param {int} y - y coord of orig start
 * @param {int} dx - x length of orig copy
 * @param {int} dy - y length of orig copy
 * @param {context} arrivalCONTEXT - end canvas image w/E CONTXTTT
 * @param {int} px - x coord of end start
 * @param {int} py - y coord of end start
 *
 * |༼ʘ ل͜ ʘ༽| IT'S SPLENDID |༼ʘ ل͜ ʘ༽|
 *
 */

function copy(orig,x,y,dx,dy,arrivalCONTEXT,px,py,matrix)
{
    var tempCanvas = document.createElement('canvas');
    tempCanvas.width = 4*dx;
    tempCanvas.height = 4*dy;
    var tempContext = tempCanvas.getContext('2d');
    //tempContext.translate((dx-x)/2,(dy-y)/2);

    tempContext.translate(2*dx,2*dy);
    tempContext.translate((dx-x)/2,(dy-y)/2);
    tempContext.rotate(matrix);
    tempContext.translate(-(dx-x)/2,-(dy-y)/2);
    tempContext.drawImage(orig, x, y, dx, dy, 0, 0, dx, dy);

    //matrix=[1,0.5,-0.5,1,30,10];

    //tempContext.transform.apply(tempContext, matrix);


    var img = new Image();
    img.src = tempCanvas.toDataURL('image/png');

    arrivalCONTEXT.globalCompositeOperation ="destination-over";
    arrivalCONTEXT.drawImage(img, px-2*dx, py-2*dy);
}


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

copy(refCanard,25,25,175,175,maincitixxX,275,275,0*Math.PI/180);
//copy(refCanard,25,25,175,175,maincitixxX,0,0,45*Math.PI/180);
//copy(refCanard,25,25,175,175,maincitixxX,0,0,90*Math.PI/180);
//copy(refCanard,25,25,175,175,maincitixxX,0,0,135*Math.PI/180);
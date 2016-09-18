/**
 * Created by pierreportejoie on 17/09/2016.
 */

onmessage = function(e) {
    e = e.data;
    var canvasData = e.data;
    var w = e.width;
    var h = e.height;

    /*console.log(canvasData);
     console.log(w);
     console.log(h);*/

    splitImage(canvasData,w,h)
};
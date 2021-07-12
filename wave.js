
// Make an instance of two and place it on the page.

var two = new Two({
        // width:1000,
        // height:1000,
        fullscreen: true,
        autostart: true
}).appendTo(document.body);


var debug=false;
var limit=Math.min($(document).width(),$(document).height())/10;
if(debug){console.log(limit)};
var x= limit*5;
var y= limit*5;
var side= limit*3;

// wavelength (lambda) in pixels
var l= 20;

// frequency, in waves per frame
var f=0.1;

// wavespeed in pixels per frame
var v=l*f;

var rectangle = two.makeRectangle(x, y, 2*side, 2*side);
rectangle.noFill();
rectangle.stroke='white';
if(debug){console.log("outline done")};



//source 1, poitioned in top left
var x1=x-side/2;
var y1=y-side/2;

//source 2, positioned in bottom right
var x2=x+side/2;
var y2=y+side/2;

//dimensions of the buttons for the handle
var handlewidth= 10;
var handlheight= 40;

//source 1 x handle
var x1handle = two.makeRectangle(x1,y+side+handlheight/2+3,handlewidth,handlheight);
x1handle.fill='red';


//source 1 y handle
var y1handle = two.makeRectangle(x-side-handlheight/2-3,y1,handlheight,handlewidth);
y1handle.fill='red';

//source 2 x handle
var x2handle = two.makeRectangle(x2,y+side+handlheight/2+3,handlewidth,handlheight);
x2handle.fill='yellow';

//source 2 y handle
var y2handle = two.makeRectangle(x-side-handlheight/2-3,y2,handlheight,handlewidth);
y2handle.fill='yellow';



//create a color grid to represent wave intensity
var array= [];
var s=limit/100*7;
for(i=x-side; i<x+side;  i+=s){
        for(j=y-side; j<y+side; j+=s){
                array[i*2*side+j]=two.makeRectangle(i+s/2,j+s/2,s,s);
        }
}
if(debug){console.log("array made")};


//make the handles moveable
two.update();
var x1moving=false;
x1handle._renderer.elem.addEventListener('mousedown', function(e) {
        x1moving=true;
}, false);
window.addEventListener('mousemove', function(e) {
        if(x1moving==true){
               x1handle.translation.set(Math.max(Math.min(e.clientX,x+side),x-side),y+side+handlheight/2+3);
               x1=Math.max(Math.min(e.clientX,x+side),x-side);
        }
}, false);
window.addEventListener('mouseup', function(e){
        x1moving=false;
}, false);

var x2moving=false;
x2handle._renderer.elem.addEventListener('mousedown', function(e) {
        x2moving=true;
}, false);
window.addEventListener('mousemove', function(e) {
        if(x2moving==true){
               x2handle.translation.set(Math.max(Math.min(e.clientX,x+side),x-side),y+side+handlheight/2+3);
               x2=Math.max(Math.min(e.clientX,x+side),x-side);
        }
}, false);
window.addEventListener('mouseup', function(e){
        x2moving=false;
}, false);

var y1moving=false;
y1handle._renderer.elem.addEventListener('mousedown', function(e) {
        y1moving=true;
}, false);
window.addEventListener('mousemove', function(e) {
        if(y1moving==true){
               y1handle.translation.set(x-side-handlheight/2-3,Math.max(Math.min(e.clientY,y+side),y-side));
               y1=Math.max(Math.min(e.clientY,y+side),y-side);
        }
}, false);
window.addEventListener('mouseup', function(e){
        y1moving=false;
}, false);

var y2moving=false;
y2handle._renderer.elem.addEventListener('mousedown', function(e) {
        y2moving=true;
}, false);
window.addEventListener('mousemove', function(e) {
        if(y2moving==true){
               y2handle.translation.set(x-side-handlheight/2-3,Math.max(Math.min(e.clientY,y+side),y-side));
               y2=Math.max(Math.min(e.clientY,y+side),y-side);
        }
}, false);
window.addEventListener('mouseup', function(e){
        y2moving=false;
}, false);


//fill the color grid
var color;
//timer, for the time dependency of the waves
var t= two.frameCount;
//attenuation, should be a small negative number
var a= -0.001;
two.bind('update', function(frameCount){
        t=two.frameCount;
        for(i=x-side; i<x+side;  i+=s){
                for(j=y-side; j<y+side; j+=s){
                        color=(getPhase(x1,y1,i,j,t)*Math.pow(Math.E,a*distance(x1,y1,x,y)/side)+getPhase(x2,y2,i,j,t)*Math.pow(Math.E,a*distance(x2,y2,x,y)/side)+2)*255/2;
                        //console.log(color);
                        array[i*2*side+j].fill="rgb(0,0,"+color+")";
                }
        }
});


var pattern= two.makeGroup(array);
//pattern.fill='blue';
pattern.noStroke();


function distance(xs,ys,x,y){
        return Math.sqrt((xs-x)**2+(ys-y)**2);
}

function getPhase(xs,ys,x,y,t){
        return Math.sin(2*Math.PI*(distance(xs,ys,x,y)/l+f*t));
}

function inHandle(x,y){
        console.log(x,y,x1handle.x,x1handle.y);
        if((x>x1handle.origin.x-handlewidth)&&(x<x1handle.origin.x+handlewidth)&&(y>x1handle.origin.y-handleheight)&&(y<x1handle.origin.y-handleheight)){
                return x1handle;
        }
        return null;
}
if(debug){console.log(two.playing)};
two.play();
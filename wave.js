
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

var styles = {
        size: limit/100*15
};


//dimensions of the buttons for the handle
var handlewidth= limit/10;
var handlheight= limit/10*4;

// wavelength (lambda) in pixels
var l= 20;
var lambdaMessage= two.makeText('wavelength',limit*9,limit*2,styles);
lambdaMessage.stroke= 'purple';
lambdaMessage.fill= 'purple';
var lamdaScale= two.makeRectangle(limit*9,limit*2.2,2*handlheight, handlewidth/2);
var lamdaHandle= two.makeRectangle(limit*9,limit*2.4,handlewidth,handlheight);
lamdaScale.fill=lamdaHandle.fill='purple';



// frequency, in waves per frame
var f=0.1;
var fMessage= two.makeText('frequency',limit*9,limit*3,styles);
fMessage.stroke= 'green';
fMessage.fill= 'green';
var fScale= two.makeRectangle(limit*9,limit*3.2,2*handlheight, handlewidth/2);
var fHandle= two.makeRectangle(limit*9,limit*3.4,handlewidth,handlheight);
fScale.fill=fHandle.fill='green';


// wavespeed in pixels per frame
var v=l*f;

//variables to turn on dippers
var on1=1;
var buttonMessage= two.makeText("Turn Dippers On and Off",limit*9,limit*4.7,styles);
var button1= two.makeRectangle(limit*8.7,limit*5, handlewidth*2, handlewidth*2);
button1.fill='red';
var on2=1;
var button2= two.makeRectangle(limit*9.3,limit*5, handlewidth*2, handlewidth*2);
button2.fill='yellow';

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

var lmoving=false;
lamdaHandle._renderer.elem.addEventListener('mousedown', function(e) {
        lmoving=true;
}, false);
window.addEventListener('mousemove', function(e) {
        if(lmoving==true){
                lx=Math.max(Math.min(e.clientX,limit*9+handlheight),limit*9-handlheight)
                lamdaHandle.translation.set(lx,limit*2.4);
                l=(lx-(9*limit-handlheight))/(2*handlheight)*99+1;
        }
}, false);
window.addEventListener('mouseup', function(e){
       lmoving=false;
       if(debug){console.log(l)};
}, false);

var fmoving=false;
fHandle._renderer.elem.addEventListener('mousedown', function(e) {
        fmoving=true;
}, false);
window.addEventListener('mousemove', function(e) {
        if(fmoving==true){
                fx=Math.max(Math.min(e.clientX,limit*9+handlheight),limit*9-handlheight)
                fHandle.translation.set(fx,limit*3.4);
                f=(fx-(9*limit-handlheight))/(2*handlheight)*0.5;
        }
}, false);
window.addEventListener('mouseup', function(e){
       fmoving=false;
       if(debug){console.log(f)};
}, false);

button1._renderer.elem.addEventListener('click', function(e){
        if(on1==1){
                on1=0;
                button1.opacity=0.5;
        }
        else if(on1==0){
                on1=1;
                button1.opacity=1;
        }
},false);

button2._renderer.elem.addEventListener('click', function(e){
        if(on2==1){
                on2=0;
                button2.opacity=0.5;
        }
        else if(on2==0){
                on2=1;
                button2.opacity=1;
        }
},false);


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
var a= -0.5;


two.bind('update', function(frameCount){
        t=two.frameCount;
        for(i=x-side; i<x+side;  i+=s){
                for(j=y-side; j<y+side; j+=s){
                        color=(on1*getPhase(x1,y1,i,j,t)*Math.pow(Math.E,a*distance(x1,y1,x,y)/side)+on2*getPhase(x2,y2,i,j,t)*Math.pow(Math.E,a*distance(x2,y2,x,y)/side)+2)*255/(2);
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
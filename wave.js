
// Make an instance of two and place it on the page.

var two = new Two({
        // width:1000,
        // height:1000,
        fullscreen: true,
        autostart: true
}).appendTo(document.body);


var debug=true;

var x= 500;
var y= 500;
var side= 300;

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
var x1handle = two.makeRectangle(x1,y+side+handlheight/2+3,handlewidth,handlheight).fill='red';

//source 1 y handle
var y1handle = two.makeRectangle(x-side-handlheight/2-3,y1,handlheight,handlewidth).fill='red';

//source 2 x handle
var x2handle = two.makeRectangle(x2,y+side+handlheight/2+3,handlewidth,handlheight).fill='yellow';

//source 2 y handle
var y2handle = two.makeRectangle(x-side-handlheight/2-3,y2,handlheight,handlewidth).fill='yellow';



//create a color grid to represent wave intensity
var array= [];
var s=12;
for(i=x-side; i<x+side;  i+=s){
        for(j=y-side; j<y+side; j+=s){
                array[i*2*side+j]=two.makeRectangle(i+s/2,j+s/2,s,s);
        }
}
console.log("array made");

//fill the color grid
var color;
//timer, for the time dependency of the waves
var t= two.frameCount;

two.bind('update', function(frameCount){
        t=two.frameCount;
        for(i=x-side; i<x+side;  i+=s){
                for(j=y-side; j<y+side; j+=s){
                        color=255+255*(getPhase(x1,y1,i,j,t)+getPhase(x2,y2,i,j,t))/5;
                        //console.log(color);
                        array[i*2*side+j].fill="rgb(0,0,"+color+")";
                }
        }
});

//allow handles to be moved
var mouse= new Two.Vector();
if(debug){console.log(mouse.x,mouse.y)};
$(window)
        .bind('mousedown', function(e) {
        mouse.set(e.clientX, e.clientY);
        var handle= inHandle(mouse.x,mouse.y);
        if(debug){console.log("mousedown")};
        if(handle){
        $(window)
                .bind('mousemove', dragHandle(handle))
                .bind('mouseup', dragEnd);
                if(debug){console.log("handle selected")};
        }
})
var dragHandle = function(handle) {
        handle.translation.set(mouse);
};
var dragEnd = function(e) {
        $(window)
                .unbind('mousemove', drag)
                .unbind('mouseup', dragEnd);
};
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
        if((x>x1handle.origin.x-handlewidth)&&(x<x1handle.origin.x+handlewidth)&&(y>x1handle.origin.y-handleheight)&&(y<x1handle.origin.y-handleheight)){
                return x1handle;
        }
        return null;
}
if(debug){console.log(two.playing)};
two.play();
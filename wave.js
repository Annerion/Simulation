
// Make an instance of two and place it on the page.

var two = new Two({
        // width:1000,
        // height:1000,
        fullscreen: true,
        autostart: true
}).appendTo(document.body);

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
console.log("outline done")

//source 1, poitioned in top left
var x1=x-side/2;
var y1=y-side/2;

//source 2, positioned in bottom right
var x2=x+side/2;
var y2=y+side/2;



//create a color grid to represent wave intensity
var array= [];
var s=7;
for(i=x-side; i<x+side;  i+=s){
        for(j=y-side; j<y+side; j+=s){
                array[i*2*side+j]=two.makeRectangle(i+s/2,j+s/2,s,s);
        }
}

//fill the color grid
var color;
//timer, for the time dependency of the waves
var t= two.frameCount;

two.bind('update', function(frameCount){
        t=two.frameCount;
        for(i=x-side; i<x+side;  i+=s){
                for(j=y-side; j<y+side; j+=s){
                        color=255+255*(getPhase(x1,y1,i,j,t)+getPhase(x2,y2,i,j,t))/4;
                        console.log(color);
                        array[i*2*side+j].fill="rgb(0,0,"+color+")";
                }
        }
});

console.log("array made");
var pattern= two.makeGroup(array);
//pattern.fill='blue';
pattern.noStroke();


function distance(xs,ys,x,y){
        return Math.sqrt((xs-x)**2+(ys-y)**2);
}

function getPhase(xs,ys,x,y,t){
        return Math.sin(2*Math.PI*(distance(xs,ys,x,y)/l+f*t));
}
console.log(two.playing);
two.play();



// Make an instance of two and place it on the page.

var two = new Two({
        width:1000,
        height:1000,
        fullscreen: true,
        autostart: true
}).appendTo(document.body);

var x= 250;
var y= 250;
var side= 300;


var rectangle = two.makeRectangle(x, y, side, side);
rectangle.noFill();
rectangle.stroke='white';


//source 1, poitioned in top left
var x1=x-side/2;
var y1=y-side/2;

//source 2, positioned in bottom right
var x2=x+side/2;
var y2=y+side/2;

//timer, for the time dependency of the waves
var t= two.frameCount;

var pattern= two.makeGroup();

for(i=x-side; i<x+side;  i++){
        for(j=y-side; j<y+side; j++){
                pattern.add(two.makeRectangle(i,j,1,1));
        }
}
pattern.fill='blue';
pattern.noStroke();
two.update();
two.pause();






// Make an instance of two and place it on the page.

var two = new Two({
        fullscreen: true,
        autostart: true
}).appendTo(document.body);

var rectangle = two.makeRectangle(72, 100, 50, 50);

//circle.fill = '#FF8000';
//circle.stroke = 'orangered'; // Accepts all valid css color
//circle.linewidth = 5;

two.update();
var texture = two.makeTexture('https://i.imgur.com/DRmh6S9.jpg');

rectangle.fill = texture;
texture.scale = 0.125;


two.update();



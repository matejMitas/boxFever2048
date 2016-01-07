// function getShape (type) {
//   var prop;
//   var radius = 5;
  
//   function isPointPoint () {
//     return prop = {
//         from: [5,5],
//         to: [5 + radius, 5 + radius]
//     }
//   }
//   function isCenterRadius () {
//     return prop = {
//         center: [6,6],
//         radius: radius
//     }
//   }

//   var shapes = {
//     'rect': isPointPoint,
//     'round': isPointPoint,
//     'circle': isCenterRadius,
//     'star': isCenterRadius,
//     'ellipse': isCenterRadius,
//     'polygon':isCenterRadius
//   };

//   return shapes[type]();
// }

// var shape = getShape('round');
// console.log(shape);

var path = new Path.Rectangle({
	point: [75, 75],
	size: [75, 75],
	fillColor: 'yellow'
});

var path2 = new Path.Rectangle({
	point: [100, 100],
	size: [75, 75],
	fillColor: 'cyan'
});


var path3 = new Path.Rectangle({
	point: [125, 125],
	size: [75, 75],
	fillColor: 'magenta'
});

console.log();


/*=============================================
=            Hierarchy                        =
=============================================*/

/*var surroundings = new Group([path, path3]);
var main = new Group([path2]);

main.bringToFront();*/

/*=============================================
=            Animations Events                =
=============================================*/


/*console.log(project.activeLayer);
console.log(surroundings);*/

// Event on path
/*path.on({
    mouseenter: function(event) {
        this.fillColor = 'red';
    },
    mouseleave: function(event) {
        this.fillColor = 'yellow';
    }
});

startAnim();

function startAnim() {
	paper.view.attach('frame', anim);
	console.log("animation start");
}

function stopAnim() {
	paper.view.detach('frame', anim);	
	console.log("animation stop");
}

function anim(event) {
	for (var j = 0, l = surroundings.children.length; j < l; j++) {
        var item = surroundings.children[j];
            item.rotate(item.bounds.x / view.size.height);
    }  
	path3.rotate(path3.bounds.x / view.size.height);
	console.log("animation running");
}

function anim2(event) {
	for (var j = 0, l = surroundings.children.length; j < l; j++) {
        var item = surroundings.children[j];
            item.fillColor.hue += 10;
    }  
	path3.fillColor.hue += 10;
}

setTimeout(function() {
	paper.view.attach('frame', anim2);
}, 1000);*/


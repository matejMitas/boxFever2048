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


/* -------------------------------- 

Backup

-------------------------------- */

function drawDialog(array, ret) {
     var bounding = new Path.Rectangle({
          from: [15,15],
          to: [view.size.width - 15, view.size.height - 15],
          fillColor: '#2bff9b',
    });
    
    for (var i = 0; i < array.length; i++) { 
        var cons = (i * 75);
        var text = new PointText(new Point(view.center.x, view.center.y + cons));
        text.fillColor = 'black';
        text.content = array[i];
        text.fontSize = 50;
        text.fontFamily = 'vcr';
        text.justification = 'center';
    }
    
     if (ret) {
        return bounding; 
     }
}


drawDialog(['KLIKEJTE NA', 'CERVENY CTVEREC'], false);

setTimeout(function() {
  clearWholeLayer();
  drawGame(true);
  startAnim();
}, 1000);

var counter = 0;
var timer = 0;
var s = document.getElementById('s');
s.innerHTML = counter; 

function startAnim() {
	paper.view.attach('frame', anim);
	console.log("animation start");
}

function stopAnim() {
	paper.view.detach('frame', anim);	
	console.log("animation stop");
}

function anim(event) {
	for (var j = 1, l = project.activeLayer.children.length - 1; j < l; j++) {
        var item = project.activeLayer.children[j];
           item.fillColor.hue += 10;
           item.rotate(item.bounds.x / view.size.height);
        }
    var item = project.activeLayer.firstChild;
    item.rotate(2);   
        
   timer = event.time;
   if (timer > 15) {
      drawDialog(['PROHRALI JSTE!', 'JSTE POMALI'],true);
   }
} 
	    
function onMouseDown(event) {

        for (var j = 0, l = project.activeLayer.children.length - 1; j < l; j++) {
            var item = project.activeLayer.children[j];
            
            item.onMouseDown = function(event) {
                if (this.id == 5 && counter < 5) {
                    clearLayer();
                    drawGame(false);
                    counter++;
                    s.innerHTML = counter; 
                    console.log(this.id);
                } else if (counter == 5) {;
                    console.log(timer);
                    stopAnim();
                    clearWholeLayer();
                    drawDialog(['VYHRALI JSTE!', 'VAS CAS ' + timer.toFixed(3) + "s"],true);
                }
        }
    }    
}

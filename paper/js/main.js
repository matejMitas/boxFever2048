/* global randomNumber */
/* global randomColor */

function dimensions() {
  var gap = 15;
  var radius = randomNumber(40,100);
  var x = randomNumber(radius + gap, view.size.width - radius - gap);
  var y = randomNumber(radius + gap, view.size.height - radius - gap);
  return [x, y, radius];
}

function getShape(props) {
    var shape;

    // mode selection
    if (typeof(props)==='undefined') { props = randomProps()};

    // create random params
    function randomProps() {     
      var props = {};
      var shapes = ['rect','circle','round','star', 'ellipse', 'polygon'];
      
      //type of shape
      props['shape'] = shapes[randomNumber(0, shapes.length - 1)];
      props['color'] = randomColor();
      props['opacity'] = .5;

      var dims = dimensions();

      if (props['shape'] == 'rect' || props['shape'] == 'round') {
        props['from'] = [dims[0],dims[1]];
        props['to'] = [dims[0] + dims[2], dims[1] + dims[2]];
      }

      if (props['shape'] == 'round') {
        props['radius'] = dims[2] / 10;
      }

      if (props['shape'] == 'circle' || props['shape'] == 'star' || props['shape'] == 'ellipse' || props['shape'] == 'polygon') {
        props['center'] = [dims[0],dims[1]];
        props['radius'] = dims[2];
      }

      if (props['shape'] == 'ellipse') {
        props['center'] = [dims[0],dims[1]];
        props['radius'] = [dims[2] * Math.random(), dims[2] * Math.random()];
      }

      if (props['shape'] == 'polygon') {
        props['sides'] = randomNumber(3,8);
      }

      if (props['shape'] == 'star') {
        props['points'] = randomNumber(10,20);
        props['radius2'] = dims[2] + randomNumber(5,20);
      }

      return props;      
    }

    generate(props);

    function generate(props) {

      // rectangular based shapes
      if (props['shape'] == 'rect') {
        shape = new Path.Rectangle({
          from: props['from'],
          to: props['to'],
          fillColor: props['color'],
          opacity: props['opacity']
        });
      } else if (props['shape'] == 'round') {
        shape = new Path.Rectangle({
          from: props['from'],
          to: props['to'],
          radius: props['radius'],
          fillColor: props['color'],
          opacity: props['opacity']
        });
      }  

      // circular based shapes

      else if (props['shape'] == 'circle') {
        shape = new Path.Circle({
          center: props['center'],
          radius: props['radius'],
          fillColor: props['color'],
          opacity: props['opacity']
        });

      } else if (props['shape'] == 'ellipse') {
        shape = new Path.Ellipse({
          center: props['center'],
          radius: props['radius'],
          fillColor: props['color'],
          opacity: props['opacity']
        });  
      } else if (props['shape'] == 'star') {
         shape = new Path.Star({
           center: props['center'],
           points: props['points'],
           radius1: props['radius'],
           radius2: props['radius2'],
           fillColor: props['color'],
           opacity: props['opacity']
         });      
      } else if (props['shape'] == 'polygon') {
         shape = new Path.RegularPolygon({
            center: props['center'],
            sides: props['sides'],
            radius: props['radius'],
            fillColor: props['color'],
            opacity: props['opacity']
          });     
       }
      
      return shape;
    }
    return shape;
}








function clearLayer() {
    project.activeLayer.removeChildren(1);
}

function clearWholeLayer() {
    project.activeLayer.removeChildren();
}

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








function drawGame(init) {

    if (init == false) {
        var shape = project.activeLayer.firstChild;
        shape.position.x = dimensions()[0];
        shape.position.y = dimensions()[1];
        shape.bringToFront();
    } else if (init == true) {
        var x = dimensions()[0];
        var y = dimensions()[1];
        var sampleObj = {
          'shape': 'rect',
          'from': [x, y],
          'to': [x + 50, y + 50],
          'color': 'red'
        }

        var arr = [getShape(sampleObj)];
    }
      
    var p = project.activeLayer;

    var arr = [project.activeLayer.firstChild];
    
    function check(random, arr) {
        for (var i = 0; i < arr.length; i++) {
            if (random.intersects(p.children[i])) {
                random.remove();
                return false;
            }
        }
        arr.push(random);
    }	
    
    for (var i = 0; i < 100; i++) {
        var random = getShape();
        check(random, arr);
    }
    var bounding = new Path.Rectangle({
          from: [15,15],
          to: [view.size.width - 15, view.size.height - 15],
          strokeColor: '#2bff9b',
          strokeWidth: 2
    });

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
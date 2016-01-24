/* -------------------------------- 

Helper Functions

-------------------------------- */



function clearLayer() {
    project.activeLayer.removeChildren(1);
}

function clearWholeLayer() {
    project.activeLayer.removeChildren();
}


/* -------------------------------- 

My code

-------------------------------- */


function Game(param) {
    this.param = param;
}

Game.prototype = {
    drawShapes: function(maxTries) {

        var x = dimensions()[0];
        var y = dimensions()[1];
        var sampleObj = {
            'shape': 'rect',
            'from': [x, y],
            'to': [x + 50, y + 50],
            'color': 'red'
        }

        var shapes = [this.generateShape(sampleObj)];

        // the magic happens here

        for (var i = 0; i < maxTries; i++) {
            var shapeToTest = this.generateShape();
            this.checkOverlap(shapeToTest, shapes);
        }

        // deprecated!!!!!

        var bounding = new Path.Rectangle({
              from: [15,15],
              to: [view.size.width - 15, view.size.height - 15],
              strokeColor: '#2bff9b',
              strokeWidth: 2
        });
    },

    generateRandomProps: function() {  

        /* -------------------------------- 
    
        blueprint for an props object

        var props = {
            center: [x,y],
            color: "",
            opacity: num,
            radius: [x,y],
            shape: ""
        }
    
        -------------------------------- */


        // TODO: Make props generating more abstract

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
    }, 

    generateShape: function(props) {

        // TODO: zjistit, jak kurva funguje ten undefined!

        if (typeof(props) === 'undefined') { 
            props = this.generateRandomProps();
        }

        var shape;
        
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
    }, 

    checkOverlap: function (shapeToTest, shapes) {
        for (var i = 0; i < shapes.length; i++) {
            if (shapeToTest.intersects(project.activeLayer.children[i])) {
                shapeToTest.remove();
                return false;
            }
        }
        shapes.push(shapeToTest);
    }
}

var ball = new Game("päťsto");
ball.drawShapes(50);


function randomNumber(min, max) {
  return Math.ceil(Math.random() * (max - min) + min);
}

function randomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function dimensions() {
  var gap = 50;
  var radius = randomNumber(40,100);
  var x = randomNumber(radius + gap, window.innerWidth - radius - gap);
  var y = randomNumber(radius + gap + 50, window.innerHeight - radius - gap - 50);
  return [x, y, radius];
}
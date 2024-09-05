var canvas = document.getElementById("game_window");
var ctx = canvas.getContext("2d");
var x=500
var y=500
var dx=2
var dy=-2

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(x, y, 100, 0, Math.PI * 2);
    ctx.fillStyle = "#000000";
    ctx.fill();
    ctx.closePath();
    x+=dx
    y+=dy
    // Check for canvas boundary collisions and reverse direction if necessary
    if(x + dx > canvas.width - 10 || x + dx < 10) {
        dx = -dx;
    }
    if(y + dy > canvas.height - 10 || y + dy < 10) {
        dy = -dy;
    }
  }
setInterval(draw, 10);

draw()
  //to draw the circle
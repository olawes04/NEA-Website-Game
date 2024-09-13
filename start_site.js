var canvas = document.getElementById("game_window");
var sqt = canvas.getContext("2d");
//Starting Position
var x=100
var y=100
//Speed
var dx=1
var dy=-1
//Starting Colours
var red=2
var green=124
var blue=34
var colour="rgb("+red+","+green+","+blue+")"
//Rate of Colour Change, breaks if greater than 1
var redChange=1
var greenChange=1
var blueChange=1

//Draws the square
function draw() {
  //Clears the square's "tail"
    //sqt.clearRect(0, 0, canvas.width, canvas.height);
    sqt.beginPath();
    //Defines the square's size
    sqt.rect(x, y, 5, 5);
    sqt.fillStyle = colour;
    sqt.fill();
    sqt.closePath();
    //actually makes the square move
    x+=dx
    y+=dy
    //actually changes the colour variables
    red+=redChange
    green+=greenChange  
    blue+=blueChange
    //Changes the rate of colour change if the colours have reached their maximum or minimum value
    if(red==255){
      redChange=-1;
    }
    if (red==0){
      redChange=1;
    }
    if (green==255){
      greenChange=-1;
    }
    if (green==0){
      greenChange=1;
    }
    if (blue==255){
      blueChange=-1;
    }
    if (blue==0){
      blueChange=1;
    }
    // Check for if the square has hit the boundary and reverses the movement if it has
    if(x> canvas.width || x< 5) {
        dx = -dx;
    }
    if(y> canvas.height|| y< 5) {
        dy = -dy;
    }
  //Updates the colour
  colour="rgb("+red+","+green+","+blue+")"
  }
setInterval(draw, 0);

draw()
  //to draw the circle
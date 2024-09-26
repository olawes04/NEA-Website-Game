var canvas = document.getElementById("game_window");
var sqt = canvas.getContext("2d");
//Starting Position
var x=100
var y=100
//Speed
var dx=1.0
var dy=-1.0
//Starting Colours
var red=2
var green=124
var blue=34
var colour="rgb("+red+","+green+","+blue+")"
//Rate of Colour Change, breaks if greater than 1
var redChange=1
var greenChange=1
var blueChange=1
var onGround=false
var bounce=0
var bounced=false

//Draws the square
function draw() {
  //Clears the square's "tail"
    //sqt.clearRect(0, 0, canvas.width, canvas.height);
    sqt.beginPath();
    //Defines the square's size
    sqt.rect(x, y, 50, 50);
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
    if(x> canvas.width-50 || x< 0) {
        dx = -dx;
    }
    //This is the bounce code, it isn't perfect and sometimes the square just doesn't bounce, but it's also the best I can do right now, I'll probably come back later
    if(y> canvas.height-50) {
      console.log(bounced);
      if (bounced==false){
        if(bounce!=3 ){
          bounce+=1
          dy=-dy/2
          onGround=false
          
        }
        else if (bounce==3){
          bounced=true
        }
      }
      else{
        dy=0
        bounce=0
        onGround=true
        bounced=true
      }
    }
    if (y>canvas.height-51){
      onGround=false
    }
    if (y> canvas.height-49){
      y=canvas.height-50;
    }
    if (onGround==false){
      dy+=0.02;
      //console.log(dy);
    }

    if (y< 0) {
      y=0;
      console.log(dy);
      onGround=false;

    }

  //Updates the colour
  colour="rgb("+red+","+green+","+blue+")"
 }

setInterval(draw, 0);

draw()
  //to draw the circle

function down(){
  //console.log("If you are reading this I have died at sea");
}

function movementUp(){
  dy-=3
  bounced=false
  console.log(bounced);

  //setTimeout(down,500);
}

//canvas.addEventListener("keydown", (d)=>{
//  console.log("aaaaa")
// })
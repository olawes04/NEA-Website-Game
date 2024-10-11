var canvas = document.getElementById("game_window");
var sqt = canvas.getContext("2d");
//Starting Position
var x=30
var y=30
//Speed
var dx=1.0
var dy=-1.0
//Starting Colours, Now Randomised! Except not really as it doesn't seem like it's true random
var red=Math.floor(Math.random()*255+1)
var green=Math.floor(Math.random()*255+1)
var blue=Math.floor(Math.random()*255+1)
var colour="rgb("+red+","+green+","+blue+")"
//Rate of Colour Change, breaks if greater than 1
var redChange=1
var greenChange=1
var blueChange=1
var onGround=false
//No of Bounces and whether or not the bounces are primed for the next jump
var bounce=0
var bounced=false
xOrb=50
yOrb=50  
var notEvilOrbs =[]


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

    //Collision code for the square, If the square is within the x bound and the y bound of the square then both velocities are reversed, this isn't quite what I want but I'll come back to it later
    if((x<xOrb+50 && x>xOrb-50) && (y<yOrb+50 && y>yOrb-50)) {
      dx = -dx;
      dy=-dy;
    }

    //This is the bounce code, it isn't perfect and sometimes the square j
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
    //More Boundary Checkers
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
  document.getElementById("blueColorValue").innerHTML="Blue RGB Value is:"+blue;
  document.getElementById("redColorValue").innerHTML="Red RGB Value is:"+red;
  document.getElementById("greenColorValue").innerHTML="Green RGB Value is:"+green;
  document.getElementById("xVelocityValue").innerHTML="The X Velocity is:"+dx;
  document.getElementById("yVelocityValue").innerHTML="The Y Velocity is:"+dy;
  document.getElementById("bouncesHTML").innerHTML="The Number of bounces is:"+bounce;
 }

setInterval(draw, 0);

// draw()
//   //to draw the circle

function down(){
  //console.log("If you are reading this I have died at sea");
}
//This controls the velocity that the square moves at when the mouse is clicked as well as resetting the bounce
function movementUp(){
  dy-=3
  bounced=false
  console.log(bounced);
  bounce=0

  //setTimeout(down,500);
}

canvas.addEventListener("keydown", (d)=>{
 console.log("aaaaa")
})

function evilOrb(){
  xOrb=Math.floor(Math.random()*canvas.width)
  yOrb=Math.floor(Math.random()*canvas.height)
  sqt.beginPath();
  sqt.rect(xOrb, yOrb, 50, 50);
  sqt.fillStyle = colour;
  sqt.fill();
  sqt.closePath();
  console.log("If you see this it's breaking in an even more annoying way");


}
for(let i=0; i<300;i++){
  let tempOrb=new NotEvilOrb();
  notEvilOrbs.push(tempOrb);
  console.log("Orbs have been made");
}
class NotEvilOrb{
  constructor(){
    this.xOrb=Math.floor(Math.random()*canvas.width);
    this.yOrb=Math.floor(Math.random()*canvas.height);
  }

}

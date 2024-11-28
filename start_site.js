var canv2
var sqt
var x
var y
var dx
var dy
var red
var blue
var colour
var redChange
var greenChange
var blueChange
var onGround
var bounced
var xOrb
var yOrb
var evilOrbWidth
var evilOrbHeight
// Creates a global variable to hold all the orbs
var orbs = [];
var numberOfOrbs = 20;                       

function initiate() {
  canv2 = document.getElementById("game_window");
  sqt = canv2.getContext("2d");
  //Starting Position
  x = 70
  y = 700
  //Speed...||
  dx = 1.0
  dy = -1.0
  //Starting Colours, Now Randomised! Except not really as it doesn't seem like it's true random
  red = Math.floor(Math.random() * 255 + 1)
  green = Math.floor(Math.random() * 255 + 1)
  blue = Math.floor(Math.random() * 255 + 1)
  colour = "rgb(" + red + "," + green + "," + blue + ")"
  //Rate of Colour Change, breaks if greater than 1
  redChange = 1
  greenChange = 1
  blueChange = 1
  onGround = false
  //No of Bounces and whether or not the bounces are primed for the next jump
  bounce = 0
  bounced = false

  //EvilOrb Sizing 
  evilOrbWidth = 50
  evilOrbHeight = 50
  makeOrbs(numberOfOrbs);
}
//Draws the square
function drawSquare() {
  //Clears the square's "tail"
  //sqt.clearRect(0, 0, canv2.width, canv2.height);
  sqt.beginPath();
  //Defines the square's size
  sqt.rect(x, y, 50, 50);
  sqt.fillStyle = colour;
  sqt.fill();
  sqt.closePath();
  //actually makes the square move
  x += dx
  y += dy
  //actually changes the colour variables
  red += redChange
  green += greenChange
  blue += blueChange
  //Changes the rate of colour change if the colours have reached their maximum or minimum value
  // Use ORs and inverted variable DO THIS LATER                                                                      *********************
  if (red == 255) {
    redChange = -1;
  }
  if (red == 0) {
    redChange = 1;
  }
  if (green == 255) {
    greenChange = -1;
  }
  if (green == 0) {
    greenChange = 1;
  }
  if (blue == 255) {
    blueChange = -1;
  }
  if (blue == 0) {
    blueChange = 1;
  }
  // Check for if the square has hit the boundary and reverses the movement if it has
  if (x > canv2.width - 50 || x < 0) {
    dx = -dx;
  }

  //Collision code for the square, If the square is within the x bound and the y bound of the square then both velocities are reversed, this isn't quite what I want but I'll come back to it later


  //This is the bounce code, it isn't perfect and sometimes the square just doesn't bounce
  if (y > canv2.height - 50) {
    console.log(bounced);
    if (bounced == false) {
      if (bounce != 3) {
        bounce += 1
        dy = -dy / 2
        onGround = false

      }
      else if (bounce == 3) {
        bounced = true
      }
    }
    else {
      dy = 0
      bounce = 0
      onGround = true
      bounced = true
    }
  }
  //More Boundary Checkers
  if (y > canv2.height - 51) {
    onGround = false
  }
  if (y > canv2.height - 49) {
    y = canv2.height - 50;
  }
  if (onGround == false) {
    dy += 0.02;
    //console.log(dy);
  }

  if (y < 0) {
    y = 0;
    console.log(dy);
    onGround = false;

  }

  //Updates the colour
  colour = "rgb(" + red + "," + green + "," + blue + ")"
  document.getElementById("blueColorValue").innerHTML = "Blue RGB Value is:" + blue;
  document.getElementById("redColorValue").innerHTML = "Red RGB Value is:" + red;
  document.getElementById("greenColorValue").innerHTML = "Green RGB Value is:" + green;
  document.getElementById("xVelocityValue").innerHTML = "The X Velocity is:" + dx;
  document.getElementById("yVelocityValue").innerHTML = "The Y Velocity is:" + dy;
  document.getElementById("bouncesHTML").innerHTML = "The Number of bounces is:" + bounce;
}


// draw()
//   //to draw the circle

function down() {
  //console.log("If you are reading this I have died at sea");
}
//This controls the velocity that the square moves at when the mouse is clicked as well as resetting the bounce
function movementUp() {
  dy -= 3
  bounced = false
  console.log(bounced);
  bounce = 0

  //setTimeout(down,500);
}

// canv2.addEventListener("keydown", (d) => {
//   console.log("aaaaa")
// })

function evilOrb() {
  xOrb = Math.floor(Math.random() * canv2.width)
  yOrb = Math.floor(Math.random() * canv2.height)
  sqt.beginPath();
  sqt.rect(xOrb, yOrb, 50, 50);
  sqt.fillStyle = colour;
  sqt.fill();
  sqt.closePath();
  console.log("If you see this it's breaking in an even more annoying way");


}


//Be aware all the orbs are actually squares because I never changed the original lines when I switched from circles to squares and now I'm afraid of breaking everything
//Creates the Class notEvilOrb
class NotEvilOrb {
  constructor(xOrb, yOrb, evilOrbWidth, evilOrbHeight, colour) {
    this.xOrb = xOrb;
    this.yOrb = yOrb;
    this.evilOrbWidth = evilOrbWidth;
    this.evilOrbHeight = evilOrbHeight;
    this.colour = colour;
  }

  //Should draw the squares with the following parameters, this code should be the same as the code up top
  draw() {
    sqt.beginPath();
    //Defines the square's size
    sqt.rect(this.xOrb, this.yOrb, this.evilOrbWidth, this.evilOrbHeight);
    sqt.fillStyle = this.colour;
    sqt.fill();
    sqt.closePath();
  }
  //Another copied bit of code from further up, do I need to pass the other variables in?
  isColliding(x, y, evilOrbHeight, evilOrbWidth) {
    xOrb=this.xOrb
    yOrb=this.yOrb
    console.log("This might be working")
    if ((x < xOrb + evilOrbWidth && x > xOrb - evilOrbWidth) && (y < yOrb + evilOrbHeight && y > yOrb - evilOrbHeight)) {
      dx = -dx;
      dy = -dy;
      console.log("If you're seeing this and it hasn't reflected then something is wrong")
    }
  }
}


function makeOrbs(numberOfOrbs){
  //Sets the number of orbs to be made

  //Actually creates the orbs through a for statement based on the number of orbs specified a couple lines up. Then pushes them up into orbs
  for (let i = 0; i < numberOfOrbs; i++) {
    var xOrb = Math.random() * (canv2.width - 2 * evilOrbWidth);
    var yOrb = Math.random() * (canv2.height - 2 * evilOrbHeight);
    orbs.push(new NotEvilOrb(xOrb, yOrb, evilOrbWidth, evilOrbHeight, colour))
  }
}

function testDrawOrb(){
  var testOrb = new NotEvilOrb(500, 1000, 50, 50, colour)
  testOrb.draw()
}

function SquarePhysics(){
  for (let j = 0; j < orbs.length; j++) {
    orbs[j].draw();
    orbs[j].isColliding(x, y, evilOrbHeight, evilOrbWidth);
  }
};


const eOrb= new NotEvilOrb();
setInterval(drawSquare, 0);
setInterval(SquarePhysics, 0);

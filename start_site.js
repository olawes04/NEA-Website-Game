var canv2
var sqt
var x
var y
var dx
var dy
var red
var blue
var green
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
var numberOfOrbs = 10;                   
var score    
var alive
var alteration


function initiate() {
  canv2 = document.getElementById("game_window");
  sqt = canv2.getContext("2d");
  //Starting Position
  x = 70
  y = 700
  //Speed...||
  dx = 3
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
  bounced = false

  //EvilOrb Sizing 
  evilOrbWidth = 50
  evilOrbHeight = 50
  makeOrbs(numberOfOrbs);
  score = 0
  alive = true
  alteration = 0
}
//Draws the square
function drawSquare() {
  //Clears the square's "tail"
  sqt.clearRect(0, 0, canv2.width, canv2.height);
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
  //Changes the rate of colour change if the colours have reached their maximum or minimum value                                                                    *********************
  if (red == 255 | red==0) {
    redChange = -redChange;
  }
  
  if (green == 255 | green==0) {
    greenChange = -greenChange;
  }
  if (blue == 255 | blue==0) {
    blueChange = -blueChange;
  }
  // Check for if the square has hit the boundary and reverses the movement if it has
  if (x > canv2.width - 50 || x < 0) {
    dx = -dx;
  }

  //Collision code for the square, If the square is within the x bound and the y bound of the square then both velocities are reversed, this isn't quite what I want but I'll come back to it later


  //This is the bounce code, it isn't perfect and sometimes the square just doesn't bounce
  if (y > canv2.height - 50) {
    //console.log(bounced);
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
  if (y > canv2.height - 45) {
    youDied()
  }
  //if (y > canv2.height - 49) {
 //   y = canv2.height - 49;

  //}
  if (onGround == false) {
    dy += 0.2;
    //console.log(dy);
  }

  if (y < 0) {
    y = 0;
    //console.log(dy);
    onGround = false;

  }

  //Updates the colour
  colour = "rgb(" + red + "," + green + "," + blue + ")"
 // document.getElementById("blueColorValue").innerHTML = "Blue RGB Value is:" + blue;
 // document.getElementById("redColorValue").innerHTML = "Red RGB Value is:" + red;
 // document.getElementById("greenColorValue").innerHTML = "Green RGB Value is:" + green;
  document.getElementById("xVelocityValue").innerHTML = "The X Velocity is:" + dx;
  document.getElementById("yVelocityValue").innerHTML = "The Y Velocity is:" + dy;
  document.getElementById("bouncesHTML").innerHTML = "The Number of bounces is:" + bounce;
  document.getElementById("scoreHTML").innerHTML = "The current Score is:" + score;
}


// draw()
//   //to draw the circle


//This controls the velocity that the square moves at when the mouse is clicked as well as resetting the bounce
function movementUp() {
    dy = -9
  bounced = false
  //console.log(bounced);
  bounce = 0
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
    //console.log("This might be working")
    if ((x < xOrb + evilOrbWidth && x > xOrb - evilOrbWidth) && (y < yOrb + evilOrbHeight && y > yOrb - evilOrbHeight)) {
      dx = -dx;
      dy = -dy;
      youDied()
      //console.log("If you're seeing this and it hasn't reflected then something is wrong")
    }
  }
}


function makeOrbs(numberOfOrbs){
  //Sets the number of orbs to be made

  //Actually creates the orbs through a for statement based on the number of orbs specified a couple lines up. Then pushes them up into orbs
  for (let i = 0; i < numberOfOrbs; i++) {
    xOrb=1
    while(xOrb<canv2.width*1/10){
      var xOrb = Math.random() * (canv2.width * 9/10 - 2 * evilOrbWidth);
    }
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
//

function alterationPhysics(){
  
}


function deathScreen(){
  sqt.font="192px Optimus Princeps"
  sqt.fillStyle="red";
  sqt.fillText("You Died", 100, 500 )
  sqt.fillText("Score = "+score, 100, 700)
}

function youDied(){
  alive=false
}

const eOrb= new NotEvilOrb();

/**
 * Function decides and creates the different powerups and debuffs that should appear in each level 
 */
function alterations(){
  // Semi-Randomly decides the powerup for each screen
  alteration=Math.floor(Math.random() * 10)
    if (alteration==1){
      // This one should decrease the Speed of the player when it they hit it and then disappear
    }
    if (alteration == 2){
      // This one should increase the size of the player character by 10 (maybe this orb should also be bigger?)
    }
  
}


/**
 * When the player reaches the right boundary of the screen creates new level for the player to continue through
 */
function nextLevel(){
  if (x+50>canv2.width){
    //Clears the screen of the previous enemies' models
    sqt.clearRect(0, 0, canv2.width, canv2.height);
    x=0
    orbs = []
    //Increases the number of enemies for the next screen by 2
    numberOfOrbs+=2
    makeOrbs(numberOfOrbs)
    //Increments the score by 1
    score+=1
  }
}


/**
 * Holds all the functions that actually allow the game to work
 */
function deadOrAlive(){
  if (alive==true){
  drawSquare()
  SquarePhysics()
  nextLevel()
  }
  else{
  //When the player dies, clears the screen and shows their score while making it very clear that they died
  sqt.clearRect(0, 0, canv2.width, canv2.height);
  deathScreen()
  }
}


  setInterval(deadOrAlive,15)

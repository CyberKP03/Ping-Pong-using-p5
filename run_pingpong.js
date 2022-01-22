var pX, pY, pW, pH, pV
var cX, cY, cV
var bX, bY, bD, vX, vsY, vMax
var maxAngle
var pScore, cScore
var ip1 = prompt("Please enter your name Player1", "<name goes here>");
var ip2 = prompt("Please enter your name Player2", "<name goes here>");
var freeze, started

function setup() { //Runs Once
  createCanvas(1900,940);
  restart()
  cScore = 0
  pScore = 0
  mode = 0;
}
function restart(){
  pX = 0
  pY = height/2
  pW = 20
  pH = 100
  pV = 0
  cX=width - pW
  cY=height/2
  cV=0
  bX = width/2
  bY = height/2
  bD = height/20
  vMax = 6
  vX = 0
  vY = 0
  maxAngle = (75*PI)/180
  freeze = true
}

function draw() { // Runs 60fps
  clear();
  if(mode==0) {
    background(25, 117, 76);
    fill(0, 0, 0);
    textStyle(BOLD)
    textSize(24);
    text('Press Enter to continue',170,180);
    fill(255,0,0);
    textSize(18);
    text('Keys to control left paddle: w & s',160, 300);
    text('Keys to control right paddle: i & j',160, 350);
  }
  if(mode==1) {
   background(25, 117, 76);
   //color of the line
   stroke(50, 52, 51);
  //size, thickness of the line
  //line(x1, y1, x2, y2)
  // line(300, 0, 300, 400);
  
  //draw dash lines for the net
  for(var i=0; i<height/10; i++) {
    var w = width/2;
    var h = height/10;
    line(w, h*i, w, height/20 + h*i);
  }
  //Player1
  fill (255, 200, 0)
  pY = pY + pV
  if(pY <= pH/2){
    pY = pH/2
  }
  if (pY >= height - pH/2){
    pY = height - pH/2
  }
  
  rect(pX, pY - pH/2, pW, pH)
  fill(148, 4, 15)
  
  //left ball collision
  if(bY +bD/2 >= height){
    vY = -vY
  }

  
  //right wall
  if(bX + bD/2 >= width){
    vX = -vX
    bX = width - bD/2
    pScore ++
  }
  
  //top wall
  if(bY - bD/2 <= 0){
    vY = -vY
    bY = bD/2
  }
  
  //left wall
  if(bX - bD/2 <= 0){
    vX = -vX
    bX = bD/2
    cScore ++
  }
  
  //Ball collision P1
  if(bX - bD/2 <= pX + pW && bY <=pY + pH/2 && bY>=pY - pH/2){
     var range = (bY - pY)/(pH/2)
     var angle = range * maxAngle
     vX = vMax * cos(angle)
      vY = vMax*sin(angle)
     }
  
  //Ball collision P2
   if(bX + bD/2 >= cX && bY <=cY + pH/2 && bY>=cY - pH/2){
     var range = (bY - cY)/(pH/2)
     var angle = range * maxAngle
     vX = -vMax * cos(angle)
      vY = -vMax*sin(angle)
     }
  
  //update ball position
  bX = bX + vX
  bY = bY + vY
  circle(bX, bY, bD)
  
  fill(0, 0, 0)
  textSize(24)
  
  fill(0, 0, 0)
  textSize(24)
  text(ip1 +': '+ pScore, width*0.20, height*0.15)
  text(ip2 + ': ' + cScore, width*0.60, height*0.15)
  
  //Player 2
  fill (255, 200, 0)
  stroke(50, 51, 51)
  cY = cY + cV
  
  //top wall
  if(cY <= pH/2){
    cY = pH/2
  }
  
  //bottom wall
  if(cY >= height - pH/2){
    cY=height - pH/2
  }
  //draw paddle
  rect(cX, cY - pH/2, pW, pH)

  fill(0, 0, 0)
  textSize(38)
  if(pScore == 5){
    text(ip1 + ' is the Winner', 0.17*width, 0.70*height)
    restart()
    text('Press "R" To Restart!', 0.17*width, 0.9*height)
    if (keyCode == [13]){
          setup()
    }
  }
 if(cScore == 5){
    text(ip2 + ' is the Winner', 0.17*width, 0.70*height)
   restart()
   text('Press "R" To Restart!', 0.17*width, 0.9*height)
   if (keyCode == [13]){
          setup()
      }
    }
  }
}
//Keys assigning
function keyPressed() {
  if(freeze == true){
    vX = vMax
    vY = -vMax
    freeze = false
  }
  if(key == 'w') {
    pV = -5
  }
  if(key == 's') {
    pV = 5
  }
  if(key == 'i') {
    cV = -5
  }
  if(key == 'j') {
    cV = 5
  }
  if(key == 'r') {
    restart();
    setup();
  }
  if(keyCode == ENTER) {
    setup();
    mode = 1;
  }
}
var path,mainCyclist;
var player1,player2,player3;
var pathImg,mainRacerImg1,mainRacerImg2;
var Nut, Smash, Spike;
var NImg, SImg, SpImg;

var oppPink1Img,oppPink2Img;
var oppYellow1Img,oppYellow2Img;
var oppRed1Img,oppRed2Img;
var gameOverImg,cycleBell;

var pinkCG, yellowCG,redCG; 
var NutG, SpikeG, SmashG;

var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0;
var gameOver, restart;

function preload(){
  pathImg = loadImage("Road.png");
  mainRacerImg1 = loadAnimation("Main1.png");
  mainRacerImg2= loadAnimation("Main2.png");
  
  oppPink1Img = loadAnimation("Ball.png");
  oppPink2Img = loadAnimation("Ball2.png");
  
  oppYellow1Img = loadAnimation("e.png");
  oppYellow2Img = loadAnimation("e.png");
  
  oppRed1Img = loadAnimation("ee.png");
  oppRed2Img = loadAnimation("ee.png");

  SpImg = loadAnimation("Spike.png");
  SImg = loadAnimation("Smash.png");
  NImg = loadAnimation("Nut.png");
  
ost = loadSound("Ost.mp3");  
  gameOverImg = loadImage("gameOver.png");
}

function setup(){
  
createCanvas(1200,300);
// Moving background
path=createSprite(100,150);
path.addImage(pathImg);
path.velocityX = -5;

//creating boy running
mainCyclist  = createSprite(70,150);
mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
mainCyclist.scale=1

mainCyclist.debug = true
mainCyclist.setCollider("rectangle",0,0,40,40,50);

  
gameOver = createSprite(650,150);
gameOver.addImage(gameOverImg);
gameOver.scale = 0.8;
gameOver.visible = false;  
  
pinkCG = new Group();
yellowCG = new Group();
redCG = new Group();
SmashG = new Group();
NutG = new Group();
SpikeG = new Group();

ost.play();
  
}

function draw() {
  background(0);
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: "+ distance,900,30);
  
  if(gameState===PLAY){
    
   distance = distance + Math.round(getFrameRate()/50);
   path.velocityX = -(6 + 2*distance/150);
  
   mainCyclist.y = World.mouseY;
  
   edges= createEdgeSprites();
   mainCyclist .collide(edges);
  
  //code to reset the background
  if(path.x < 0 ){
    path.x = width/2;
  }
  
    //code to play cycle bell sound
  if(keyDown("space")) {
    cycleBell.play();
  }
  
  //creating continous opponent players
  var select_oppPlayer = Math.round(random(1,3));
  var selectPlants = Math.round(random(1,3));
  
  if (World.frameCount % 150 == 0) {
    if (select_oppPlayer == 1) {
      pinkCyclists();
    } else if (select_oppPlayer == 2) {
      yellowCyclists();
    } else {
      redCyclists();
    }
  }
  if (World.frameCount % 220 == 0) {
    if (selectPlants == 1) {
      nut();
    } else if (selectPlants == 2) {
      spike();
    } else {
      smash();
    }
  }
  
   if(pinkCG.isTouching(mainCyclist)){
     gameState = END;
     player1.velocityY = 0;
     player1.addAnimation("opponentPlayer1",oppPink2Img);
     player1.scale = 1;
    }
    
    if(yellowCG.isTouching(mainCyclist)){
      gameState = END;
      player2.velocityY = 0;
      player2.addAnimation("opponentPlayer2",oppYellow2Img);
    }
    
    if(redCG.isTouching(mainCyclist)){
      gameState = END;
      player3.velocityY = 0;
      player3.addAnimation("opponentPlayer3",oppRed2Img);
    }

    if(SmashG.isTouching(mainCyclist)){
      gameState = END;
      Smash.velocityY = 0;
     }
     
     if(NutG.isTouching(mainCyclist)){
       gameState = END;
       Nut.velocityY = 0;
     }
     
     if(SpikeG.isTouching(mainCyclist)){
       gameState = END;
       Spike.velocityY = 0;
     }

     if(SpikeG.isTouching(pinkCG)){
      SpikeG.destroyEach();
      player1.addAnimation("opponentPlayer1",oppPink2Img);
      player1.scale = 1;
      pinkCG.setLifetimeEach(10);
    }
    
}else if (gameState === END) {
    gameOver.visible = true;
  
    textSize(20);
    fill(255);
    text("Press Up Arrow to Restart the game!", 500,200);
  
    path.velocityX = 0;
    mainCyclist.velocityY = 0;
    mainCyclist.addAnimation("SahilRunning",mainRacerImg2);
  
    pinkCG.setVelocityXEach(0);
    pinkCG.setLifetimeEach(-1);
  
    yellowCG.setVelocityXEach(0);
    yellowCG.setLifetimeEach(-1);
  
    redCG.setVelocityXEach(0);
    redCG.setLifetimeEach(-1);

    SpikeG.setVelocityXEach(0);
    SpikeG.setLifetimeEach(-1);

    NutG.setVelocityXEach(0);
    NutG.setLifetimeEach(-1);

    SmashG.setVelocityXEach(0);
    SmashG.setLifetimeEach(-1);
    
     if(keyDown("UP_ARROW")) {
       reset();
     }
}
}

function pinkCyclists(){
        player1 =createSprite(1100,Math.round(random(50, 250)));
        player1.scale =0.3;
        player1.velocityX = -(6 + 2*distance/150);
        player1.addAnimation("opponentPlayer1",oppPink1Img);
        player1.setLifetime=170;
        pinkCG.add(player1);
}

function yellowCyclists(){
        player2 =createSprite(1100,Math.round(random(50, 250)));
        player2.scale =0.3;
        player2.velocityX = -(2 + 2*distance/150);
        player2.addAnimation("opponentPlayer2",oppYellow1Img);
        player2.setLifetime=170;
        yellowCG.add(player2);
}

function redCyclists(){
        player3 =createSprite(1100,Math.round(random(50, 250)));
        player3.scale =0.3;
        player3.velocityX = -(6 + 2*distance/150);
        player3.addAnimation("opponentPlayer3",oppRed1Img);
        player3.setLifetime=170;
        redCG.add(player3);
}

function nut(){
  Nut =createSprite(1100,Math.round(random(50, 100)));
  Nut.scale =0.8;
  Nut.velocityX = -(4 + 2*distance/150);
  Nut.addAnimation("Nut",NImg);
  Nut.setLifetime=220;
  NutG.add(Nut);
}

function spike(){
 Spike =createSprite(1100,Math.round(random(150, 250)));
 Spike.scale =0.2;
 Spike.velocityX = -(2 + 2*distance/150);
 Spike.addAnimation("Spike",SpImg);
 Spike.setLifetime=220;
 SpikeG.add(Spike);
}
function smash(){
 Smash =createSprite(1100,Math.round(random(100, 200)));
 Smash.scale =0.3;
 Smash.velocityX = -(6 + 2*distance/150);
 Smash.addAnimation("Smash",SImg);
 Smash.setLifetime=220;
 SmashG.add(Smash);
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
  
  pinkCG.destroyEach();
  yellowCG.destroyEach();
  redCG.destroyEach();
  SmashG.destroyEach();
  NutG.destroyEach();
  SpikeG.destroyEach();
  
  
  distance = 0;
 }

var gamestate="play";
var ghost,ghostImage;
var door,doorImage;
var climber,climberImage,climbergroup;
var tower,towerImage;
var invisibleGround,invisibleGroundgroup;



function preload(){
 ghostImage=loadAnimation("ghost-jumping.png","ghost-standing.png")
 doorImage=loadImage("door.png");
 climberImage=loadImage("climber.png");
 towerImage=loadImage("tower.png")
}

function setup(){
 createCanvas(600,600);
 tower=createSprite(300,300)
 tower.addImage(towerImage);
 tower.scale=1;
 tower.velocityY=1;
  
 ghost=createSprite(300,300)
 ghost.addAnimation("running",ghostImage);
 ghost.scale=0.3;
 climbergroup=new Group();
 invisibleGroundgroup=new Group();
}

function draw(){
  background("black");
  if(gamestate==="play"){
     if(tower.y>600){
 tower.y=300;
  }
  
 if (keyDown("space")){
 ghost.velocityY=-10; 
 }
 ghost.velocityY=ghost.velocityY+0.8;
 
  if(keyDown("left")){
     ghost.x=ghost.x-2
     }
    if(keyDown("right")){
     ghost.x=ghost.x+2
     }
  spawnDoor();
  ghost.collide(climbergroup);
  if(ghost.isTouching(invisibleGroundgroup)||ghost.y>600){
     gamestate="end";
     }
     drawSprites();
  }
  else if(gamestate==="end"){
  fill("yellow")
    textSize(30);
  text("GAMEOVER",240,300)  
  }
  
  }

function spawnDoor(){
  if(frameCount % 300===0){
  var door=createSprite(300,-50);
  door.addImage(doorImage);
  door.scale= 1 
  door.velocityY=1;
  door.x=Math.round(random(150,450));
  ghost.depth=door.depth+1;
  door.lifetime=650;
    
  var climber=createSprite(300,10)
  climber.addImage(climberImage);
  climber.scale= 1;
  climber.velocityY=1;
  climber.x=door.x;
  climber.lifetime=650;
  climbergroup.add(climber);
  
  var invisibleGround=  createSprite(300,15,climber.width,climber.height);
 invisibleGround.velocityY=1;
 invisibleGround.x=climber.x;
 invisibleGround.visible=false;
 invisibleGroundgroup.add(invisibleGround);
}
}
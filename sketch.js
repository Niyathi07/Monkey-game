var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var ground;
var invisibleGround;

function preload(){
  
  
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,200);
  monkey = createSprite(50,160,20,50);
  monkey.addAnimation("running" , monkey_running);
  monkey.scale = 0.1;
  
  FoodGroup = createGroup();
  obstacleGroup = createGroup();
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;

  score = 0;
  
}


function draw() {
  background(180);
  
 text("Score: "+ score, 500,50);
  
  
  if(gameState === PLAY){

   //scoring
    score = score + Math.round(getFrameRate()/60);
   
    
   
    
    //jump when the space key is pressed
    if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -12;
        
    }
    
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8
  
    //spawn the bananas
    spawnBananas();
  
    //spawn obstacles on the ground
    spawnObstacles();
    
    if(obstacleGroup.isTouching(monkey)){
        //monkey.velocityY = -12;
        
        gameState = END;
 }
  }
  
       if (gameState === END) {
     
     
      monkey.velocityY = 0
     
    //set lifetime of the game objects so that they are never destroyed
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
     
     obstacleGroup.setVelocityXEach(0);
     FoodGroup.setVelocityXEach(0);    
   }
  
 
  //stop monkey from falling down
  monkey.collide(invisibleGround);
  
  
 drawSprites();
}

 function spawnBananas() {
  //write code here to spawn the bananas
  if (frameCount % 80===0) {
    var banana = createSprite(600,100,40,10);
    banana.y = Math.round(random(60,120));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //add each banana to the group
    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  //write code here to spawn the obstacles
  if (frameCount % 150===0) {
    var obstacle = createSprite(600,165,10,40);
    
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
    obstacle.velocityX = -3;
    
     //assign lifetime to the variable
    obstacle.lifetime = 200;
    
    //adjust the depth
    obstacle.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //add each obstacle to the group
    obstacleGroup.add(obstacle);
  }
}

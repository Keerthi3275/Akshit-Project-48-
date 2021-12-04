var bg,bgImg;
var spaceShip,spaceShipImg,spaceShipImg2,spaceShipImg3,spaceShipImg4;
var astroids,astroidsImg;
var star,starImg,earth,earthImg,bullet
var score=0;
var life=3;
var astroidsGroup,bulletGroup;
var bullets=100;
var gameState = "fight"

function preload()
{
    bgImg=loadImage("assets/bg.jpg");
    spaceShipImg=loadImage("assets/spacecraft1.png");
    spaceShipImg3=loadImage("assets/spacecraft3.png");
    spaceShipImg4=loadImage("assets/spacecraft4.png");
    astroidsImg=loadImage("assets/astroids.png");
    earthImg=loadImage("assets/earth2.png");
    heart1=loadImage("assets/heart_1.png");
    heart2=loadImage("assets/heart_2.png");
    heart3=loadImage("assets/heart_3.png");
}

function setup()
{
    createCanvas(windowWidth,windowHeight);
    
    bg=createSprite(displayHeight/2+400,displayWidth/2-300,50,50);
    bg.addImage(bgImg);
    bg.scale=4;

    spaceShip=createSprite(700,500,100,100);
    spaceShip.addImage(spaceShipImg);
    spaceShip.scale=0.2;
    spaceShip.debug=true;
    spaceShip.setCollider("rectangle",0,-100,500,500);

    earth=createSprite(displayHeight/2+400,displayWidth/2+200,50,50);
    earth.addImage(earthImg);
    earth.scale=0.5;
 
    
    astroidsGroup=new Group();
    bulletGroup = new Group()
}

function draw()
{
    background(2);
    if(gameState==="fight")
    {
        if(keyWentDown("RIGHT_ARROW"))
        {
            spaceShip.velocityX=8;
            spaceShip.addImage(spaceShipImg3);
        }
        if(keyWentUp("RIGHT_ARROW"))
        {
            spaceShip.velocityX=0;
            spaceShip.addImage(spaceShipImg);
        }
    
        if(keyWentDown("LEFT_ARROW"))
        {
            spaceShip.velocityX=-8;
            spaceShip.addImage(spaceShipImg4);
        }
        if(keyWentUp("LEFT_ARROW")){
            spaceShip.velocityX=0;
            spaceShip.addImage(spaceShipImg);
        }
        if(keyWentDown("space"))
        {
            bullet = createSprite(spaceShip.x,spaceShip.y-30,10,20);
            bullet.velocityY =-20;
            bullets = bullets-1;
            spaceShip.depth = bullet.depth;
            spaceShip.depth = spaceShip.depth+2;
           
        }
        if(astroidsGroup.isTouching(bulletGroup))
        {
            for(var i=0;i<astroidsGroup.length;i++)
            {     
                if(astroidsGroup[i].isTouching(bulletGroup))
                {
                    astroidsGroup[i].destroy()
                    bulletGroup.destroyEach()
                    //explosionSound.play();
                    score = score+2
                } 
            }
          }
        if(astroidsGroup.isTouching(spaceShip))
        {
            for(var i=0;i<astroidsGroup.length;i++)
            {
              if(astroidsGroup[i].isTouching(spaceShip))
              {
                  astroidsGroup[i].destroy();
                  life=life-1;
              }
            }
        }
        if(life===0)
        {
            gameState="lost";
        }
        if(score===100)
        {
            gameState="won";
        }
        if(bullet==0)
        {
            gameState = "bullet";
        }
        enemy();
    }
    drawSprites();

    textSize(20);
    fill("white");
    text("Bullet = " + bullets,displayWidth-210,displayHeight/2-250);
    text("Score = " + score,displayWidth-200,displayHeight/2-220);
    text("Lives = " + life,displayWidth-200,displayHeight/2-280);

    if(gameState == "lost")
    {
        textSize(100)
        fill("red")
        text("You Lost ",400,400)
        astroidsGroup.destroyEach();
        spaceShip.destroy();  
    }
    else if(gameState == "won")
    {
        textSize(100)
        fill("yellow")
        text("You Won ",400,400)
        astroidsGroup.destroyEach();
        spaceShip.destroy();
    } 
    else if(gameState == "bullet")
    {
        textSize(50)
        fill("yellow")
        text("You ran out of bullets!!!",470,410)
        astroidsGroup.destroyEach();
        spaceShip.destroy();
        bulletGroup.destroyEach();
    }
}

function enemy()
{
    if(frameCount%60===0)
    {
    astroids=createSprite(random(400,1200),0,50,50);
    astroids.velocityY=2;
    astroids.addImage(astroidsImg);
    astroids.scale=0.5;
    astroids.lifeTime=1200;
    astroidsGroup.add(astroids);
    astroids.debug=true;
    astroids.setCollider("rectangle",0,0,100,100)
   
    astroids.lifetime = 400
    astroids.depth=spaceShip.depth;
    astroids.depth=astroids.depth-1;
  } 
}

var bgimg;
var shooterimg1;
var shootingimg;
var bg;
var shooter;
var hrt1, hrt2, hrt3;
var heart;
var heart2;
var heart3;
var zomb;
var zombie;
var zombgrp;
var bullet;
var bulletgrp;
var bulletl = 30;
var gameState = "fight";

function preload() {
    bgimg = loadImage("assets/bg.jpeg");
    shooterimg1 = loadImage("assets/shooter_2.png");
    shootingimg = loadImage("assets/shooter_3.png");
    hrt1 = loadImage("assets/heart_1.png");
    hrt2 = loadImage("assets/heart_2.png");
    hrt3 = loadImage("assets/heart_3.png");
    zomb = loadImage("assets/zombie.png");

}

function setup() {
    createCanvas(windowWidth, windowHeight);

    bg = createSprite(displayWidth / 2 - 20, displayHeight / 2 - 40, 50, 50);
    bg.addImage(bgimg)
    bg.scale = 1.1;


    shooter = createSprite(displayWidth - 1150, displayHeight - 300, 50, 50);
    shooter.addImage(shooterimg1)
    shooter.scale = 0.3;
    
    shooter.debug = true;
    shooter.setCollider("rectangle", 0, 0, 300, 350);

    heart = createSprite(displayWidth - 150, displayHeight - 700, 20, 20);
    heart.addImage(hrt3);
    heart.scale = 0.4;
    

    heart2 = createSprite(displayWidth - 150, displayHeight - 800, 20, 20);
    heart2.addImage(hrt2);
    heart2.scale = 0.4;
    heart2.visible = false;

    heart3 = createSprite(displayWidth - 150, displayHeight - 700, 20, 20);
    heart3.addImage(hrt1);
    heart3.scale = 0.4;
    heart3.visible = false;


    zombgrp = new Group();
    bulletgrp = new Group();
}

function draw() {
    background("white");

    if(gameState === "fight"){

        if (keyDown("UP_ARROW")) {
            shooter.y = shooter.y - 10;
        }
    
        if (keyDown("DOWN_ARROW")) {
            shooter.y = shooter.y + 10;
        }
    }
        if (keyWentDown("space")) {
            shooter.addImage(shootingimg);
            bullets();
            bulletl-1;
            shooter.depth = bullet.depth;
            shooter.depth = shooter.depth+1;
        } else
            if (keyWentUp("space")) {
                shooter.addImage(shooterimg1);
            };
    
         if(bulletl === 0){
             gameState = "bullet";
         }
   
        fill("white")
        text("bullet :"+bulletl ,windowWidth-100,windowHeight-600);
        
    zombcollideshooter();
    bulletCollide();
    zombmove();
    drawSprites();

    if(gameState === "bullet"){
        text("You ran out of bullets!!",400,400);
        bulletgrp.destoryEach();
        zombgrp.destroyEach();
        shooter.destroy();
    
     }else if(gameState === "lost"){
       text("You LOst!!",400,400);
       shooter.destroy();
       zombgrp.destroyEach();
       bulletgrp.destoryEach();
     }else if(gameState === "won"){
         text("Congratulations!!,  YOu have won",400,400);
         shooter.destroy();
         zombgrp.destroyEach();
         bulletgrp.destroyEach();
     }

}

function zombmove() {


    if (frameCount % 60 === 0) {
        zombie = createSprite(random(500, 2000), random(100, 500), 50, 50);
        zombie.addImage(zomb);
        zombie.scale = 0.15;
        zombie.velocityX = -5;

        zombie.debug = true;
        zombie.setCollider("rectangle", 0, 0, 400, 400);
        zombie.lifetime = 420;
        zombgrp.add(zombie);

    }

}

function zombcollideshooter() {
    // if (shooter.isTouching(zombgrp)) {
    for (var i = 0; i < zombgrp.length; i++) {
        if (zombgrp[i].isTouching(shooter)) {
            zombgrp[i].destroy();
        }
    }
    // }

}

function bullets(){
    bullet = createSprite(displayWidth-1000,shooter.y-25,15,10);
    bullet.velocityX=10;
    bulletgrp.add(bullet);

   
}
function bulletCollide(){
    for (var i = 0; i < zombgrp.length; i++) {
        if (zombgrp[i].isTouching(bullet)) {
            zombgrp[i].destroy();
            bulletgrp.destoryEach();
        }
    
    }

}
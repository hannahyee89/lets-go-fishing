let lox2,loy2,speedX2,speedY2; //for fih
let fishX; //for autonomous horizontal swimming fish
let count = 50; //for bubbles
let loX = new Array(count);
let loY = new Array(count);
let speedX = new Array(count);
let speedY = new Array(count);

let cirSize = new Array(count);
let colorsR = new Array(count);
let colorsG = new Array(count);
let colorsB = new Array(count);
let alphaC = new Array(count);

async function setup() {
  createCanvas(500,500);
  fishX = width;
  fill(255);
  noStroke();

  hat = await loadImage("propellorHat.png");

  lox2 = width/2;
  loy2 = height/2;
  speedX2 = random(10,40);
  speedY2 = random(40);

  for (let i=0; i < loX.length; i++) {
    loX[i] = width/2;
    loY[i] = height/2;
    speedX[i] = random(-3, 3);
    speedY[i] = random(-3, 3);
    cirSize[i] = random(10, 50);
    colorsG[i] = int(random(200, 255));
    colorsB[i] = int(random(200, 255));
    alphaC[i] = int(random(255));
  }
}
  

function draw() {
  background(0,100,200);

 if (lox2 < 0 || lox2 > width){ //for fih
  speedX2 = -speedX2;
 }
 if (loy2 < 0 || loy2 > height){
  speedY2 = -speedY2;
 }

 lox2+= speedX2;
 loy2+= speedY2;

 tropicalFish(lox2,loy2,lox2,.5,"yellow", true);

fish(fishX,40, 0,1,90,true);
fish(fishX-100,280,0,.75,60,true);
tropicalFish(fishX,350,0,1.2,"purple",true);
 if (fishX > 0){
  fishX--;
 }else{
  fishX = width;
 }

 for (let i = 0; i < loX.length; i++) {

    if (loX[i] < cirSize[i]/2 || loX[i] > (width)-cirSize[i]/2 ) {
      speedX[i] = -speedX[i];
    }
    if (loY[i] < cirSize[i]/2 || loY[i] > (height)-cirSize[i]/2) {
      speedY[i] = -speedY[i];
    }

    //draw all balls
    push();
    translate(loX[i],loY[i]);
    fill(0,colorsG[i] ,colorsB[i], alphaC[i]);
    ellipse(0,0,cirSize[i],cirSize[i]);
    pop();


   
    //update all positions
    loX[i] += speedX[i];
    loY[i] += speedY[i];

}

  tropicalFish(mouseY, height/4,5,.75,"blue", true);
  fish(mouseX+50,mouseY-600,mouseX,1,150, false);
  fish(mouseX,mouseY,mouseY,1,100,true);
  fish(mouseX-40, mouseY+100, 4, 1.5,75,true);
  tropicalFish(mouseX,mouseY-150,30,0.8,"pink", true);
  fish(mouseY+100,300,0,1,100,true);
  tropicalFish(mouseX-100,mouseY-250,mouseY+45,1.2,"orange",true);
  wrapFish();
  fish(mouseX+250,mouseY-300,0,0.6,130,true);
  tropicalFish(mouseX+200,mouseY-90,mouseX-180,.6,"bisque",true);

  scale(-1,1);
  tropicalFish(mouseX,mouseY+200, 0, 1, "yellow", true);
  fish(mouseY-100,height/3,0,.5,120,true);
  fish(mouseX-200,mouseY,0,1,200,true);
  tropicalFish(mouseX-400,mouseY-200,20,1.1,"aqua", true);
  tropicalFish(mouseX-350,mouseY+20,mouseY,0.75,"mediumvioletred",true);
}

function wrapFish(){
  fishBody(width/5, height/4, 4, 1, 200);
  splendidHat(width/5, height/4);

}

function splendidHat(lx,ly,rot, sc){
  push();
  translate(lx,ly);
  rotate(radians(rot));
  scale(sc);
  image(hat, -60, -50, 50,40);
  pop(); 
}

function tropicalFish(lx, ly, rot, sc, col,hasHat){
  tropicalFishBody(lx,ly,rot,sc,col);
  if (hasHat){
    splendidHat(lx,ly,rot,sc);
  }
}

function tropicalFishBody(lx, ly, rot, sc, col){
  push();
  translate(lx,ly);
  rotate(radians(rot));
  scale(sc);
  fill(col);
  fishHead(0,0,0,1,col);
  tropicalFishFillet(-61,1,0,1, col);
  fishHead(0,0,0,1,col);
  fishTail(25,0,0,1,col);
  pop();
}

function fish(lx, ly, rot, sc, col,hasHat){
  fishBody(lx,ly,rot,sc,col);
  if (hasHat){
    splendidHat(lx,ly,rot,sc);
  }
}

function fishBody(lx,ly,rot,sc,col){
  push();
  translate(lx,ly);
  rotate(radians(rot));
  scale(sc);
  fill(col);
  fishHead(0,0,0,1,col);
  fishFillet(0,0,0,1,col+25);
  fishTail(50,0,0,1,col+45);
  pop();
}

function fishHead(lx,ly,rot,sc,col){
  push();
  translate(lx,ly);
  rotate(radians(rot));
  scale(sc);
  fill(col);
  triangle(-40,20,-40,-20,-80,0);
  ellipse (0,0,5,5);  //anchor
  fill(0);
  ellipse(-60,0,8,8);
  pop();
}

function fishFillet(lx,ly,rot,sc,color){  
  push();
  translate(lx,ly);
  rotate(radians(rot));
  scale(sc);
  fill(color);
  beginShape();
  vertex(-40,-20);
  vertex(40,-20);
  vertex(50,0);
  vertex(40,20);
  vertex(-40,20);
  endShape();

  fishScales(-35,-15,0,1,color);

  ellipse (0,0,5,5); //anchor
  pop();
}

function fishScales(lx,ly,rot,sc,color){
  push();
  translate(lx,ly);
  rotate(radians(rot));
  scale(sc);
  for (let i = 66; i > 0; i-=6){
    for (let j = 28; j > 0; j-=4){
      fill(random(color-50,color+50));
      ellipse(i,j,10,10);
    }
  }
  pop();
}

function fishTail(lx,ly,rot,sc,color){
  push();
  translate(lx,ly);
  rotate(radians(rot));
  scale(sc);
  ellipse(0,0,5,5); //anchor
  fill(color);
  quad(0,0, 30,30, 20,0, 30,-30);
  pop();
}

function tropicalFishFillet(lx,ly,rot,sc,color){
  push();
  translate(lx,ly);
  rotate(radians(rot));
  scale(sc);
  fill(color);
  beginShape();
  vertex(0,0);
  vertex(70,-70);
  vertex(55,-35);
  vertex(100,0);
  vertex(50,25);
  vertex(55,50)
  endShape();
  pop();
}
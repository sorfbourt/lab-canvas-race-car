const myCanvas = document.querySelector('canvas')
const ctx = myCanvas.getContext('2d')
myCanvas.style.border = '2px solid black'


const carImg = new Image()
carImg.src = '../images/car.png'
const bgImg = new Image()
bgImg.src = '../images/road.png'
const bgImg2 = new Image()
bgImg2.src = '../images/road.png'
const obstacleImg = new Image()
obstacleImg.src = '../images/rock.png'

let bg1y = 0
let bg2y = -myCanvas.height
const carImgWidth = 50
const carImgHeight = 90
let carImgX = myCanvas.width/2 - carImgWidth/2
let carImgY = myCanvas.height - carImgHeight - 20
let roadGap = 25


//game variables

let gameOver = false
let animateId
let isMovingLeft = false
let isMovingRight = false







window.onload = () => {
  document.getElementById('start-button').onclick = () => {
    startGame();
  };

const drawCar = () =>{
  ctx.drawImage(carImg, carImgX, carImgY, carImgWidth, carImgHeight)

    //move car left
    if(isMovingLeft && carImgX > roadGap){
      carImgX -= 1
    }
    
    //move car right
    if(isMovingRight && carImgX < (myCanvas.width - carImgWidth - roadGap)){
      carImgX += 1
      }

}

//Draw Background
const drawBg = () =>{
  ctx.drawImage(bgImg, 0, bg1y, myCanvas.width, myCanvas.height)
  ctx.drawImage(bgImg2, 0, bg2y, myCanvas.width, myCanvas.height)
  //Background moving
  
  bg1y += 2
  bg2y += 2
  
  if(bg1y > myCanvas.height){
    bg1y = -myCanvas.height
  }
  if(bg2y > myCanvas.height){
    bg2y = -myCanvas.height
  }
}



class Obstacle {
  constructor(img, xPosition, yPosition, width=3, height=3){
  this.img = img;
  this.xPosition = xPosition;
  this.yPosition = yPosition;
  this.width = width;
  this.height = height;
  }

}



let obstacle1 = new Obstacle(obstacleImg, 50, 0, 30, 30)

let obstacle2 = new Obstacle(obstacleImg, 80, 0, 30, 30)


Obstacle.allInstances = [];
Obstacle.allInstances.push(obstacle1, obstacle2);
console.log(Obstacle.allInstances)


const generateRandomNumber = () =>{
  let randomObstacleX = Math.floor(roadGap + Math.random() * (myCanvas.width - roadGap))
  //console.log(randomObstacleX)
  return randomObstacleX
}



//create obstacles
const createObstacles = () =>{
  Obstacle.allInstances = [];
  for(i=0;i<10;i++){
    let randomObstacleX = generateRandomNumber()
    let obstacle = new Obstacle(obstacleImg, randomObstacleX, 0, 30, 30)
    Obstacle.allInstances.push(obstacle)

    drawObstacle (obstacleImg, randomObstacleX, 0, 30, 30)
  }
  console.log(Obstacle.allInstances)
  console.log(Obstacle.allInstances[0].xPosition)
  
  

}


const drawObstacle = (obstacleImg, xPosition, yPosition, width, height) =>{
  //ctx.fillRect(xPosition, yPosition, width, height); 
  ctx.drawImage(obstacleImg, xPosition, yPosition, width, height)



}

const moveObstacles = () =>{
  Obstacle.allInstances.forEach(obstacle =>obstacle.yPosition += 1)
  
}




function animate (){

  drawBg()
  drawCar()
  
  //draw obstacles
  drawObstacle(Obstacle.allInstances[0].img, Obstacle.allInstances[0].xPosition, Obstacle.allInstances[0].yPosition, Obstacle.allInstances[0].width, Obstacle.allInstances[0].height)
  drawObstacle(obstacle1.img, obstacle1.xPosition, obstacle1.yPosition, obstacle1.width, obstacle1.height)
  drawObstacle(obstacle2.img, obstacle2.xPosition, obstacle2.yPosition, obstacle2.width, obstacle2.height)

  moveObstacles()



  //Game over
  if(!gameOver){
    animateId = requestAnimationFrame(animate)
  }
  else{
    cancelAnimationFrame(animateId)
  }


  
  
}

function startGame() {
  animate()
  createObstacles()
  drawObstacle(obstacleImg, 5, 0)
  moveObstacles()
  //keys
  
  document.addEventListener('keydown',event => {
  if(event.key === "ArrowRight" /* && carImgX > 20 */){
    //console.log("right", event)
    isMovingRight = true

  }
  if(event.key === 'ArrowLeft' /* && carImgX < myCanvas.width - 20 */){
    //console.log("left", event)
    isMovingLeft = true
  
  }
  
  })  
  
  document.addEventListener('keyup',() => {
    //console.log("keyup", "isMovingLeft:", isMovingLeft, "isMovingRight:", isMovingRight)
    isMovingRight = false
    isMovingLeft = false
  })
  
  }


};

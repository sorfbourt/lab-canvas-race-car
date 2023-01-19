const myCanvas = document.querySelector('canvas')
const ctx = myCanvas.getContext('2d')
myCanvas.style.border = '2px solid black'


const carImg = new Image()
carImg.src = '../images/car.png'
const bgImg = new Image()
bgImg.src = '../images/road.png'
const bgImg2 = new Image()
bgImg2.src = '../images/road.png'

let bg1y = 0
let bg2y = -myCanvas.height
const carImgWidth = 50
const carImgHeight = 90
let carImgX = myCanvas.width/2 - carImgWidth/2
let carImgY = myCanvas.height - carImgHeight - 20


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
    if(isMovingLeft && carImgX > 25){
      carImgX -= 1
    }
    
    //move car right
    if(isMovingRight && carImgX < (myCanvas.width - carImgWidth - 25)){
      carImgX += 1
      }

}

const drawBg = () =>{
  ctx.drawImage(bgImg, 0, bg1y, myCanvas.width, myCanvas.height)
  ctx.drawImage(bgImg2, 0, bg2y, myCanvas.width, myCanvas.height)

}

const bgMoving = () =>{
  bg1y += 2
  bg2y += 2

  if(bg1y > myCanvas.height){
    bg1y = -myCanvas.height
  }
  if(bg2y > myCanvas.height){
    bg2y = -myCanvas.height
  }

}





function animate (){

  drawBg()
  drawCar()
  bgMoving()
  

  // move car




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
  console.log(carImgX, carImgY)
  //keys
  
  document.addEventListener('keydown',event => {
  if(event.key === "ArrowRight" /* && carImgX > 20 */){
    console.log("right", event)
    isMovingRight = true

  }
  if(event.key === 'ArrowLeft' /* && carImgX < myCanvas.width - 20 */){
    console.log("left", event)
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

const canvas = <HTMLCanvasElement>document.getElementById("myCanvas")
let ctx = <CanvasRenderingContext2D>canvas.getContext("2d")

let x = canvas.width / 2
let y = canvas.height - 30

let dx = 2
let dy = -2
const ballRadius = 10

const paddleHeight = 10
const paddleWidth = 75
let paddleX = (canvas.width - paddleWidth) / 2

let rightPressed = false
let leftPressed = false

const drawBall = () => {
  ctx.beginPath()

  ctx.arc(x, y, ballRadius, 0, Math.PI * 2)
  ctx.fillStyle = "#0095DD"
  ctx.fill()

  ctx.closePath()
}

const drawPaddle = () => {
  ctx.beginPath()

  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight)
  ctx.fillStyle = "#0095DD"
  ctx.fill()

  ctx.closePath()
}

const draw = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  drawBall()
  drawPaddle()

  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx
  }
  if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
    dy = -dy
  }

  x += dx
  y += dy

  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 7;
  }
  else if (leftPressed && paddleX > 0) {
    paddleX -= 7;
  }
}

const keyDownHandler = (e: KeyboardEvent) => {
  if (e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = true
  }
  else if (e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = true
  }
}

const keyUpHandler = (e: KeyboardEvent) => {
  if (e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = false
  }
  else if (e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = false
  }
}

const main = () => {
  document.addEventListener("keydown", keyDownHandler, false)
  document.addEventListener("keyup", keyUpHandler, false)

  setInterval(draw, 10)
}

main()
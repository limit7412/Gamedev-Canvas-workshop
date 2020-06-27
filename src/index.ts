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

const brickRowCount = 3
const brickColumnCount = 5
const brickWidth = 75
const brickHeight = 20
const brickPadding = 10
const brickOffsetTop = 30
const brickOffsetLeft = 30

let score = 0
let lives = 3

let bricks: Array<Array<{ x: number, y: number, status: boolean }>> = new Array()
for (var c = 0; c < brickColumnCount; c++) {
  bricks[c] = []
  for (var r = 0; r < brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0, status: true }
  }
}

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

const drawBricks = () => {
  for (var c = 0; c < brickColumnCount; c++) {
    for (var r = 0; r < brickRowCount; r++) {
      if (bricks[c][r].status) {
        const brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft
        const brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop

        bricks[c][r].x = brickX
        bricks[c][r].y = brickY

        ctx.beginPath()

        ctx.rect(brickX, brickY, brickWidth, brickHeight)
        ctx.fillStyle = "#0095DD"
        ctx.fill()

        ctx.closePath()
      }
    }
  }
}

const collisionDetection = () => {
  for (var c = 0; c < brickColumnCount; c++) {
    for (var r = 0; r < brickRowCount; r++) {
      var b = bricks[c][r]
      if (b.status) {
        if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
          dy = -dy
          b.status = false
          score++
          if (score == brickRowCount * brickColumnCount) {
            alert("YOU WIN, CONGRATULATIONS!")
            document.location.reload()
          }
        }
      }
    }
  }
}

const drawScore = () => {
  ctx.font = "16px Arial"
  ctx.fillStyle = "#0095DD"
  ctx.fillText("Score: " + score, 8, 20)
}

const drawLives = () => {
  ctx.font = "16px Arial"
  ctx.fillStyle = "#0095DD"
  ctx.fillText("Lives: " + lives, canvas.width - 65, 20)
}

const draw = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  drawBall()
  drawPaddle()
  collisionDetection()
  drawBricks()
  drawScore()

  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx
  }
  if (y + dy < ballRadius) {
    dy = -dy
  } else if (y + dy > canvas.height - ballRadius) {
    if (x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy
    }
    else {
      lives--
      if (!lives) {
        alert("GAME OVER")
        document.location.reload()
      }
      else {
        x = canvas.width / 2
        y = canvas.height - 30
        dx = 2
        dy = -2
        paddleX = (canvas.width - paddleWidth) / 2
      }
    }
  }
  x += dx
  y += dy

  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 7;
  }
  else if (leftPressed && paddleX > 0) {
    paddleX -= 7;
  }

  requestAnimationFrame(draw)
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

const mouseMoveHandler = (e: MouseEvent) => {
  var relativeX = e.clientX - canvas.offsetLeft
  if (relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - paddleWidth / 2
  }
}

const main = () => {
  document.addEventListener("keydown", keyDownHandler, false)
  document.addEventListener("keyup", keyUpHandler, false)
  document.addEventListener("mousemove", mouseMoveHandler, false)

  draw()
}

main()
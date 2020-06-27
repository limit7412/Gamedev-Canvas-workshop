const constant = {
  ball: {
    radius: 10,
  },
  paddle: {
    height: 10,
    width: 75,
  },
  brick: {
    count: {
      row: 3,
      column: 5,
    },
    width: 75,
    height: 20,
    padding: 10,
    offset: {
      top: 30,
      left: 30,
    },
  },
}

class Status {
  public canvas = <HTMLCanvasElement>document.getElementById("myCanvas")
  public ctx = <CanvasRenderingContext2D>this.canvas.getContext("2d")

  public x = this.canvas.width / 2
  public y = this.canvas.height - 30

  public dx = 2
  public dy = -2

  public paddleX = (this.canvas.width - constant.paddle.width) / 2

  public rightPressed = false
  public leftPressed = false

  public score = 0
  public lives = 3

  constructor() { }
}

let bricks: Array<Array<{ x: number, y: number, status: boolean }>> = new Array()
for (var c = 0; c < constant.brick.count.column; c++) {
  bricks[c] = []
  for (var r = 0; r < constant.brick.count.row; r++) {
    bricks[c][r] = { x: 0, y: 0, status: true }
  }
}

const drawBall = (status: Status) => {
  status.ctx.beginPath()

  status.ctx.arc(status.x, status.y, constant.ball.radius, 0, Math.PI * 2)
  status.ctx.fillStyle = "#0095DD"
  status.ctx.fill()

  status.ctx.closePath()
}

const drawPaddle = (status: Status) => {
  status.ctx.beginPath()

  status.ctx.rect(
    status.paddleX,
    status.canvas.height - constant.paddle.height,
    constant.paddle.width, constant.paddle.height
  )
  status.ctx.fillStyle = "#0095DD"
  status.ctx.fill()

  status.ctx.closePath()
}

const drawBricks = (status: Status) => {
  for (var c = 0; c < constant.brick.count.column; c++) {
    for (var r = 0; r < constant.brick.count.row; r++) {
      if (bricks[c][r].status) {
        const brickX = (c * (constant.brick.width + constant.brick.padding)) + constant.brick.offset.left
        const brickY = (r * (constant.brick.height + constant.brick.padding)) + constant.brick.offset.top

        bricks[c][r].x = brickX
        bricks[c][r].y = brickY

        status.ctx.beginPath()

        status.ctx.rect(brickX, brickY, constant.brick.width, constant.brick.height)
        status.ctx.fillStyle = "#0095DD"
        status.ctx.fill()

        status.ctx.closePath()
      }
    }
  }
}

const collisionDetection = (status: Status) => {
  for (var c = 0; c < constant.brick.count.column; c++) {
    for (var r = 0; r < constant.brick.count.row; r++) {
      var b = bricks[c][r]
      if (b.status) {
        if (
          status.x > b.x &&
          status.x < b.x + constant.brick.width &&
          status.y > b.y
          && status.y < b.y + constant.brick.height
        ) {
          status.dy = -status.dy
          b.status = false
          status.score++
          if (status.score == constant.brick.count.row * constant.brick.count.column) {
            alert("YOU WIN, CONGRATULATIONS!")
            document.location.reload()
          }
        }
      }
    }
  }
}

const drawScore = (status: Status) => {
  status.ctx.font = "16px Arial"
  status.ctx.fillStyle = "#0095DD"
  status.ctx.fillText("Score: " + status.score, 8, 20)
}

const drawLives = (status: Status) => {
  status.ctx.font = "16px Arial"
  status.ctx.fillStyle = "#0095DD"
  status.ctx.fillText("Lives: " + status.lives, status.canvas.width - 65, 20)
}

const draw = (status: Status) => {
  status.ctx.clearRect(0, 0, status.canvas.width, status.canvas.height)

  drawBall(status)
  drawPaddle(status)
  collisionDetection(status)
  drawBricks(status)
  drawScore(status)

  if (
    status.x + status.dx > status.canvas.width - constant.ball.radius ||
    status.x + status.dx < constant.ball.radius
  ) {
    status.dx = -status.dx
  }
  if (status.y + status.dy < constant.ball.radius) {
    status.dy = -status.dy
  } else if (status.y + status.dy > status.canvas.height - constant.ball.radius) {
    if (status.x > status.paddleX && status.x < status.paddleX + constant.paddle.width) {
      status.dy = -status.dy
    }
    else {
      status.lives--
      if (!status.lives) {
        alert("GAME OVER")
        document.location.reload()
      }
      else {
        status.x = status.canvas.width / 2
        status.y = status.canvas.height - 30
        status.dx = 2
        status.dy = -2
        status.paddleX = (status.canvas.width - constant.paddle.width) / 2
      }
    }
  }
  status.x += status.dx
  status.y += status.dy

  if (status.rightPressed && status.paddleX < status.canvas.width - constant.paddle.width) {
    status.paddleX += 7;
  }
  else if (status.leftPressed && status.paddleX > 0) {
    status.paddleX -= 7;
  }

  requestAnimationFrame(() => {
    draw(status)
  })
}

const keyDownHandler = (e: KeyboardEvent, status: Status) => {
  if (e.key == "Right" || e.key == "ArrowRight") {
    status.rightPressed = true
  }
  else if (e.key == "Left" || e.key == "ArrowLeft") {
    status.leftPressed = true
  }
}

const keyUpHandler = (e: KeyboardEvent, status: Status) => {
  if (e.key == "Right" || e.key == "ArrowRight") {
    status.rightPressed = false
  }
  else if (e.key == "Left" || e.key == "ArrowLeft") {
    status.leftPressed = false
  }
}

const mouseMoveHandler = (e: MouseEvent, status: Status) => {
  const relativeX = e.clientX - status.canvas.offsetLeft
  if (relativeX > 0 && relativeX < status.canvas.width) {
    status.paddleX = relativeX - constant.paddle.width / 2
  }
}

const main = () => {
  const status = new Status()

  document.addEventListener("keydown", (e: KeyboardEvent) => {
    keyDownHandler(e, status)
  }, false)
  document.addEventListener("keyup", (e: KeyboardEvent) => {
    keyUpHandler(e, status)
  }, false)
  document.addEventListener("mousemove", (e: MouseEvent) => {
    mouseMoveHandler(e, status)
  }, false)

  draw(status)
}

main()
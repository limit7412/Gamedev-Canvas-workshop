const canvas = <HTMLCanvasElement>document.getElementById("myCanvas")
let ctx = <CanvasRenderingContext2D>canvas.getContext("2d")

let x = canvas.width / 2
let y = canvas.height - 30

const dx = 2
const dy = -2

const drawBall = () => {
  ctx.beginPath()
  ctx.arc(x, y, 10, 0, Math.PI * 2)
  ctx.fillStyle = "#0095DD"
  ctx.fill()
  ctx.closePath()
}

const draw = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  drawBall()

  x += dx
  y += dy
}

const main = () => {
  setInterval(draw, 10)
}

main()
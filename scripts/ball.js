import { incrementProperty, randomNumber, setProperty } from "./utils.js"

const STARTING_BALL_SPEED = 0.2
const BALL_SPEED_ICNREASE_VALUE = 0.00005

export default class Ball {
  constructor(elem) {
    this.elem = elem
    this.setUp()
  }

  setUp = () => {
    setProperty(
      this.elem,
      "--top",
      window.innerHeight / 2 -
        parseFloat(getComputedStyle(this.elem).height) / 2
    )
    setProperty(
      this.elem,
      "--left",
      window.innerWidth / 2 - parseFloat(getComputedStyle(this.elem).width) / 2
    )

    this.ballSpeed = STARTING_BALL_SPEED

    this.direction = {
      y: randomNumber(-1, 1),
      x: -1,
    }
  }

  rect = () => this.elem.getBoundingClientRect()

  onCollision = isPaddleCollision => {
    if (isPaddleCollision === true) {
      this.direction.x *= -1
      this.direction.y = randomNumber(-1, 1)
      return
    }

    this.direction.y *= -1
  }

  update = delta => {
    const ballRect = this.rect()
    const height = parseFloat(getComputedStyle(this.elem).height)

    if (ballRect.y <= 0 || ballRect.y + height >= window.innerHeight)
      this.onCollision()

    incrementProperty(
      this.elem,
      "--top",
      this.direction.y * this.ballSpeed * delta
    )
    incrementProperty(
      this.elem,
      "--left",
      this.direction.x * this.ballSpeed * delta
    )

    this.ballSpeed += delta * BALL_SPEED_ICNREASE_VALUE
  }
}

import { getProperty, incrementProperty, setProperty } from "./utils.js";

const PADDLE_MAX_SPEED = 5;

class Paddle {
  constructor(elem) {
    this.elem = elem;
    this.setUp();
  }

  setUp = () => {
    setProperty(
      this.elem,
      "--top",
      window.innerHeight / 2 -
        parseFloat(getComputedStyle(this.elem).height) / 2
    );
  };

  rect = () => this.elem.getBoundingClientRect();
}

export class Player extends Paddle {
  constructor(elem) {
    super(elem);
    document.addEventListener("mousemove", (e) =>
      this.changeToMousePosition(e.y)
    );
  }

  changeToMousePosition = (top) => {
    const height = parseInt(getComputedStyle(this.elem).height);

    if (top + height / 2 > window.innerHeight)
      return setProperty(this.elem, "--top", window.innerHeight - height);

    if (top - height / 2 < 0) return setProperty(this.elem, "--top", 0);

    setProperty(this.elem, "--top", top - height / 2);
  };
}

export class Opponent extends Paddle {
  constructor(elem, targetElem) {
    super(elem);
    this.target = targetElem;
  }

  update = () => {
    const targetTop = parseFloat(getProperty(this.target, "--top"));
    const paddleTop = parseFloat(getProperty(this.elem, "--top"));
    const height = parseFloat(getComputedStyle(this.elem).height);
    const targetHeight = parseFloat(getComputedStyle(this.target).height);

    let pxToMove = targetTop - paddleTop - height / 2 - targetHeight / 2;

    if (pxToMove > PADDLE_MAX_SPEED || pxToMove < PADDLE_MAX_SPEED * -1)
      pxToMove = (pxToMove / Math.abs(pxToMove)) * PADDLE_MAX_SPEED;

    if (paddleTop + pxToMove < 0) return setProperty(this.elem, "--top", 0);
    if (paddleTop + pxToMove > window.innerHeight - height)
      return setProperty(this.elem, "--top", window.innerHeight - height);

    incrementProperty(this.elem, "--top", pxToMove);
  };
}

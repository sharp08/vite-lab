interface IOptions {
  x: number;
  y: number;
  r: number;
  vx?: number;
  vy?: number;
}

class Ball {
  ctx: CanvasRenderingContext2D;
  options: IOptions;

  constructor(ctx: CanvasRenderingContext2D, options: IOptions) {
    const { x, y, r, vx = 1, vy = 3 } = options;
    this.options = {
      x,
      y,
      r,
      vx,
      vy
    };

    this.ctx = ctx;
    this.ctx.beginPath();
    this.ctx.arc(x, y, r, 0, 2 * Math.PI);
    this.ctx.stroke();
  }
}
export { Ball };

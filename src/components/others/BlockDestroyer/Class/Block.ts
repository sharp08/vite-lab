interface IOptions {
  x: number;
  y: number;
  w: number;
  h: number;
  c?: string;
}
class Block {
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  w: number;
  h: number;
  c: string;
  constructor(ctx: CanvasRenderingContext2D, options: IOptions) {
    const { x, y, w, h, c = "green" } = options;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.c = c;
    this.ctx = ctx;
    this.ctx.fillStyle = c;
    this.ctx.fillRect(x, y, w, h);
  }
}
export { Block };

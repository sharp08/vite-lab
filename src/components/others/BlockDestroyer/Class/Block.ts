import { Paper } from "./Paper";

type PaperType = InstanceType<typeof Paper>;
interface IOptions {
  x: number;
  y: number;
  w: number;
  h: number;
  c?: string;
}
class Block {
  ctx: CanvasRenderingContext2D;
  paper: PaperType;
  options: IOptions;
  
  constructor(
    ctx: CanvasRenderingContext2D,
    paper: PaperType,
    options: IOptions
  ) {
    const { x, y, w, h, c = "green" } = options;
    this.options = {
      x,
      y,
      w,
      h,
      c
    };
    this.ctx = ctx;
    this.paper = paper;
    this.ctx.fillStyle = c;
    this.ctx.fillRect(x, y, w, h);

    // 存入 paper
    this.paper.addBlock(this);
  }
}

export { Block };

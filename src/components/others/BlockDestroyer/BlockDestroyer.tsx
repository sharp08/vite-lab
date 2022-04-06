import {
  defineComponent,
  onMounted,
  onActivated,
  onDeactivated,
  onBeforeUnmount,
  ref
} from "vue";

import { Paper, Block, Ball } from "./Class";

import ms from "./BlockDestroyer.module.less";

export default defineComponent({
  name: "BlockDestroyer",
  setup(props, context) {
    const cvsRef = ref<HTMLCanvasElement>();
    let ctx: CanvasRenderingContext2D;

    const paper = new Paper({ w: 550, h: 400 });
    function init() {
      ctx = cvsRef.value.getContext("2d");
      // 上边
      new Block(ctx, paper, { x: 30, y: 0, w: 100, h: 30 });
      new Block(ctx, paper, { x: 130, y: 0, w: 100, h: 30, c: "orange" });
      new Block(ctx, paper, { x: 230, y: 0, w: 100, h: 30 });
      // 左边
      new Block(ctx, paper, { x: 0, y: 0, w: 30, h: 100, c: "orange" });
      new Block(ctx, paper, { x: 0, y: 100, w: 30, h: 100 });
      // 下边
      new Block(ctx, paper, { x: 30, y: 170, w: 100, h: 30, c: "orange" });
      new Block(ctx, paper, { x: 130, y: 170, w: 100, h: 30 });
      new Block(ctx, paper, { x: 230, y: 170, w: 100, h: 30, c: "orange" });
      // 右边
      new Block(ctx, paper, { x: 330, y: 100, w: 30, h: 100 });
      new Block(ctx, paper, { x: 330, y: 0, w: 30, h: 100, c: "orange" });
      loop();
    }

    let xPos = 60;
    let yPos = 90;
    let xBool = true; //  是否沿 x 轴正方向运动
    let yBool = true;
    let stop = false;

    function loop() {
      ctx.clearRect(30, 30, 300, 140); //  只清除内层

      const ball = new Ball(ctx, { x: xPos + 1, y: yPos, r: 30 });
      const { r, vx, vy } = ball.options;
      // x 轴方向
      if (xBool) {
        if (xPos <= 330 - r - 3) xPos = xPos + vx;
        else xBool = false; //  触边
      } else {
        if (xPos >= 30 + r + 3) xPos = xPos - vx;
        else xBool = true; //  触边
      }
      // y 轴方向
      if (yBool) {
        if (yPos <= 170 - r - 3) yPos = yPos + vy;
        else yBool = false;
      } else {
        if (yPos >= 30 + r + 4) yPos = yPos - vy;
        else yBool = true;
      }

      if (stop) return;
      window.requestAnimationFrame(loop);
    }

    onMounted(() => {
      init();
    });
    onActivated(() => {});
    onDeactivated(() => {
      stop = true;
    });
    onBeforeUnmount(() => {
      stop = true;
    });
    return () => (
      <div class={ms.container}>
        <canvas
          ref={cvsRef}
          width={paper.options.w}
          height={paper.options.h}
          class={ms.canvas}
        >
          BlockDestroyer
        </canvas>
      </div>
    );
  }
});

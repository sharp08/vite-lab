interface IPoint {
  sx: number;
  sy: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
  size: number;
}

interface IClick {
  sx: number;
  sy: number;
  color: string;
  life: number;
  vx: number;
  vy: number;
}

let canvas = document.createElement("canvas");
canvas.setAttribute("id", "comet");
let ctx = canvas.getContext("2d");
window.document.body.appendChild(canvas);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.setAttribute(
  "style",
  "position:fixed;left:0;top:0;pointer-events:none;"
);
let clicks: IClick[] = [];
let points: IPoint[] = []; //定义粒子数组
const live = 50; //存活50个周期
//备选粒子颜色数组
const colors = [
  "236, 204, 104",
  "255, 71, 87",
  "112, 161, 255",
  "123, 237, 159"
];

//监听鼠标移动事件
function mousemove(e: MouseEvent) {
  for (var i = 0; i < 15; i++) {
    //添加15个粒子
    points.push({
      sx: e.x, //鼠标当前坐标作为粒子坐标
      sy: e.y,
      vx: 0.5 - Math.random(), //x轴及y轴的移动向量，取值范围为-0.5 ~ 0.5
      vy: 0.5 - Math.random(),
      life: live, //存活周期
      color: colors[parseInt(Math.random() * colors.length + "")], //随机选择颜色
      size: Math.random() * 5 //随机粒子尺寸，取值范围为0~5
    });
  }
}

//监听点击事件
function click(e: PointerEvent) {
  for (var i = 0; i < 100; i++) {
    clicks.push({
      sx: e.x,
      sy: e.y,
      color: colors[parseInt(Math.random() * colors.length + "")],
      life: live,
      vx: 0.5 - Math.random(), //x轴及y轴的移动向量，取值范围为-0.5 ~ 0.5
      vy: 0.5 - Math.random()
    });
  }
}

window.addEventListener("mousemove", mousemove);
window.addEventListener("click", click);

//绘制粒子
function drawpoints() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); //清屏
  for (var i = 0; i < points.length; i++) {
    //遍历粒子
    let point = points[i]; //定义单个粒子
    ctx.beginPath();
    ctx.arc(point.sx, point.sy, point.size, 0, Math.PI * 2, false); //根据粒子属性画圆
    ctx.fillStyle = "rgba(" + point.color + "," + point.life / live + ")"; //根据粒子属性设置填充颜色及透明度
    ctx.fill(); //填充颜色
    point.life--; //生命值减1
    if (point.life <= 0) {
      //生命值为0则从粒子数组中删除
      points.splice(i, 1);
    }
    point.sx += point.vx * 3; //根据向量值改变粒子位置
    point.sy += point.vy * 3;
    point.vy += 0.03;
  }
  for (var i = 0; i < clicks.length; i++) {
    //绘制点击效果
    let click = clicks[i];
    ctx.fillStyle = "rgba(" + click.color + "," + click.life / live + ")";
    ctx.fillRect(click.sx, click.sy, 3, 3);
    click.sx += click.vx * 10;
    click.sy += click.vy * 10;
    click.vy += 0.02;
    click.life--;
    if (click.life <= 0) {
      clicks.splice(i, 1);
    }
  }
}
setInterval(drawpoints, 20); //20毫秒绘制一次

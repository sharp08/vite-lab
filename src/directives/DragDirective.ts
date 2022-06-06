import { DirectiveBinding, App } from "vue";
import { Notice } from "@/components/global/Notice";

class Drag {
  el: HTMLElement;
  x: number;
  y: number;

  // 每个用到指令的 dom 挂载时调用
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const pos = getComputedStyle(el).position;
    if (!["absolute", "fixed"].includes(pos)) {
      console.r("当前元素", el);
      Notice.error("需要拖拽的元素必须是绝对定位或固定定位");
      return;
    }
    this.el = el;

    el.addEventListener("mousedown", this.#mounsedown);
  }
  remove(el: HTMLElement, binding: DirectiveBinding) {
    el.removeEventListener("mousedown", this.#mounsedown);
  }
  // 按下
  #mounsedown = (e: MouseEvent) => {
    this.x = this.el.offsetLeft - e.clientX;
    this.y = this.el.offsetTop - e.clientY;

    document.addEventListener("mousemove", this.#mousemove);
    document.addEventListener("mouseup", this.#mouseup);
  };
  // 移动
  #mousemove = (e: MouseEvent) => {
    // 限制拖拽范围
    let h = e.clientX + this.x;
    let v = e.clientY + this.y;

    this.el.style.left = h + "px";
    this.el.style.top = v + "px";
  };
  // 抬起
  #mouseup = () => {
    document.removeEventListener("mousemove", this.#mousemove);
  };
}

export const DragDirective = (app: App) => {
  const drag = new Drag();
  app.directive("draggable", {
    mounted: drag.mounted.bind(drag),
    beforeUnmount: drag.remove.bind(drag)
  });
};

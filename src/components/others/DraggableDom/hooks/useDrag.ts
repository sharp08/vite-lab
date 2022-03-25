import { onMounted, ref, onBeforeUnmount } from "vue";
import type { Ref } from "vue";

export function useDrag(dragRef: Ref<HTMLElement>) {
  let x = ref<number>();
  let y = ref<number>();
  // 按下鼠标
  const mounsedown = (e: MouseEvent) => {
    x.value = dragRef.value.offsetLeft - e.clientX;
    y.value = dragRef.value.offsetTop - e.clientY;

    document.addEventListener("mousemove", mousemove);
    document.addEventListener("mouseup", mouseup);
  };
  // 移动
  const mousemove = function (e: MouseEvent) {
    // 限制拖拽范围
    let h = e.clientX + x.value;
    let v = e.clientY + y.value;

    dragRef.value.style.left = h + "px";
    dragRef.value.style.top = v + "px";
  };
  // 抬起
  const mouseup = function () {
    document.removeEventListener("mousemove", mousemove);
  };

  onMounted(() => {
    dragRef.value.addEventListener("mousedown", mounsedown);
  });
  onBeforeUnmount(() => {
    dragRef.value.removeEventListener("mousedown", mounsedown);
  });
}

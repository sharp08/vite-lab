import { onMounted, ref, onBeforeUnmount } from "vue";
import type { Ref } from "vue";

export function useResize(
  dragRef: Ref<HTMLElement>,
  resizeRef: Ref<HTMLElement>
) {
  let x = ref<number>();
  let y = ref<number>();
  let originWidth = ref<number>();
  let originHeight = ref<number>();
  // 按下鼠标
  const mounsedown = (e: MouseEvent) => {
    e.stopPropagation();
    x.value = e.clientX;
    y.value = e.clientY;
    originWidth.value = dragRef.value.clientWidth;
    originHeight.value = dragRef.value.clientHeight;

    document.addEventListener("mousemove", mousemove);
    document.addEventListener("mouseup", mouseup);
  };

  // 移动
  const mousemove = function (e: MouseEvent) {
    e.stopPropagation();
    let xDis = e.clientX - x.value;
    let yDis = e.clientY - y.value;

    dragRef.value.style.width = originWidth.value + xDis + "px";
    dragRef.value.style.height = originHeight.value + yDis + "px";
  };

  // 抬起
  const mouseup = function (e: MouseEvent) {
    e.stopPropagation();
    document.removeEventListener("mousemove", mousemove);
  };
  onMounted(() => {
    resizeRef.value.addEventListener("mousedown", mounsedown);
  });
  onBeforeUnmount(() => {
    resizeRef.value.removeEventListener("mousedown", mounsedown);
  });
}

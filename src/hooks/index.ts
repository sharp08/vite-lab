import { watch, customRef, ref, onMounted, onBeforeUnmount } from "vue";
import { useRoute, useRouter } from "vue-router";
import type { Ref } from "vue";
import type { RouteLocationNormalized } from "vue-router";

const useCurrentRoute = () => {
  let currentRoute: RouteLocationNormalized = null;
  const route = useRoute();

  watch(
    route,
    newVal => {
      currentRoute = newVal;
    },
    { immediate: true }
  );
  return currentRoute;
};

const useDebounceRef = <T>(value: T, delay: number = 500): Ref<T> => {
  let timer;
  return customRef((track, trigger) => {
    return {
      get() {
        track();
        return value;
      },
      set(newVal) {
        clearTimeout(timer);
        timer = setTimeout(() => {
          value = newVal;
          trigger();
        }, delay);
      }
    };
  });
};

// 拖拽
const useDrag = (dragRef: Ref<HTMLElement>) => {
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
};

export { useCurrentRoute, useDebounceRef, useDrag };

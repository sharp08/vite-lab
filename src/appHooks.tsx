import { onBeforeUnmount, Transition } from "vue";
import dayjs from "dayjs";

export function useSlot() {
  const slots = {
    default: ({ Component, route }) => (
      <Transition
        enter-active-class="animate__animated animate__fadeIn"
        leave-active-class="animate__animated animate__fadeOut"
        mode="out-in"
        duration={1000}
        name="custom-classes-transition"
      >
        {Component}
      </Transition>
    )
  };
  return slots;
}

// 动态设置 document.title
export function useDynamicTitle() {
  let timer: number;

  document.title = dayjs().format("MM-DD HH:mm:ss");
  clearInterval(timer);
  timer = window.setInterval(() => {
    document.title = dayjs().format("MM-DD HH:mm:ss");
  }, 1000);

  onBeforeUnmount(() => {
    clearInterval(timer);
  });
}

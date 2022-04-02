import { defineComponent, onBeforeUnmount, KeepAlive, Transition } from "vue";
import { RouterView } from "vue-router";
import dayjs from "dayjs";

import "./App.less";

export default defineComponent({
  name: "App",
  setup() {
    // 动态设置 document.title
    let timer: number;

    const slots = {
      default: ({ Component, route }) => (
        <Transition
          enter-active-class="animate__animated animate__fadeIn"
          leave-active-class="animate__animated animate__fadeOut"
          mode="out-in"
          duration={1000}
          name="custom-classes-transition"
        >
          <KeepAlive>{Component}</KeepAlive>
        </Transition>
      )
    };
    document.title = dayjs().format("MM-DD HH:mm:ss");
    clearInterval(timer);
    timer = window.setInterval(() => {
      document.title = dayjs().format("MM-DD HH:mm:ss");
    }, 1000);

    onBeforeUnmount(() => {
      clearInterval(timer);
    });
    return () => <RouterView v-slots={slots}></RouterView>;
  }
});

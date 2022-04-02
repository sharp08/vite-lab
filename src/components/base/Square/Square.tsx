import { defineComponent, KeepAlive, Transition } from "vue";
import { RouterView } from "vue-router";

import ms from "./Square.module.less";

export default defineComponent({
  name: "Square",
  setup() {
    const slots = {
      default: ({ Component, route }) => (
        <Transition
          enter-active-class="animate__animated animate__lightSpeedInLeft"
          leave-active-class="animate__animated animate__lightSpeedOutRight"
          mode="out-in"
          duration={1000}
          name="custom-classes-transition"
        >
          <KeepAlive>{Component}</KeepAlive>
        </Transition>
      )
    };
    return () => (
      <Card class={ms["square-container"]}>
        <RouterView v-slots={slots}></RouterView>
      </Card>
    );
  }
});

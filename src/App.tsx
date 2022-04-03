import { defineComponent } from "vue";
import { RouterView } from "vue-router";

import Clock from "@/components/global/Clock";

import { useSlot, useDynamicTitle } from "./appHooks";
import "./App.less";

export default defineComponent({
  name: "App",
  setup() {
    const slots = useSlot();

    useDynamicTitle();

    return () => (
      <>
        <Clock />
        <RouterView v-slots={slots}></RouterView>
      </>
    );
  }
});

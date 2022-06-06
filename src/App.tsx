import { defineComponent } from "vue";
import { RouterView } from "vue-router";

import { useSlot, useDynamicTitle } from "./appHooks";
import "./App.less";

export default defineComponent({
  name: "App",
  setup() {
    const slots = useSlot();
    // 这里不能拼接字符串，否则打包会报错
    // console.log('aa', import.meta.env.VITE_BASE_API);   //  不行
    // console.log(import.meta.env.VITE_BASE_API);   //  行

    useDynamicTitle();

    return () => (
      <>
        <RouterView v-slots={slots}></RouterView>
      </>
    );
  }
});

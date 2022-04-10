import { defineComponent, KeepAlive, onMounted } from "vue";
import { RouterView } from "vue-router";

import Nav from "@/components/base/Nav";
import ToolBar from "@/components/base/ToolBar";
import createLive2D from "@/assets/js/live2D";

import ms from "./Main.module.less";

export default defineComponent({
  name: "Main",
  setup(props, ctx) {
    onMounted(() => {
      // 创建 live2D
      createLive2D();
    });

    const slots = {
      default: ({ Component, route }) => <KeepAlive>{Component}</KeepAlive>
    };

    return () => (
      <div class={ms.main}>
        <Nav></Nav>
        <div class={ms.main__right}>
          <ToolBar />
          <RouterView v-slots={slots}></RouterView>
        </div>
      </div>
    );
  }
});

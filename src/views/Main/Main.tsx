import { defineComponent, KeepAlive, onBeforeUnmount } from "vue";
import { RouterView } from "vue-router";

import Nav from "@/components/base/Nav";
import ToolBar from "@/components/base/ToolBar";

import ms from "./Main.module.less";

export default defineComponent({
  name: "Main",
  setup(props, ctx) {
    // 切换登录背景可视状态
    function switchCanvas(str: string) {
      (
        document.querySelector("#webgl-canvas") as HTMLCanvasElement
      ).style.display = str;
    }
    switchCanvas("none");
    onBeforeUnmount(() => {
      switchCanvas("");
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

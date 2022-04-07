import { defineComponent } from "vue";

import ms from "./BasePanel.module.less";

export default defineComponent({
  name: "BasePanel",
  setup(props, ctx) {
    return () => <div class={ms["container"]}></div>;
  }
});

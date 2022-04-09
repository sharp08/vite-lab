import { defineComponent } from "vue";

import ms from "./BasePanel.module.less";

export default defineComponent({
  name: "BasePanel",
  setup(props, { slots }) {
    return () => <div class={ms["container"]}>{slots.default()}</div>;
  }
});

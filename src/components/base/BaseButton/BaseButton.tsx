import { defineComponent } from "vue";

import ms from "./BaseButton.module.less";

export default defineComponent({
  name: "BaseButton",
  props: {
    type: {
      type: String,
      default: "default"
    }
  },
  setup(props, { slots }) {
    return () => <div class={ms["btn__" + props.type]}>{slots.default()}</div>;
  }
});

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
  setup(props, ctx) {
    console.log(ms["btn__" + props.type])
    return () => (
      <div class={ms["btn__" + props.type]}>
        <p>Button</p>
      </div>
    );
  }
});

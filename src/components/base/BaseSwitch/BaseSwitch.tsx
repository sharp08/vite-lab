import { defineComponent } from "vue";

import ms from "./BaseSwitch.module.less";

export default defineComponent({
  name: "BaseSwitch",
  props: {
    checked: {
      type: Boolean
    }
  },
  setup(props, ctx) {
    return () => (
      <div class={ms["switch"]}>
        <input id="switch" type="checkbox" hidden checked={props.checked} />
        <label for="switch" class={ms["label"]}></label>
      </div>
    );
  }
});

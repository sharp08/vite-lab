import { defineComponent } from "vue";

import ms from "./BaseRadio.module.less";

export default defineComponent({
  name: "BaseRadio",
  props: {
    checked: {
      type: Boolean
    }
  },
  setup(props, ctx) {
    return () => (
      <div class={ms["radio"]}>
        <input
          id="radio"
          type="radio"
          checked={props.checked}
          name="radio"
          value="1"
          hidden
        />
        <label for="radio"></label>
      </div>
    );
  }
});

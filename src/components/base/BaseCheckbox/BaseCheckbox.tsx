import { defineComponent } from "vue";

import ms from "./BaseCheckbox.module.less";

export default defineComponent({
  name: "BaseCheckbox",
  props: {
    checked: {
      type: Boolean
    }
  },
  setup(props, ctx) {
    return () => (
      <div class={ms["checkbox"]}>
        <input id="checkbox" type="checkbox" hidden checked={props.checked} />
        <label for="checkbox">
          <i class={ms["icons"]}>d</i>
        </label>
      </div>
    );
  }
});

import { defineComponent } from "vue";

import ms from "./BaseInput.module.less";

export default defineComponent({
  name: "BaseInput",
  setup(props, ctx) {
    return () => (
      <div class={ms["form"]}>
        <input
          type="text"
          class={ms["form__input"]}
          placeholder="Type anything..."
        />
      </div>
    );
  }
});

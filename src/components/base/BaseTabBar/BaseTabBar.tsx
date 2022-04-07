import { defineComponent } from "vue";

import ms from "./BaseTabBar.module.less";

export default defineComponent({
  name: "BaseTabBar",
  setup(props, ctx) {
    return () => (
      <div class={ms["segmented-control"]}>
        <input type="radio" name="radio2" value="3" id="tab-1" checked hidden />
        <label for="tab-1" class={ms["segmented-control__1"]}>
          <p>Tab 1</p>
        </label>

        <input type="radio" name="radio2" value="4" id="tab-2" hidden />
        <label for="tab-2" class={ms["segmented-control__2"]}>
          <p>Tab 2</p>
        </label>

        <input type="radio" name="radio2" value="5" id="tab-3" hidden />
        <label for="tab-3" class={ms["segmented-control__3"]}>
          <p>Tab 3</p>
        </label>

        <div class={ms["segmented-control__color"]}></div>
      </div>
    );
  }
});

import { defineComponent } from "vue";

import ms from "./BaseSlider.module.less";

export default defineComponent({
  name: "BaseSlider",
  setup(props, ctx) {
    return () => (
      <div class={ms["slider"]}>
        <div class={ms["slider__box"]}>
          <span class={ms["slider__btn"]} id="find"></span>
          <span class={ms["slider__color"]}></span>
          <span class={ms["slider__tooltip"]}>50%</span>
        </div>
      </div>
    );
  }
});

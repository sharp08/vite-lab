import { defineComponent } from "vue";

import ms from "./BaseWave.module.less";

export default defineComponent({
  name: "BaseWave",
  setup(props, ctx) {
    return () => (
      <div class={ms["circle"]}>
        <span class={ms["circle__btn"]}>
          <ion-icon class="pause" name="pause"></ion-icon>
          <ion-icon class="play" name="play"></ion-icon>
        </span>
        <span class={ms["circle__back-1"]}></span>
        <span class={ms["circle__back-2"]}></span>
      </div>
    );
  }
});

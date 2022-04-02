import { defineComponent } from "vue";

import ms from "./Card.module.less";

export default defineComponent({
  name: "Card",
  setup(props, { slots }) {
    return () => <div class={ms.card}>{slots.default()}</div>;
  }
});

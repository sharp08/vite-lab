import { defineComponent } from "vue";

import ms from "./Card.module.less";

export default defineComponent({
  name: "Card",
  props: {
    backdrop: {
      type: Boolean
    }
  },
  setup(props, { slots }) {
    const className = "card" + (props.backdrop ? "--backdrop" : "");
    return () => <div class={ms[className]}>{slots.default()}</div>;
  }
});

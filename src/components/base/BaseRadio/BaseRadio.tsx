import { defineComponent, computed } from "vue";

import ms from "./BaseRadio.module.less";

export default defineComponent({
  name: "BaseRadio",
  props: {
    checked: {
      type: Boolean
    }
  },
  setup(props, ctx) {
    const renderClass = computed(() =>
      props.checked ? ms["label"] + " " + ms["checked"] : ms["label"]
    );
    return () => (
      <div class={ms["radio"]}>
        <span class={renderClass.value}></span>
      </div>
    );
  }
});

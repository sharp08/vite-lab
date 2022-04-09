import { defineComponent, computed } from "vue";

import ms from "./BaseSwitch.module.less";

export default defineComponent({
  name: "BaseSwitch",
  props: {
    checked: {
      type: Boolean
    }
  },
  setup(props, { emit }) {
    function onClick(e: PointerEvent) {
      const bool = props.checked;
      emit("onClick", bool);
    }
    const renderClass = computed(() =>
      props.checked ? ms["label"] + " " + ms["checked"] : ms["label"]
    );
    return () => (
      <div class={ms["switch"]} onClick={onClick}>
        <span class={renderClass.value}></span>
      </div>
    );
  }
});

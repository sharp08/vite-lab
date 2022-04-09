import { defineComponent, computed } from "vue";

import ms from "./BaseCheckbox.module.less";

export default defineComponent({
  name: "BaseCheckbox",
  props: {
    checked: {
      type: Boolean
    }
  },
  setup(props, { emit }) {
    function onClick() {
      const bool = props.checked;
      emit("onClick", bool);
    }
    const renderClass = computed(() =>
      props.checked ? ms["label"] + " " + ms["checked"] : ms["label"]
    );
    return () => (
      <div class={ms["checkbox"]} onClick={onClick}>
        <span class={renderClass.value}></span>
      </div>
    );
  }
});

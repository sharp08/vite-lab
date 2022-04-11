import { defineComponent, ref } from "vue";

import ms from "./BaseTabBar.module.less";

type Item = { label: string; value: string };
type List = Item[];

export default defineComponent({
  name: "BaseTabBar",
  props: {
    value: {
      type: String
    },
    list: {
      type: Array,
      default: () => [
        { label: "Tab 1", value: "1" },
        { label: "Tab 2 Tab 2", value: "2" },
        { label: "Tab 3", value: "3" }
      ]
    }
  },
  setup(props, { emit }) {
    const bgRef = ref();
    function onClick(e, o) {
      emit("onClick", o.value);
      setTimeout(() => {
        console.log(props.value);
      });
    }
    return () => (
      <div class={ms["container"]}>
        {(props.list as List).map(item => (
          <span class={ms["tag"]} onClick={e => onClick(e, item)}>
            {item.label}
          </span>
        ))}

        {/* <div ref={bgRef} class={ms["current"]}></div> */}
      </div>
    );
  }
});

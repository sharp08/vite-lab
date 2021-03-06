import { defineComponent, ref } from "vue";

import { useDrag } from "@/hooks";
import { useResize } from "./hooks/useResize";

import style from "./DraggableDom.module.less";

export default defineComponent({
  name: "DraggableDom",
  setup(props, ctx) {
    const dragRef = ref<HTMLElement>();
    const resizeRef = ref<HTMLElement>();
    useDrag(dragRef);
    useResize(dragRef, resizeRef);

    return () => (
      <div class={style.container} ref={dragRef}>
        <div class={style.resize_handler} ref={resizeRef}></div>
      </div>
    );
  }
});

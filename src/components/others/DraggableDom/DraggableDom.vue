
<template>
  <div class="draggable-dom-container" ref="dragRef">
    <div class="resize-handler" ref="resizeRef"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useDrag } from "./useDrag";
import { useResize } from "./useResize";

export default defineComponent({
  name: "DraggableDom",
  setup() {
    const dragRef = ref<HTMLElement>();
    const resizeRef = ref<HTMLElement>();
    useDrag(dragRef);
    useResize(dragRef, resizeRef);

    return {
      dragRef,
      resizeRef,
    };
  },
});
</script>
    
<style lang="less" scoped>
@import url(./DraggableDom.less);
</style>

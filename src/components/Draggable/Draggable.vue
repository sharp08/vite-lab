<template>
  <div>Draggable</div>
  <div>{{ val }}</div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";

import { useStore } from "@/store";

export default defineComponent({
  name: "Draggable",
  setup() {
    const store = useStore();
    console.log(store.state.subModuleStore.count);
    let timer;
    clearInterval(timer);
    timer = setInterval(() => {
      store.commit("increment");
    }, 1000);
    return {
      // val: store.state.count,
      val: computed(() => store.state.count),
    };
  },
});
</script>

<style lang="less" scoped>
@import url(./Draggable.less);
</style>

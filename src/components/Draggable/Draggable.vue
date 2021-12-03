<template>
  <div>Draggable</div>
  <div>{{ age }}</div>
  <div>{{ double }}</div>
  <input type="text" v-model="name" />
  <button @click="addAge">重置</button>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { storeToRefs } from "pinia"

import { useRootStore } from "@/store/root.store"

export default defineComponent({
  name: "Draggable",
  setup() {
    const store = useRootStore()

    return {
      ...storeToRefs(store),
      addAge: store.addAge,
    }
  },
})
</script>

<style lang="less" scoped>
@import url(./Draggable.less);
</style>

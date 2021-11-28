<template>
  <Card @click="handleClick" class="nav-container">
    <div :class="{'current':i==current}" :data-idx="i" class="list-item" v-for="i in 10">{{i}}</div>
  </Card>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"

export default defineComponent({
  name: "Nav",
  setup() {
    let current = ref(null)

    const handleClick = (e: PointerEvent) => {
      if (e.target instanceof HTMLElement) {
        current.value = e.target.dataset.idx
      }
    }
    return {
      handleClick,
      current,
    }
  },
})
</script>

<style lang="less" scoped>
@import url(./Nav.less);
</style>

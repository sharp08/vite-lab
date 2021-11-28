<template>
  <div class="card">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
export default defineComponent({
  name: "Card",
})
</script>

<style lang="less" scoped>
@import url(./Card.less);
</style>

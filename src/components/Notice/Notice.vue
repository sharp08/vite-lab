<template>
  <div class="notice">
    <div>{{ abc }}</div>
    <div :key="idx" v-for="(str, idx) in arr">{{ str }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue"

export default defineComponent({
  name: "Notice",
  props: ["abc"],
  setup() {
    let arr = reactive<(number | string)[]>([])
    const add = () => {
      arr.push(+new Date() + "")
    }
    return {
      arr,
      add,
    }
  },
})
</script>

<style lang="less" scoped>
@import url(./notice.less);
</style>

<template>
  <div class="notice">
    <div class="notice-item" :key="idx" v-for="(str, idx) in arr">
      {{ str }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";

export default defineComponent({
  name: "Notice",
  props: ["abc"],
  setup() {
    let arr = reactive<(number | string)[]>([]);
    const add = (str) => {
      arr.push(str);
    };
    return {
      arr,
      add,
    };
  },
});
</script>

<style lang="less" scoped>
@import url(./Notice.less);
</style>

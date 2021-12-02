<template>
  <div class="notice">
    <div>{{ abc }}</div>
    <div v-for="(str, idx) in arr" :key="idx">{{ str }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Notice",
  props: ["abc"],
  data() {
    return {
      arr: [],
    };
  },
  mounted(){
    console.log(this)
  },
  methods: {
    add() {
      this.arr.push(+new Date() + "");
    },
  },
});
</script>

<style lang="less" scoped>
@import url(./notice.less);
</style>

<template>
  <div class="container">
    <div class="cube">
      <div class="rect front">前</div>
      <div class="rect back">后</div>
      <div class="rect left">左</div>
      <div class="rect right">右</div>
      <div class="rect top">上</div>
      <div class="rect bottom">下</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "Cube",
});
</script>

<style lang="less" scoped>
@import url(./Cube.less);
</style>

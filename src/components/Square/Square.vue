<template>
  <Card class="square-container">
    <router-view></router-view>
  </Card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "Square",
});
</script>

<style lang="less" scoped>
@import url(./Square.less);
</style>

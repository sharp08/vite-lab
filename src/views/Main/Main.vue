
<template>
  <div class="main">
    <Nav></Nav>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Nav from "@/components/Nav";

export default defineComponent({
  name: "Main",
  components: {
    Nav,
  },
  setup() {
    return {};
  },
});
</script>
    
<style lang="less" scoped>
@import url(./Main.less);
</style>

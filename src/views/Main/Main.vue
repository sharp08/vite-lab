
<template>
  <div class="main">
    <Nav></Nav>
    <div class="main-right">
      <ToolBar />
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import Nav from "@/components/base/Nav";
import ToolBar from "@/components/base/ToolBar";

export default defineComponent({
  name: "Main",
  components: {
    Nav,
    ToolBar,
  },
  setup() {
    return {};
  },
});
</script>
    
<style lang="less" scoped>
@import url(./Main.less);
</style>

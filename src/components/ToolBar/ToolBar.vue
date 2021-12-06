
<template>
  <Card class="tool-bar">
    <div class="scroll"></div>
    <div
      class="stable"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
    >
      <div class="text">功能列表</div>
      <Card class="menu" v-show="showMenu" @click="handleMenuItem">
        <div
          :key="item.name"
          class="menu-item"
          :data-name="item.name"
          v-for="item in menuList"
        >
          {{ item.name }}
        </div>
      </Card>
    </div>
  </Card>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { useMenu, useMenuItem } from "./hooks";
import Card from "../Card";

export default defineComponent({
  name: "ToolBar",
  components: { Card },
  setup() {
    return {
      ...useMenu(),
      ...useMenuItem(),
    };
  },
});
</script>
    
<style lang="less" scoped>
@import url(./ToolBar.less);
</style>

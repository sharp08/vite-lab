
<template>
  <Card class="tool-bar">
    <div class="scroll"></div>
    <div @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave" class="stable">
      <div class="text">功能列表</div>
      <Card @click="handleMenuItem" class="menu" v-show="showMenu">
        <div
          :data-name="item.name"
          :key="item.name"
          class="menu-item"
          v-for="item in menuList"
        >{{ item.name }}</div>
      </Card>
    </div>
  </Card>
</template>

<script lang="ts">
import { defineComponent } from "vue"

import { useMenu, useMenuItem } from "./hooks"

export default defineComponent({
  name: "ToolBar",
  setup() {
    return {
      ...useMenu(),
      ...useMenuItem(),
    }
  },
})
</script>
    
<style lang="less" scoped>
@import url(./ToolBar.less);
</style>

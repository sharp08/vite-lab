
<template>
  <div class="notice-demo-container">
    <button class="btn info" @click="showNotice('info')">info</button>
    <button class="btn success" @click="showNotice('success')">success</button>
    <button class="btn error" @click="showNotice('error')">error</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { Notice } from "@/components/global/Notice";

export default defineComponent({
  name: "NoticeDemo",
  setup() {
    const showNotice = (type: string) => {
      Notice[type]({
        content: `${new Date()}`,
      });
    };
    return {
      showNotice,
    };
  },
});
</script>
    
<style lang="less" scoped>
@import url(./NoticeDemo.less);
</style>

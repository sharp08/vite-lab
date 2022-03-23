<template>
  <div class="notice-demo-container">
    <button @click="showNotice('info')" class="btn info">info</button>
    <button @click="showNotice('success')" class="btn success">success</button>
    <button @click="showNotice('error')" class="btn error">error</button>
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

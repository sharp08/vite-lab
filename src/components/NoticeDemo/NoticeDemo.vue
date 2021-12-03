
<template>
  <div>
    <button @click="showNotice('info')">info</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { Notice } from "@/components/Notice";

export default defineComponent({
  name: "NoticeDemo",
  setup() {
    const showNotice = (str) => {
      Notice[str](+new Date() + "");
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

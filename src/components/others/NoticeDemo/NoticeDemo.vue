<template>
  <div class="notice-demo-container">
    <button @click="showNotice('info')" class="btn info">info</button>
    <button @click="showNotice('success')" class="btn success">success</button>
    <button @click="showNotice('error')" class="btn error">error</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, onMounted } from "vue";

import { Notice } from "@/components/global/Notice";

export default defineComponent({
  name: "NoticeDemo",
  setup() {
    const app = getCurrentInstance()
    const showNotice = (type: string) => {
      // 全局提示
      // const { appContext: { config: { globalProperties: { $notice } } } } = app
      // $notice[type](`${new Date()}`)

      Notice[type]({
        content: `${new Date()}`,
      });
    };
    onMounted(() => {
    })

    return {
      showNotice,
    };
  },
});
</script>
    
<style lang="less" scoped>
@import url(./NoticeDemo.less);
</style>

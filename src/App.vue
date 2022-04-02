<template>
  <RouterView></RouterView>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount } from "vue";
import dayjs from "dayjs";

export default defineComponent({
  name: "App",
  setup() {
    // 动态设置 document.title
    let timer: number;
    document.title = dayjs().format("MM-DD HH:mm:ss");
    clearInterval(timer);
    timer = window.setInterval(() => {
      document.title = dayjs().format("MM-DD HH:mm:ss");
    }, 1000);

    onBeforeUnmount(() => {
      clearInterval(timer);
    });
    return {};
  },
});
</script>

<style lang="less">
body {
  margin: 0;
  * {
    box-sizing: border-box;
    .scrollBar;
  }
}
</style>

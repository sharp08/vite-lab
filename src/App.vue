<template>
  <Nav />
  <Square />
  <button @click="test">safawefawefawf</button>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted } from "vue";
import dayjs from "dayjs";

import Nav from "@/components/Nav";
import Square from "@/components/Square";
import { Api } from "@/components/Notice";

export default defineComponent({
  name: "App",
  components: {
    Nav,
    Square,
  },
  setup() {
    // onMounted(() => {
    //   Api.info();
    // });
    // 动态设置 document.title
    let timer;
    document.title = dayjs().format("MM-DD HH:mm:ss");
    clearInterval(timer);
    timer = setInterval(() => {
      document.title = dayjs().format("MM-DD HH:mm:ss");
    }, 1000);

    onBeforeUnmount(() => {
      clearInterval(timer);
    });
    return {
      test: () => Api.info(),
    };
  },
});
</script>

<style lang="less">
body {
  margin: 0;
  * {
    box-sizing: border-box;
  }
}
#app {
  display: flex;
  height: 100vh;
  width: 100vw;
}
</style>

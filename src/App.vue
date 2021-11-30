<template>
  <Nav />
  <Square />
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount } from "vue"
import dayjs from "dayjs"

import Nav from "./components/Nav"
import Square from "./components/Square"

export default defineComponent({
  name: "App",
  components: {
    Nav,
    Square,
  },
  setup() {
    // 动态设置 document.title
    let timer: number
    document.title = dayjs().format("MM-DD HH:mm:ss")
    clearInterval(timer)
    timer = setInterval(() => {
      document.title = dayjs().format("MM-DD HH:mm:ss")
    }, 1000)

    onBeforeUnmount(() => {
      clearInterval(timer)
    })
  },
})
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

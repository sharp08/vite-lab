<template>
  <Nav />
  <Square />
</template>

<script lang="ts">
import { defineComponent } from "vue"
import Nav from "./components/Nav"
import Square from "./components/Square"

export default defineComponent({
  name: "App",
  components: {
    Nav,
    Square,
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

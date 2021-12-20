
<template>
  <div class="container">
    <svg />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue"
import * as D from "d3"

export default defineComponent({
  name: "Bar",
  setup() {
    const arr = [1, 2, 3, 4]
    onMounted(() => {
      D.select("svg").style("background", "orange") 

      D.select("svg")
        .selectAll("rect")
        .data(arr)
        .enter()
        .append("rect")
        .attr("x", (d, i) => {
          console.log(123123)
          return (i + 1) * 20
        })
        .attr("y", 20)
        .attr("width", 10)
        .attr("height", 10)
        .attr("fill", "red")
    })
    return {}
  },
})
</script>
    
<style lang="less" scoped>
@import url(./Bar.less);
</style>

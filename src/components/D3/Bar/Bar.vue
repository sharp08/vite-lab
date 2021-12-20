
<template>
  <svg>
    <rect></rect>
    <rect></rect>
    <rect></rect>
    <rect></rect>
  </svg>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import * as D from "d3";

export default defineComponent({
  name: "Bar",
  setup() {
    const arr = [1, 2, 3, 4];
    onMounted(() => {
      D.select("svg").style("background", "orange");

      D.selectAll("rect")
        .data(arr)
        .enter()
        .attr("x", (d, i) => {
          console.log(123123)
          return (i + 1) * 20;
        })
        .attr("y", 20)
        .attr("width", 10)
        .attr("height", 10)
        .attr("fill", "red");
    });
    return {};
  },
});
</script>
    
<style lang="less" scoped>
@import url(./Bar.less);
</style>

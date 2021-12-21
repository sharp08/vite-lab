
<template>
  <div class="container">
    <svg />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import * as D from "d3";

export default defineComponent({
  name: "Bar",
  setup() {
    const barData = [1, 2, 3, 4];
    const xAxisData = [10, 20, 30, 40];
    const yAxisData = [10, 20, 30, 40];
    // 柱状图比例尺，输入的值介于 domain，将映射成 range 中的实际值
    const barLinear = D.scaleLinear()
      .domain([0, D.max(barData)]) //  定义域
      .range([0, 300]); //  值域
    // x 轴比例尺（离散型）
    const xAxisLinear = D.scaleBand()
      .domain(["宫", "商", "角", "徵", "羽"]) //  定义域
      .range([0, 300]); //  值域
    const xAxis = D.axisBottom(xAxisLinear); //  x 坐标轴

    // y 轴比例尺（连续型）
    const yAxisLinear = D.scaleLinear()
      .domain([D.min(yAxisData), D.max(yAxisData)]) //  定义域
      .range([300, 0]); //  值域，注意这里
    const yAxis = D.axisLeft(yAxisLinear); //  y 坐标轴

    onMounted(() => {
      // svg 容器处理
      D.select("svg")
        .style("background", "orange")
        .style("height", "calc(100% - 20px)")
        .style("width", "calc(100% - 20px)");

      // 画 x 轴
      D.select("svg")
        .append("g")
        .attr("transform", "translate(50,300)")
        .call(xAxis);
      // 画 y 轴
      D.select("svg")
        .append("g")
        .attr("transform", "translate(50,0)")
        .call(yAxis);

      // 画柱状图
      D.select("svg")
        .selectAll("rect")
        .data(barData)
        .enter()
        .append("rect")
        .attr("x", (d, i) => {
          return d * 50;
        })
        .attr("y", (d, i) => {
          return barLinear(D.max(barData) - d);
        })
        .attr("width", 30)
        .attr("height", (d, i) => {
          return barLinear(d); //  通过定义域映射值域
        })
        .attr("fill", "red");
    });
    return {};
  },
});
</script>
    
<style lang="less" scoped>
@import url(./Bar.less);
</style>

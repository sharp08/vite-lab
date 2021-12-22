
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
    const barData = [1, 2, 3, 4, 5]
    // 柱状图比例尺，输入的值介于 domain，将映射成 range 中的实际值
    const barScale = D.scaleLinear()
      .domain([0, D.max(barData)]) //  定义域
      .range([0, 300]) //  值域

    // x 轴比例尺（定义域）
    const xAxisData = ["宫", "商", "角", "徵", "羽"]
    // x 轴比例尺（离散型）
    const xScale = D.scaleBand()
      .domain(xAxisData) //  定义域
      .range([0, 300]) //  值域
    //  x 坐标轴
    const xAxis = D.axisBottom(xScale)

    // y 轴比例尺（定义域）
    const yAxisData = [10, 20, 30, 40]
    // y 轴比例尺（连续型）
    const yAxisLinear = D.scaleLinear()
      .domain([D.min(yAxisData), D.max(yAxisData)]) //  定义域
      .range([300, 0]) //  值域，注意这里是倒过来的
    //  y 坐标轴
    const yAxis = D.axisLeft(yAxisLinear) //  默认刻度向左的坐标轴
      // .tickFormat((d) => `啦啦啦${d}`) //  坐标轴文本
      // .tickSize(10) //  刻度长短，支持负值
      // .tickPadding(10)  // 文本与刻度的间距
      // .tickArguments([4, "s"])
      // .ticks(4, "s")
      .tickValues([13, 21, D.max(yAxisData)]) //  指定坐标轴

    onMounted(() => {
      // svg 容器处理
      D.select("svg")
        .style("background", "orange")
        .style("height", "calc(100% - 20px)")
        .style("width", "calc(100% - 20px)")

      // 画 x 轴
      D.select("svg")
        .append("g")
        // .attr("id", "xAxis") // 可以设置任意属性
        // .attr("stroke-width", "10") //  设置宽度
        .attr("transform", "translate(50,300)")
        .call(xAxis)
        // 加标签
        .append("text")
        .attr("stroke", "black")
        .attr("x", 300)
        .attr("y", 30)
        .attr("dy", "0.5em") //  相对坐标
        .attr("text-anchor", "start") //  文本锚点，默认 start
        .text("这是 x 轴")
      // console.log(D.max(xScale.range()))

      // 画 y 轴
      D.select("svg")
        .append("g")
        .attr("transform", "translate(50,0)")
        .call(yAxis)

      // 画柱状图
      D.select("svg")
        .selectAll("rect")
        .data(barData)
        .enter()
        .append("rect")
        .attr("x", (d, i) => {
          const r = xScale(xAxisData[i])
          return r + 50 + xScale.bandwidth() / 4
        })
        .attr("y", (d, i) => {
          return barScale(D.max(barData) - d)
        })
        .attr("width", xScale.bandwidth() / 2)
        .attr("height", (d, i) => {
          return barScale(d) //  通过定义域映射值域
        })
        .attr("fill", "red")
        .transition()
        .duration(3000)
        .attr("fill", "green")

      D.select("svg")
        .append("text")
        .attr("x", 100)
        .attr("y", 100)
        .attr("font-size", 30)
        .attr("text-anchor", "start")
        .text("标题标题标题")
      D.selectAll("rect").on("click", (...rest) => {
        console.log(...rest)
      })
    })
    return {}
  },
})
</script>
    
<style lang="less" scoped>
@import url(./Bar.less);
</style>

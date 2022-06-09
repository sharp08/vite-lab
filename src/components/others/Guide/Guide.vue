<template>
  <div class="guide-container">
    <BaseButton type="primary" @click="handleStart">开始</BaseButton>
    <div class="temp-container">
      <div class="target1"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import intro from "intro.js";
import "intro.js/introjs.css";

import BaseButton from "@/components/base/BaseButton";

function handleStart() {
  intro()
    .setOptions({
      prevLabel: "上一步",
      nextLabel: "下一步",
      doneLabel: "完成",
      steps: [
        {
          title: "引导标题",
          intro: "引导内容! 👋"
        },
        {
          title: "引导点1",
          element: document.querySelector(`.temp-container .target1`),
          intro: "当前页面的引导点."
        },
        {
          title: "引导点2",
          element: document.querySelector(`.stable`),
          intro: "公共组件引导点."
        }
      ]
    })
    .start();
}

const a = "Guide";
</script>

<style lang="less" scoped>
@import url(./Guide.less);
</style>

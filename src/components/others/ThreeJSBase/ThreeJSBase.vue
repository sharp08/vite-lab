<template>
  <div class="container" ref="containerRef"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

import useBaseCube from "./baseCube";
import useBaseLine from "./baseLine";

const containerRef = ref<HTMLDivElement>(); // 用于存放 canvas 的容器
const { init: initBaseCube } = useBaseCube(); //  基础版
const { init: initLine } = useBaseLine(); //  线

onMounted(() => {
  initBaseCube(containerRef);
  initLine(containerRef);
});
</script>

<style lang="less" scoped>
@import url(./ThreeJSBase.less);
</style>

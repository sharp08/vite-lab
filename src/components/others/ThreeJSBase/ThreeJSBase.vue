<template>
  <div class="container" ref="containerRef"></div>
  <canvas id="c"></canvas>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

import useBaseCube from "./baseCube";
import useBaseLine from "./baseLine";
import useCircleGeometry from "./CircleGeometry";
import useCylinderGeometry from "./CylinderGeometry";
import useTextGeometry from "./TextGeometry";
import { main } from "./cube2";

const containerRef = ref<HTMLDivElement>(); // 用于存放 canvas 的容器
const { init: initBaseCube } = useBaseCube(); //  基础版
const { init: initLine } = useBaseLine(); //  线
const { init: initCircleGeometry } = useCircleGeometry(); //  平面圆
const { init: initCylinderGeometry } = useCylinderGeometry(); //  圆柱体
const { init: initUseTextGeometry } = useTextGeometry(); //  文本

onMounted(() => {
  initBaseCube(containerRef);
  initLine(containerRef);
  initCircleGeometry(containerRef);
  initCylinderGeometry(containerRef);
  initUseTextGeometry(containerRef);
  // useTextGeometry()
  // main();
});
</script>

<style lang="less" scoped>
@import url(./ThreeJSBase.less);
</style>

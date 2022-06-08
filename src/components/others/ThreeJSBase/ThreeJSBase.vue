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
import useSunEarthMoon from "./sunEarthMoon";

const containerRef = ref<HTMLDivElement>(); // 用于存放 canvas 的容器
const { init: initBaseCube } = useBaseCube(); //  基础版
const { init: initLine } = useBaseLine(); //  线
const { init: initCircleGeometry } = useCircleGeometry(); //  平面圆
const { init: initCylinderGeometry } = useCylinderGeometry(); //  圆柱体
const { init: initTextGeometry } = useTextGeometry(); //  文本
const { init: initSunEarthMoon } = useSunEarthMoon(); //  太阳月亮地球

onMounted(() => {
  initBaseCube(containerRef);
  initLine(containerRef);
  initCircleGeometry(containerRef);
  initCylinderGeometry(containerRef);
  initTextGeometry(containerRef);
  initSunEarthMoon(containerRef);
});
</script>

<style lang="less" scoped>
@import url(./ThreeJSBase.less);
</style>

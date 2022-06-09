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
import useTank from "./tank";
import useOrbitControls from "./OrbitControls";

const containerRef = ref<HTMLDivElement>(); // 用于存放 canvas 的容器
const { init: initBaseCube } = useBaseCube(); //  基础版
const { init: initLine } = useBaseLine(); //  线
const { init: initCircleGeometry } = useCircleGeometry(); //  平面圆
const { init: initCylinderGeometry } = useCylinderGeometry(); //  圆柱体
const { init: initTextGeometry } = useTextGeometry(); //  文本
const { init: initSunEarthMoon } = useSunEarthMoon(); //  太阳月亮地球
const { init: initTank } = useTank(); //  坦克
const { init: initOrbitControls } = useOrbitControls(); //  旋转相机

onMounted(() => {
  initBaseCube(containerRef);
  initLine(containerRef);
  initCircleGeometry(containerRef);
  initCylinderGeometry(containerRef);
  initTextGeometry(containerRef);
  initSunEarthMoon(containerRef);
  initTank(containerRef);
  initOrbitControls(containerRef);

  // 双击画面切换全屏
  Object.values(containerRef.value.querySelectorAll("canvas")).forEach(dom => {
    dom.ondblclick = function () {
      if (dom.className.includes("three-canvas--full")) {
        dom.className = "";
      } else {
        dom.className = "three-canvas--full";
      }
    };
  });
});
</script>

<style lang="less" scoped>
@import url(./ThreeJSBase.less);
</style>
<style lang="less">
.three-canvas--full {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100vw !important;
  height: 100vh !important;
}
</style>

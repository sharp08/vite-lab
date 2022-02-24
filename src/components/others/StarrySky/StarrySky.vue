
<template>
  <div class="container" ref="container">
    <div
      class="circle"
      v-for="item in renderList"
      :key="item.i"
      :style="{
        top: item.y + 'px',
        left: item.x + 'px',
        width: 2 * item.r + 'px',
        height: 2 * item.r + 'px',
      }"
    >
      {{ item.i }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, onUnmounted } from "vue";

type point = [number, number];
interface IUnit {
  x: number;
  y: number;
  r: number;
  i: number;
}

export default defineComponent({
  name: "StarrySky",
  setup() {
    let timer;
    let renderList = reactive<Array<IUnit>>([]); //  用于渲染
    const container = ref(null); //  保存容器dom
    // 生成随机数
    const rdm = function (a: number, b: number): number {
      const min = Math.min(a, b);
      const r = Math.random() * Math.abs(a - b) + min;
      return r;
    };

    // 计算两点之间的距离
    function calcDis(p1: point, p2: point): number {
      const dis = Math.sqrt((p1[0] - p2[0]) ** 2 + (p1[1] - p2[1]) ** 2);
      return dis;
    }

    // 刷新数据
    function refresh(
      count: number = 10, //  生成多少个圆
      freeMaxR: number = 150, //  允许的最大半径
      freeMinR: number = 20 //  允许的最小半径
    ): void {
      const { clientWidth, clientHeight } = container.value;
      renderList.length = 0;
      for (let i = 0; i < count; i++) {
        // 如果是第一个点
        if (renderList.length === 0) {
          const x = rdm(freeMinR, clientWidth - freeMinR); //  最小半径 ≤ 横坐标的范围 ≤ 容器宽度 - 最小半径
          const y = rdm(freeMinR, clientHeight - freeMinR); //  纵坐标范围
          const minXDis = Math.min(x, Math.abs(clientWidth - x)); //  找到横坐标到容器两侧的距离中，较小的一个
          const minYDis = Math.min(y, Math.abs(clientHeight - y)); //  纵坐标同理
          const maxR = Math.min(Math.min(minXDis, minYDis), freeMaxR); //  找到 minXDis minYDis freeMaxR 中最小的值，这个值为当前点的最大半径
          const r = rdm(freeMinR, maxR); //  在一定范围内生成随机半径
          renderList.push({ x, y, r, i });
        }
        // 如果不是第一个点
        else {
          while (true) {
            const x = rdm(freeMinR, clientWidth - freeMinR);
            const y = rdm(freeMinR, clientHeight - freeMinR);
            const minXDis = Math.min(x, Math.abs(clientWidth - x));
            const minYDis = Math.min(y, Math.abs(clientHeight - y));
            let maxR = Math.min(Math.min(minXDis, minYDis), freeMaxR);
            // 与已经生成的节点比较，判断是否存在交集
            const isMixed = renderList.some((item) => {
              const dis = calcDis([item.x, item.y], [x, y]); //  计算本次生成的点与目标点之间的距离
              // 如果两点距离 > 允许的最小半径 + 目标点半径，证明不存在交集
              if (dis > freeMinR + item.r) {
                // 新点与第一个目标点比较时，新点的理论最大半径 = 两点之间的距离 - 目标点半径
                if (maxR === undefined) maxR = dis - item.r;
                // 新点与后续目标点比较时，新点的理论最大半径 = 之前的理论最大半径 和 本次的理论最大半径 中较小的
                else maxR = Math.min(maxR, dis - item.r);
                return false;
              }
              // 否则就是存在交集
              else return true;
            });
            // 当新点与所有目标点比较后，拿到最大的理论半径 maxR，将 maxR 与 freeMaxR 比较，找到较小的一个，作为最终的理论最大半径
            maxR = Math.min(maxR, freeMaxR);

            // 如果没有交集，创建点，跳出循环
            if (!isMixed) {
              const r = rdm(freeMinR, maxR); //  在特定范围内生成半径
              renderList.push({ x, y, r, i });
              break;
            }
          }
        }
      }
    }

    onMounted(() => {
      refresh();
      clearInterval(timer);
      timer = setInterval(() => {
        refresh();
      }, 2000);
    });
    onUnmounted(() => {
      clearInterval(timer);
    });
    return {
      container,
      renderList,
    };
  },
});
</script>
    
<style lang="less" scoped>
@import url(./StarrySky.less);
</style>

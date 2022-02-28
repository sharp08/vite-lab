
<template>
  <div class="container">
    <div class="vs-container" @scroll="onScroll" ref="winRef">
      <!--  -->
      <div class="back" :style="{ height: arr.length * 40 + 'px' }"></div>
      <div class="item-wrap" ref="wrapRef">
        <div class="item" v-for="item in renderList" :key="item">
          {{ item }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";

export default defineComponent({
  name: "VirtualScroll",
  setup() {
    const arr = reactive<Array<number>>(Array.from(Array(100), (x, i) => i++));
    let renderList = reactive<Array<number>>(
      Array.from(Array(10), (x, i) => i++)
    );
    const winRef = ref<HTMLElement>(null); //  列表可视区域
    const wrapRef = ref<HTMLElement>(null); //  完整的列表包裹容器

    function getTrans(dom: HTMLElement): number {
      const reg = /-?\d+/g;
      const trans = dom.style.transform;
      if (reg.test(trans)) {
        return +trans.match(reg)[0];
      }
      return null;
    }

    function onScroll(e: Event): void {
      console.log((e.target as HTMLElement).scrollTop);
      // const v = getTrans(wrapRef.value);
      // const trans = v - e.deltaY;
      // let limitTrans = trans; //  受限的滚动距离
      // // 限制一下滚动距离
      // if (trans > 0) {
      //   limitTrans = 0;
      // } else if (
      //   limitTrans <
      //   winRef.value.clientHeight - wrapRef.value.clientHeight
      // ) {
      //   limitTrans = winRef.value.clientHeight - wrapRef.value.clientHeight;
      // }
      // wrapRef.value.style.transform = `translateY(${limitTrans}px)`;
    }

    return {
      arr,
      renderList,
      onScroll,
      winRef,
      wrapRef,
    };
  },
});
</script>
    
<style lang="less" scoped>
@import url(./VirtualScroll.less);
</style>

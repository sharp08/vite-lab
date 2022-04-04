
<template>
  <div class="scroll-list-demo">
    <!-- 模拟表格 -->
    <div class="like-table">
      <!-- 表头 -->
      <div class="th">
        <div class="tr">
          <div class="td">索引</div>
          <div class="td">患者信息</div>
        </div>
      </div>
      <!-- 表体 -->
      <div
        @mouseenter="handleTableMouseenter"
        @mouseleave="handleOnMouseleave"
        class="tb"
        ref="tbRef"
      >
        <div class="tr" v-for="i in renderList" :key="i">
          <div class="td">{{ i + 1 }}</div>
          <div class="td">scrollTo 实现</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// 一屏展示的数量 displayRowCount = 容器高度 / 行的高度 且必须为整数
import {
  computed,
  defineComponent,
  onMounted,
  onActivated,
  onDeactivated,
  reactive,
  ref,
  watch,
  render,
} from "vue";

export default defineComponent({
  name: "TableScroll1",
  setup() {
    const originList = reactive({ data: [] }); //  原始数据列表
    const displayRowCount = ref(4); //  一页同时展示数量
    const curScrollTime = ref(0); //  滚动的次数
    const tbRef = ref(); //  dom
    const renderList = computed(() => [...originList.data]); //  渲染列表

    // 监听滚动次数
    watch(curScrollTime, (newVal) => {
      const oneTimeScrollHeight =
        tbRef.value.clientHeight / displayRowCount.value;
      const top = newVal * oneTimeScrollHeight;
      tbRef.value.scrollTo({
        top,
        behavior: "smooth",
      });
    });

    // 挂载后生成数据
    onMounted(() => {
      originList.data = [...Array(10).keys()];
    });

    onActivated(() => {
      curScrollTime.value = 0; //  只有当渲染列表数发生变化时，重置滚动
      handleCalcCurScrollTime(renderList.value);
    });
    onDeactivated(() => {
      clearInterval(timer);
    });

    let timer;
    // 鼠标划入停止滚动
    const handleTableMouseenter = () => {
      clearInterval(timer);
    };
    // 鼠标离开继续滚动，只有 renderList 发生变化时才会重新从开始滚动，否则继续从上一次的位置滚动
    const handleOnMouseleave = () => {
      handleCalcCurScrollTime(renderList.value);
    };
    // 处理当前滚动位置
    const handleCalcCurScrollTime = (list) => {
      clearInterval(timer);
      const len = list.length;
      const ableScrollTime = len - displayRowCount.value; //  可以滚动的最大次数

      // 如果数据超过 displayRowCount 则需要滚动
      if (ableScrollTime >= 1) {
        timer = setInterval(() => {
          if (curScrollTime.value >= ableScrollTime) {
            curScrollTime.value = 0;
          } else {
            curScrollTime.value += 1;
          }
        }, 1000);
      }
    };

    return {
      renderList,
      tbRef,
      handleTableMouseenter,
      handleOnMouseleave,
    };
  },
});
</script>
    
<style lang="less" scoped>
@import url(./TableScroll1.less);
</style>

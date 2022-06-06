
<template>
  <div class="scroll-list-demo">
    <!-- 模拟表格 -->
    <div class="like-table">
      <!-- 表头 -->
      <div class="th">
        <div class="tr">
          <div class="td">索引</div>
          <div class="td">无限滚动</div>
        </div>
      </div>
      <!-- 表体 -->
      <div
        class="tb"
        ref="tbRef"
        @mouseenter="handleTableMouseenter"
        @mouseleave="handleOnMouseleave"
      >
        <div class="tr" v-for="(i, idx) in renderList" :key="idx">
          <div class="td">{{ i + 1 }}</div>
          <div class="td">requestAnimationFrame 实现</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onActivated, onDeactivated, reactive, ref } from "vue";

export default defineComponent({
  name: "TableScroll2",
  setup() {
    //  原始数据列表
    const originList = reactive<{ data: number[] }>({
      data: [...Array(6).keys()],
    });
    const tbRef = ref(); //  dom
    //  同时能展示4个，因此在原数据后面拼接原数据的前四项即可
    const renderList = computed(() =>
      originList.data.concat(originList.data.slice(0, 4))
    );
    let isMouseenter = ref();

    const stop = ref();
    // 挂载后生成数据
    onActivated(() => {
      stop.value = false
      startScroll();
    });
    onDeactivated(() => {
      stop.value = true
    });

    const startScroll = () => {
      const originCount = originList.data.length; //  原数组长度
      const trHeight = 30; //  每行高度
      const resetTop = originCount * trHeight; //  重置值

      function step(timestamp: number) {
        if (!tbRef.value) return;
        const scrollTop = tbRef.value.scrollTop;
        // 达到重置值时，重置 scrollTop
        tbRef.value.scrollTop = scrollTop >= resetTop ? 0 : scrollTop + 1;
        if (isMouseenter.value) return;

        if (stop.value) return
        window.requestAnimationFrame(step);
      }

      window.requestAnimationFrame(step);
    };

    const handleTableMouseenter = () => {
      isMouseenter.value = true;
    };
    const handleOnMouseleave = () => {
      isMouseenter.value = false;
      startScroll();
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
@import url(./TableScroll2.less);
</style>

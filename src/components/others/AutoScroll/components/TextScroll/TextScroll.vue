
<template>
  <div class="text-scroll-container">
    <div class="transform-wrap" ref="transformRef">
      <span class="text" ref="textRef">{{ text }}</span>
      <div class="placeholder" hidden>占位区，宽度等于父容器</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";

export default defineComponent({
  name: "TextScroll",
  setup() {
    const text = ref("这里是文本这里是文本这里是文本这里是文本");
    const textRef = ref<HTMLElement>();
    const transformRef = ref<HTMLElement>();

    onMounted(() => {
      startScroll();
    });

    const startScroll = () => {
      const textWidth = textRef.value.clientWidth; //  拿到文本宽度

      function step(timestamp: number) {
        if (!transformRef.value) return;
        try {
          const v = transformRef.value.style.transform.match(/-?\d+/g);
          let transX = Number(v[0]) - 1;
          if (transX < -textWidth) transX = 200; //  父容器宽度
          transformRef.value.style.transform = `translateX(${transX}px)`;
        } catch (error) {
          // 如果匹配不到合法的 transform
          transformRef.value.style.transform = "translateX(0)";
        }

        window.requestAnimationFrame(step);
      }

      window.requestAnimationFrame(step);
    };

    return {
      text,
      textRef,
      transformRef,
    };
  },
});
</script>
    
<style lang="less" scoped>
@import url(./TextScroll.less);
</style>

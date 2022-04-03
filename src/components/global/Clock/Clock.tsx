import { defineComponent, ref, onMounted, onBeforeUnmount } from "vue";

import { useDrag } from "@/hooks";

import ms from "./Clock.module.less";

export default defineComponent({
  name: "Clock",
  props: {
    // 是否平滑
    smooth: {
      type: Boolean,
      default: true
    }
  },
  setup(props, ctx) {
    const clockRef = ref<HTMLElement>();
    const hRef = ref<HTMLElement>();
    const mRef = ref<HTMLElement>();
    const sRef = ref<HTMLElement>();

    const run = () => {
      const today = new Date();
      let h = (today.getHours() % 12) + today.getMinutes() / 60;
      let m = today.getMinutes() + today.getSeconds() / 60;
      let s =
        today.getSeconds() * 1000 + (props.smooth && today.getMilliseconds());
      h *= 30;
      m *= 6;
      s *= 0.006;
      hRef.value.style.transform = `rotate(${h}deg)`;
      mRef.value.style.transform = `rotate(${m}deg)`;
      sRef.value.style.transform = `rotate(${s}deg)`;

      window.requestAnimationFrame(run);
    };

    // 拖拽
    useDrag(clockRef);

    let timer: number;
    onMounted(() => {
      window.requestAnimationFrame(run);
    });
    onBeforeUnmount(() => {
      clearInterval(timer);
    });

    return () => (
      <div class={ms["clock"]} ref={clockRef}>
        {/* 指针 */}
        <div ref={hRef} class={ms["hand"] + " " + ms["h"]}></div>
        <div ref={mRef} class={ms["hand"] + " " + ms["m"]}></div>
        <div ref={sRef} class={ms["hand"] + " " + ms["s"]}></div>
        {/* 圆心 */}
        <div class={ms["point"]}></div>
        {/* 四个刻度 */}
        <div class={ms["marker"]}>
          <div class={ms["marker__t"]}></div>
          <div class={ms["marker__b"]}></div>
          <div class={ms["marker__l"]}></div>
          <div class={ms["marker__r"]}></div>
        </div>
      </div>
    );
  }
});

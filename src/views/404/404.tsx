import { defineComponent, ref, computed, onMounted, nextTick } from "vue";

import ms from "./404.module.less";

export default defineComponent({
  name: "404",
  setup(props, ctx) {
    const str = ref<string | number>(
      "这是一段宽度固定，随着文本增多字体减小的404页面"
    );
    const splitStr = computed(() => str.value.toString().split(""));

    const limitWrapRef = ref();
    const animationWrapRef = ref();
    const toggleClass = ref("animation-wrap"); //  用于重置动画的切换样式类

    function refresh() {
      const a = limitWrapRef.value.$el.clientWidth;
      const b = animationWrapRef.value.clientWidth;
      const rate = a / b;
      animationWrapRef.value.style.transform = `scale(${rate},1)`;
      toggleClass.value = "animation-wrap--run";
    }

    function inputChange(e: Event) {
      str.value = (e.target as HTMLInputElement).value;
      toggleClass.value = "animation-wrap";
      nextTick(() => {
        refresh();
      });
    }

    onMounted(() => {
      refresh();
    });

    return () => (
      <div class={ms.container}>
        <input
          class={ms.input}
          type="text"
          value={str.value}
          onChange={inputChange}
        />
        <Card ref={limitWrapRef} class={ms["limit-wrap"]}>
          <div ref={animationWrapRef} class={ms[toggleClass.value]}>
            {splitStr.value.map((unit, index) => (
              <span
                class={ms.item}
                style={{ "animation-delay": 0.5 * index + "s" }}
              >
                {unit}
              </span>
            ))}
          </div>
        </Card>
      </div>
    );
  }
});

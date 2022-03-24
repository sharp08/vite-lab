// https://codesandbox.io/s/a-naive-v-list-f0ghm?file=/src/App.js

import { defineComponent, ref, computed } from "vue";
import type { VNode } from "vue";

import moduleStyle from "./VirtualScroll.module.less";

export default defineComponent({
  name: "VirtualScroll",
  setup(props, ctx) {
    const scrollingContainerRef = ref();
    let height = ref(350); //  容器高度
    let total = ref(10000); //  总数据量
    let rowHeight = ref(80); //  行高
    let startIndex = ref(0);
    let limit = computed<number>(() =>
      Math.ceil(height.value / rowHeight.value)
    );

    let endIndex = ref<number>(
      Math.min(startIndex.value + limit.value, total.value - 1)
    );

    function onScroll(e: Event): void {
      const { scrollTop } = e.target as HTMLElement;
      const currIndex = Math.floor(scrollTop / rowHeight.value);

      if (startIndex.value !== currIndex) {
        startIndex.value = currIndex;
        endIndex.value = Math.min(currIndex + limit.value, total.value - 1);
      }
    }

    function renderDisplayContent(): VNode[] {
      const content: VNode[] = [];
      for (let i = startIndex.value; i <= endIndex.value; ++i) {
        content.push(
          <li
            key={i}
            class={moduleStyle.item}
            style={{ top: i * rowHeight.value + "px" }}
          >
            item-{i}
          </li>
        );
      }
      return content;
    }

    return () => (
      <div
        ref={scrollingContainerRef}
        class={moduleStyle.container}
        onScroll={onScroll}
      >
        <div class={moduleStyle.full_wrap}>{renderDisplayContent()}</div>
      </div>
    );
  }
});

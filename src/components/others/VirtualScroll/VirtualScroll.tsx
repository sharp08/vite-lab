// https://codesandbox.io/s/a-naive-v-list-f0ghm?file=/src/App.js

import { defineComponent, ref, computed } from "vue";
import type { VNode } from "vue";

import moduleStyle from "./VirtualScroll.module.less";

export default defineComponent({
  name: "VirtualScroll",
  setup(props, ctx) {
    let height = ref(350); //  容器高度
    let total = ref(999); //  总数据量
    let rowHeight = ref(80); //  行高
    let startIndex = ref(0); //  当前展示的第一项
    const limit = computed<number>(() =>
      Math.ceil(height.value / rowHeight.value)
    );

    // 全数据容器总高度
    const fullHeight = computed<number>(() => total.value * rowHeight.value);

    // 当前页最后一项
    let endIndex = ref<number>(
      Math.min(startIndex.value + limit.value, total.value - 1)
    );

    // 滚
    function onScroll(e: Event): void {
      const { scrollTop } = e.target as HTMLElement;
      const curIndex = Math.floor(scrollTop / rowHeight.value); //  当前展示的第一项（包含部分展示）

      if (startIndex.value === curIndex) return;

      // 每次滚动时拿到当前应该展示的数据的索引
      startIndex.value = curIndex;
      endIndex.value = Math.min(curIndex + limit.value, total.value - 1);
    }

    // 渲染每一项
    function renderDisplayContent(): VNode[] {
      const content: VNode[] = [];
      for (let i = startIndex.value; i <= endIndex.value; i++) {
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
      <div class={moduleStyle.container} onScroll={onScroll}>
        <div
          class={moduleStyle.full_wrap}
          style={{ height: fullHeight.value + "px" }}
        >
          {renderDisplayContent()}
        </div>
      </div>
    );
  }
});

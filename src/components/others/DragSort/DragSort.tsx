// https://juejin.cn/post/6998672428020793358

import { defineComponent, reactive } from "vue";

import ms from "./DragSort.module.less";

export default defineComponent({
  name: "DragSort",
  setup(props, ctx) {
    let list = reactive([1, 2, 3]);
    const onDragstart = e => {};
    const onDragend = () => {};

    const onDragover = e => {
      e.preventDefault(); //  必须加上这个才能让 drop 事件触发

      e.dataTransfer.dropEffect = "move";
    };
    const onDragenter = e => {
      // console.dir(e.target.innerHTML);
      e.target.style.background = "purple";
    };
    const onDragleave = e => {
      e.target.style.background = "unset";
    };
    const onDrop = e => {
      e.target.style.background = "unset";
    };

    return () => (
      <div class={ms.container}>
        <div
          style={{ height: "100px", width: "100px", background: "orange" }}
          draggable
          onDragover={onDragover}
        ></div>
        <div class={ms.dragList}>
          {list.map(i => (
            <div
              class={ms.dragList__item}
              draggable
              onDragstart={onDragstart}
              onDragend={onDragend}
              onDragover={onDragover}
              onDragenter={onDragenter}
              onDragleave={onDragleave}
              onDrop={onDrop}
            >
              {i}
            </div>
          ))}
        </div>
      </div>
    );
  }
});

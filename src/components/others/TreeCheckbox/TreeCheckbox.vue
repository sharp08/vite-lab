
<template>
  <div class="container">
    <Unit
      v-for="item in dataSource"
      :key="item.id"
      :item="item"
      :handleChange="handleChange"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";

import Unit from "./components/Unit";
import { source, INode } from "./data";

export default defineComponent({
  name: "TreeCheckbox",
  components: { Unit },
  setup() {
    let dataSource = reactive<INode[]>(source);
    // 点击某个 checkbox 元素
    const handleChange = (id: string, bool: boolean): void => {
      let current = findItem(id, dataSource);
      current.checked = bool; //  处理当前操作项
      handleUpper(current);
      handleLower(current, bool);
    };
    // 找到当前操作的元素
    const findItem = (id: string, data: INode[], r = undefined) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].id === id) {
          r = data[i];
          break;
        }
        if (data[i].children.length > 0) {
          r = findItem(id, data[i].children, r);
        }
      }
      return r;
    };
    // 根据当前元素向下处理
    const handleLower = (unit: INode, bool: boolean): void => {
      unit.children.forEach((item) => {
        item.checked = bool;
        handleLower(item, bool);
      });
    };
    // 根据当前元素向上处理
    const handleUpper = (unit: INode): void => {
      let unitParent = findItem(unit.pId, dataSource); //  找到 unit 的父级
      if (!unitParent) return;
      const len = unitParent.children.length; //   记录一下 parentUnit 有多少个子级
      let count = 0; //  记录子级勾选数
      //   遍历父级
      unitParent.children.forEach((item: INode) => {
        if (item.checked === true) count++;
        unitParent.checked = count === len; //  根据勾选数和子级数判断父级勾选状态
      });

      //   递归向上处理
      handleUpper(unitParent);
    };
    return {
      dataSource,
      handleChange,
    };
  },
});
</script>
    
<style lang="less" scoped>
@import url(./TreeCheckbox.less);
</style>

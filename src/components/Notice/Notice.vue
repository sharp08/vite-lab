<template>
  <div class="notice">
    <div
      class="notice-item"
      :class="item.type"
      :key="item.createTime"
      v-for="item in noticeList"
    >
      {{ item.content }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";

export default defineComponent({
  name: "Notice",
  props: ["abc"],
  setup() {
    let noticeList = reactive<INotice[]>([]);
    const add = (params: INotice): void => {
      setTimeout(() => {
        const idx = noticeList.findIndex((item) => item.createTime);
        noticeList.splice(idx, 1);
      }, params.duration);
      noticeList.push(params);
    };
    return {
      noticeList,
      add,
    };
  },
});
</script>

<style lang="less" scoped>
@import url(./Notice.less);
</style>

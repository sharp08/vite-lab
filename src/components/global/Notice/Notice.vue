<template>
  <div class="notice">
    <transition-group name="fade">
      <div
        class="notice-item"
        :class="item.type"
        :key="item.createTime"
        :style="{ top: index * 60 + 'px' }"
        v-for="(item, index) in noticeList"
      >
        {{ item.content }}
      </div>
    </transition-group>
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

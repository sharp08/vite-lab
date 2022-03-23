
<template>
  <div class="auto-scroll-container">
    <TableScroll1 />
    <TableScroll2 />
    <TextScroll />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import TableScroll1 from "./components/TableScroll1";
import TableScroll2 from "./components/TableScroll2";
import TextScroll from "./components/TextScroll";

export default defineComponent({
  name: "AutoScroll",
  components: { TableScroll1, TableScroll2, TextScroll },
});
</script>
    
<style lang="less" scoped>
@import url(./AutoScroll.less);
</style>

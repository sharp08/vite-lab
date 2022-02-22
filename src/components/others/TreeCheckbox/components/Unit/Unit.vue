
<template>
  <div class="unit">
    <Checkbox
      :value="item.checked"
      @on-change="(bool) => handleChange(item.id, bool)"
      >{{ item.name }}</Checkbox
    >
    <Unit
      v-for="subItem in item.children"
      :key="subItem.id"
      :item="subItem"
      :handleChange="handleChange"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import Checkbox from "../Checkbox";

export default defineComponent({
  name: "Unit",
  props: ["item", "handleChange"],
  components: { Checkbox },
});
</script>
    
<style lang="less" scoped>
@import url(./Unit.less);
</style>

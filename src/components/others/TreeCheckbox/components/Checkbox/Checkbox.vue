
<template>
  <div class="checkbox">
    <input
      type="checkbox"
      name=""
      :id="uid"
      @change="handleChange"
      :checked="value"
    />
    <label :for="uid">
      <slot></slot>
    </label>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance } from "vue";

export default defineComponent({
  name: "Checkbox",
  props: ["value"],
  setup(props, context) {
    const { uid } = getCurrentInstance();
    const handleChange = (e: Event) => {
      context.emit("on-change", (e.target as HTMLInputElement).checked);
    };
    return {
      uid: uid.toString(),
      handleChange,
    };
  },
});
</script>
    
<style lang="less" scoped>
@import url(./Checkbox.less);
</style>

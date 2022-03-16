
<template>
  <div>
    <div style="background: orange; height: 1000px"></div>
    <img src="" alt="" srcset="" v-lazy="src" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "LazyLoadDirective",
  setup() {
    const src =
      "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png";
    return {
      src,
    };
  },
});
</script>
    
<style lang="less" scoped>
@import url(./LazyLoadDirective.less);
</style>

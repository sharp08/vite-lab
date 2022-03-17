
<template>
  <div>
    <button @click="handleUpdate">更新图片地址</button>
    <img src="" alt="" srcset="" v-lazy="src" />
    <div style="background: orange; height: 1000px"></div>
    <img src="" alt="" srcset="" v-lazy="src" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "LazyLoadDirective",
  setup() {
    let src = ref();

    const handleUpdate = () => {
      src.value =
        "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png";
    };

    return {
      src,
      handleUpdate,
    };
  },
});
</script>
    
<style lang="less" scoped>
@import url(./LazyLoadDirective.less);
</style>

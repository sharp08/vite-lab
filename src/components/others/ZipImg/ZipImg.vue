
<template>
  <div class="container">
    <input type="file" @change="upload" ref="inputRef" />

    <span>压缩等级：</span
    ><input type="number" :value="zipLevel" @change="handleLevelChange" />
    <div class="preview">
      <div class="img-container">
        <div class="title">原始尺寸(kb)：{{ originSize }}</div>
        <img ref="originImgRef" />
      </div>
      <div class="img-container">
        <div class="title">压缩尺寸(kb)：{{ zipSize }}</div>
        <img ref="zipImgRef" />
      </div>
    </div>
    <canvas ref="canvasRef" hidden></canvas>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "ZipImg",
  setup() {
    const inputRef = ref<HTMLInputElement>();
    const originImgRef = ref<HTMLImageElement>();
    const zipImgRef = ref<HTMLImageElement>();
    const canvasRef = ref<HTMLCanvasElement>();
    const zipLevel = ref<number>(1);
    let originSize = ref<string>();
    let zipSize = ref<string>();

    // 修改压缩等级
    function handleLevelChange(e: Event): void {
      zipLevel.value = Number((e.target as HTMLInputElement).value);
      reZip();
    }

    // 计算文件大小
    function calSize(base64url: string): string {
      let str = base64url.replace("data:image/png;base64,", "");
      const equalIndex = str.indexOf("=");
      if (str.indexOf("=") > 0) {
        str = str.substring(0, equalIndex);
      }
      const strLength = str.length;
      const fileLength = strLength - (strLength / 8) * 2;
      return (fileLength / 1024).toFixed(1); //  kb
    }

    // 重新压缩
    function reZip(): void {
      if (!originImgRef.value.src) return;
      canvasRef.value.width = originImgRef.value.naturalWidth / zipLevel.value;
      canvasRef.value.height =
        originImgRef.value.naturalHeight / zipLevel.value;
      const ctx = canvasRef.value.getContext("2d");
      ctx.drawImage(
        originImgRef.value,
        0,
        0,
        canvasRef.value.width,
        canvasRef.value.height
      ); //  画在 canvas 上
      // 压缩后新图的 base64
      const zipBase64 = canvasRef.value.toDataURL();
      zipImgRef.value.src = zipBase64;
      zipSize.value = calSize(zipBase64);
    }

    // 文件上传
    function upload(e: Event): void {
      const file = (e.target as HTMLInputElement).files[0]; //  获取到文件对象
      let reader = new FileReader();
      reader.readAsDataURL(file); //  转成 base64 编码
      reader.onload = function (e) {
        const { result } = e.target;
        if (typeof result === "string") {
          const originBase64 = result; //  获取 base64 编码，这是原图的
          originImgRef.value.src = originBase64;
          originSize.value = calSize(originBase64);
          originImgRef.value.onload = reZip;
        }
      };
    }
    return {
      inputRef,
      originImgRef,
      zipImgRef,
      canvasRef,
      upload,
      originSize,
      zipSize,
      zipLevel,
      handleLevelChange,
    };
  },
});
</script>
    
<style lang="less" scoped>
@import url(./ZipImg.less);
</style>

/**
 * 快捷创建组件目录
 *
 * 使用：
 *      npm run create  创建名字为 default 的组件目录
 *      npm run create -- --name=xxx 创建名字为 xxx 的组件目录
 */

const PmsFs = require("fs/promises");
const minimist = require("minimist");
const path = require("path");

const params = minimist(process.argv.slice(2));
const DIRNAME = params.name || "default";

const PATH = path.resolve(__dirname, DIRNAME);

const files = [
  {
    name: `${DIRNAME}.vue`,
    content: `
<template></template>

<script lang="ts">
import { defineComponent } from "vue";
    
export default defineComponent({
  name: "${DIRNAME}",
  setup() {
    return {};
  },
});
</script>
    
<style lang="less" scoped>
@import url(./${DIRNAME}.less);
</style>
`
  },
  {
    name: "index.js",
    content: `export { default } from './${DIRNAME}.vue'`
  },
  {
    name: `${DIRNAME}.less`,
    content: ""
  }
];

// 判断目录是否存在
PmsFs.access(PATH)
  .then(() => console.log(`创建失败，目录 ${PATH} 已存在`))
  .catch(err => {
    // 创建目录
    PmsFs.mkdir(PATH)
      .then(() => {
        // 创建文件，写入内容
        const arr = files.map(item => {
          return PmsFs.writeFile(
            path.resolve(__dirname, `${DIRNAME}/${item.name}`),
            `${item.content}`
          );
        });

        Promise.all(arr)
          .then(() => {
            console.log(`创建完成 ${PATH}`);
          })
          .catch(err => console.error(err));
      })
      .catch(err => console.error(err));
  });

/**
 * 快捷创建组件目录
 *
 * 使用：
 *      npm run create:tsx  创建名字为 default 的组件目录
 *      npm run create:tsx -- --name=xxx 创建名字为 xxx 的组件目录
 */

// node v12 不支持，目前使用 v16 支持
const PmsFs = require("fs/promises");
const fs = require("fs-extra");
const minimist = require("minimist");
const path = require("path");

const params = minimist(process.argv.slice(2))._;

const DIRNAME = params[0] || "default";

const PATH = path.resolve(__dirname, `${DIRNAME}`);

const files = [
  {
    name: `${DIRNAME}.tsx`,
    content: `
import { defineComponent } from "vue";

import ms from "./${DIRNAME}.module.less";

export default defineComponent({
  name: "${DIRNAME}",
  setup(props, ctx) {
    return () => <div>${DIRNAME}</div>;
  }
});
`
  },
  {
    name: "index.ts",
    content: `export { default } from './${DIRNAME}'`
  },
  {
    name: `${DIRNAME}.module.less`,
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
            fs.move(
              PATH,
              path.resolve(__dirname, `../src/components/others/${DIRNAME}`)
            );
          })
          .catch(err => console.error(err));
      })
      .catch(err => console.error(err));
  });

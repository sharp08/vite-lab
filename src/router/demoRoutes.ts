import { defineAsyncComponent } from "vue";

import type { IRouteRecordRaw } from "./";

// 读取模块，vite 写法
const moduleFiles = import.meta.glob("../components/others/*/index.ts");

export const demoRoutes: IRouteRecordRaw[] = Object.entries(moduleFiles).map(
  ([
    path, // 组件路径 ../components/others/xxxx/index.ts
    component //  异步模块导入函数 () => import(xxx)
  ]) => {
    const compName: string = path.match(/(?<=others\/).+(?=\/index.ts)/g)[0]; //  拿到 others/ 和 /index.ts 之间的部分作为组件名
    return {
      path: `/${compName}`,
      name: compName,
      meta: {
        title: compName,
        needLogin: true,
        desc: compName,
        type: "demo"
      },
      component: defineAsyncComponent({
        loader: component,
      })
    };
  }
);

import type { RouteRecordRaw } from "vue-router";

// 读取模块，vite 写法
const moduleFiles = import.meta.glob("../components/others/*/index.ts");

export const demoRoutes: RouteRecordRaw[] = Object.entries(moduleFiles).map(
  ([
    path, // 组件路径 ../components/others/xxxx/index.ts
    component //  异步模块导入函数 () => import(xxx)
  ]) => {
    const compName = path.match(/(?<=others\/).+(?=\/index.ts)/g)[0]; //  拿到 others/ 和 /index.ts 之间的部分作为组件名
    return {
      path: `/${compName}`,
      name: compName,
      meta: {
        title: compName,
        needLogin: true,
        desc: compName,
        type: "demo"
      },
      component
    };
  }
);

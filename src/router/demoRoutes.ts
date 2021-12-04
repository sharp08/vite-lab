import type { ICustomRouteRecord } from "./index";

export const demoRoutes: ICustomRouteRecord[] = [
  {
    path: "/markdown",
    alias: "",
    name: "markdown",
    meta: {
      title: "markdown",
      desc: "基于 marked 的 markdown 编辑器",
      type: "demo"
    },
    component: () => import("../components/Markdown")
  },
  {
    path: "/notice",
    name: "notice",
    meta: {
      title: "notice",
      desc: "全局 notice 测试基地",
      type: "demo"
    },
    component: () => import("../components/NoticeDemo")
  },
  {
    path: "/cube",
    name: "cube",
    meta: {
      title: "title2",
      desc: "desc2",
      type: "demo"
    },
    component: () => import("../components/Cube")
  }
];

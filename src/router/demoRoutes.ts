import type { ICustomRouteRecord } from "./index";

export const demoRoutes: ICustomRouteRecord[] = [
  {
    path: "/calculate",
    name: "calculate",
    meta: {
      title: "计算",
      needLogin: true,
      desc: "计算",
      type: "demo"
    },
    component: () => import("@/components/others/Calculate")
  },
  {
    path: "/treecheckbox",
    name: "TreeCheckbox",
    meta: {
      title: "树形多选",
      needLogin: true,
      desc: "树形多选",
      type: "demo"
    },
    component: () => import("@/components/others/TreeCheckbox")
  },
  {
    path: "/starrySky",
    name: "starrySky",
    meta: {
      title: "随机散点",
      needLogin: true,
      desc: "随机散点",
      type: "demo"
    },
    component: () => import("@/components/others/StarrySky")
  },
  {
    path: "/markdown",
    alias: "",
    name: "markdown",
    meta: {
      title: "markdown 编辑器",
      needLogin: true,
      desc: "基于 marked 的 markdown 编辑器",
      type: "demo"
    },
    component: () => import("@/components/others/Markdown")
  },
  {
    path: "/notice",
    name: "notice",
    meta: {
      title: "全局提示",
      needLogin: true,
      desc: "全局 notice 测试基地",
      type: "demo"
    },
    component: () => import("@/components/others/NoticeDemo")
  },
  {
    path: "/cube",
    name: "cube",
    meta: {
      title: "旋转立方体",
      needLogin: true,
      desc: "旋转立方体",
      type: "demo"
    },
    component: () => import("@/components/others/Cube")
  },
  {
    path: "/pyramid",
    name: "pyramid",
    meta: {
      title: "旋转金字塔",
      needLogin: true,
      desc: "旋转金字塔",
      type: "demo"
    },
    component: () => import("@/components/others/Pyramid")
  },
  {
    path: "/d3/bar",
    name: "D3-bar",
    meta: {
      title: "D3-柱状图",
      needLogin: true,
      desc: "D3",
      type: "demo"
    },
    component: () => import("@/components/others/D3/Bar")
  }
];

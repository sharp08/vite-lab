import type { ICustomRouteRecord } from "./index";

export const demoRoutes: ICustomRouteRecord[] = [
  {
    path: "/DraggableDom",
    name: "DraggableDom",
    meta: {
      title: "拖拽缩放",
      needLogin: true,
      desc: "拖拽缩放",
      type: "demo"
    },
    // @ts-ignore
    component: () => import("@/components/others/DraggableDom/DraggableDom.tsx")
  },
  {
    path: "/VirtualScroll",
    name: "VirtualScroll",
    meta: {
      title: "虚拟滚动",
      needLogin: true,
      desc: "虚拟滚动",
      type: "demo"
    },
    component: () =>
    // @ts-ignore
      import("@/components/others/VirtualScroll/VirtualScroll.tsx")
  },
  {
    path: "/AutoScroll",
    name: "AutoScroll",
    meta: {
      title: "滚动相关",
      needLogin: true,
      desc: "滚动相关",
      type: "demo"
    },
    component: () => import("@/components/others/AutoScroll")
  },
  {
    path: "/NumberScroll",
    name: "NumberScroll",
    meta: {
      title: "数字滚动",
      needLogin: true,
      desc: "数字滚动",
      type: "demo"
    },
    component: () => import("@/components/others/NumberScroll")
  },
  {
    path: "/NumberTransition",
    name: "NumberTransition",
    meta: {
      title: "数字过渡",
      needLogin: true,
      desc: "数字过渡",
      type: "demo"
    },
    component: () => import("@/components/others/NumberTransition")
  },
  {
    path: "/LazyLoadDirective",
    name: "LazyLoadDirective",
    meta: {
      title: "懒加载指令",
      needLogin: true,
      desc: "懒加载指令",
      type: "demo"
    },
    component: () => import("@/components/others/LazyLoadDirective")
  },

  {
    path: "/ZipImg",
    name: "ZipImg",
    meta: {
      title: "图片压缩",
      needLogin: true,
      desc: "图片压缩",
      type: "demo"
    },
    component: () => import("@/components/others/ZipImg")
  },
  {
    path: "/TreeCheckbox",
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

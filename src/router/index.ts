import { createRouter, createWebHashHistory } from "vue-router";
import type { RouterOptions, RouteRecordRaw } from "vue-router";

type CustomRouteRecord = RouteRecordRaw & {
  meta: {
    title: string;
    desc?: string;
  };
};

export const routes: Array<CustomRouteRecord> = [
  {
    path: "/draggable",
    name: "draggable",
    meta: {
      title: "title",
      desc: "desc"
    },
    component: () => import("../components/Draggable")
  },
  {
    path: "/cube",
    name: "cube",
    meta: {
      title: "title2",
      desc: "desc2"
    },
    component: () => import("../components/Cube")
  },
  {
    path: "/markdown",
    name: "markdown",
    meta: {
      title: "markdown",
      desc: "基于 marked 的 markdown 编辑器"
    },
    component: () => import("../components/Markdown")
  }
];

const options: RouterOptions = {
  history: createWebHashHistory(),
  routes
};

export const router = createRouter(options);

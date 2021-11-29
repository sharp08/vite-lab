import { createRouter, createWebHashHistory } from "vue-router";
import type { RouterOptions, RouteRecordRaw } from "vue-router";

export const routes: Array<RouteRecordRaw> = [
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
  }
];

const options: RouterOptions = {
  history: createWebHashHistory(),
  routes
};

export const router = createRouter(options);

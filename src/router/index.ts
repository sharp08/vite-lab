import { createRouter, createWebHashHistory } from "vue-router";
import type { RouterOptions, RouteRecordRaw, RouteMeta } from "vue-router";

export interface ICustomRouteMeta extends RouteMeta {
  title: string;
  desc?: string;
  type?: string;
}

// @ts-ignore
export interface ICustomRouteRecord extends Omit<RouteRecordRaw, "meta"> {
  meta: ICustomRouteMeta;
  // component?: Component | string;
  // components?: Component;
  children?: ICustomRouteRecord[];
  // props?: Recordable;
  // fullPath?: string;
}

export const routes: Array<ICustomRouteRecord> = [
  {
    path: "/login",
    name: "login",
    meta: {
      title: "login"
    },
    component: () => import("../views/Login")
  },
  {
    path: "/",
    name: "main",
    redirect: "markdown",
    meta: {
      title: "main"
    },
    component: () => import("../views/Main"),
    children: [
      {
        path: "",
        name: "square",
        meta: {
          title: "square"
        },
        component: () => import("../components/Square"),
        children: [
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
        ]
      }
    ]
  }
];

const options: RouterOptions = {
  history: createWebHashHistory(),
  routes: routes as unknown as RouteRecordRaw[]
};

export const router = createRouter(options);

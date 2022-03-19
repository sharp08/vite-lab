import type { App } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";
import type { RouterOptions, RouteRecordRaw, RouteMeta } from "vue-router";

import { demoRoutes } from "./demoRoutes";

export interface ICustomRouteMeta extends RouteMeta {
  title: string;
  desc?: string;
  type?: "demo";
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
    redirect: demoRoutes[0].name as string,
    meta: {
      title: "main",
      needLogin: true
    },
    component: () => import("../views/Main"),
    children: [
      {
        path: "",
        name: "square",
        meta: {
          title: "square",
          needLogin: true
        },
        component: () => import("../components/base/Square"),
        children: demoRoutes
      }
    ]
  }
];

const options: RouterOptions = {
  history: createWebHashHistory(),
  routes: routes as unknown as RouteRecordRaw[]
};

export const router = createRouter(options);

export function setupRouter(app: App<Element>) {
  app.use(router);
}

import type { App } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";
import type { RouterOptions, RouteRecordRaw, RouteMeta } from "vue-router";

import { demoRoutes } from "./demoRoutes";

export interface IMeta {
  title: string;
  needLogin?: boolean;
  desc?: string;
  type?: "demo";
  [propName: keyof RouteMeta]: string | boolean | "demo";
}

type OmitSome = Omit<RouteRecordRaw, "meta" | "children">;
export interface IRouteRecordRaw extends OmitSome {
  meta: IMeta;
  children?: IRouteRecordRaw[];
}

export const routes: IRouteRecordRaw[] = [
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
    meta: {
      title: "main",
      needLogin: true
    },
    component: () => import("../views/Main"),
    children: [
      {
        path: "",
        name: "square",
        redirect: { name: "login" },
        meta: {
          title: "square",
          needLogin: true
        },
        component: () => import("../components/base/Square"),
        children: demoRoutes
      }
    ]
  },
  {
    path: "/:pathMatch(.*)*",
    name: "404",
    meta: {
      title: "404",
      needLogin: true
    },
    component: () => import("../views/404")
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

import { createRouter, createWebHashHistory } from "vue-router";
import type { RouterOptions, RouteRecordRaw } from "vue-router";
import { demoRoutes } from "./demoRoutes";

type CustomRouteRecord = RouteRecordRaw & {
  meta: {
    title: string;
    desc?: string;
  };
};

export const routes: Array<CustomRouteRecord> = [
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
        children: demoRoutes
      }
    ]
  }
];

const options: RouterOptions = {
  history: createWebHashHistory(),
  routes
};

export const router = createRouter(options);

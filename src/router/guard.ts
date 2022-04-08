import type { Router } from "vue-router";
import { isEmpty } from "@/utils";

export const setupRouterGuard = (router: Router) => {
  router.beforeEach((to, from) => {
    const form = sessionStorage.getItem("login");
    if (to.meta.needLogin && isEmpty(form)) {
      return { name: "login" };
    } else {
      return true;
    }
  });
};

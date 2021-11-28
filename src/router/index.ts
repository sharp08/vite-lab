import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  { path: "/", component: import("@/components/HelloWorld.vue") }
  // { path: "/about", component: About }
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes
});

import { createApp } from "vue";

import { setupStore } from "@/store";
import { router, setupRouter } from "@/router";
import { setupRouterGuard } from "@/router/guard";
import { setupGlobalComponent } from "@/components";

import App from "./App.vue";
import { lazyPlugin } from "./components/others/LazyLoadDirective/directive/lazy";

const launchApp = () => {
  const app = createApp(App);
  app.use(lazyPlugin, {});

  setupStore(app);
  setupRouter(app);
  setupRouterGuard(router);

  setupGlobalComponent(app);

  app.mount("#app");
};

launchApp();

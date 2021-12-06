import { createApp } from "vue";

import App from "./App.vue";
import { setupStore } from "@/store";
import { router, setupRouter } from "@/router";
import { setupRouterGuard } from "@/router/guard";
import { setupGlobalComponent } from "@/components";

const launchApp = () => {
  const app = createApp(App);

  setupStore(app);

  setupRouter(app);
  setupRouterGuard(router);

  setupGlobalComponent(app);

  app.mount("#app");
};

launchApp();

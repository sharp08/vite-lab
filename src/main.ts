import { createApp } from "vue";

import { setupPlugins } from "@/plugins";
import { setupStore } from "@/store";
import { router, setupRouter } from "@/router";
import { setupRouterGuard } from "@/router/guard";
import { setupGlobalComponent } from "@/components";

import App from "./App.vue";

const launchApp = () => {
  const app = createApp(App);

  setupStore(app);
  setupRouter(app);
  setupRouterGuard(router);  
  setupPlugins(app);
  setupGlobalComponent(app);

  app.mount("#app");
};

launchApp();

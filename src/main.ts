import { createApp } from "vue";

import App from "./App.vue";
import { setupStore } from "@/store";
import { setupRouter } from "@/router";
import { setupGlobalComponent } from "@/components";

const launchApp = () => {
  const app = createApp(App);

  setupStore(app);

  setupRouter(app);

  setupGlobalComponent(app);

  app.mount("#app");
};

launchApp();

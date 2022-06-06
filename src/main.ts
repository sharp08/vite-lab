import { createApp } from "vue";

import { setupPlugins } from "@/plugins";
import { setupStore } from "@/store";
import { router, setupRouter } from "@/router";
import { setupRouterGuard } from "@/router/guard";
import { setupGlobalComponent } from "@/components";
import App from "./App";

// 通用样式
import "@/style/general.less";

// 鼠标彗星
// import "@/assets/js/comet";

// 动画样式
import "animate.css";

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

import { createApp } from "vue";

import App from "./App.vue";
import { router } from "./router";
import { store, key } from "./store";
import Card from "./components/Card";
import { withInstall } from "./utils";

const app = createApp(App);

app
  .use(router)
  .use(store, key) //  根 store 的 ts 悬停提示需要传入 key
  .use(withInstall(Card));

app.mount("#app");

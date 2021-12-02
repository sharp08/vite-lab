import { createApp } from "vue";
import { createPinia } from 'pinia'

import App from "./App.vue";
import { router } from "./router";
import Card from "./components/Card";
import { withInstall } from "./utils";

export const app = createApp(App);

app
  .use(router)
  .use(createPinia())
  .use(withInstall(Card));

app.mount("#app");

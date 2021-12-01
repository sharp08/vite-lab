import { createApp } from "vue";

import App from "./App.vue";
import { router } from "./router";
import { createPinia } from 'pinia'
import Card from "./components/Card";
import { withInstall } from "./utils";

const app = createApp(App);

app
  .use(router)
  .use(createPinia())
  .use(withInstall(Card));

app.mount("#app");

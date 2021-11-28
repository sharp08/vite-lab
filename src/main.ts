import { createApp } from "vue";

import App from "./App.vue";
import { router } from "./router";
import Card from "./components/Card";
import { withInstall } from "./utils/index";

const app = createApp(App);

app.use(router).use(withInstall(Card));

app.mount("#app");

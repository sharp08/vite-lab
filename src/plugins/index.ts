import { App } from "vue";

import { DragDirective } from "../directives/DragDirective";
import { LazyLoadDirective } from "../directives/LazyLoad";
import { extendConsole } from "./extendConsole";

const plugins = {
  install(app: App) {
    extendConsole();
    LazyLoadDirective(app);
    DragDirective(app);
  }
};

export function setupPlugins(app: App<Element>) {
  app.use(plugins);
}

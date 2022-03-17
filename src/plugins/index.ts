import { App } from "vue";
import { LazyLoadDirective } from "../directives/LazyLoad";

// 扩展 console.log
const extendConsole = (): void => {
  const core = (desc: string | number, color: string, value: unknown): void => {
    console.log(
      `%c ${desc} `,
      `background:${color} ; padding: 1px; border-radius: 3px;  color: #fff`,
      value
    );
  };

  console.red = (desc, value) => core(desc, "#ed4014", value);
  console.orange = (desc, value) => core(desc, "#ff9900", value);
  console.dark = (desc, value) => core(desc, "#35495e", value);
  console.green = (desc, value) => core(desc, "#41b883", value);
  console.blue = (desc, value) => core(desc, "#2b85e4", value);
};

const plugins = {
  install(app: App) {
    extendConsole();
    LazyLoadDirective(app);
  }
};

export function setupPlugins(app: App<Element>) {
  app.use(plugins);
}

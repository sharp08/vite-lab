import { App } from "vue";
import { LazyLoadDirective } from "../directives/LazyLoad";

// 扩展 console.log
const extendConsole = (): void => {
  const core = (color: string, ...rest: unknown[]) => {
    const len = rest.length;
    if (len === 1) {
      console.log(
        `%c ${rest[0]} `,
        `background:${color} ; padding: 1px; border-radius: 3px;  color: #fff`
      );
    } else if (len === 2) {
      console.log(
        `%c ${rest[0]} `,
        `background:${color} ; padding: 1px; border-radius: 3px;  color: #fff`,
        rest[1]
      );
    }
  };

  window.log = {
    r: (...rest) => core("#ed4014", ...rest), //  red
    o: (...rest) => core("#ff9900", ...rest), //  orange
    d: (...rest) => core("#35495e", ...rest), //  dark
    g: (...rest) => core("#41b883", ...rest), //  green
    b: (...rest) => core("#2b85e4", ...rest) //  blue
  };
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

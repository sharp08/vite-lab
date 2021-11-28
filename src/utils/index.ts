import type { App, Plugin } from "vue";

const withInstall = <T>(component: T, alias?: string) => {
  const comp = component as any;
  comp.install = (app: App) => {
    app.component(comp.name || comp.displayName, component);
    if (alias) app.config.globalProperties[alias] = component;
  };
  return comp as T & Plugin;
};

export { withInstall };

import type { App } from "vue";

import { withInstall } from "@/utils";

import Card from "@/components/global/Card";
import { Notice } from "@/components/global/Notice";

const compList = [Card];

export function setupGlobalComponent(app: App<Element>) {
  app.config.globalProperties.$notice = Notice; //  挂载全局提示

  compList.forEach(comp => {
    app.use(withInstall(comp));
    // app.component(comp.name || comp.displayName, comp);
  });
}

import type { App } from "vue";

import Card from "@/components/global/Card";
import { withInstall } from "@/utils";

const compList = [Card];

export function setupGlobalComponent(app: App<Element>) {
  compList.forEach(comp => {
    app.use(withInstall(comp));
    // app.component(comp.name || comp.displayName, comp);
  });
}

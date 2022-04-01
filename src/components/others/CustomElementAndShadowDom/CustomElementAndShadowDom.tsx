
import { defineComponent } from "vue";

import moduleStyle from "./CustomElementAndShadowDom.module.less";

export default defineComponent({
  name: "CustomElementAndShadowDom",
  setup(props, ctx) {
    return () => <div>CustomElementAndShadowDom</div>;
  }
});

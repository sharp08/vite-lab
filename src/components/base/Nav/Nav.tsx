import { defineComponent } from "vue";
import { useRouter } from "vue-router";

import { useCurrentRoute } from "@/hooks";
import { IRouteRecordRaw } from "@/router";

import ms from "./Nav.module.less";

export default defineComponent({
  name: "Nav",
  setup() {
    const $router = useRouter();
    const demoRoutes = $router
      .getRoutes()
      .find(item => item.name === "square").children;
    let currentRoute = useCurrentRoute();

    // 判断 class
    const onClass = (item: IRouteRecordRaw) => {
      const classList = [
        ms["list-item"],
        currentRoute.name === item.name ? ms.active : ""
      ];
      return classList.join(" ");
    };

    const handleClick = (e: PointerEvent) => {
      const name = (e.target as HTMLElement).dataset.routerName;
      $router.push({ name });
    };
    return () => (
      <div class={ms["nav-container"]}>
        <Card onClick={handleClick} class={ms.card}>
          {(demoRoutes as unknown as IRouteRecordRaw[]).map(item => (
            <div
              data-router-name={item.name}
              key={item.name}
              title={item.meta.desc}
              class={onClass(item)}
            >
              {item.meta.title}
            </div>
          ))}
        </Card>
      </div>
    );
  }
});

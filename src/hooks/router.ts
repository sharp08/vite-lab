import { watch } from "vue";
import { useRoute } from "vue-router";
import type { RouteLocationNormalized } from "vue-router";

export const useCurrentRoute = () => {
  let currentRoute: RouteLocationNormalized = null;
  const route = useRoute();

  watch(
    route,
    newVal => {
      currentRoute = newVal;
    },
    { immediate: true }
  );
  return currentRoute;
};

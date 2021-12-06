import { watch, customRef } from "vue";
import { useRoute, useRouter } from "vue-router";
import type { Ref } from "vue";
import type { RouteLocationNormalized } from "vue-router";

const useCurrentRoute = () => {
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

const useDebounceRef = <T>(value: T, delay: number = 500): Ref<T> => {
  let timer;
  return customRef((track, trigger) => {
    return {
      get() {
        track();
        return value;
      },
      set(newVal) {
        clearTimeout(timer);
        timer = setTimeout(() => {
          value = newVal;
          trigger();
        }, delay);
      }
    };
  });
};

export { useCurrentRoute, useDebounceRef };

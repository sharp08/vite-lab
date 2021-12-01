<template>
  <Card @click="handleClick" class="nav-container">
    <div
      :class="{ active: currentRoute.name === item.name }"
      :data-router-name="item.name"
      :key="item.name"
      :title="item.meta.desc"
      class="list-item"
      v-for="item in routes"
    >
      {{ item.meta.title }}
    </div>
  </Card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

import { useCurrentRoute } from "@/hooks";
import { routes } from "@/router";

export default defineComponent({
  name: "Nav",
  setup() {
    const $router = useRouter();
    let currentRoute = useCurrentRoute();

    const handleClick = (e: PointerEvent) => {
      if (e.target instanceof HTMLElement) {
        const name = e.target.dataset.routerName;
        $router.push({ name });
      }
    };
    return {
      handleClick,
      routes,
      currentRoute,
    };
  },
});
</script>

<style lang="less" scoped>
@import url(./Nav.less);
</style>

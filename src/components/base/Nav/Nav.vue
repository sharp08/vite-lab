<template>
  <div class="nav-container">

    <Card @click="handleClick" class="card">
      <div
        :class="{ active: currentRoute.name === item.name }"
        :data-router-name="item.name"
        :key="item.name"
        :title="item.meta.desc"
        class="list-item"
        v-for="item in routes"
      >{{ item.meta.title }}</div>
    </Card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

import { useCurrentRoute } from "@/hooks";
import type { IRouteRecordRaw } from "@/router";

export default defineComponent({
  name: "Nav",
  setup() {
    const $router = useRouter();
    const demoRoutes = $router
      .getRoutes()
      .find((item) => item.name === "square").children;
    let currentRoute = useCurrentRoute();

    const handleClick = (e: PointerEvent) => {
      const name = (e.target as HTMLElement).dataset.routerName;
      $router.push({ name });
    };
    return {
      handleClick,
      routes: demoRoutes as unknown as IRouteRecordRaw[],
      currentRoute,
    };
  },
});
</script>

<style lang="less" scoped>
@import url(./Nav.less);
</style>

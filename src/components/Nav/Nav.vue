<template>
  <Card @click="handleClick" class="nav-container">
    <div
      :class="{ active: currentRoute.name === item.name }"
      :key="item.name"
      :data-router-name="item.name"
      class="list-item"
      v-for="item in routes"
      :title="item.meta.desc"
    >
      {{ item.meta.title }}/{{ item.meta.desc }}
    </div>
  </Card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

import { useCurrentRoute } from "../../hooks/router";
import { routes } from "../../router";

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

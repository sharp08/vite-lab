<template>
  <h1>{{ msg }}</h1>
  <!-- <h1>{{ msg2 }}</h1> -->
  <button type="button" @click="handleClick">count is: {{ count }}</button>
</template>

<script setup lang="ts">
import { ref } from "vue";

// defineProps<{ msg: string }>();
const props = defineProps({
  msg: {
    type: String,
  },
});

const count = ref(0);
const handleClick = () => {
  console.log(props);
};
</script>

<style scoped>
</style>

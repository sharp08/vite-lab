<template>
  <div class="container">
    <div class="line" v-for="(item, idx) in arr" :key="idx">
      <span class="idx">{{ idx + 1 }}</span>
      <span class="num">{{ item[0] }}</span>
      <span>/</span>
      <span class="num">{{ item[1] }}</span>
      <span>=</span>
      <span class="num answer" v-if="flag || item[2]">{{
        item[0] / item[1]
      }}</span>
      <button v-else @click="showSingleAnswer(idx)">答案</button>
    </div>
    <div class="bottom">
      <button @click="refresh" class="show-answer">刷新</button>
      <button @click="showAnswer" class="show-answer">答案</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, onMounted } from "vue";
import { RANDOM } from "@/utils";

type Tpl = [number, number, boolean?];

export default defineComponent({
  name: "Calculate",
  setup() {
    let arr = reactive<Tpl[]>([]);

    let flag = ref<boolean>(false);

    onMounted(() => {
      refresh();
    });

    const genRdm: () => number = () => RANDOM(0, 10000, RANDOM(0, 2));
    const showAnswer = () => (flag.value = true);
    const showSingleAnswer = (idx: number) => (arr[idx][2] = true);
    const refresh = () => {
      arr.length = 0;
      for (let i = 0; i < 5; i++) {
        arr.push([genRdm(), genRdm()]);
      }
    };

    return {
      flag,
      arr,
      showAnswer,
      showSingleAnswer,
      refresh,
    };
  },
});
</script>

<style lang="less" scoped>
@import url(./Calculate.less);
</style>

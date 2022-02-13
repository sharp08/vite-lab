<template>
  <div class="container">
    <div class="line" v-for="(item,idx) in arr">
      <span class="idx">{{idx+1}}</span>
      <span class="num">{{item[0]}}</span>
      <span>/</span>
      <span class="num">{{item[1]}}</span>
      <span>=</span>
      <span class="num answer" v-show="flag">{{item[0]/item[1]}}</span>
    </div>
    <button @click="showAnswer" class="show-answer">答案</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue"
import { RANDOM } from "@/utils"

export default defineComponent({
  name: "Calculate",
  setup() {
    let arr = reactive([])
    let flag = ref(false)

    const genRdm = () => RANDOM(0, 100000, RANDOM(0, 2))
    for (let i = 0; i < 10; i++) {
      arr.push([genRdm(), genRdm()])
    }

    const showAnswer = () => (flag.value = true)

    return {
      flag,
      arr,
      showAnswer,
    }
  },
})
</script>

<style lang="less" scoped>
@import url(./Calculate.less);
</style>

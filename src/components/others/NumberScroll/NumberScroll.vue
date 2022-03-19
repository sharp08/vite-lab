
<template>
  <div class="container">
    <div :ref="setRef" class="count-win" v-for="num in numberList">
      <div class="count-bg">
        <div :key="i" class="count-item" v-for="i in list">{{i}}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  onMounted,
  ref,
  computed,
  onUnmounted,
  onBeforeUpdate,
} from "vue"

import { RANDOM } from "@/utils"

export default defineComponent({
  name: "NumberScroll",
  setup() {
    const list = reactive<number[]>([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
    let originNumber = ref<number>(null)
    let itemRefs = reactive<HTMLElement[]>([])

    onBeforeUpdate(() => {
      itemRefs.length = 0
    })
    function setRef(el: HTMLElement): void {
      itemRefs.push(el)
    }

    let timer: NodeJS.Timer
    onMounted(() => {
      originNumber.value = RANDOM(100, 999)
      timer = setInterval(() => {
        originNumber.value = RANDOM(100, 999)

        itemRefs.forEach((dom, index) => {
          if (!dom) return
          const transY = -100 * numberList.value[index]
          ;(
            dom.children[0] as HTMLElement
          ).style.transform = `translateY(${transY}px)`
        })
      }, 2000)
    })
    onUnmounted(() => {
      clearInterval(timer)
    })
    const numberList = computed<number[]>(() => {
      if (originNumber.value !== null) {
        const r = (originNumber.value + "").split("").map((str) => Number(str))
        return r
      }
    })

    return { list, setRef, numberList }
  },
})
</script>
    
<style lang="less" scoped>
@import url(./NumberScroll.less);
</style>

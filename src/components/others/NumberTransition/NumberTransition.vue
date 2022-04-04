
<template>
  <div class="container">
    <span class="trans" title="GsapSpan">{{ renderValue.val?.toFixed(2) }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onActivated, onDeactivated } from "vue"
import { gsap } from "gsap"

import { RANDOM } from "@/utils"

export default defineComponent({
  name: "NumberTransition",
  setup() {
    const renderValue = reactive<{ val: number }>({ val: 0 })

    function change(): void {
      gsap.to(renderValue, { duration: 0.5, val: RANDOM(0, 100) })
    }

    let timer: number;

    onActivated(() => {
      timer = window.setInterval(() => {
        change()
      }, 2000)
    })
    onDeactivated(() => {
      clearInterval(timer)
    })
    return {
      renderValue,
      change,
    }
  },
})
</script>
    
<style lang="less" scoped>
@import url(./NumberTransition.less);
</style>

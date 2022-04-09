<!-- https://codepen.io/myacode/pen/PoqQQNM -->
<template>
  <div class="container">
    <BasePanel class="panel">panel</BasePanel>
    <BaseSwitch @onClick="handleSwitchClick" :checked="switchChecked" />
    <BaseCheckbox @onClick="handleCheckboxClick" :checked="checkbox" />
    <BaseRadio
      v-for="item in radioList"
      @Click="handleRadioClick(item)"
      :checked="item === radioValue"
    />
    <BaseButton />
    <BaseButton type="primary" />
    <BaseWave />
    <BaseTabBar />
    <BaseInput />
    <BaseSlider />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from "vue";

import BasePanel from '@/components/base/BasePanel'
import BaseSwitch from '@/components/base/BaseSwitch'
import BaseCheckbox from '@/components/base/BaseCheckbox'
import BaseRadio from '@/components/base/BaseRadio'
import BaseButton from '@/components/base/BaseButton'
import BaseWave from '@/components/base/BaseWave'
import BaseTabBar from '@/components/base/BaseTabBar'
import BaseInput from '@/components/base/BaseInput'
import BaseSlider from '@/components/base/BaseSlider'

export default defineComponent({
  name: "Design",
  components: {
    BasePanel, BaseSwitch, BaseCheckbox,
    BaseRadio, BaseButton, BaseWave,
    BaseTabBar, BaseInput, BaseSlider
  },
  setup() {
    let switchChecked = ref(false)
    const handleSwitchClick = (v: boolean) => {
      switchChecked.value = !v
    }


    let checkbox = ref(false)
    const handleCheckboxClick = (v: boolean) => {
      checkbox.value = !v
    }

    let radioList = reactive<number[]>([1, 2, 3])
    let radioValue = ref<number>()

    const handleRadioClick = (item: number) => {
      radioValue.value = item
    }

    return {
      handleSwitchClick,
      switchChecked,
      handleCheckboxClick,
      checkbox,
      radioList,
      radioValue,
      handleRadioClick
    };
  },
});
</script>
    
<style lang="less" scoped>
@import url(./Design.less);
</style>

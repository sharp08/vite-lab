<!-- https://codepen.io/myacode/pen/PoqQQNM -->
<template>
  <div class="container">
    <BasePanel />
    <BaseSwitch />
    <BaseSwitch :checked="true" />
    <BaseCheckbox />
    <BaseCheckbox :checked="true" />
    <BaseRadio />
    <BaseRadio :checked="true" />
    <BaseButton />
    <BaseButton type="primary" />
    <BaseWave />
    <BaseTabBar />
    <BaseInput />
    <BaseSlider />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

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
    return {};
  },
});
</script>
    
<style lang="less" scoped>
@import url(./Design.less);
</style>

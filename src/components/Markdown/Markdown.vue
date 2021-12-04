<template>
  <div id="markdown-container">
    <textarea class="source box" v-model="content"></textarea>
    <div class="preview box" ref="domRef"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, watchEffect, ref } from "vue"
import { marked } from "marked"

import { useDebounceRef } from "@/hooks"

export default defineComponent({
  name: "Markdown",
  setup() {
    const domRef = ref<HTMLDivElement>(null)
    let content = useDebounceRef(
      "# h1\n## h2\n### h3\n#### h4\n##### h5\n###### h6\n\n> 引言\n\n正文\n\n***\n\n单引用 `单引用`\n\n```\n代码块\n```\n[超链接](http://www.baidu.com)\n\n|  居中 | 左对齐  |\n|  :----:  | :----  |\n| 单元格  | 单元格 |\n| 单元格  | 单元格 |\n\n- 段落1\n- 段落2\n- 段落3\n\n1. 有序段落\n2. 有序段落\n3. 有序段落"
    )

    onMounted(() => {
      watchEffect(() => {
        domRef.value.innerHTML = marked.parse(content.value)
      })
    })
    return {
      domRef,
      content,
    }
  },
})
</script>

<style lang="less">
@import url(./Markdown.less);
</style>

<script setup>
const sexList = $computed(() => uni.$store.sexList)
const sexMap = $computed(() => uni.$store.sexMap)
console.log(sexList, sexMap)
</script>

<template lang="pug">
Layout(title="测试页面")
  tn-title(title="图鸟UI" mode="vLine")
  tn-tag 标签
  uni-badge(text="2" type="success")
</template>

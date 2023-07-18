<script setup>
const sexList = $computed(() => uni.$store.sexList)
const sexMap = $computed(() => uni.$store.sexMap)
console.log(sexList, sexMap)

function goTest() {
  navigator.navigateTo('/pages/test/index')
}
</script>

<template lang="pug">
Layout(title="首页")
  tn-title(title="图鸟UI" mode="vLine")
  tn-tag 标签
  uni-badge(text="2" type="success")
  button(@click="goTest") 跳转页面
</template>

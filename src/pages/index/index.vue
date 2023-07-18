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
  button(@click="goTest") 跳转页面
</template>

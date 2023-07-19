<script setup>
function go() {
  navigator.navigateTo('/pages/test/index')
}
</script>

<template lang="pug">
Layout(title="首页" :hide-navbar="true")
  button(@click="go") 跳转页面
</template>

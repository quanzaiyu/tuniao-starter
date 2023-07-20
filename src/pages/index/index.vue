<script setup>
function go() {
  navigator.navigateTo('/pages/test/index')
}
</script>

<template>
<Layout title="首页" :hide-icon="true">
  <button @click="go">跳转页面</button>
</Layout>
</template>

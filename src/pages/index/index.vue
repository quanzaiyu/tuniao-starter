<script setup>
function go() {
  nav.to('/pages/test/index', { a: 1, b: 2 })
}
</script>

<template>
  <Layout title="首页" :hide-icon="true">
    <button @click="go">跳转页面</button>
  </Layout>
</template>

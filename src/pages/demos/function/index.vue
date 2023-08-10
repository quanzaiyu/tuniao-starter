<script setup lang="ts">
const layout = $ref(null)
function go(page) {
  nav.to(page)
}
</script>

<template>
  <Layout ref="layout" title="示例">
    <tn-list-item right-icon="right" @click="go('/pages/demos/function/api')">接口请求</tn-list-item>
    <tn-list-item right-icon="right" @click="go('/pages/demos/function/upload')">上传图片</tn-list-item>
  </Layout>
</template>

<style lang="stylus" scoped>
</style>

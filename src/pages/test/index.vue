<script setup lang="ts">
const layout = $ref(null)
function go(page) {
  nav.to(page)
}
</script>

<template>
  <Layout ref="layout" title="示例">
    <!-- <button @click="go('/pages/test/index-header')">自定义头部</button> -->
    <button @click="go('/pages/test/index-popup')">弹出层</button>
    <!-- <button @click="go('/pages/test/index-api')">接口请求</button> -->
    <button @click="go('/pages/test/index-upload')">上传图片</button>
    <button @click="go('/pages/test/index-style')">样式渲染</button>
    <button @click="go('/pages/test/index-tuniao')">图鸟UI</button>
    <button @click="go('/pages/test/index-uni-ui')">uni-ui</button>
    <button @click="go('/pages/test/index-form')">json表单配置</button>
  </Layout>
</template>

<style lang="stylus" scoped>
</style>

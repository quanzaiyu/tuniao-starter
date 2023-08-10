<script setup lang="ts">
const layout = $ref(null)
function go(page) {
  nav.to(page)
}
</script>

<template>
  <Layout ref="layout" title="示例">
    <tn-list-item right-icon="right" @click="go('/pages/demos/ui/header')">自定义头部</tn-list-item>
    <tn-list-item right-icon="right" @click="go('/pages/demos/ui/popup')">弹出层</tn-list-item>
    <tn-list-item right-icon="right" @click="go('/pages/demos/ui/style')">样式渲染</tn-list-item>
    <tn-list-item right-icon="right" @click="go('/pages/demos/ui/tuniao')">图鸟UI</tn-list-item>
    <tn-list-item right-icon="right" @click="go('/pages/demos/ui/uni-ui')">uni-ui</tn-list-item>
  </Layout>
</template>

<style lang="stylus" scoped>
</style>

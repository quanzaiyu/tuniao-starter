<script setup lang="ts">
const layout = $ref(null)

const menus = [
  {
    title: '接口请求',
    path: '/pages/demos/function/api',
    auth: true,
  },
  {
    title: '上传图片',
    path: '/pages/demos/function/upload',
    auth: true,
  },
]

function go(menu) {
  if (menu.auth) {
    if (!uni.$store.userInfo?.access_token) {
      layout.notify({ msg: '请先登录' })
      return
    }
  }
  nav.to(menu.path)
}
</script>

<template>
  <Layout ref="layout" title="示例">
    <tn-list-item
      v-for="(menu, index) in menus"
      :key="index"
      right-icon="right"
      @click="go(menu)"
    >{{ menu.title }}</tn-list-item>
  </Layout>
</template>

<style lang="stylus" scoped>
</style>

<script setup>
function go(page) {
  navigator.navigateTo(page)
}
</script>

<template lang="pug">
Layout(title="示例")
  button(@click="go('/pages/test/index-popup')") 弹出层
  button(@click="go('/pages/test/index-api')") 接口请求
  button(@click="go('/pages/test/index-upload')") 上传图片
  button(@click="go('/pages/test/index-style')") 样式渲染
  button(@click="go('/pages/test/index-tuniao')") 图鸟UI
  button(@click="go('/pages/test/index-uni-ui')") uni-ui
</template>

<style lang="stylus" scoped>
</style>

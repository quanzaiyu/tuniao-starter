<script setup>
// toast
function toast() {
  utils.toast('hello')
}

// loading
function showLoading() {
  utils.loading('加载中...', 3000)
}
function hideLoading() {
  utils.unloading()
}

// 展示遮罩
function showOverlay() {
  utils.overlay()
}
</script>

<template lang="pug">
Layout(title="弹出层")
  button(@click="toast") Toast
  button(@click="showLoading") showLoading
  button(@click="hideLoading") hideLoading
  button(@click="showOverlay") showOverlay
  template(#overlay)
    .w-full.h-full.flex-center.text-white.text-48 overlay
</template>

<style lang="stylus" scoped>
</style>

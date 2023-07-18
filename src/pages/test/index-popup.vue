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

// modal
const layout = ref(null)
function showModal() {
  utils.modal('模态框', '模态框内容', true, () => {
    console.log(1)
  }, () => {
    console.log(2)
  })
}

// overlay
function showOverlay() {
  utils.overlay()
}
</script>

<template lang="pug">
Layout(ref="layout" title="弹出层")
  button(@click="toast") toast
  button(@click="showLoading") showLoading
  button(@click="hideLoading") hideLoading
  button(@click="showOverlay") showOverlay
  button(@click="showModal") showModal
  template(#overlay)
    .w-full.h-full.flex-center.text-white.text-48 overlay
</template>

<style lang="stylus" scoped>
</style>

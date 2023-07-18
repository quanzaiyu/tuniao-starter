<script setup>
const layout = $ref(null)

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
function showModal() {
  layout.showModal({
    title: '模态框',
    content: '模态框内容',
    showCancel: true,
    confirm: () => {
      console.log('确定')
    },
    cancel: () => {
      console.log('取消')
    },
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

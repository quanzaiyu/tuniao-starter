<script setup>
const layout = $ref(null)

// toast
function showNotify() {
  layout.notify({ msg: 'hello' })
}

// loading
function showLoading() {
  layout.loading('加载中...')
}
function hideLoading() {
  layout.unloading()
}

// modal
function showModal() {
  layout.modal({
    title: '模态框',
    content: '模态框内容',
    showCancel: true,
    confirm: () => {
      console.info('确定')
    },
    cancel: () => {
      console.info('取消')
    },
  })
}

// action-sheet
function showActionSheet() {
  layout.sheet({
    actions: [
      { text: '选项1', value: '1' },
      { text: '选项2', value: '2', desc: '暂时不能选' },
      { text: '选项3', value: '3' },
    ],
    cancel: () => {
      console.info('取消按钮被点击')
      return true
    },
    select: (index, value) => {
      console.info('选项被点击', index, value)
      return true
    },
  })
}

// overlay
function showOverlay() {
  layout.overlay()
}
</script>

<template>
<Layout ref="layout" title="弹出层">
  <button @click="showNotify">showNotify</button>
  <button @click="showLoading">showLoading</button>
  <button @click="hideLoading">hideLoading</button>
  <button @click="showOverlay">showOverlay</button>
  <button @click="showModal">showModal</button>
  <button @click="showActionSheet">showActionSheet</button>
  <template #overlay>
    <view class="w-full h-full flex-center text-white text-48">overlay</view>
  </template>
</Layout>
</template>

<style lang="stylus" scoped>
</style>

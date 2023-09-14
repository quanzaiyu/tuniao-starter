<script setup lang="ts">
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

// popup
function showPopup() {
  layout.showPopup({
    closeBtn: false,
  })
}
</script>

<template>
  <Layout ref="layout" title="弹出层">
    <view class="flex flex-col flex-center p-20 bg-white">
      <view class="shadow-item tn-shadow tn-type-primary_shadow" @click="showNotify">showNotify</view>
      <view class="shadow-item tn-shadow tn-type-success_shadow" @click="showLoading">showLoading</view>
      <view class="shadow-item tn-shadow tn-type-warning_shadow" @click="hideLoading">hideLoading</view>
      <view class="shadow-item tn-shadow tn-type-info_shadow" @click="showOverlay">showOverlay</view>
      <view class="shadow-item tn-shadow tn-gray-dark_shadow" @click="showModal">showModal</view>
      <view class="shadow-item tn-shadow tn-gray_shadow" @click="showActionSheet">showActionSheet</view>
      <view class="shadow-item tn-shadow tn-gray_shadow" @click="showPopup">showPopup</view>
    </view>
    <template #overlay>
      <view class="w-full h-full flex-center text-white text-48">overlay</view>
    </template>
    <template #popup>
      <view class="">popup</view>
    </template>
  </Layout>
</template>

<style lang="stylus" scoped>
  .shadow-item {
    @apply p-24 flex flex-center rounded-15 tn-shadow;
    width: 80%;

    & + .shadow-item {
      @apply mt-50;
    }
  }
</style>

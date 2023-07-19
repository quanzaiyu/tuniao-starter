<script setup>
const props = defineProps({
  hideNavbar: { type: Boolean, default: false },
  title: { type: String, default: '' },
  styles: { type: Object, default: () => ({}) },
  type: { type: String, default: 'custom' }, // 可取值: custom list
})

defineEmits(['search', 'loadmore', 'add-btn-click', 'clear'])

// 弹出层：notify
const notifyRef = $ref()
function showNotify(options) {
  notifyRef?.show({ position: 'center', type: 'primary', ...options })
}

// 弹出层：loading
let loading = $ref({
  title: '',
  show: false,
})
function showLoading(title, duration = 3000) {
  loading = { show: true, title }

  if (duration > 0) {
    setTimeout(() => {
      loading = { show: false, title }
    }, duration)
  }
}

function hideLoading() {
  loading = { show: false, title: '' }
}

// 弹出层：overlay
let overlay = $ref({
  show: false,
})
function showOverlay() {
  overlay = { show: true }
}

// 弹出层：modal
const modalRef = $ref()
function showModal(options) {
  modalRef?.showModal(options)
}

// 弹出层：actionSheetRef
const actionSheetRef = $ref()
function showActionSheet(options) {
  actionSheetRef.show(options)
}

// 更新标题
watchEffect(() => {
  if (props.title) {
    uni.setNavigationBarTitle({ title: props.title })
  }
})

defineExpose({
  loading: showLoading,
  unloading: hideLoading,
  notify: showNotify,
  modal: showModal,
  overlay: showOverlay,
  sheet: showActionSheet,
})
</script>

<template>
<view>
  <view :class="[styles.bg || 'bg-default']">
    <tn-navbar v-if="!hideNavbar" fixed="fixed">{{ title }}</tn-navbar>
    <view>
      <scroll-view class="w-full h-100vh" scroll-y="scroll-y" @scrolltolower="$emit('loadmore')">
        <slot></slot>
        <view class="w-full h-footer"></view>
      </scroll-view>
    </view>
    <view class="fixed bottom-0 w-full h-footer bg-white z-100"></view>
  </view>
  <tn-notify ref="notifyRef"></tn-notify>
  <tn-modal ref="modalRef"></tn-modal>
  <tn-action-sheet ref="actionSheetRef"></tn-action-sheet>
  <tn-popup v-model="loading.show" :width="200" :height="300" bg-color="transparent" :overlay-closeable="false">
    <view class="w-full h-full flex-center flex-col">
      <tn-loading :show="loading.show" animation="animation" mode="flower" type="primary" size="100rpx"></tn-loading>
      <view class="mt-20 text-toast">{{ loading.title }}</view>
    </view>
  </tn-popup>
  <tn-overlay v-model:show="overlay.show" :opacity="0.4">
    <slot name="overlay"></slot>
  </tn-overlay>
</view>
</template>

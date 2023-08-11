<script setup lang="ts">
const props = defineProps({
  hideIcon: { type: Boolean, default: false },
  hideNavbar: { type: Boolean, default: false },
  title: { type: String, default: '' },
  styles: { type: Object, default: () => ({}) },
  type: { type: String, default: 'custom' }, // 可取值: custom list
})

defineEmits(['loadmore'])

// 获取平台信息，如果是支付宝小程序隐藏左侧导航
const platform = $computed(() => uni.$store.platform)

// 弹出层：notify
const notifyRef = $ref<TnNotifyInstance>()
function showNotify(options) {
  notifyRef.show({ position: 'center', type: 'primary', ...options })
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
const modalRef = $ref<TnModalInstance>()
function showModal(options) {
  modalRef.showModal(options)
}

// 弹出层：actionSheetRef
const actionSheetRef = $ref<TnActionSheetInstance>()
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
      <tn-navbar
        v-if="platform !== 'mp-alipay' && !hideNavbar"
        frosted
        :fixed="true"
        :back-icon="platform === 'mp-alipay' || hideIcon ? '' : 'left'"
        :home-icon="platform === 'mp-alipay' || hideIcon ? '' : 'home-capsule-fill'"
        :safe-area-inset-right="platform === 'mp-alipay' || hideIcon ? false : true"
        index-url="/pages/demos/index/index"
      >
        <view>{{ title }}</view>
      </tn-navbar>
      <view v-else><slot name="navbar"></slot></view>
      <view class="w-100vw">
        <slot></slot>
        <view class="w-full h-footer"></view>
      </view>
      <view class="fixed bottom-0 w-full h-footer z-100"></view>
    </view>
    <tn-notify ref="notifyRef"></tn-notify>
    <tn-modal ref="modalRef"></tn-modal>
    <tn-action-sheet ref="actionSheetRef"></tn-action-sheet>
    <tn-popup
      v-model="loading.show"
      :width="200"
      :height="300"
      bg-color="transparent"
      :overlay-closeable="false"
    >
      <view class="w-full h-full flex-center flex-col">
        <tn-loading
          :show="loading.show"
          :animation="true"
          mode="flower"
          type="primary"
          size="100rpx"
        ></tn-loading>
        <view class="mt-20 text-toast">{{ loading.title }}</view>
      </view>
    </tn-popup>
    <tn-overlay v-model:show="overlay.show" :opacity="0.4">
      <slot name="overlay"></slot>
    </tn-overlay>
  </view>
</template>

<style scoped lang="stylus">
</style>

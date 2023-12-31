<script setup lang="ts">
const props = defineProps({
  // 传入样式(css类名)
  // bg: 页面背景
  // footerBg: 底部固定区域背景
  styles: { type: Object, default: () => ({}) },

  // 头部
  hideNavbar: { type: Boolean, default: false }, // 是否隐藏头部标题栏
  hideIcon: { type: Boolean, default: false }, // 是否隐藏头部区域图标(返回上一级、返回首页)
  title: { type: String, default: '' }, // 头部区域标题
  headerSticky: { type: Boolean, default: false }, // 头部区域标题

  // 内容
  hideFooter: { type: Boolean, default: false }, // 是否隐藏内容区域底部间距

  // 底部
  showFooterShadow: { type: Boolean, default: false }, // 是否显示底部固定区域的影音
})

const emit = defineEmits(['loadmore'])

onReachBottom(() => {
  emit('loadmore')
})

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

// 弹出层：popup
interface PopupType {
  show: boolean
  width?: string
  height?: string
  bgColor?: string
  openDirection?: 'top' | 'center' | 'bottom' | 'left' | 'right'
  radius?: string
  closeBtn?: boolean // 是否显示关闭按钮
  overlayCloseable?: boolean // 点击遮罩是否可以关闭
}
let popup = $ref<PopupType>({
  show: false,
})
function showPopup(options = {}) {
  popup = {
    ...{
      show: true,
      width: '100%',
      bgColor: 'white',
      openDirection: 'bottom',
      radius: '30',
      closeBtn: true,
      overlayCloseable: true,
    },
    ...options,
  }
}
function hidePopup() {
  popup.show = false
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
  showPopup,
  hidePopup,
  notify: showNotify,
  modal: showModal,
  overlay: showOverlay,
  sheet: showActionSheet,
})
</script>

<template>
  <view>
    <view :class="[styles.bg || 'bg-default']" class="min-h-100vh">
      <!-- 头部 -->
      <tn-navbar
        v-if="platform !== 'mp-alipay' && !hideNavbar"
        frosted
        :fixed="true"
        :back-icon="platform === 'mp-alipay' || hideIcon ? '' : 'left'"
        :home-icon="platform === 'mp-alipay' || hideIcon ? '' : 'home-capsule-fill'"
        :safe-area-inset-right="platform === 'mp-alipay' || hideIcon ? false : true"
        index-url="/pages/index/index"
      >
        <view>{{ title }}</view>
      </tn-navbar>

      <tn-sticky v-else :offset-top="0" :enabled="headerSticky">
        <view><slot name="navbar"></slot></view>
      </tn-sticky>

      <!-- 内容 -->
      <view class="w-100vw">
        <slot></slot>
        <view v-if="!hideFooter" class="w-full h-footer"></view>
      </view>
      <!-- 底部 -->
      <div class="fixed bottom-0 left-0 w-full z-10" :class="[{'tn-shadow tn-grey_shadow': showFooterShadow}, styles.footerBg]">
        <slot name="footer"></slot>
        <view class="h-footer "></view>
      </div>
    </view>

    <!-- 弹出层 -->
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
        <view class="mt-20 text-toast text-center">{{ loading.title }}</view>
      </view>
    </tn-popup>
    <tn-popup
      v-model="popup.show"
      :width="popup.width"
      :bg-color="popup.bgColor"
      :open-direction="popup.openDirection"
      :radius="popup.radius"
      :safe-area-inset-bottom="false"
      :overlay-closeable="popup.overlayCloseable"
      :close-btn="popup.closeBtn"
      close-btn-position="right-top"
    >
      <view class="w-full h-full bg-white pt-30" :style="{backgroundColor: popup.bgColor || 'white'}">
        <view class="px-30 pb-30">
          <slot name="popup"></slot>
        </view>
      </view>
    </tn-popup>
    <tn-overlay v-model:show="overlay.show">
      <slot name="overlay"></slot>
    </tn-overlay>
  </view>
</template>

<style scoped lang="stylus">
::v-deep .tn-notify
  text-align center
</style>

<script setup>
const props = defineProps({
  title: { type: String, default: '' },
  styles: { type: Object, default: () => ({}) },
  type: { type: String, default: 'custom' }, // 可取值: custom list
})

defineEmits(['search', 'loadmore', 'add-btn-click', 'clear'])

// 弹出层：modal
const modalRef = $ref()
function showModal(modal) {
  modalRef?.showModal(modal)
}

// 弹出层：toast
const toast = computed(() => uni.$store.toast)
const notifyRef = ref()
watch(toast, () => {
  notifyRef.value?.show({
    msg: toast.value.msg,
    position: toast.value.position,
    type: toast.value.type,
  })
})

// 更新标题
watchEffect(() => {
  if (props.title) {
    uni.setNavigationBarTitle({ title: props.title })
  }
})

defineExpose({
  modalRef,
  notifyRef,
  showModal,
})
</script>

<template lang="pug">
view(:key="title")
  view(:class="[styles.bg || 'bg-default']")
    //- 自定义页面模板
    view
      scroll-view.w-full.h-100vh(scroll-y @scrolltolower="$emit('loadmore')")
        slot
        .w-full.h-footer
    //- 底部安全区域
    .fixed.bottom-0.w-full.h-footer.bg-white.z-100
  //- 弹出层：toast
  tn-notify(ref="notifyRef")
  //- 弹出层：modal
  tn-modal(ref="modalRef")
  //- 弹出层：loading
  tn-popup(v-model="$store.loading.show" :width="200" :height="300" bg-color="transparent" :overlay-closeable="false")
    .w-full.h-full.flex-center.flex-col
      tn-loading(
        :show="$store.loading.show"
        animation
        mode="flower"
        type="primary"
        size="100rpx"
      )
      .mt-20.text-toast {{ $store.loading.title }}
  //- 弹出层：遮罩，可自定义内容
  tn-overlay(v-model:show="$store.overlay.show" :opacity="0.4" )
    slot(name="overlay")
</template>

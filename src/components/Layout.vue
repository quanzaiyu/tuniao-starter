<script setup>
const props = defineProps({
  title: { type: String, default: '' },
  styles: { type: Object, default: () => ({}) },
  type: { type: String, default: 'custom' }, // 可取值: custom list
  showBottom: { type: Boolean, default: true },
  bottomBtnText: { type: String, default: '新增' },
  placeholder: { type: String, default: '' },
  loadingStatus: { type: String, default: 'more' },
  showCustomSearchBar: { type: Boolean, default: false },
})

defineEmits(['search', 'loadmore', 'add-btn-click', 'clear'])

const toast = computed(() => uni.$store.toast.show)
const loading = computed(() => uni.$store.loading.show && !uni.$store.loading.absolute)

// 搜索词
const searchValue = $ref('')

watchEffect(() => {
  // 更新标题
  if (props.title) {
    uni.setNavigationBarTitle({ title: props.title })
  }
})
</script>

<template lang="pug">
view
  view(:class="[styles.bg || 'bg-default']")
    //- 自定义页面模板
    view(v-if="type === 'custom'")
      scroll-view.w-full.h-100vh(scroll-y @scrolltolower="$emit('loadmore')")
        slot
        .w-full.h-footer
    //- 列表页模板
    view(v-else-if="type === 'list'")
      .fixed.top-0.z-100.w-full.h-120.bg-white
        uni-search-bar.fixed.t-0(
          v-if="!showCustomSearchBar",
          v-model="searchValue",
          :placeholder="placeholder",
          :radius="31",
          clear-button="auto",
          cancel-button="always",
          cancel-text="搜索",
          @cancel="e => $emit('search', e.value)",
          @confirm="e => $emit('search', e.value)",
          @clear="$emit('clear')"
        )
        view(v-else)
          slot(name="searchBar")
      scroll-view.fixed.top-120.w-full(scroll-y, :class="[showBottom ? 'bottom-[calc(127rpx+env(safe-area-inset-bottom))]' : 'bottom-0' ]", @scrolltolower="$emit('loadmore')")
        slot
        uni-load-more(:status="loadingStatus")
      .fixed.bottom-safe.z-100.w-750.h-127.flex-center.bg-white(v-if="showBottom")
        button.w-714.h-91.rounded-54.bg-main-1(type="primary", @click="$emit('add-btn-click')")
          | {{ bottomBtnText }}
    //- 底部安全区域
    .fixed.bottom-0.w-full.h-footer.bg-white.z-100
  app-toast(v-if="toast")
  app-loading(v-if="loading")
</template>

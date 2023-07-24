<script setup>
import { useUniAppSystemRectInfo } from '@tuniao/tnui-vue3-uniapp/hooks/use-uniapp-system-rect-info/index'
const { navBarInfo } = useUniAppSystemRectInfo()

const headerHeight = computed(() => navBarInfo.height + 'px')
const navBarHeight = computed(() => navBarInfo.statusHeight + 'px')
const titleHeight = computed(() => `${navBarInfo.height - navBarInfo.statusHeight}px`)
</script>

<template>
<Layout :hide-navbar="true">
  <template #navbar>
    <view :style="{height: headerHeight}" class="tn-gradient-bg__purplered ">
      <view :style="{height: navBarHeight}"></view>
      <view :style="{height: titleHeight}" class="flex-center text-white text-30">自定义头部</view>
    </view>
  </template>
</Layout>
</template>

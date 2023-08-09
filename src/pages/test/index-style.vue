<script setup lang="ts">
const layout = $ref(null)
</script>

<template>
  <Layout ref="layout" title="样式渲染">
    <view class="box1"></view>
    <view class="box2"></view>
    <view class="flex justify-center h-100 mt20">
      <view class="w-half bg-orange text-white font-bold text-30 flex-center">Text</view>
      <view class="w-half bg-cyan text-white font-bold text-30 flex-center">Text</view>
    </view>
    <view class="flex justify-around p-20">
      <view class="rounded-full w-100 h-100 bg-teal"></view>
      <view class="rounded-full w-100 h-100 bg-toast"></view>
    </view>
    <view>
      <view i="mdi-chevron-down" class="text-36 text-main-5" />
    </view>
  </Layout>
</template>

<style lang="stylus" scoped>
.box1
  @apply h-10vh bg-red
.box2
  @apply h-10vh bg-green
</style>

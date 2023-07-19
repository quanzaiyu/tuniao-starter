<script setup>
</script>

<template>
<Layout title="样式渲染">
  <view class="box1"></view>
  <view class="box2"></view>
</Layout>
</template>

<style lang="stylus" scoped>
.box1
  @apply h-10vh bg-red
.box2
  @apply h-10vh bg-green
</style>

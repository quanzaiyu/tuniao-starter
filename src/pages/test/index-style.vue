<script setup>
</script>

<template lang="pug">
Layout(title="样式渲染")
  .box1
  .box2
</template>

<style lang="stylus" scoped>
.box1
  @apply h-10vh bg-red
.box2
  @apply h-10vh bg-green
</style>

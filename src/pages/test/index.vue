<script setup>
onLoad(async () => {
  console.info(dayjs())
  const { data, error } = await to(api.resolve(URLS.login))
  console.info({ data, error })
})

function toast() {
  utils.toast('hello')
}
</script>

<template>
  <button class="box1" @click="toast"></button>
</template>

<!-- <template lang="pug">
Layout(title="测试页面" type="custom")
  .box1
  .box2
</template> -->

<style lang="stylus" scoped>
.box1
  @apply h-100vh bg-red
.box2
  @apply h-100vh bg-green
</style>

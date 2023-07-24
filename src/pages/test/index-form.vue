<script setup>
function go(page) {
  navigator.navigateTo(page)
}
</script>

<template>
<Layout title="表单示例">
  <button @click="go('/pages/test/index-form-input')">输入框示例</button>
  <button @click="go('/pages/test/index-form-picker')">选择器示例</button>
  <button @click="go('/pages/test/index-form-select')">非输入型组件示例</button>
  <button @click="go('/pages/test/index-form-confirm')">表单提交示例</button>
</Layout>
</template>

<style lang="stylus" scoped>
</style>

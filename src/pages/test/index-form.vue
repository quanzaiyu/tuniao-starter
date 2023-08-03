<script setup lang="ts">
function go(page) {
  nav.to(page)
}
</script>

<template>
  <Layout title="表单示例">
    <button @click="go('/pages/test/index-form-input')">输入框示例</button>
    <button @click="go('/pages/test/index-form-select')">选择器示例</button>
    <button @click="go('/pages/test/index-form-datetimepicker')">日期时间和区域选择器示例</button>
    <button @click="go('/pages/test/index-form-calendar')">日历选择器示例</button>
    <button @click="go('/pages/test/index-form-other')">其他表单组件示例</button>
    <button @click="go('/pages/test/index-form-confirm')">表单验证与提交示例</button>
    <button @click="go('/pages/test/index-form-confirm-init')">表单数据初始化示例</button>
  </Layout>
</template>

<style lang="stylus" scoped>
</style>

<script setup lang="ts">
function go(page) {
  nav.to(page)
}
</script>

<template>
  <Layout title="表单示例">
    <tn-list-item right-icon="right" @click="go('/pages/demos/form/input')">输入框示例</tn-list-item>
    <tn-list-item right-icon="right" @click="go('/pages/demos/form/select')">选择器示例</tn-list-item>
    <tn-list-item right-icon="right" @click="go('/pages/demos/form/datetimepicker')">日期时间和区域选择器示例</tn-list-item>
    <tn-list-item right-icon="right" @click="go('/pages/demos/form/calendar')">日历选择器示例</tn-list-item>
    <tn-list-item right-icon="right" @click="go('/pages/demos/form/other')">其他表单组件示例</tn-list-item>
    <tn-list-item right-icon="right" @click="go('/pages/demos/form/confirm')">表单验证与提交示例</tn-list-item>
    <tn-list-item right-icon="right" @click="go('/pages/demos/form/confirm-init')">表单数据初始化示例</tn-list-item>
  </Layout>
</template>

<style lang="stylus" scoped>
</style>

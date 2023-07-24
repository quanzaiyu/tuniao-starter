<script setup>
// const layout = $ref(null)

const formConfig = $ref({
  columns: [],
})
</script>

<template>
  <Layout ref="layout" title="选择器示例">
    <app-form :config="formConfig"></app-form>
  </Layout>
</template>

<style lang="scss" scoped>

</style>

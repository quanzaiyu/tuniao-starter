<script setup lang="ts">
function go(path) {
  nav.to(path, { a: 1, b: 2 })
}
</script>

<template>
  <view>
    <tn-list-item right-icon="right" @click="go('/pages/demos/ui/index')">UI演示</tn-list-item>
    <tn-list-item right-icon="right" @click="go('/pages/demos/function/index')">功能演示</tn-list-item>
    <tn-list-item right-icon="right" @click="go('/pages/demos/form/index')">表单演示</tn-list-item>
  </view>
</template>

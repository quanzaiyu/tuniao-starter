<script setup lang="ts">
function go(path) {
  nav.to(path, { a: 1, b: 2 })
}
</script>

<template>
  <view>
    <button @click="go('/pages/test/index')">示例页面</button>
  </view>
</template>

<script setup></script>

<template lang="pug">
.fixed.transform-center.inset-0.flex-center.z-1000.flex-col.gap-10
  .absolute.transform-center.flex-center.flex-col.gap-10.rounded-15.w-200.h-200.bg-toast.text-white
    .loading.w-60.h-60.text-center.rounded-full
    .text-24 {{ $store.loading.title }}
</template>

<style scoped>
.loading {
  border: 4rpx solid white;
  border-top-color: transparent;
  animation: circle infinite 0.75s linear;
}

/* 参考 https://juejin.cn/post/7037036742985121800 */
@keyframes circle {
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>

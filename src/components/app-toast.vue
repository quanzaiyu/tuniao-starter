<script setup></script>

<template lang="pug">
.absolute.transform-center.z-900
  .flex-center.overflow-hidden.rounded-15.px-50.text-25.text-white.bg-toast
    .py-20.text-center {{ $store.toast.title }}
</template>

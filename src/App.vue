<script setup lang="ts">
onLaunch(async function (options) {
  console.info('onLaunch options', options)
  console.info('设备信息', uni.$store.systemInfo)

  // 通过sessionId登录
  // await uni.$store.loginBySessionId(options)

  // 获取省市区列表
  // uni.$store.getRegion()

  // #ifdef MP-WEIXIN
  // 通过微信code登录
  await uni.$store.loginByCode()
  // #endif
})
</script>

<style>
/* 每个页面公共css */
@import url('@tuniao/tn-style/dist/uniapp/index.css');
</style>

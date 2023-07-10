<script setup>
onLaunch(async function (options) {
  // 登录
  await uni.$store.login(options)

  // 获取省市区列表
  uni.$store.getRegion()
})

</script>

<style>
/* 每个页面公共css */
</style>

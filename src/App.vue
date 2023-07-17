<script setup>
onLaunch(async function (options) {
  // 通过sessionId登录
  // await uni.$store.loginBySessionId(options)

  // 模拟用户登录，其中密码需要加密传输，登录页面待完善
  await uni.$store.login({
    username: 'admin',
    password: 'efe3cbcba2444314a69815644522a09e',
  })

  // 获取性别
  uni.$store.getSex()

  // 获取省市区列表
  // uni.$store.getRegion()
})
</script>

<style>
/* 每个页面公共css */
@import url('@tuniao/tn-style/dist/uniapp/index.css');
</style>

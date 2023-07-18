<script setup>
async function login() {
  // 模拟用户登录，其中密码需要加密传输，登录页面待完善
  await uni.$store.login({
    username: 'admin',
    password: 'efe3cbcba2444314a69815644522a09e',
  })
}

// 获取性别
const sexList = $computed(() => uni.$store.sexList)
const sexMap = $computed(() => uni.$store.sexMap)
function getDict() {
  uni.$store.getSex()
  console.log(sexList, sexMap)
}
</script>

<template lang="pug">
Layout(title="接口请求")
  button(@click="login") 登录（获取token请求示例）
  button(@click="getDict") 获取字典值（携带token请求示例）
  .flex
    .mr-20(v-for="(item, index) in sexMap" :key="index") {{ index }}: {{ item }}
  .flex
    .mr-20(v-for="(item, index) in sexList" :key="index") {{ item.dictKey }}: {{ item.dictValue }}
</template>

<style lang="stylus" scoped>
</style>

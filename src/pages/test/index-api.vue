<script setup>
import md5 from 'js-md5'
const layout = $ref(null)

// 登录
const form = $ref({
  username: 'admin',
  password: 'A123456b!',
})
async function login() {
  // 模拟用户登录，其中密码需要加密传输，登录页面待完善
  await uni.$store.login({
    username: form.username,
    password: md5(form.password),
    noJump: true, // 不需要跳转页面
  })
  layout.notify({ msg: '登录成功' })
}

// 获取性别
const sexList = $computed(() => uni.$store.sexList)
const sexMap = $computed(() => uni.$store.sexMap)
function getDict() {
  uni.$store.getSex()
  console.info(sexList, sexMap)
}
</script>

<template lang="pug">
Layout(ref="layout" title="接口请求")
  tn-input(v-model="form.username" placeholder="请输入用户名")
  tn-input(v-model="form.password" placeholder="请输入密码" type="password")
  button(@click="login") 登录（获取token请求示例）
  button(@click="getDict") 获取字典值（携带token请求示例）
  .flex
    .mr-20(v-for="(item, index) in sexMap" :key="index") {{ index }}: {{ item }}
  .flex
    .mr-20(v-for="(item, index) in sexList" :key="index") {{ item.dictKey }}: {{ item.dictValue }}
</template>

<style lang="stylus" scoped>
</style>

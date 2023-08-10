<script setup lang="ts">
import md5 from 'js-md5'
const layout = ref(null)

onUnload(() => {
  if (!uni.$store.userInfo?.access_token) {
    uni.$store.fromLogin = true
    uni.$emit('login-cancel')
  }
})

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
  layout.value.notify({ msg: '登录成功' })

  uni.$emit('login')

  setTimeout(() => {
    nav.back()
  }, 2000)
}
</script>

<template>
  <Layout ref="layout" title="登录">
    <view class="p20">
      <view class="mt20">
        <tn-input v-model="form.username" placeholder="请输入用户名"></tn-input>
      </view>
      <view class="mt20">
        <tn-input v-model="form.password" placeholder="请输入密码" type="password"></tn-input>
      </view>
      <view class="p-24 mt-20 flex flex-center rounded-15 tn-border tn-type-primary_border" @click="login">登录（获取token）</view>
    </view>
  </Layout>
</template>

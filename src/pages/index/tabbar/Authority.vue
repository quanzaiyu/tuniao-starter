<script setup lang="ts">
let isLogin = $ref(false)

// 获取注入数据
const currentTabbarIndex: Ref = inject('currentTabbarIndex')
const layout: Ref = inject('layout')

// 检测用户是否登录
checkLogin()
function checkLogin() {
  if (!uni.$store.userInfo?.access_token) {
    if (!uni.$store.fromLogin) {
    // 如果没登录，跳转到登录页
      nav.to('/pages/index/login')
    } else {
      currentTabbarIndex.value = 0
    }
  } else {
    isLogin = true
  }
  // 清除从登录页返回的状态
  uni.$store.fromLogin = false
}

// 登录
uni.$on('login', () => {
  isLogin = true
})

// 从登录页返回，取消登录
uni.$on('login-cancel', () => {
  checkLogin()
})

// 携带token请求：获取性别，存储到状态管理
const sexList = $computed(() => uni.$store.sexList)
const sexMap = $computed(() => uni.$store.sexMap)
function getDict() {
  uni.$store.getSex()
  console.info(sexList, sexMap)
}

// 退出登录
function logout() {
  uni.$store.logout()
  layout.value.notify({ msg: '退出成功' })

  setTimeout(() => {
    currentTabbarIndex.value = 0
  }, 2000)
}
</script>

<template>
  <view v-if="isLogin">
    <view>已登录</view>

    <button @click="getDict">获取字典值（携带token请求）</button>
    <view class="flex">
      <view v-for="(item, index) in sexMap" :key="index" class="mr-20">{{ index }}: {{ item }}</view>
    </view>
    <view class="flex">
      <view v-for="(item, index) in sexList" :key="index" class="mr-20">{{ item.dictKey }}: {{ item.dictValue }}</view>
    </view>

    <button @click="logout">退出登录</button>
  </view>
</template>

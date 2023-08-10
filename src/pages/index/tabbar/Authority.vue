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

function go(page) {
  nav.to(page)
}
const { navBarInfo } = useUniAppSystemRectInfo()
</script>

<template>
  <view v-if="isLogin" class="p20">
    <tn-sticky :offset-top="navBarInfo.height">
      <view class="tn-gradient-bg__cool-6 tn-white_text tn-radius tn-p tn-flex-center tn-text-lg">
        已登录
      </view>
    </tn-sticky>

    <tn-list-item right-icon="right" @click="go('/pages/demos/function/upload')">上传图片</tn-list-item>
    <view class="p-24 mt-20 flex flex-center rounded-15 tn-border tn-type-primary_border" @click="getDict">获取字典值（携带token请求）</view>

    <view class="p20">
      <view class="flex">
        <view v-for="(item, index) in sexMap" :key="index" class="mr-20">{{ index }}: {{ item }}</view>
      </view>
      <view class="flex">
        <view v-for="(item, index) in sexList" :key="index" class="mr-20">{{ item.dictKey }}: {{ item.dictValue }}</view>
      </view>
    </view>

    <view class="p-24 mt-20 flex flex-center rounded-15 tn-border tn-red_border" @click="logout">退出登录</view>
  </view>
</template>

<style lang="stylus" scoped>
</style>

<script setup lang="ts">
const layout: Ref = inject('layout')

// 用户信息
const userInfo = $computed(() => uni.$store.userInfo)

const userName = $computed({
  get() {
    if (!userInfo) {
      return '请登录'
    }
    return userInfo?.name || '微信用户'
  },
  set(val) {
    uni.$store.userInfo.name = val
  },
})
let userAvatar = $computed({
  get() {
    if (!userInfo?.avatar) {
      return uni.$store.$oss + '/static/images/avatar.jpg'
    }
    return uni.$store.$upload + userInfo?.avatar
  },
  set(val) {
    uni.$store.userInfo.avatar = val
  },
})

function showLoginPopup() {
  // 没有用户信息，弹出登录弹框
  const userInfo = uni.$store.userInfo
  if (!userInfo) {
    layout.value.showPopup({
      closeBtn: false,
      overlayCloseable: true,
    })
    return true
  }
  return false
}

// 获取用户昵称
async function updateUserName(options) {
  if (showLoginPopup()) return
  await api.resolve(URLS.updateUserInfo, {
    name: options.detail.value,
  })
}

// 获取用户头像
async function updateUserAvatar(options) {
  if (showLoginPopup()) return
  // 上传头像
  const res: AnyObject = await api.upload({
    path: options.detail.avatarUrl,
  })
  const userRes: AnyObject = await api.resolve(URLS.updateUserInfo, {
    avatar: res.name,
  })
  userAvatar = userRes.avatar
}
</script>

<template>
  <view class="p-20">
    <div class="p-26">
      <!-- 头像和昵称 -->
      <div class="flex-between">
        <div class="flex-center">
          <button
            class="w-108 h-108 rounded-half p-0 box-border"
            :open-type="userInfo ? 'chooseAvatar' : ''"
            @chooseavatar="updateUserAvatar"
            @click="userInfo ? '' : updateUserAvatar"
          >
            <img
              class="w-108 h-108 rounded-half"
              :src="userAvatar"
              alt=""
            >
          </button>

          <div class="text-36 ml-24">
            <div
              v-if="!userInfo"
              @click="updateUserName"
            >{{ userName }}</div>
            <input
              v-else
              v-model="userName"
              type="nickname"
              class="weui-input"
              placeholder="请输入昵称"
              @blur="updateUserName"
            />
          </div>
        </div>
        <img class="w-48 h-48 rounded-half" :src="$oss + '/static/images/settings.png'" alt="">
      </div>
    </div>
  </view>
</template>

<style scoped lang="stylus">
.live
  background: linear-gradient(89deg, #FF4A48 0%, #FC4188 100%);
</style>

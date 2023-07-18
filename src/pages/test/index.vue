<script setup>
console.info(dayjs())

// const { data, error } = await to(api.resolve(URLS.login))
// console.info({ data, error })

// 获取页面参数
onLoad(options => {
  console.log(options)
})

// toast
function toast() {
  utils.toast('hello')
}

// loading
function showLoading() {
  utils.loading('加载中...', 3000)
}
function hideLoading() {
  utils.unloading()
}

// 展示遮罩
function showOverlay() {
  utils.overlay()
}

// 图片上传
const imageList = $ref([])
async function upload(e) {
  const res = await api.upload(e)
  /*
  返回的结构：
  {
    "link": "http://www.yunsuinfo.com:8090/bladex/upload/20230717/1362c26632d868d568e499a4f1a55a2c.png",
    "domain": "http://www.yunsuinfo.com:8090/bladex",
    "name": "upload/20230717/1362c26632d868d568e499a4f1a55a2c.png",
    "originalName": "logo_80.png",
    "attachId": null
  }
  */
  return res.link
}
</script>

<template lang="pug">
Layout(title="测试页面" type="custom")
  button(@click="toast") Toast
  button(@click="showLoading") showLoading
  button(@click="hideLoading") hideLoading
  button(@click="showOverlay") showOverlay
  tn-image-upload(v-model="imageList" action="" :custom-upload-handler="upload" :max-size="3 * 1024 * 1024" :extensions="['jpg','jpeg', 'png']")
  .box1
  .box2
  tn-icon(name="logo-tuniao")
  view 当前上传列表
  .flex
    image.w-100.h-100(v-for="(item, index) in imageList" :key="index" :src="item" mode="scaleToFill")
  template(#overlay)
    .w-full.h-full.flex-center.text-white.text-48 overlay
</template>

<style lang="stylus" scoped>
.box1
  @apply h-10vh bg-red
.box2
  @apply h-10vh bg-green
</style>

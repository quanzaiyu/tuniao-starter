<script setup>
onLoad(() => {
  console.info(dayjs())
  // const { data, error } = await to(api.resolve(URLS.login))
  // console.info({ data, error })
})

function toast() {
  utils.toast('hello')
}

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

// const fileList = $computed(() => imageList.map(item => item.link))

</script>

<template>
  <button @click="toast">Toast</button>
  <view class="box1"></view>
  <view class="box2"></view>
  <tn-image-upload v-model="imageList" action="" :custom-upload-handler="upload" :max-size="3 * 1024 * 1024" :extensions="['jpg','jpeg', 'png']" />
  <view>当前上传列表</view>
  <!-- <view class="flex">
    <image v-for="(item, index) in fileList" :key="index" class="w-100 h-100" :src="item" mode="scaleToFill" />
  </view> -->
</template>

<!-- <template lang="pug">
Layout(title="测试页面" type="custom")
  .box1
  .box2
</template> -->

<style lang="stylus" scoped>
.box1
  @apply h-10vh bg-red
.box2
  @apply h-10vh bg-green
</style>

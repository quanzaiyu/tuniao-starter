<script setup>
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
Layout(title="上传图片")
  tn-image-upload(v-model="imageList" action="" :custom-upload-handler="upload" :max-size="3 * 1024 * 1024" :extensions="['jpg','jpeg', 'png']")
  view 当前上传列表
  .flex
    image.w-100.h-100(v-for="(item, index) in imageList" :key="index" :src="item" mode="scaleToFill")
</template>

<style lang="stylus" scoped>
</style>

<script setup lang="ts">
const layout = $ref(null)
// 图片上传
const imageList = $ref([])

async function upload(e) {
  const res: UploadResult = await api.upload(e) as UploadResult
  return res.link
}
</script>

<template>
  <Layout ref="layout" title="上传图片">
    <tn-image-upload
      v-model="imageList"
      action=""
      :custom-upload-handler="upload"
      :max-size="3 * 1024 * 1024"
      :extensions="['jpg','jpeg', 'png']"
    ></tn-image-upload>
    <view>当前上传列表</view>
    <view class="flex">
      <image
        v-for="(item, index) in imageList"
        :key="index"
        :src="item"
        class="w-100 h-100"
        mode="scaleToFill"
      ></image>
    </view>
  </Layout>
</template>

<style lang="stylus" scoped>
</style>

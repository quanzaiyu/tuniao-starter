<script setup lang="ts">
const layout = $ref(null)

// 图鸟UI图标
// 更多图标：
// https://resource.tuniaokj.com/vue3_page_data/iconfont.json
// https://vue3.tuniaokj.com/zh-CN/component/icon.html
const tnIconsList = [
  {
    icon: 'search',
    name: '搜索',
    color: 'tn-blue',
  },
  {
    icon: 'scan',
    name: '扫码',
    color: 'tn-aquablue',
  },
  {
    icon: 'loading',
    name: '加载',
    color: 'tn-bluepurple',
  },
  {
    icon: 'filter',
    name: '过滤',
    color: 'tn-purple',
  },
  {
    id: 644,
    icon: 'upload-simple',
    name: '上传',
    color: 'tn-purplered',
  },
  {
    id: 643,
    icon: 'download-simple',
    name: '下载',
    color: 'tn-red',
  },

]

// MDI Icons
// 更多图标：
// https://pictogrammers.com/library/mdi/
// https://icones.netlify.app/collection/mdi
const mdiIconsList = [
  {
    icon: 'mdi-chevron-up',
    name: '上箭头',
    color: 'tn-blue',
  },
  {
    icon: 'mdi-chevron-down',
    name: '下箭头',
    color: 'tn-blue',
  },
  {
    icon: 'mdi-account',
    name: '我的',
    color: 'tn-aquablue',
  },
  {
    icon: 'mdi-home',
    name: '主页',
    color: 'tn-bluepurple',
  },
  {
    icon: 'mdi-cloud-upload-outline',
    name: '上传',
    color: 'tn-purple',
  },
  {
    icon: 'mdi-plus-box',
    name: '添加',
    color: 'tn-purplered',
  },
]
</script>

<template>
  <Layout ref="layout" title="图标">
    <view class="p15">
      <view>
        <tn-title title="图鸟图标" mode="vLine" />
        <view class="flex flex-wrap">
          <view v-for="(icon, index) in tnIconsList" :key="index" class="w-240 mt10 flex-center flex-col">
            <view>
              <tn-icon
                :name="icon.icon"
                :size="80"
                :color="icon.color"
              />
            </view>
            <view>{{ icon.name }}</view>
          </view>
        </view>
      </view>

      <view class="mt20">
        <tn-title title="MDI图标" mode="vLine" />
        <view class="flex flex-wrap">
          <view v-for="(icon, index) in mdiIconsList" :key="index" class="w-240 mt10 flex-center flex-col">
            <view>
              <view :class="'i-'+icon.icon" class="text-80 text-red" />
            </view>
            <view>{{ icon.name }}</view>
          </view>
          <view class="w-240 flex-center flex-col">
            <view>
              <view i="mdi-vuejs" class="text-80 text-green" />
            </view>
            <view>Vue</view>
          </view>
          <view class="w-240 flex-center flex-col">
            <view>
              <view i="mdi-react" class="text-80 text-main-1" />
            </view>
            <view>React</view>
          </view>
        </view>
      </view>
    </view>
  </Layout>
</template>

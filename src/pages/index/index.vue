<script setup lang="ts">
import Home from './tabbar/Home.vue'
import Examples from './tabbar/Examples.vue'
import Authority from './tabbar/Authority.vue'
import UCenter from './tabbar/UCenter.vue'

const layout = ref(null)

// 底部导航栏数据
const tabbarData = [
  { text: '首页', icon: 'assign-fill' },
  { text: '示例', icon: 'menu-more-fill' },
  { text: '权限', icon: 'menu-match-fill' },
  { text: '我的', icon: 'logo-tuniao' },
]

// 当前选中的子页面的索引
const currentTabbarIndex = ref<number>(0)

provide('currentTabbarIndex', currentTabbarIndex)
provide('layout', layout)

// 导航切换事件
const onTabbarChange = (index: string | number) => {
  console.info(index)
}
</script>

<template>
  <Layout ref="layout" title="首页" :hide-icon="true">
    <view v-if="currentTabbarIndex === 0">
      <Home></Home>
    </view>
    <view v-if="currentTabbarIndex === 1">
      <Examples></Examples>
    </view>
    <view v-if="currentTabbarIndex === 2">
      <Authority></Authority>
    </view>
    <view v-if="currentTabbarIndex === 3">
      <UCenter></UCenter>
    </view>
    <tn-tabbar
      v-model="currentTabbarIndex"
      :fixed="true"
      :placeholder="false"
      switch-animation
      frosted
      @change="onTabbarChange"
    >
      <tn-tabbar-item
        v-for="(item, index) in tabbarData"
        :key="index"
        :name="index"
        :text="item.text"
        inactive-color="#c5cad5"
        :icon="item.icon"
        :active-icon="item.icon"
      />
    </tn-tabbar>
  </Layout>
</template>

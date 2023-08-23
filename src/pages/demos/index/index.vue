<script setup lang="ts">
import Home from './tabbar/Home.vue'
import Examples from './tabbar/Examples.vue'
import Authority from './tabbar/Authority.vue'
import UCenter from './tabbar/UCenter.vue'

const layout = ref(null) // 布局组件引用
let hideNavbar = $ref(false) // 是否隐藏默认导航栏

// 底部导航栏数据
const tabbarData = [
  { text: '首页', icon: 'assign-fill', key: 'home' },
  { text: '示例', icon: 'menu-more-fill', key: 'examples' },
  { text: '权限', icon: 'menu-match-fill', key: 'authority' },
  { text: '我的', icon: 'logo-tuniao', key: 'ucenter' },
]

const currentTabbarIndex = $ref<number>(0) // 当前选中的子页面的索引
const tabbar = $ref(null)
let options = $ref(null)

onLoad(opts => {
  options = opts
})

onMounted(() => {
  // 跳转到指定tab，只需要进入页面的时候带上参数key即可，如：http://localhost:5173/#/?key=ucenter
  if (options.key) {
    const index = tabbarData.findIndex(item => item.key === options.key)
    // currentTabbarIndex = index
    tabbar.setActiveItem(index) // fix: setActiveItem不生效
    console.info(currentTabbarIndex)
  }
})

// 页面标题
const title = $computed(() => {
  hideNavbar = currentTabbarIndex === 0
  return ['首页', '示例', '权限', '我的'][currentTabbarIndex]
})

// 导航切换事件
const onTabbarChange = (index: string | number) => {
  console.info(index)
}

// 导航项点击事件
const onTabbarItemClick = item => {
  console.info(item)
}

// 向子组件注入数据
provide('currentTabbarIndex', currentTabbarIndex)
provide('layout', layout)
</script>

<template>
  <Layout
    ref="layout"
    :title="title"
    :hide-icon="true"
    :hide-navbar="hideNavbar"
  >
    <template #navbar>
      <view :style="{height: '300rpx'}" class="tn-gradient-bg__cool-6 tn-bg-image"></view>
    </template>
    <Home v-if="currentTabbarIndex === 0"></Home>
    <Examples v-if="currentTabbarIndex === 1"></Examples>
    <Authority v-if="currentTabbarIndex === 2"></Authority>
    <UCenter v-if="currentTabbarIndex === 3"></UCenter>
    <tn-tabbar
      ref="tabbar"
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
        @click="onTabbarItemClick(item)"
      />
    </tn-tabbar>
  </Layout>
</template>

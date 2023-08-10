<script setup lang="ts">
import Home from './tabbar/Home.vue'
import Examples from './tabbar/Examples.vue'
import Authority from './tabbar/Authority.vue'
import UCenter from './tabbar/UCenter.vue'

const { navBarInfo } = useUniAppSystemRectInfo()

// 计算自定义头部的高度
const headerHeight = computed(() => navBarInfo.height + 'px')
const navBarHeight = computed(() => navBarInfo.statusHeight + 'px')
const titleHeight = computed(() => `${navBarInfo.height - navBarInfo.statusHeight}px`)

const layout = ref(null) // 布局组件引用
let hideNavbar = $ref(false) // 是否隐藏默认导航栏
let title = $ref('') // 是否隐藏默认导航栏

// 底部导航栏数据
const tabbarData = [
  { text: '首页', icon: 'assign-fill' },
  { text: '示例', icon: 'menu-more-fill' },
  { text: '权限', icon: 'menu-match-fill' },
  { text: '我的', icon: 'logo-tuniao' },
]

// 当前选中的子页面的索引
const currentTabbarIndex = ref<number>(0)
watch(currentTabbarIndex, index => {
  title = {
    0: '首页',
    1: '示例',
    2: '权限',
    3: '我的',
  }[currentTabbarIndex.value]

  if (index === 0) {
    hideNavbar = true
  } else {
    hideNavbar = false
  }
}, {
  immediate: true,
})

// 导航切换事件
const onTabbarChange = (index: string | number) => {
  console.info(index)
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
      <view :style="{height: headerHeight}" class="tn-gradient-bg__purplered ">
        <view :style="{height: navBarHeight}"></view>
        <view :style="{height: titleHeight}" class="flex-center text-white text-30">首页自定义头部</view>
      </view>
    </template>
    <Home v-if="currentTabbarIndex === 0"></Home>
    <Examples v-if="currentTabbarIndex === 1"></Examples>
    <Authority v-if="currentTabbarIndex === 2"></Authority>
    <UCenter v-if="currentTabbarIndex === 3"></UCenter>
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

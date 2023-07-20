import { createSSRApp } from 'vue'
import { createPinia } from 'pinia'

// dayjs
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import isToday from 'dayjs/plugin/isToday'
import isTomorrow from 'dayjs/plugin/isTomorrow'
import duration from 'dayjs/plugin/duration'
import isBetween from 'dayjs/plugin/isBetween'

import 'uno.css'
import './ployfill'

// 引入 store
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import TnTitle from '@tuniao/tnui-vue3-uniapp/components/title/src/title.vue'
import App from './App.vue'
import { store } from '@/stores'
// 引入library
import library from '@/library'
// 请求封装引入
import api from '@/api'

// 全局混入
import mixin from '@/mixin'
// 全局指令
import { skin } from '@/directive'

import basePage from '@/components/base-page'
dayjs.extend(utc)
dayjs.extend(isToday)
dayjs.extend(isTomorrow)
dayjs.extend(duration)
dayjs.extend(isBetween)

const mountObj = {
  $api: api, // 请求方法挂载全局
  $filter: library.filter, // 异步函数封装挂载全局
  $utils: library.utils, // 各类系统方法挂载全局
  $navigator: library.navigator, // 路由跳转挂载全局
  $to: library.to, // 异步函数封装挂载全局
  $env: {
    oss: import.meta.env.VITE_APP_OSS,
  },
}

export function createApp() {
  const app = createSSRApp(App)

  app.component('base-page', basePage)
  app.component('tn-icon', TnIcon)
  app.component('tn-title', TnTitle)
  app.use(createPinia())
  app.mixin(mixin)

  // #ifdef H5
  // 小程序不支持指令，暂未找到解决方案
  app.directive('skin', skin)
  // #endif

  for (const key in mountObj) {
    app.config.globalProperties[key] = mountObj[key]
    uni[key] = mountObj[key]
  }
  app.config.globalProperties.$store = uni.$store = reactive(store())

  uni.app = app

  // #ifdef H5
  window.app = app
  // #endif

  return { app }
}

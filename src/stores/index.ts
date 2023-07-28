import { defineStore } from 'pinia'

// 批量导出模块
const files = import.meta.globEager('./modules/*.js')
const modules = {}
for (const key in files) {
  modules[key.replace(/(\.\/modules\/|\.js)/g, '')] = files[key]
}

// 获取模块内部状态
const getInnerStates = type => {
  return Object.entries(modules)
    .map((module: Array<AnyObject>) => module[1].default[type])
    .reduce((sum, cur) => ({ ...(sum || {}), ...cur }))
}

export const store = defineStore('Store', {
  state: () => getInnerStates('state'),
  actions: getInnerStates('actions'),
  getters: getInnerStates('getters'),
})

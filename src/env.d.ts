/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

// 对vue进行类型补充说明
import { ComponentCustomProperties } from 'vue'
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $oss: string
    $upload: string
    $store: any
    $formatTime: (string, string?) => string
    $shopLogo: (string) => string
    phoneCall: (string) => void
    go: function
  }

  interface ComponentInternalInstance {
    ctx: any
  }
}

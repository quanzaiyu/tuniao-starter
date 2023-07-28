// @ts-nocheck
import path from 'path'
import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import AutoImport from 'unplugin-auto-import/vite'

import Unocss from 'unocss/vite'
import babel from 'vite-plugin-babel'

// https://segmentfault.com/q/1010000039415232/a-1020000041235850
// https://vuejs.org/guide/extras/reactivity-transform.html
// https://vue-macros.sxzz.moe/features/reactivity-transform.html
import ReactivityTransform from '@vue-macros/reactivity-transform/vite'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [
    uni({
      vueOptions: {
      },
    }),

    AutoImport({
      imports: [
        'vue',
        'vue/macros',
        {
          '@dcloudio/uni-app': ['onLaunch', 'onLoad', 'onShow', 'onReady', 'onHide', 'onUnload', 'onReachBottom'],
          '@tuniao/tnui-vue3-uniapp': ['useUniAppSystemRectInfo'],
          // 支付宝小程序不支持lodash，暂未找到解决方案
          lodash: '_',
          dayjs: [['default', 'dayjs']],
          clipboard: [['default', 'Clipboard']],
        },
        {
          from: '@tuniao/tnui-vue3-uniapp',
          imports: ['TnNotifyInstance', 'TnModalInstance', 'TnActionSheetInstance'],
          type: true,
        },
        {
          from: '@dcloudio/uni-app',
          imports: ['RequestSuccessCallbackResult', 'Page'],
          type: true,
        },
      ],
			resolvers: [],
      dirs: ['src/composables', 'src/library/**'],
      dts: 'src/auto-imports.d.ts',
      eslintrc: {
        enabled: true,
        filepath: '.eslintrc-auto-import.json',
        globalsPropValue: 'readonly',
      },
    }),

    ReactivityTransform(),

    babel(),

    Unocss(),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:88/',
        rewrite: path => path.replace(/^\/api/, '/'), // 路径重写，本项目不需要重写
      },
    },
  },
  build: {
    target: 'es2015',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor'
          }
        },
      },
    },
  },
})

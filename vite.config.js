import path from 'path'
import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import AutoImport from 'unplugin-auto-import/vite'
import Unocss from 'unocss/vite'

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
          // 支付宝小程序不支持lodash，暂未找到解决方案
          lodash: '_',
          dayjs: [['default', 'dayjs']],
          clipboard: [['default', 'Clipboard']],
        },
      ],
      dirs: ['src/composables', 'src/library/modules/**'],
      dts: 'src/auto-imports.d.ts',
      eslintrc: {
        enabled: true,
        filepath: '.eslintrc-auto-import.json',
        globalsPropValue: 'readonly',
      },
    }),

    ReactivityTransform(),

    Unocss(),
  ],
  // server: {
  //   proxy: {
  //     '/api': {
  //       target: 'http://localhost:88/',
  //       rewrite: path => path.replace(/^\/api/, '/'), // 路径重写，本项目不需要重写
  //     },
  //   },
  // },
})

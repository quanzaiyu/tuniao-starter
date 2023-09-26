// @ts-nocheck
import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import AutoImport from 'unplugin-auto-import/vite'

import Unocss from 'unocss/vite'
import babel from 'vite-plugin-babel'

// https://segmentfault.com/q/1010000039415232/a-1020000041235850
// https://vuejs.org/guide/extras/reactivity-transform.html
// https://vue-macros.sxzz.moe/features/reactivity-transform.html
import ReactivityTransform from '@vue-macros/reactivity-transform/vite'

// https://vitejs.dev/config/
export default mode => {
  const env = loadEnv(mode, process.cwd()); // 获取.env文件里定义的环境变量

  return defineConfig({
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
          target: env.VITE_APP_BASE_API_H5_PROXY,
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, env.VITE_APP_BASE_API_H5_REPLACE),
          bypass(req,res,options) {
            // https://blog.csdn.net/qq_47658204/article/details/130833481
            const proxyUrl = new URL(options.rewrite(req.url), options.target)?.href
            res.setHeader("x-res-proxy-url", proxyUrl)
          }
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
}

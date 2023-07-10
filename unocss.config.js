
// https://uno.antfu.me/

// import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders'
import extractorPug from '@unocss/extractor-pug'
import { extractorSplit } from '@unocss/core'
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  transformerDirectives,
  transformerVariantGroup,
  toEscapedSelector as e
} from 'unocss'
import {
  presetApplet,
  presetRemToRpx,
  transformerApplet,
  transformerAttributify
} from 'unocss-applet'

const isH5 = process.env.UNI_PLATFORM === 'h5'

export default defineConfig({
  presets: [
    presetApplet({ enable: !isH5 }),
    presetAttributify(),
    presetRemToRpx({ baseFontSize: 4, screenWidth: 750 }),
    presetIcons({
      extraProperties: {
        display: 'inline-block',
        height: '1.2em',
        width: '1.2em',
        'vertical-align': 'text-bottom',
      },
      collections: {
        // SVG 包含 currentColor 值，将会当作一个单色图标，使用 mask mode 设置样式
        // uno: FileSystemIconLoader(
        //   'src/static/icons',
        //   svg => svg.replace(/#fff/, 'currentColor')
        //     .replace(/white/, 'currentColor')
        //     .replace(/none/, 'currentColor')
        // ),
        // https://pictogrammers.com/library/mdi/?welcome
        mdi: () => import('@iconify-json/mdi/icons.json').then(i => i.default),
      },
    }),
  ],
  postprocess(util) {
    const baseFontSize = 4
    const rpxRE = /(-?[.\d]+)rpx/g
    const remRE = /(-?[.\d]+)rem/g
    util.entries.forEach(i => {
      const value = i[1]
      if (value && typeof value === 'string') {
        // rem to rpx
        if (remRE.test(value)) {
          i[1] = value.replace(remRE, (_, p1) => `${p1 * baseFontSize}rpx`)
        }
        // @apply to rem
        if (util.selector.includes('.\\-')) {
          if (remRE.test(value)) {
            i[1] = value.replace(remRE, (_, p1) => `${p1 / baseFontSize / 2}rem`)
          }
          if (rpxRE.test(value)) {
            i[1] = value.replace(rpxRE, (_, p1) => `${p1 / baseFontSize / 8}rem`)
          }
        }
      }
    })
  },
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
    // Don't change the following order
    transformerAttributify(),
    transformerApplet(),
  ],
  shortcuts: [
    {
      'inset-0': 'top-0 left-0 right-0 bottom-0',
      'flex-center': 'flex justify-center items-center',
      'flex-between': 'flex justify-between items-center',
      'flex-around': 'flex justify-around items-center',
      'transform-center': 'top-50% left-50% translate--50%',
    },
    // 处理安全区域
    [/^(top|left|right|bottom|((m|p)([trbl]?)))-safe(?:-(\d+))?$/, ([, prefix,,,, value]) => handlerSafeArea(prefix, value)],
  ],
  rules: [
    // 多行省略
    [/^line-clamp-(\d+)$/, ([, value]) => handlerLineClamp(value)],
    // 按钮
    [/^btn$/, ([,], { rawSelector }) => handlerButton(rawSelector)],
    // ICON
    // [/^i-(.+)$/, ([, value]) => handlerIcon(value)],
    // 隐藏滚动条
    [/no-scrollbar/, ([,], { rawSelector }) => handlerScrollBar(rawSelector)],
  ],
  theme: {
    colors: {
      default: {
        DEFAULT: '#F5F5F5',
      }, // 背景色
      main: {
        1: '#4583E4', // 主要banner文字颜色
        2: 'rgba(241,247,255,0.7)', // 主要banner文字对应的背景颜色
        3: '#F56565', // 删除文字
        4: '#333333', // 输入框标题颜色
        5: '#999999', // 输入框内容颜色
        6: '#F22F2F', // 输入框前面的必填*号
        7: '#45BFE4', // 添加摊位按钮颜色
        8: '#FFA632', // 警告颜色
        9: '#666666', // 文字颜色
        10: '#dddddd',
      },
      toast: '#595959',
    },
    spacing: {
      half: '50%',
      header: 'calc(var(--status-bar-height))',
      footer: 'calc(env(safe-area-inset-bottom))',
    },
    width: { half: '50%' },
    height: {
      half: '50%',
      statusbar: 'var(--status-bar-height)',
      header: 'calc(var(--status-bar-height))',
      footer: 'calc(env(safe-area-inset-bottom))',
    },
    fontSize: {
      base: ['28rpx', null],
    },
    lineHeight: {
    },
    borderRadius: {
      half: '50%',
    },
  },
  safelist: ['text-25', 'text-main-4'],
  preflights: [
    {
      getCSS: ({ theme }) => `
      body, uni-page-body {
          font-size: ${theme.fontSize.base[0]};
          font-family: 'Source Han Sans CN, Source Han Sans CN-Normal';
          font-weight: 400;
          color: ${theme.colors.main[1]};
        }
      `,
    },
  ],
  extractors: [
    extractorPug(),
    extractorSplit,
  ],
})

// 处理安全区域
function handlerSafeArea(prefix, value) {
  if (prefix.length === 1) {
    return `${prefix}-[env(safe-area-inset-top)_env(safe-area-inset-left)_env(safe-area-inset-right)_env(safe-area-inset-bottom)]`
  }

  const match = { t: 'top', r: 'right', b: 'bottom', l: 'left' }
  const direction = match[prefix[1]] || prefix
  return value
    ? `${prefix}-[calc(env(safe-area-inset-${direction})+${value}rpx)]`
    : `${prefix}-[env(safe-area-inset-${direction})]`
}

// 处理多行省略
function handlerLineClamp(value) {
  return {
    overflow: 'hidden',
    display: '-webkit-box',
    'word-break': 'break-all',
    '-webkit-box-orient': 'vertical',
    '-webkit-line-clamp': `${value}`,
  }
}

// 隐藏滚动条
function handlerScrollBar(rawSelector) {
  const selector = e(rawSelector)
  return `
        ${selector}::-webkit-scrollbar,
        ${selector} ::-webkit-scrollbar {
           display: none !important
        }
      `
}

// 处理按钮样式
function handlerButton(rawSelector) {
  const selector = e(rawSelector)
  return `
    ${selector} {
      padding: 6rpx 12rpx;
      border-radius: 10rpx;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      line-height: 1;
      transition-duration: 200ms;
      overflow: hidden;
      cursor: pointer;
    }
  `
}

// 处理 ICON
// function handlerIcon(value) {
//   const iconURL = value.includes('svg')
//     ? `url(/static/icons/${value.split('svg-')[1]}.svg) no-repeat`
//     : `url(/static/icons/${value.includes('mask') ? value.split('mask-')[1] : value}.png) no-repeat`
//   if (value.includes('mask')) {
//     return {
//       mask: iconURL,
//       'mask-size': '100% 100%',
//       'background-color': 'currentColor',
//       display: 'inline-block',
//       height: '1.2em',
//       width: '1.2em',
//       'vertical-align': 'text-bottom'
//     }
//   } else {
//     return {
//       background: iconURL,
//       'background-size': '100% 100%',
//       'background-color': 'transparent',
//       display: 'inline-block',
//       height: '1.2em',
//       width: '1.2em',
//       'vertical-align': 'text-bottom'
//     }
//   }
// }

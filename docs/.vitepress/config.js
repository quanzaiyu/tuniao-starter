module.exports = {
  title: 'xiaoxiao昱',
  description: "Quanzaiyu's Uniapp Vite4 Vue3 Scaffold",
  lang: 'zh-CN',
  themeConfig: {
    // 导航
    nav: [
      { text: '首页', link: '/' },
      { text: '架构', link: '/pages/frame/', activeMatch: '/frame/' },
      { text: '项目', link: '/pages/project/', activeMatch: '/project/' },
      { text: '业务', link: '/pages/business/', activeMatch: '/business/' },
      { text: '更多文档', link: 'https://www.yuque.com/xiaoyulive' }
    ],
    // 侧边栏
    sidebar: {
      '/pages/frame/': [{ text: '', items: getFrameSidebar() }],
      '/pages/project/': [{ text: '', items: getProjectSidebar() }],
      '/pages/business/': [{ text: '', items: getBusinessSidebar() }],
    },
    // 底部信息
    footer: {
      copyright: `Copyright © ${new Date().getFullYear()} - Powered by <a href="https://github.com/quanzaiyu">xiaoxiao昱</a>`
    }
  },
  markdown: {}
}

// 解析侧边栏
function resolveSidebar(titleArr, basePath) { return titleArr.map(text => ({ text, link: `${basePath}${text}` })) }

// 侧边栏：架构
function getFrameSidebar() {
  return [
    { text: '架构', link: '/pages/frame/' },
    ...resolveSidebar(['代码规范', '提交规范', '页面', '样式', '路由', '请求', '图片上传', '储存', '图标', '状态管理', '第三方库'], '/pages/frame/')
  ]
}

// 侧边栏：项目
function getProjectSidebar() {
  return [
    { text: '项目', link: '/pages/project/' },
    ...resolveSidebar(['工具类', '过滤器', '公共组件', '注意事项'], '/pages/project/')
  ]
}

// 侧边栏：业务
function getBusinessSidebar() {
  return [
    { text: '业务', link: '/pages/business/' },
    ...resolveSidebar(['字典值', '页面类型'], '/pages/business/')
  ]
}

# 项目结构

本项目使用 uniapp vite 创建，可以使用 uniapp 的所有特性。Vue 版本为 3.2.30。

## 目录结构

项目基础目录结构如下：

```
.
├─index.html
├─src # 项目目录
│  ├─api # 接口
│  ├─composables # 混合式API
│  ├─components # 公共组件
│  ├─pages # 路由页面
│  │   ├─index # 首页
│  │   └─test # 测试页面
│  ├─style # 公共样式
│  ├─stores # 状态管理
│  ├─static # 静态资源
│  │   ├─icons # 图标
│  │   └─images # 图片
│  ├─library # 项目库文件
│  ├─App.vue # 项目启动文件
│  └─main.js # 项目入口
├─scripts # auto-import 配置
└─docs # 项目文档

```

## 页面模块

在`pages`下，每个目录为一个功能模块。已存的功能模块如下：

- `index` 首页
- `initiator` 市场开办者
- `seller` 入场销售者

## 状态管理模块

在`stores`下，已存的状态管理模块如下：

- `index` 入口文件，批量导出其他模块
- `modules/common` 公共模块

## 项目库

在`library`下，已存的项目库模块如下：

- `filter` 过滤器
- `navigator` 路由跳转
- `to` try...catch 封装
- `utils` 工具类

## 组件库

在`components`下，已存的组件如下：

- `Layout` 布局组件
- `AppToast` 吐司组件
- `AppLoading` Loading组件
- `AppTreeRadio` 树形单选组件
- `AppTreeMultiply` 树形多选组件

## 接口模块

在`api`下，已存的接口模块如下：

- `index` 入口文件，导出 resolve 方法
- `urls` 导出请求的 url

## 运行项目


### 运行到H5

```
pnpm dev
```

运行地址：http://localhost:8000/


或者使用：

```
pnpm dev:h5
```

运行地址：http://localhost:5173/

### 运行到支付宝小程序

```bash
pnpm dev:mp-alipay
```

然后进入到 `dist/dev/mp-alipay`，使用支付宝小程序开发工具打开即可实时看到效果。

### 运行到微信小程序

微信小程序：

```bash
pnpm dev:mp-weixin
```

然后进入到 `dist/dev/mp-weixin`，使用微信小程序开发工具打开即可实时看到效果。

## 打包


### 打包到H5

```bash
pnpm build:h5 # 打包H5
```

打包路径: `dist\build\h5`

### 打包到支付宝小程序

打包小程序使用命令：

```bash
pnpm build:mp-alipay # 打包支付宝小程序
```

打包路径: `dist\build\mp-alipay`

### 打包到微信小程序

打包小程序使用命令：

```bash
pnpm build:mp-weixin # 打包微信小程序
```

打包路径: `dist\build\mp-weixin`

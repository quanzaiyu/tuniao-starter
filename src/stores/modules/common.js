import api from '@/api'

export default {
  state: {
    /*
     * 系统相关的状态
     */
    // 系统信息
    systemInfo: {
      ...uni.getSystemInfoSync(),
      // #ifdef MP-WEIXIN
      ...uni.getAccountInfoSync(),
      // #endif
    }, // 获取系统信息, 通过 systemInfo.platform 可获取平台信息，返回 ios android
    platform: process.env.UNI_PLATFORM, // 获取运行环境，返回 h5 mp-weixin mp-alipay 等
    $oss: import.meta.env.VITE_APP_OSS || '', // OSS静态资源路径
    $upload: import.meta.env.VITE_APP_UPLOAD || '', // 文件上传路径
    fromLogin: false, // 是否从登录页面跳转过来
    /*
     * 业务相关的状态
     */
    sessionId: '', // 用户登录的sessionId
    userInfo: uni.getStorageSync('userInfo') || null, // 用户信息
    sexMap: uni.getStorageSync('sexMap') || {}, // 性别属性
    sexList: uni.getStorageSync('sexList') || [], // 性别列表
  },
  getters: {},
  actions: {
    // 登录
    async login(options) {
      this.userInfo = await api.resolve(URLS.login, {
        tenantId: '000000',
        username: options.username,
        password: options.password,
      })
      uni.setStorage({ key: 'userInfo', data: this.userInfo })

      if (!options.noJump) {
        nav.replace('/pages/index/index')
      }
    },
    // 退出登录
    logout() {
      // 清除登录状态
      this.userInfo = null
      uni.removeStorageSync('userInfo')

      // 删除缓存
      const list = ['sex']
      for (const item of list) {
        this[item + 'List'] = []
        this[item + 'Map'] = {}
        uni.removeStorageSync(item + 'List')
      }
    },
    // 通过sessionId登录
    async loginBySessionId(options) {
      let sessionId = ''
      if (!options?.sessionId) {
        const res = await api.resolve(URLS.sessionId, { header: { default: { timestamp: '20230327104348583', execute: 'confirmLoginAccount', reqtime: '20230327104348', mapping: 'service/alipay/api', method: 'confirmLoginAccount', transid: '37d548a70ad54df8ab96f20d40676bb4', reqclass: 'web.class', reqip: '127.0.0.1', appname: 'commonweb', sessionid: '', oper_id: '', oper_name: '' } }, body: { default: { id: 'A7157562AC12000329EE2B3AEBB2ABE8' } } }, {
          needMarketSponsorInfoId: false,
        })
        sessionId = res?.body?.default?.session_id
      } else {
        sessionId = options.sessionId
      }

      // 获取sessionId成功
      if (sessionId) {
        // 获取用户信息
        this.userInfo = await api.resolve(URLS.login, { sessionId })
        uni.setStorage({ key: 'sessionId', data: sessionId })
        uni.setStorage({ key: 'userInfo', data: this.userInfo })

        nav.replace('/pages/index/index')
      }
    },

    // 通过微信code登录
    loginByCode() {
      return new Promise((resolve, reject) => {
        uni.login({
          provider: 'weixin',
          success: async res => {
            this.userInfo = await api.resolve(URLS.loginWithCode, {
              code: res.code,
            })
            uni.setStorage({ key: 'userInfo', data: this.userInfo })
            resolve(res)
          },
          fail: err => {
            reject(err)
          },
        })
      })
    },

    // 通过微信phone登录
    loginByPhone(options) {
      return new Promise((resolve, reject) => {
        uni.login({
          provider: 'weixin',
          success: async codeRes => {
            this.userInfo = await api.resolve(URLS.loginWithPhone, {
              code: codeRes.code,
              iv: options.iv,
              encryptedData: options.encryptedData,
            })
            uni.setStorage({ key: 'userInfo', data: this.userInfo })
            resolve(this.userInfo)
          },
          fail: err => {
            reject(err)
          },
        })
      })
    },

    // 刷新token
    async refreshToken() {
      try {
        this.userInfo = await api.resolve(URLS.refreshToken, {}, {
          query: {
            refresh_token: uni.$store.userInfo.refresh_token,
          },
        })
        uni.setStorage({ key: 'userInfo', data: this.userInfo })
        return this.userInfo
      } catch (e) {
        // #ifdef MP-WEIXIN
        await this.loginByCode()
        // #endif

        // #ifdef H5
        uni.showToast({
          title: 'token失效，请重新登录',
          icon: 'none',
        })
        this.userInfo = null
        // #endif

        return this.userInfo
      }
    },

    // 获取省市区列表
    async getRegion(type = 'tree') {
      if (type === 'tree') {
        // 获取行政区划树
        this.regionTree = await api.resolve(URLS.regionTree, {}, {
          needMarketSponsorInfoId: false,
        })
      } else if (type === 'flat') {
        // 扁平数组
        this.region = await api.resolve(URLS.region, {}, {
          needMarketSponsorInfoId: false,
        })
      }
    },
    // 获取字典值：性别
    async getSex() {
      ({ list: this.sexList, map: this.sexMap } = await getDict('sex'))
      uni.setStorage({ key: 'sexList', data: this.sexList })
    },
  },
}

// 获取字典值
async function getDict(code) {
  const list = await api.resolve(URLS.dic, { code }, {
    needMarketSponsorInfoId: false,
  })
  const map = toMap(list)
  return { list, map }
}

// list转化为map
function toMap(list) {
  const map = {}
  list.map(item => {
    item.value = item.dictKey
    item.text = item.dictValue
    map[item.dictKey] = item.dictValue
    return item
  })
  return map
}

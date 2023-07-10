import api from '@/api'

export default {
  state: {
    /*
     * 系统相关的状态
     */
    title: '',
    toast: {
      show: false,
      title: '',
      icon: 'none',
      duration: 3000,
    }, // 自定义吐司
    loading: {
      show: false, // 是否显示loading
      title: '加载中...', // 标题
      duration: 3000, // loading存在时间
    }, // 自定义loading
    platform: uni.getSystemInfoSync().platform, // 获取平台信息，返回 ios android
    env: process.env.UNI_PLATFORM, // 获取运行环境，返回 h5 mp-weixin mp-alipay 等
    /*
     * 业务相关的状态
     */
    sessionId: '', // 用户登录的sessionId
    userInfo: uni.getStorageSync('userInfo') || null, // 用户信息
    region: uni.getStorageSync('region') || [], // 省市区（平铺）
    regionTree: uni.getStorageSync('regionTree') || [], // 省市区（树）
    positionType: uni.getStorageSync('positionType') || {}, // 职位类型
    positionTypeList: uni.getStorageSync('positionTypeList') || [], // 职位类型列表
    postType: uni.getStorageSync('postType') || {}, // 岗位类型
    postTypeList: uni.getStorageSync('postTypeList') || [], // 岗位类型列表
    checkType: uni.getStorageSync('checkType') || {}, // 检测类型
    checkTypeList: uni.getStorageSync('checkTypeList') || [], // 检测类型列表
    productCode: uni.getStorageSync('productCode') || {}, // 检测品种（全部）
    productCodeList: uni.getStorageSync('productCodeList') || [], // 检测品种（全部）
    productCodeTree: uni.getStorageSync('productCodeTree') || [], // 检测品种（全部，树状）
    checkProductCode: uni.getStorageSync('checkProductCode') || {}, // 检测品种（已筛选）
    checkProductCodeList: uni.getStorageSync('checkProductCodeList') || [], // 检测品种（已筛选）
    spotType: uni.getStorageSync('spotType') || {}, // 抽检项目
    spotTypeList: uni.getStorageSync('spotTypeList') || [], // 抽检项目列表
    saleType: uni.getStorageSync('saleType') || {}, // 销售者类型
    saleTypeList: uni.getStorageSync('saleTypeList') || [], // 销售者类型列表
    busiStatus: uni.getStorageSync('busiStatus') || {}, // 经营状态
    busiStatusList: uni.getStorageSync('busiStatusList') || [], // 经营状态列表
    registerStatus: uni.getStorageSync('registerStatus') || {}, // 登记状态
    registerStatusList: uni.getStorageSync('registerStatusList') || [], // 登记状态列表
    marketType: uni.getStorageSync('marketType') || {}, // 市场类型
    marketTypeList: uni.getStorageSync('marketTypeList') || [], // 市场类型列表
    productType: uni.getStorageSync('productType') || {}, // 销售的食用农产品种类
    productTypeList: uni.getStorageSync('productTypeList') || [], // 销售的食用农产品种类列表
    entType: uni.getStorageSync('entType') || {}, // 销售者属性
    entTypeList: uni.getStorageSync('entTypeList') || [], // 销售者属性列表
    isYes: uni.getStorageSync('isYes') || {}, // 字典值：是否
    isYesList: uni.getStorageSync('isYesList') || [], // 字典值：是否列表
  },
  getters: {},
  actions: {
    // 登录
    async login(options) {
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
        // 登录成功
        this.userInfo = await api.resolve(URLS.login, { sessionId }, {
          needMarketSponsorInfoId: false,
        })
        uni.setStorage({ key: 'sessionId', data: sessionId })
        uni.setStorage({ key: 'userInfo', data: this.userInfo })

        console.info('sessionId', sessionId)
        console.info('用户信息', this.userInfo)

        navigator.redirectTo('/pages/index/index')
      }
    },
    // 获取省市区列表
    async getRegion() {
      if (!uni.getStorageSync('region')) {
        this.region = await api.resolve(URLS.region, {}, {
          needMarketSponsorInfoId: false,
        })
        uni.setStorage({ key: 'region', data: this.region })
      }
      // 获取行政区划树
      this.regionTree = await api.resolve(URLS.regionTree, {}, {
        needMarketSponsorInfoId: false,
      })
    },
    // 获取销售者属性
    async getEntType() {
      if (!uni.getStorageSync('entTypeList')) {
        ({ list: this.entTypeList, map: this.entType } = await getDict('ent_type'))
        uni.setStorage({ key: 'entTypeList', data: this.entTypeList })
      } else {
        this.entType = toMap(this.entTypeList)
      }
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

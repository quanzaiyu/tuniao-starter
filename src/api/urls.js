export default {
  // 接口自定义key：['请求地址', '请求方式', contentType, role]
  // contentType === 1 : 'application/x-www-form-urlencoded;charset=UTF-8'
  // contentType === 2 : 'application/json'
  // contentType === 3 : 'multipart/form-data'
  // role 角色 0 公众(不需要token) 1 企业 2 监管

  // 登录
  sessionId: ['https://shgz.ljming.cn:38087/service/alipay/api/confirmLoginAccount', 'post', 2, 1], // 获取sessionId
  // login: func(['/gzpt/api/login', 'post', 1]), // 通过sessionId获取用户信息和鉴权信息
  login: ['/gzpt/api/login', 'post', 1], // 通过sessionId获取用户信息和鉴权信息

  // 公共模块
  dic: ['/blade-system/dict/dictionary', 'get', 1], // 字典
  dicTree: ['/blade-system/dict/dictionaryTrees', 'get', 1], // 字典（树状）
  region: ['/system/v1/bladeRegionInfo/lazy-tree', 'get', 1], // 行政区划
  regionTree: ['/system/v1/bladeRegionInfo/getAllTree', 'get', 1], // 行政区划（树状）
}

// async function func(type) {
//   return await api.resolve(type)
// }

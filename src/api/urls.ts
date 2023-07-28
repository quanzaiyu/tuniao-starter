export enum Method {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export enum ContentType {
  X = 'application/x-www-form-urlencoded;charset=UTF-8',
  JSON = 'application/json',
  FORM = 'multipart/form-data',
}

export enum Role {
  PUBLIC = 0, // 公众(不需要token)
  COMPANY = 1, // 企业
  MONITOR = 2, // 监管
}

export type APIType = [string, Method, ContentType, Role?]

export interface IAPIList {
  [key: string]: APIType
}

const urls: IAPIList = {
  // 接口自定义key：['请求地址', '请求方式', contentType, role]
  // role 角色 0 公众(不需要token) 1 企业 2 监管

  // 登录
  sessionId: ['https://shgz.ljming.cn:38087/service/alipay/api/confirmLoginAccount', Method.POST, ContentType.JSON], // 获取sessionId
  login: ['/blade-auth/oauth/token', Method.POST, ContentType.X, Role.PUBLIC], // 登录

  // 公共模块
  dic: ['/blade-system/dict/dictionary', Method.GET, ContentType.JSON, Role.COMPANY], // 字典
  dicTree: ['/blade-system/dict/dictionaryTrees', Method.GET, ContentType.JSON, Role.COMPANY], // 字典（树状）
  region: ['/system/v1/bladeRegionInfo/lazy-tree', Method.GET, ContentType.JSON, Role.COMPANY], // 行政区划
  regionTree: ['/system/v1/bladeRegionInfo/getAllTree', Method.GET, ContentType.JSON, Role.COMPANY], // 行政区划（树状）
}

export default urls

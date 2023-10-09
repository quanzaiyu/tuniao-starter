import qs from 'qs'
import type { APIType } from './urls'
import { ContentType, Role } from './urls'

export interface IQuery {
  [key: string]: [string, string, number, number?]
}

interface IAPIOptions {
  query?: AnyObject
  header?: AnyObject
  pathParams?: Array<string | number>
  needMarketSponsorInfoId?: boolean
}

class API {
  baseProjectUrl = ''
  refreshTokenLock = false // 刷新Token加锁，避免多次刷新

  constructor() {
    // #ifdef H5
    this.baseProjectUrl = import.meta.env.VITE_APP_BASE_API_H5
    // #endif

    // #ifdef MP-WEIXIN
    this.baseProjectUrl = import.meta.env.VITE_APP_BASE_API_MP_WEIXIN
    // #endif

    // #ifdef MP-ALIPAY
    this.baseProjectUrl = import.meta.env.VITE_APP_BASE_API_MP_ALIPAY
    // #endif
  }

  resolve(
    type: APIType,
    data = {}, // get请求的query或者post请求的body
    options: IAPIOptions = {}
  ) {
    // （深拷贝）存储当前请求，用于刷新token后再次使用
    const currentRequest = JSON.parse(JSON.stringify({ type, data, options }))

    options = {
      query: {}, // post请求中的query
      header: {}, // 头部数据
      pathParams: [], // 路由参数
      needMarketSponsorInfoId: true, // 是否需要marketId,
      ...options,
    }

    // eslint-disable-next-line prefer-const
    let [url, method, contentType, role] = type

    if (options.pathParams.length) {
      url += `/${options.pathParams.join('/')}`
    }

    // post请求中的query
    if (options.query) {
      url += `?${qs.stringify(options.query)}`
    }

    // 请求路径
    url = url.includes('http') ? url : this.baseProjectUrl + url

    // 添加头部信息
    const userInfo = uni.$store.userInfo
    let header: AnyObject = {
      'Content-Type': contentType,
      Authorization: 'Basic c2FiZXI6c2FiZXJfc2VjcmV0',
      TOKEN: 'Base Cloud68199860Ys+',
      'Blade-Auth': userInfo?.access_token,
      ...options.header,
    }

    // 修改不同角色的参数
    if (role === Role.COMPANY || role === Role.MONITOR) {
      // 企业端或监管端需要携带 token
      header = {
        'Blade-Auth': userInfo?.access_token,
        TOKEN: 'Base Cloud68199860Ys+',
        ...header,
      }
    }

    if (contentType !== ContentType.FORM) {
      // 删除无用的键值
      for (const key in data) {
        if (data[key] === undefined || data[key] === null) {
          delete data[key]
        }
      }
    }

    return new Promise((resolve, reject) => {
      uni.request({
        url,
        method,
        data,
        header,
        success: async (res: RequestSuccessCallbackResult) => {
          const statusCode = Number(res.statusCode)
          const success = Number(res.data?.success)
          if (statusCode === 200) {
            if ([undefined, null, NaN].includes(success)) {
              resolve(res.data)
            } else if (success) {
              resolve(res.data.data)
            } else {
              console.error('======请求失败======')
              uni.showToast({
                title: res.data.msg,
                icon: 'none',
              })
              reject(res.data)
            }
          } else if (statusCode === 401) {
            if (!this.refreshTokenLock) {
              this.refreshTokenLock = true
              await uni.$store.refreshToken() // 刷新token
              // 再次请求失败的接口
              const { type, data, options } = currentRequest
              resolve(this.resolve(type, data, options))
              uni.$emit('requestRefreshTokenDone')
              this.refreshTokenLock = false
            } else {
              uni.$on('requestRefreshTokenDone', () => {
                const { type, data, options } = currentRequest
                resolve(this.resolve(type, data, options))
              })
            }
          } else {
            console.error('======请求失败(非200)======')
            uni.showToast({
              title: res.data.msg,
              icon: 'none',
            })
            reject(res.data)
          }
        },
        fail(e) {
          console.error('======请求失败(异常)======')
          console.info({
            url,
            method,
            data,
            header: {
              'Content-Type': contentType,
            },
          })
          console.error(e)
          reject(e)
        },
      })
    })
  }

  // 上传图片
  upload(e) {
    return new Promise((resolve, reject) => {
      uni.uploadFile({
        url: this.baseProjectUrl + '/blade-resource/oss/endpoint/put-file',
        filePath: e.path,
        name: 'file',
        header: {
          'Blade-Auth': uni.$store.userInfo.access_token,
          Authorization: 'Basic c2FiZXI6c2FiZXJfc2VjcmV0',
          TOKEN: 'Base Cloud68199860Ys+',
        },
        formData: {},
        success: uploadFileRes => {
          if (uploadFileRes.statusCode === 200) {
            resolve(JSON.parse(uploadFileRes.data)?.data || {})
          } else {
            reject(JSON.parse(uploadFileRes.data))
          }
        },
        fail(e) {
          reject(e)
        },
      })
    })
  }

  // 批量上传图片
  async uploadBatch(e) {
    const promiseArr = []
    e.tempFilePaths.forEach(path => {
      const promise = new Promise((resolve, reject) => {
        uni.uploadFile({
          url: this.baseProjectUrl + '/blade-resource/oss/endpoint/put-file',
          filePath: path,
          name: 'file',
          header: {
            'Blade-Auth': uni.$store.userInfo.access_token,
            Authorization: 'Basic c2FiZXI6c2FiZXJfc2VjcmV0',
          },
          formData: {},
          success: uploadFileRes => {
            if (uploadFileRes.statusCode === 200) {
              resolve(JSON.parse(uploadFileRes.data)?.data || {})
            } else {
              reject(JSON.parse(uploadFileRes.data))
            }
          },
          fail(e) {
            reject(e)
          },
        })
      })
      promiseArr.push(promise)
    })
    return await Promise.all(promiseArr)
  }
}

export default new API()

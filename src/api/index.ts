import type { APIType } from './urls'
import { ContentType, Role } from './urls'

export interface IQuery {
  [key: string]: [string, string, number, number?]
}

interface IAPIOptions {
  query?: AnyObject
  header?: AnyObject
  pathParams?: AnyObject
  needMarketSponsorInfoId?: boolean
}

class API {
  baseProjectUrl = ''

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
    options = {
      query: {}, // post请求中的query
      header: {}, // 头部数据
      pathParams: {}, // 路由参数
      needMarketSponsorInfoId: true, // 是否需要marketId,
      ...options,
    }

    // eslint-disable-next-line prefer-const
    let [url, method, contentType, role] = type

    // 请求路径
    url = url.includes('http') ? url : this.baseProjectUrl + url

    // 添加头部信息
    let header: AnyObject = {
      'Content-Type': contentType,
      Authorization: 'Basic c2FiZXI6c2FiZXJfc2VjcmV0',
      ...options.header,
    }

    // 添加参数
    const userInfo = uni.$store.userInfo
    if (role === Role.COMPANY || role === Role.MONITOR) {
      // 企业端或监管端需要携带 token
      header = {
        'Blade-Auth': userInfo?.access_token,
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
        success(res: RequestSuccessCallbackResult) {
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

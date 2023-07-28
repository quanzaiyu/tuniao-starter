// 拼接路由参数
// let options = ''
// for (const i in params) {
//   options += options ? '&' : '?' + i + '=' + params.options[i]
// }
const parseParams = params => Object.keys(params).reduce((acc, key, index) => acc + `${index === 0 ? '?' : '&'}${key}=${params[key]}`, '')

class Nav {
  // 重新打开应用
  reLaunch(
    url: string = '',
    params: AnyObject = {}
  ) {
    uni.reLaunch({
      url: url + parseParams(params),
    })
  }

  // 重定向到页面
  replace(
    url: string = '',
    params: AnyObject = {}
  ) {
    uni.redirectTo({
      url: url + parseParams(params),
    })
  }

  // 跳转到
  to(
    url: string = '',
    params: AnyObject = {}
  ) {
    uni.navigateTo({
      url: url + parseParams(params),
    })
  }

  // 后退
  back(num: number = 1) {
    uni.hideKeyboard()
    uni.navigateBack({
      delta: num,
    })
  }
}

export default new Nav()

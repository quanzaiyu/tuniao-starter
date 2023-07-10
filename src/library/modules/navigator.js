let timer = null
let prevUrl = ''

class Navigator {
  constructor() {
    this.pagesArray = []
  }

  // 路由栈是否为空
  isEmpty() {
    return !(this.pagesArray.length > 0)
  }

  // 获取路由栈
  getPages() {
    return this.pagesArray
  }

  // 如果3s内路由到同一路由，则不跳转
  // options.timer: 是否使用计时器（防止重复点击）
  // options.time: 延时时长
  navigatorTimer(
    url,
    options = {
      timer: false,
      time: 0, // 这个是用来解决小程序页面重复跳转问题，网页不需要设置延迟
    }
  ) {
    if (options.timer) {
      if (timer && prevUrl === url) {
        console.warn(`${options.time}s内请不要重复跳转同一路由`)
        return false
      }
      prevUrl = url
      timer = setTimeout(() => {
        clearTimeout(timer)
        timer = null
      }, options.time)
      return true
    }
    return true
  }

  // 重新打开应用
  reLaunch(
    url,
    options = {
      timer: false,
      time: 0,
    }
  ) {
    if (!this.navigatorTimer(url, options)) {
      return
    }
    this.pagesArray = []
    uni.reLaunch({
      url,
    })
  }

  // 重定向到页面
  redirectTo(
    url,
    options = {
      timer: false,
      time: 0,
    }
  ) {
    uni.hideKeyboard()
    if (!this.navigatorTimer(url, options)) {
      return
    }
    uni.redirectTo({
      url,
    })
  }

  // 跳转到
  navigateTo(
    url,
    skip = true,
    options = {
      timer: false,
      time: 0,
    }
  ) {
    uni.hideKeyboard()
    if (!this.navigatorTimer(url, options)) {
      return false
    }
    // 使用系统API进行跳转
    if (skip) {
      if (this.pagesArray) {
        this.pagesArray.push(null)
        uni.navigateTo({
          url,
        })
      } else {
        uni.navigateTo({
          url,
        })
      }
      // 使用路由栈工具进行跳转
    } else {
      const pages = getCurrentPages()
      const currPath = pages[pages.length - 1]
      let options = ''
      // 拼接路由参数
      for (const i in currPath.options) {
        if (!options) {
          options += '?'
        } else {
          options += '&'
        }
        options += i + '=' + currPath.options[i]
      }
      // 将当前页面入栈，然后重定向到新的路由
      this.pagesArray.push('/' + currPath.route + options)
      uni.redirectTo({
        url,
      })
    }
  }

  // 后退
  navigateBack(num) {
    uni.hideKeyboard()
    num = num || 1
    if (!this.pagesArray.length) {
      uni.navigateBack({
        delta: num,
      })
    } else {
      let backPage = 0
      let navBackNum = 0
      this.pagesArray = this.pagesArray
        .reverse()
        .filter(item => {
          if (!item && num > 0) navBackNum++
          if (num > -1) num--
          if (num === 0) backPage = item
          return num === -1
        })
        .reverse()
      if (backPage === 0) {
        uni.navigateBack({
          delta: num + navBackNum,
        })
        if (this.pagesArray) this.pagesArray = null
      } else if (backPage === null) {
        uni.navigateBack({
          delta: navBackNum,
        })
      } else {
        if (navBackNum > 0) {
          uni.navigateBack({
            delta: navBackNum,
          })
        }
        uni.redirectTo({
          url: backPage,
        })
      }
    }
  }
}

export default new Navigator()

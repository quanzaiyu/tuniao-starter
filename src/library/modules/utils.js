let timerDebounce = null
let timerThrottle = null

class Utils {
  // 获取平台名称 (android, ios)
  getPlatform() {
    return uni.getSystemInfoSync().platform
  }

  isIos() {
    return this.getPlatform() === 'ios'
  }

  isAndroid() {
    return this.getPlatform() === 'android'
  }

  /*
   * 转换
   */
  // 将设备像素转化为物理像素
  rpx2px(num) {
    return (num * uni.getSystemInfoSync().windowWidth) / 750
  }

  // 将物理像素转化为设备像素
  px2rpx(num) {
    return (num * 750) / uni.getSystemInfoSync().windowWidth
  }

  /*
   * 验证相关
   */
  // 判断一个对象是否是空对象
  isEmptyObject(obj, judgeArr = true) {
    if (obj instanceof Object) {
      const objStr = JSON.stringify(obj)
      let res
      if (judgeArr) {
        res = objStr === '{}' || objStr === '[]'
      } else {
        res = objStr === '{}'
      }
      return res
    }
    return false
  }

  // 验证手机号
  isPhone(num, msg) {
    if (!/^1[3456789]\d{9}$/.test(num)) {
      if (msg) {
        this.toast(msg)
      }
      return false
    }
    return true
  }

  // 验证邮箱
  isEmail(num, msg) {
    if (!/^[a-z\d]+(\.[a-z\d]+)*@([\da-z](-[\da-z])?)+(\.{1,2}[a-z]+)+$/.test(num)) {
      if (msg) {
        this.toast(msg)
      }
      return false
    }
    return true
  }

  // 验证是否是身份证号
  isIdcard(num, msg) {
    num = num.toUpperCase()
    // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X。
    if (!/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(num)) {
      if (msg) {
        this.toast(msg)
      }
      return false
    }
    // 校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
    // 下面分别分析出生日期和校验位
    const len = num.length
    let reg
    if (len === 15) {
      reg = /^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/
      const arrSplit = num.match(reg)
      // 检查生日日期是否正确
      const dtmBirth = new Date('19' + arrSplit[2] + '/' + arrSplit[3] + '/' + arrSplit[4])
      const bCorrectDay =
        dtmBirth.getYear() === Number(arrSplit[2]) &&
        dtmBirth.getMonth() + 1 === Number(arrSplit[3]) &&
        dtmBirth.getDate() === Number(arrSplit[4])
      if (!bCorrectDay) {
        if (msg) {
          this.toast(msg)
        }
        return false
      } else {
        // 将15位身份证转成18位
        // 校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
        const arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
        const arrCh = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']
        let nTemp = 0
        num = num.substr(0, 6) + '19' + num.substr(6, num.length - 6)
        for (let i = 0; i < 17; i++) {
          nTemp += num.substr(i, 1) * arrInt[i]
        }
        num += arrCh[nTemp % 11]
        return true
      }
    }
    if (len === 18) {
      reg = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/
      const arrSplit = num.match(reg)

      // 检查生日日期是否正确
      const dtmBirth = new Date(arrSplit[2] + '/' + arrSplit[3] + '/' + arrSplit[4])
      const bCorrectDay =
        dtmBirth.getFullYear() === Number(arrSplit[2]) &&
        dtmBirth.getMonth() + 1 === Number(arrSplit[3]) &&
        dtmBirth.getDate() === Number(arrSplit[4])
      if (!bCorrectDay) {
        if (msg) {
          this.toast(msg)
        }
        return false
      } else {
        // 检验18位身份证的校验码是否正确。
        // 校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
        const arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
        const arrCh = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']
        let nTemp = 0
        for (let i = 0; i < 17; i++) {
          nTemp += num.substr(i, 1) * arrInt[i]
        }
        const valnum = arrCh[nTemp % 11]
        if (valnum !== num.substr(17, 1)) {
          if (msg) {
            this.toast(msg)
          }
          return false
        }
        return true
      }
    }
    if (msg) {
      this.toast(msg)
    }
    return false
  }

  isUniSCID(num, msg) {
    if (!/^9[0-9A-HJ-NPQRTUWXY]\d{6}[0-9A-HJ-NPQRTUWXY]{10}/.test(num)) {
      if (msg) {
        this.toast(msg)
      }
      return false
    }
    return true
  }

  // 从身份证号获取性别与生日信息
  getCardInfo(num) {
    if (!this.isIdcard(num)) {
      return false
    }
    return {
      birthday: num.substring(6, 10) + '-' + num.substring(10, 12) + '-' + num.substring(12, 14),
      gender: num.substr(16, 1) % 2 === 1 ? 1 : 2,
    }
  }

  // 获取查询字符串参数列表
  getQueryStringArgs(qs) {
    const args = {}
    const items = qs?.length ? qs.split('&') : []
    let item = null
    let name = null
    let value = null
    let i = 0
    const len = items.length
    for (i = 0; i < len; i++) {
      item = items[i].split('=')
      name = decodeURIComponent(item[0])
      value = decodeURIComponent(item[1])
      if (name.length) {
        args[name] = value
      }
    }
    return args
  }

  // 判断浏览器类型
  // 参考 https://blog.csdn.net/qq_22182989/article/details/125674826
  checkBrowser() {
    // #ifdef H5
    const browser = navigator.userAgent.toLowerCase()
    if (browser.match(/Alipay/i) === 'alipay') {
      // 支付宝环境
      return 'alipay'
    } else if (browser.match(/MicroMessenger/i) === 'micromessenger') {
      // 微信内置浏览器
      return 'wxpay'
    }
    // #endif

    // 其他环境
    return ''
  }

  /*
   * 时间相关
   * 生成随机字符串
   */
  generateMixed(len) {
    const time = new Date().getTime().toString()
    const date = this.genCurrTime()
    const chars = [
      '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
      'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
      'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
      'U', 'V', 'W', 'X', 'Y', 'Z',
      'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
      'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
      'u', 'v', 'w', 'x', 'y', 'z',
    ]
    let res = ''
    for (let ia = 0; ia < len; ia++) {
      const id = Math.ceil(Math.random() * (chars.length - 1))
      res += chars[id]
    }
    return date + res + time
  }

  // 生成当前时间, 格式 20180101126060
  genCurrTime() {
    return this.formatTime(new Date(), true, '', '', '')
  }

  // 格式化时间
  formatTime(date = new Date(), withTime = true, split1 = '-', split2 = ':', splite3 = ' ') {
    const showDate = [date.getFullYear(), date.getMonth() + 1, date.getDate()]
      .map(n => (n.toString()[1] ? n : '0' + n))
      .join(split1)
    const showTime = [date.getHours(), date.getMinutes(), date.getSeconds()]
      .map(n => (n.toString()[1] ? n : '0' + n))
      .join(split2)
    return withTime ? showDate + splite3 + showTime : showDate
  }

  // 转服务器时间到 Date对象
  parseDate(timeStr) {
    const a = timeStr.split(/[^0-9]/)
    return new Date(a[0], a[1] - 1, a[2], a[3], a[4], a[5])
  }

  // 将列表转换为tree
  toTreeRecursive(list, parentId, type) {
    const getChildren = id => list.filter(item => id === item.parentId)
    const children = getChildren(parentId || 0)
    if (children.length === 0) {
      return []
    }
    return children.map(item => {
      const childObjects = this.toTreeRecursive(list, item.id, type)
      const itemObject = {
        ...item,
        text: type === 'dict' ? item.dictValue : item.value,
        value: type === 'dict' ? item.dictKey : item.id,
      }
      itemObject.children = childObjects.length > 0 ? childObjects : []
      return itemObject
    })
  }

  /**
   * 防抖函数
   * @param {Function} func - 需要防抖的函数
   * @param {Number} delay - 防抖时间
   * @returns {Function} - 返回一个新的防抖函数
   */
  debounce(func, delay) {
    return (function (...args) {
      clearTimeout(timerDebounce)
      timerDebounce = setTimeout(() => {
        func.apply(this, args)
      }, delay)
    })()
  }

  /**
   * 节流函数
   * @param {Function} func - 需要节流的函数
   * @param {Number} delay - 节流时间
   * @returns {Function} - 返回一个新的节流函数
   */
  throttle(func, delay) {
    return (function (...args) {
      if (!timerThrottle) {
        timerThrottle = setTimeout(() => {
          func.apply(this, args)
          timerThrottle = null
        }, delay)
      }
    })()
  }
}

export default new Utils()

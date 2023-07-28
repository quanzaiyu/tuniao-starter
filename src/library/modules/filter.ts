/**
 * 全局过滤器
 * 使用: 在HTML模板使用 $filter.函数名称()调用
 * 建议只在 HTML 模板使用
 */
export default {
  /**
   * 获取性别
   * @param {int} value
   * @return {string}
   */
  getGender(value) {
    if (![0, 1].includes(Number(value))) return ''
    value = value === 0 ? '男' : '女'
    return value
  },

  /**
   * 混淆身份证号
   * @param {string} value
   * @return {string}
   */
  idcardMix(value) {
    if (!value) return ''
    value = value.slice(0, 4) + '**********' + value.slice(14, 19)
    return value
  },

  /**
   * 混淆电话号码
   * @param {string} value
   * @return {string}
   */
  phoneMix(value) {
    if (!value) return ''
    if (isNaN(Number(value))) return value
    value = String(value)
    value = value.slice(0, 3) + '****' + value.slice(7, 11)
    return value
  },

  /**
   * 获取友好的时间显示
   * @param {Date|number|string} time
   * > Date: 时间对象
   * > number: 时间戳
   * > string: 格式化的时间字符串，如'2017-10-01 18:00:00'
   * @param {boolean} 是否显示时间，默认false
   * @return {string} 友好的时间显示
   */
  friendlyTime(time) {
    const date =
      time instanceof Date
        ? time
        : typeof time === 'number'
          ? new Date(time)
          : new Date((time || '').replace(/-/g, '/').replace(/T/g, ' '))
    const diff = (new Date().getTime() - date.getTime()) / 1000
    const dayDiff = Math.floor(diff / 86400)
    const isValidDate = Object.prototype.toString.call(date) === '[object Date]' && !isNaN(date.getTime())
    if (!isValidDate) {
      console.error('not a valid date')
    }
    const formatDate = function (date) {
      const today = new Date(date)
      const year = today.getFullYear()
      const month = ('0' + (today.getMonth() + 1)).slice(-2)
      const day = ('0' + today.getDate()).slice(-2)
      const hour = today.getHours()
      const minute = today.getMinutes()
      const second = today.getSeconds()
      return `${year}-${month}-${day} ${hour}:${minute}:${second}`
    }
    if (isNaN(dayDiff) || dayDiff < 0 || dayDiff >= 30) {
      return formatDate(date)
    }
    /* eslint no-mixed-operators: 0 */
    return (
      (dayDiff === 0 &&
        ((diff < 60 && '刚刚') ||
          (diff < 120 && '1分钟前') ||
          (diff < 3600 && Math.floor(diff / 60) + '分钟前') ||
          (diff < 7200 && '1小时前') ||
          (diff < 86400 && Math.floor(diff / 3600) + '小时前'))) ||
      (dayDiff === 1 && '昨天') ||
      (dayDiff < 7 && dayDiff + '天前') ||
      (dayDiff < 30 && Math.ceil(dayDiff / 7) + '周前')
    )
  },

  isOrNoStatus(status) {
    return Number(status) === 1 ? '是' : '否'
  },

  // 获取所在地
  region(id) {
    return uni.$store.region.filter(i => i.id === id)?.[0]?.ancestors || ''
  },

  parseImagePath() {},
}

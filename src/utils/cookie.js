const keyName = 'base-'
export const set = (name, content) => {
  name = keyName + name
  const obj = {
    dataType: typeof (content),
    content,
    datetime: new Date().getTime(),
  }
  uni.setStorageSync(name, JSON.stringify(obj))
}
export const get = (name = {}) => {
  name = keyName + name
  let obj = {}
  let content
  obj = uni.getStorageSync(name)
  if (!obj || JSON.stringify(obj) === '{}' || obj.length === 0) {
    return null
  }
  obj = JSON.parse(obj)
  if (obj.dataType === 'string') {
    content = obj.content;
  } else if (obj.dataType === 'number') {
    content = Number(obj.content)
  } else if (obj.dataType === 'boolean') {
    // eslint-disable-next-line no-eval
    content = eval(obj.content)
  } else if (obj.dataType === 'object') {
    content = obj.content
  }
  return content
}
export const remove = (name = {}) => {
  name = keyName + name
  uni.removeStorageSync(name)
}
export const clearStore = (params = {}) => {
  uni.clearStorageSync()
}

// 使用此方法可以批量将模块导出，无需依次手动导出
const files = import.meta.globEager('./modules/*.ts')

const modules = {}
for (const key in files) {
  modules[key.replace(/(\.\/modules\/|\.ts)/g, '')] = (files[key] as AnyObject).default
}

export default modules

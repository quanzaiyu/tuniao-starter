/**
 * 简化 async...await 的 try...catch
 * 使用方式：
 * const { data, error } = await asyncData(api.resolve(...))
 */
export default async promise => {
  let data = $ref(null)
  let error = $ref(null)

  await promise
    .then(res => (data = res))
    .catch(err => (error = err))

  return { data, error }
}

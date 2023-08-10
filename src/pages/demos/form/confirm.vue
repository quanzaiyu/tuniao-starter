<script setup lang="ts">
const layout = $ref(null)

const formConfig = $ref<AppForm>({
  labelPosition: 'left',
  labelWidth: 150,
  columns: [
    {
      label: '姓名',
      prop: 'name',
      placeholder: '请输入姓名',
      input() {
        console.info(this.value)
      },
      rules: [
        { required: true, message: '请输入用户名', trigger: ['change', 'blur'] },
      ],
    },
    {
      label: '生日',
      prop: 'birthday',
      type: 'calendar',
      format: 'YYYY-MM-DD',
      placeholder: '请选择生日',
      confirm() {
        console.info(this.value) // 当前输入框显示的值
        console.info(this.pickerValue) // 当前选择器的值
      },
      rules: [
        { required: true, message: '请选择生日', trigger: ['change', 'blur'] },
      ],
    },
    {
      label: '性别',
      prop: 'sex',
      type: 'radio',
      value: 1,
      placeholder: '请选择性别',
      data: [
        { label: '男', value: 1 },
        { label: '女', value: 2 },
      ],
      change() {
        console.info('当前选中的值', this.value)
      },
      rules: [
        { required: true, message: '请选择性别', trigger: ['change', 'blur'] },
      ],
    },
    {
      label: '年龄',
      prop: 'age',
      type: 'number',
      placeholder: '请输入年龄',
      maxlength: 3,
      rules: [
        { required: true, message: '请输入年龄', trigger: ['change', 'blur'] },
      ],
    },
    {
      label: '手机号',
      prop: 'phone',
      type: 'number',
      placeholder: '请输入11位手机号码',
      maxlength: 11,
      rules: [
        { required: true, message: '请输入手机号码', trigger: ['change', 'blur'] },
        { pattern: /^1\d{10}$/, message: '请输入正确的手机号码', trigger: ['change', 'blur'] },
      ],
    },
    {
      label: '头像',
      prop: 'avatar',
      type: 'upload',
      value: [],
      // value: ['upload/20230728/b43395411ccaa2eb0575475e29ce6b34.jpg', 'upload/20230728/2eeaa6952b7480c77273a458998580ad.jpg'],
      placeholder: '请上传头像',
      // disabled: true, // 是否禁用
      limit: 3,
      maxSize: 1 * 1024 * 1024,
      extensions: ['jpg', 'png'],
      rules: [
        { required: true, message: '请上传头像', trigger: ['change', 'blur'] },
      ],
    },
  ],
})

const confirm = function (formData) {
  console.info('表单验证成功', formData)

  // 这里是请求接口提交表单的逻辑
  uni.showToast({
    title: '提交成功',
  })
}
</script>

<template>
  <Layout ref="layout" title="表单验证与提交示例">
    <app-form :config="formConfig" @confirm="confirm"></app-form>
  </Layout>
</template>

<style lang="scss" scoped>
</style>

<script setup>
// const layout = $ref(null)

const formConfig = $ref({
  labelPosition: 'left',
  labelWidth: 150,
  columns: [
    {
      label: '姓名',
      prop: 'name',
      placeholder: '请输入姓名',
      input(e) {
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
      format: 'YYYY-MM-DD', // 日期格式，可省略，默认 YYYY-MM-DD
      placeholder: '请选择生日',
      confirm(e) {
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
      change(e) {
        console.info('当前选中的值', e, this.value)
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
      maxlength: 11, // 输入框最大长度，number
      rules: [
        { required: true, message: '请输入手机号码', trigger: ['change', 'blur'] },
        { pattern: /^1\d{10}$/, message: '请输入正确的手机号码', trigger: ['change', 'blur'] },
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

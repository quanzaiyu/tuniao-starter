<script setup>
const layout = $ref(null)

const formConfig = $ref({
  // labelPosition: 'left', // 表单整体的标签位置，可选: top | left | right，默认 top
  columns: [
    {
      label: '文本框',
      prop: 'text',
      // type: 'number', // 输入框类型，可选: text | number | idcard | digit | textarea | password | select ，默认值text可省略
      value: '',
      placeholder: '请输入文本',
      input(e, item) {
        console.info(e, item)
      },
      // 表单校验规则，可以是数组或对象
      rules: [
        { required: true, message: '请输入用户名', trigger: ['change', 'blur'] },
        {
          pattern: /^[\w-]{4,16}$/,
          message: '请输入4-16位英文、数字、下划线、横线',
          trigger: ['change', 'blur'],
        },
      ],
    },
    {
      label: '数字输入框',
      prop: 'number',
      type: 'number',
      value: '',
      placeholder: '请输入11位手机号码',
      maxlength: 11, // 输入框最大长度，number
      rules: {
        required: true,
      },
    },
    {
      label: '带小数点的数字输入框',
      prop: 'digit',
      type: 'digit',
      value: '',
      placeholder: '请输入带小数点的数字',
      rules: {
        required: true,
      },
    },
    {
      label: '身份证输入框',
      prop: 'idcard',
      type: 'idcard',
      value: '',
      placeholder: '请输入身份证号',
      maxlength: 18,
      rules: [
        { required: true, message: '请输入身份证号', trigger: ['change', 'blur'] },
        {
          pattern: /(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|Xx)$)|(^[1-9]\d{5}\d{6}\d{2}[0-9Xx]$)/,
          message: '请输入正确的身份证号',
          trigger: ['change', 'blur'],
        },
      ],
    },
    {
      label: '密码',
      prop: 'password',
      type: 'password',
      value: '',
      placeholder: '这里是可以输入密码',
      rules: {
        required: true,
      },
    },
    {
      label: '文本域',
      prop: 'textarea',
      type: 'textarea',
      value: '',
      placeholder: '这里是可以输入长文本',
      rules: {
        required: true,
      },
    },
    {
      label: '禁用输入框',
      prop: 'disabled',
      value: '',
      disabled: true, // 是否禁用，可选: true | false
    },
    {
      label: '文本对齐方式',
      prop: 'align',
      value: '',
      textAlign: 'center', // 输入框对齐方式，可选: left | center | right，默认 left
    },
    {
      label: '尺寸大小',
      prop: 'size',
      value: '',
      size: 'sm', // 输入框尺寸，可选: sm | lg，默认 lg
    },
    {
      label: '标签位置',
      labelPosition: 'left', // 标签位置，可选: top | left | right，默认 top
      prop: 'labelPosition',
      value: '',
    },
    {
      label: '边框样式',
      prop: 'border',
      value: '',
      border: true, // 是否显示边框，可选: true | false
      borderColor: '#009900', // 边框颜色，在border为true时有效，支持图鸟内置的边框颜色、hex、rgb、rgba
    },
    {
      label: '自定义占位符样式',
      prop: 'placeholder',
      value: '',
      // 自定义占位符样式
      placeholderStyle: {
        fontSize: '40rpx',
        color: '#990000',
        backgroundColor: '#fff',
      },
    },
    {
      label: '自定义输入框高度',
      prop: 'height',
      value: '',
      // 自定义占位符样式
      height: '200rpx', // 输入框高度，number | string
    },
  ],
})
</script>

<template>
  <Layout ref="layout" title="输入框示例">
    <app-form :config="formConfig"></app-form>
  </Layout>
</template>

<style lang="scss" scoped>

</style>

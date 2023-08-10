<script setup lang="ts">
const layout = $ref(null)

const formConfig = $ref<AppForm>({
  columns: [
    {
      label: '文本框',
      prop: 'text',
      placeholder: '请输入文本',
      input() {
        // 获取输入框的值
        console.info(this.value)
      },
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
      label: '带默认值的输入框',
      prop: 'text',
      value: 'Hi',
      placeholder: '请输入文本',
      input() {
        console.info(this.value)
      },
    },
    {
      label: '数字输入框',
      prop: 'number',
      type: 'number',
      placeholder: '请输入11位手机号码',
      maxlength: 11,
      rules: {
        required: true,
      },
    },
    {
      label: '带小数点的数字输入框',
      prop: 'digit',
      type: 'digit',
      placeholder: '请输入带小数点的数字',
      rules: {
        required: true,
      },
    },
    {
      label: '身份证输入框',
      prop: 'idcard',
      type: 'idcard',
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
      placeholder: '这里是可以输入密码',
      rules: {
        required: true,
      },
    },
    {
      label: '文本域',
      prop: 'textarea',
      type: 'textarea',
      placeholder: '这里是可以输入长文本',
      rules: {
        required: true,
      },
    },
    {
      label: '禁用输入框',
      prop: 'disabled',
      disabled: true,
    },
    {
      label: '文本对齐方式',
      prop: 'align',
      textAlign: 'center',
    },
    {
      label: '尺寸大小',
      prop: 'size',
      size: 'sm',
    },
    {
      label: '标签位置',
      labelPosition: 'left',
      prop: 'labelPosition',
    },
    {
      label: '边框样式',
      prop: 'border',
      border: true,
      borderColor: '#009900',
    },
    {
      label: '自定义占位符样式',
      prop: 'placeholder',
      placeholderStyle: {
        fontSize: '40rpx',
        color: '#990000',
        backgroundColor: '#fff',
      },
    },
    {
      label: '自定义输入框高度',
      prop: 'height',
      height: '200rpx',
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

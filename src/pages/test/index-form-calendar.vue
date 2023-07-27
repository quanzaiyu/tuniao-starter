<script setup>
const layout = $ref(null)

const formConfig = $ref({
  columns: [
    {
      label: '日历选择器：单选',
      prop: 'calendar1',
      type: 'calendar',
      format: 'YYYY-MM-DD', // 日期格式，可省略，默认 YYYY-MM-DD
      placeholder: '点击弹出日历选择器',
      confirm(e) {
        console.info(this.value) // 当前输入框显示的值
        console.info(this.pickerValue) // 当前选择器的值
      },
    },
    {
      label: '日历选择器：多选',
      prop: 'calendar2',
      type: 'calendar',
      mode: 'multi',
      placeholder: '点击弹出日历选择器',
      confirm(e) {
        console.info(this.value) // 当前输入框显示的值
        console.info(this.pickerValue) // 当前选择器的值
      },
    },
    {
      label: '日历选择器：区间',
      prop: 'calendar3',
      type: 'calendar',
      mode: 'range',
      placeholder: '点击弹出日历选择器',
      confirm(e) {
        console.info(this.value) // 当前输入框显示的值
        console.info(this.pickerValue) // 当前选择器的值
      },
    },
    {
      label: '日历选择器：区间：自定义文案',
      prop: 'calendar4',
      type: 'calendar',
      mode: 'range',
      rangeStartDesc: '入住', // 默认“开始”
      rangeEndDesc: '离店', // 默认“结束”
      placeholder: '点击弹出日历选择器',
      confirm(e) {
        console.info(this.value) // 当前输入框显示的值
        console.info(this.pickerValue) // 当前选择器的值
      },
    },
    {
      label: '日历选择器：区间：指定可选择范围',
      prop: 'calendar5',
      type: 'calendar',
      mode: 'range',
      minDate: dayjs().add(-1, 'week').format('YYYY-MM-DD'), // 开始日期
      maxDate: dayjs().add(1, 'week').format('YYYY-MM-DD'), // 结束日期
      placeholder: '点击弹出日历选择器',
      confirm(e) {
        console.info(this.value) // 当前输入框显示的值
        console.info(this.pickerValue) // 当前选择器的值
      },
    },
    {
      label: '日历选择器：自定义样式',
      prop: 'calendar6',
      type: 'calendar',
      mode: 'range',
      activeTextColor: 'tn-orangered', // 激活文字颜色
      activeBgColor: 'tn-gray-disabled', // 激活背景颜色
      rangeTextColor: 'tn-orangered', // 区间文字颜色
      rangeBgColor: 'tn-gray-disabled', // 区间背景颜色
      placeholder: '点击弹出日历选择器',
      confirm(e) {
        console.info(this.value) // 当前输入框显示的值
        console.info(this.pickerValue) // 当前选择器的值
      },
    },
    {
      label: '日历选择器：显示农历',
      prop: 'calendar7',
      type: 'calendar',
      showLunar: true, // 显示农历
      placeholder: '点击弹出日历选择器',
      confirm(e) {
        console.info(this.value) // 当前输入框显示的值
        console.info(this.pickerValue) // 当前选择器的值
      },
    },
  ],
})
</script>

<template>
  <Layout ref="layout" title="日历选择器示例">
    <app-form :config="formConfig"></app-form>
  </Layout>
</template>

<style lang="scss" scoped>

</style>

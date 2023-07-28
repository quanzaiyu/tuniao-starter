<script setup lang="ts">
const layout = $ref(null)

const formConfig = $ref<AppForm>({
  columns: [
    {
      label: '日期时间选择器：年月日',
      prop: 'dateTimePicker1',
      type: 'dateTimePicker',
      placeholder: '点击弹出日期时间选择器',
      confirm() {
        console.info(this.value)
        console.info(this.pickerValue)
      },
    },
    {
      label: '日期时间选择器：年',
      prop: 'dateTimePicker2',
      type: 'dateTimePicker',
      mode: 'year',
      placeholder: '点击弹出日期时间选择器',
      confirm() {
        console.info(this.value)
        console.info(this.pickerValue)
      },
    },
    {
      label: '日期时间选择器：年月',
      prop: 'dateTimePicker3',
      type: 'dateTimePicker',
      mode: 'yearmonth',
      placeholder: '点击弹出日期时间选择器',
      confirm() {
        console.info(this.value)
        console.info(this.pickerValue)
      },
    },
    {
      label: '日期时间选择器：时间',
      prop: 'dateTimePicker4',
      type: 'dateTimePicker',
      mode: 'time',
      placeholder: '点击弹出日期时间选择器',
      confirm() {
        console.info(this.value)
        console.info(this.pickerValue)
      },
    },
    {
      label: '日期时间选择器：日期时间',
      prop: 'dateTimePicker5',
      type: 'dateTimePicker',
      mode: 'datetime',
      placeholder: '点击弹出日期时间选择器',
      confirm() {
        console.info(this.value)
        console.info(this.pickerValue)
      },
    },
    {
      label: '日期时间选择器：设置起始和终止时间',
      prop: 'dateTimePicker6',
      type: 'dateTimePicker',
      mode: 'datetime',
      minTime: dayjs().add(-1, 'week').format('YYYY-MM-DD'), // 开始日期
      maxTime: dayjs().add(1, 'week').format('YYYY-MM-DD'), // 结束日期
      placeholder: '点击弹出日期时间选择器',
      confirm() {
        console.info(this.value)
        console.info(this.pickerValue)
      },
    },
    {
      label: '地区选择器',
      prop: 'regionPicker1',
      type: 'regionPicker',
      placeholder: '点击弹出地区选择器',
      mask: true,
      confirm() {
        console.info(this.value)
        console.info(this.pickerValue)
      },
    },
    {
      label: '地区选择器：默认值',
      prop: 'regionPicker2',
      type: 'regionPicker',
      value: ['53', '5301', '530102'],
      placeholder: '点击弹出地区选择器',
      confirm() {
        console.info(this.value)
        console.info(this.pickerValue)
      },
    },
  ],
})
</script>

<template>
  <Layout ref="layout" title="日期时间和区域选择器示例">
    <app-form :config="formConfig"></app-form>
  </Layout>
</template>

<style lang="scss" scoped>

</style>

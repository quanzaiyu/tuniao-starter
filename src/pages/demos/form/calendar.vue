<script setup lang="ts">
const layout = $ref(null)

const formConfig = $ref<AppForm>({
  columns: [
    {
      label: '日历选择器：单选',
      prop: 'calendar1',
      type: 'calendar',
      format: 'YYYY-MM-DD',
      placeholder: '点击弹出日历选择器',
      confirm() {
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
      confirm() {
        console.info(this.value)
        console.info(this.pickerValue)
      },
    },
    {
      label: '日历选择器：区间',
      prop: 'calendar3',
      type: 'calendar',
      mode: 'range',
      placeholder: '点击弹出日历选择器',
      confirm() {
        console.info(this.value)
        console.info(this.pickerValue)
      },
    },
    {
      label: '日历选择器：区间：自定义文案',
      prop: 'calendar4',
      type: 'calendar',
      mode: 'range',
      rangeStartDesc: '入住',
      rangeEndDesc: '离店',
      placeholder: '点击弹出日历选择器',
      confirm() {
        console.info(this.value)
        console.info(this.pickerValue)
      },
    },
    {
      label: '日历选择器：区间：指定可选择范围',
      prop: 'calendar5',
      type: 'calendar',
      mode: 'range',
      minDate: dayjs().add(-1, 'week').format('YYYY-MM-DD'),
      maxDate: dayjs().add(1, 'week').format('YYYY-MM-DD'),
      placeholder: '点击弹出日历选择器',
      confirm() {
        console.info(this.value)
        console.info(this.pickerValue)
      },
    },
    {
      label: '日历选择器：自定义样式',
      prop: 'calendar6',
      type: 'calendar',
      mode: 'range',
      activeTextColor: 'tn-orangered',
      activeBgColor: 'tn-gray-disabled',
      rangeTextColor: 'tn-orangered',
      rangeBgColor: 'tn-gray-disabled',
      placeholder: '点击弹出日历选择器',
      confirm() {
        console.info(this.value)
        console.info(this.pickerValue)
      },
    },
    {
      label: '日历选择器：显示农历',
      prop: 'calendar7',
      type: 'calendar',
      showLunar: true,
      placeholder: '点击弹出日历选择器',
      confirm() {
        console.info(this.value)
        console.info(this.pickerValue)
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

<script setup>
// const layout = $ref(null)

const formConfig = $ref({
  columns: [
    {
      label: '单选框：基础设置',
      prop: 'radio1',
      type: 'radio',
      value: 1, // 当前单选框默认值
      labelPosition: 'left', // 标签位置，可选: top | left | right，默认 top
      data: [
        { label: '男', value: 1 },
        { label: '女', value: 2 },
      ],
      change(e) {
        console.info('当前选中的值', e, this.value)
      },
    },
    {
      label: '单选框：显示边框',
      prop: 'radio2',
      type: 'radio',
      value: 1,
      labelPosition: 'left',
      border: true,
      data: [
        { label: '男', value: 1 },
        { label: '女', value: 2 },
      ],
    },
    {
      label: '单选框：禁止点击',
      prop: 'radio3',
      type: 'radio',
      value: 1,
      labelPosition: 'left',
      border: true,
      disabled: true, // 禁止点击
      data: [
        { label: '男', value: 1 },
        { label: '女', value: 2 },
      ],
    },
    {
      label: '单选框：设置颜色',
      prop: 'radio4',
      type: 'radio',
      value: 1,
      labelPosition: 'left',
      border: true,
      data: [
        { label: '男', value: 1, activeColor: 'tn-blue' },
        { label: '女', value: 2, activeColor: 'tn-orangered' },
      ],
    },
    {
      label: '复选框：基础设置',
      prop: 'checkbox1',
      type: 'checkbox',
      value: [1], // 当前单选框默认值
      labelPosition: 'left', // 标签位置，可选: top | left | right，默认 top
      data: [
        { label: '苹果', value: 1 },
        { label: '香蕉', value: 2 },
      ],
      change(e) {
        console.info('当前选中的值', e, this.value)
      },
    },
    {
      label: '复选框：显示边框',
      prop: 'checkbox2',
      type: 'checkbox',
      value: [1],
      labelPosition: 'left',
      border: true,
      data: [
        { label: '苹果', value: 1 },
        { label: '香蕉', value: 2 },
      ],
    },
    {
      label: '复选框：禁止点击',
      prop: 'checkbox3',
      type: 'checkbox',
      value: [1],
      labelPosition: 'left',
      border: true,
      disabled: true, // 禁止点击
      data: [
        { label: '苹果', value: 1 },
        { label: '香蕉', value: 2 },
      ],
    },
    {
      label: '复选框：设置颜色',
      prop: 'checkbox4',
      type: 'checkbox',
      value: [1],
      labelPosition: 'left',
      border: true,
      data: [
        { label: '苹果', value: 1, activeColor: 'tn-blue' },
        { label: '香蕉', value: 2, activeColor: 'tn-orangered' },
      ],
    },
  ],
})
</script>

<template>
  <Layout ref="layout" title="其他表单组件示例">
    <app-form :config="formConfig"></app-form>
  </Layout>
</template>

<style lang="scss" scoped>

</style>

<script setup lang="ts">
const layout = $ref(null)

const formConfig = $ref<AppForm>({
  columns: [
    {
      label: '简单选择框',
      prop: 'select1',
      type: 'select',
      placeholder: '点击弹出简单选择框',
      data: ['选项1', '选项2', '选项3', '选项4', '选项5'],
      confirm() {
        console.info(this.current) // 当前选择框的值
        console.info(this.value) // 当前输入框显示的值
        console.info(this.pickerValue) // 当前选择器的值
      },
    },
    {
      label: '对象选择框',
      prop: 'select2',
      type: 'select',
      placeholder: '点击弹出对象选择框',
      data: [
        { label: '对象选项1', value: 1 },
        { label: '对象选项2', value: 2 },
        { label: '对象选项3', value: 3 },
        { label: '对象选项4', value: 4 },
        { label: '对象选项5', value: 5 },
      ],
      confirm() {
        console.info(this.current) // 当前选择框的值
        console.info(this.value) // 当前输入框显示的值
        console.info(this.pickerValue) // 当前选择器的值
      },
    },
    {
      label: '默认选中值',
      prop: 'select3',
      type: 'select',
      value: '选项3', // 当前输入框显示的值，可以不指定，主要用于回显
      pickerValue: 3, // 当前选择器的值，可以不指定，主要用于回显
      placeholder: '点击弹出简单选择框',
      data: [
        { label: '对象选项1', value: 1 },
        { label: '对象选项2', value: 2 },
        { label: '对象选项3', value: 3 },
        { label: '对象选项4', value: 4 },
        { label: '对象选项5', value: 5 },
      ],
    },
    {
      label: '对象选择框（自定义key-value）',
      prop: 'select4',
      type: 'select',
      labelKey: 'text', // 不指定的话，默认为 label
      valueKey: 'value', // 不指定的话，默认为 value
      childrenKey: 'children', // 不指定的话，默认为 children
      placeholder: '点击弹出对象选择框',
      data: [
        { text: '对象选项1', value: 1 },
        { text: '对象选项2', value: 2 },
        { text: '对象选项3', value: 3 },
        { text: '对象选项4', value: 4 },
        { text: '对象选项5', value: 5 },
      ],
    },
    {
      label: '多列简单选择框（非联动）',
      prop: 'select5',
      type: 'select',
      placeholder: '点击弹出多列选择框',
      data: [
        ['数值1', '数值2', '数值3', '数值4', '数值5'],
        ['数值1-a', '数值2-a', '数值3-a', '数值4-a', '数值5-a'],
        ['数值1-b', '数值2-b', '数值3-b', '数值4-b', '数值5-b'],
      ],
    },
    {
      label: '多列对象选择框（非联动）',
      prop: 'select6',
      type: 'select',
      placeholder: '点击弹出多列选择框',
      data: [
        [
          { label: '数值1', value: 1 },
          { label: '数值2', value: 2 },
          { label: '数值3', value: 3 },
          { label: '数值4', value: 4 },
          { label: '数值5', value: 5 },
        ],
        [
          { label: '数值1-a', value: 11 },
          { label: '数值2-a', value: 21 },
          { label: '数值3-a', value: 31 },
          { label: '数值4-a', value: 41 },
          { label: '数值5-a', value: 51 },
        ],
        [
          { label: '数值1-b', value: 12 },
          { label: '数值2-b', value: 22 },
          { label: '数值3-b', value: 32 },
          { label: '数值4-b', value: 42 },
          { label: '数值5-b', value: 52 },
        ],
      ],
    },
    {
      label: '树形选择框（联动）',
      prop: 'select7',
      type: 'select',
      placeholder: '点击弹出树形选择框',
      data: [
        {
          label: '小学部',
          value: 1,
          children: [
            {
              label: '一年级',
              value: 11,
              children: [
                {
                  label: '一年级1班',
                  value: 111,
                },
                {
                  label: '一年级2班',
                  value: 112,
                },
                {
                  label: '一年级3班',
                  value: 113,
                },
              ],
            },
            {
              label: '二年级',
              value: 12,
              children: [
                {
                  label: '二年级1班',
                  value: 121,
                },
                {
                  label: '二年级2班',
                  value: 122,
                },
                {
                  label: '二年级3班',
                  value: 123,
                },
              ],
            },
            {
              label: '三年级',
              value: 13,
              children: [
                {
                  label: '三年级1班',
                  value: 131,
                },
                {
                  label: '三年级2班',
                  value: 132,
                },
                {
                  label: '三年级3班',
                  value: 133,
                },
              ],
            },
          ],
        },
        {
          label: '初中部',
          value: 2,
          children: [
            {
              label: '初一',
              value: 21,
              children: [
                {
                  label: '初一1班',
                  value: 211,
                },
                {
                  label: '初一2班',
                  value: 212,
                },
                {
                  label: '初一3班',
                  value: 213,
                },
              ],
            },
            {
              label: '初二',
              value: 22,
              children: [
                {
                  label: '初二1班',
                  value: 221,
                },
                {
                  label: '初二2班',
                  value: 222,
                },
                {
                  label: '初二3班',
                  value: 223,
                },
              ],
            },
            {
              label: '初三',
              value: 23,
              children: [
                {
                  label: '初三1班',
                  value: 231,
                },
                {
                  label: '初三2班',
                  value: 232,
                },
                {
                  label: '初三3班',
                  value: 233,
                },
              ],
            },
          ],
        },
        {
          label: '高中部',
          value: 3,
          children: [
            {
              label: '高一',
              value: 31,
              children: [
                {
                  label: '高一1班',
                  value: 311,
                },
                {
                  label: '高一2班',
                  value: 312,
                },
                {
                  label: '高一3班',
                  value: 313,
                },
              ],
            },
            {
              label: '高二',
              value: 32,
              children: [
                {
                  label: '高二1班',
                  value: 321,
                },
                {
                  label: '高二2班',
                  value: 322,
                },
                {
                  label: '高二3班',
                  value: 323,
                },
              ],
            },
            {
              label: '高三',
              value: 33,
              children: [
                {
                  label: '高三1班',
                  value: 331,
                },
                {
                  label: '高三2班',
                  value: 332,
                },
                {
                  label: '高三3班',
                  value: 333,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      label: '禁用选择框',
      prop: 'select8',
      type: 'select',
      disabled: true, // 是否禁用，可选: true | false
      placeholder: '禁用选择框',
      data: ['选项1', '选项2', '选项3', '选项4', '选项5'],
    },
    {
      label: '隐藏取消按钮',
      prop: 'select9',
      type: 'select',
      placeholder: '隐藏取消按钮的选择框',
      data: ['选项1', '选项2', '选项3', '选项4', '选项5'],
      showConfirm: true, // 是否显示确定按钮，可选: true | false，默认 true
      showCancel: false, // 是否显示取消按钮，可选: true | false，默认 true
    },
    {
      label: '自定义按钮',
      prop: 'select10',
      type: 'select',
      placeholder: '自定义按钮的选择框',
      cancelText: 'cancel', // 取消按钮的文本
      cancelColor: '#090', // 取消按钮的字体颜色
      confirmText: 'confirm', // 确认按钮的文本
      confirmColor: '#00f', // 确认按钮的字体颜色
      mask: true, // 显示遮罩
      zIndex: 2000, // Picker选择器的zIndex
      data: ['选项1', '选项2', '选项3', '选项4', '选项5'],
    },
  ],
})
</script>

<template>
  <Layout ref="layout" title="选择器示例">
    <app-form :config="formConfig"></app-form>
  </Layout>
</template>

<style lang="scss" scoped>

</style>

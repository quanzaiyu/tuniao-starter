// 表单组件类型
type InputType = 'text' | 'number' | 'idcard' | 'digit' | 'textarea' | 'password' | 'select'
type PickerType = 'dateTimePicker' | 'regionPicker' | 'calendar'
type OtherType = 'radio' | 'checkbox' | 'switch' | 'numberBox' | 'slider' | 'upload'

// 标签位置
type LabelPosition = 'top' | 'left' | 'right'

// 输入框尺寸
type InputSize = 'sm' | 'lg'

// 输入框对齐方式
type InputTextAlign = 'left' | 'center' | 'right'

// 日期时间选择器模式
type DateTimePickerMode = 'year' | 'yearmonth' | 'time' | 'datetime'

// 日历选择器模式
type CalendarMode = 'multi' | 'range'

// JSON表单
interface AppForm {
  columns: Array<AppFormItem>
  labelPosition?: LabelPosition // 表单整体的标签位置，默认 top
  labelWidth?: number, // 标签宽度
  initData?: () => void // 初始化数据
}

// JSON表单项
interface AppFormItem {
  label: string // 标签，必填
  prop: string // 树形，必填
  type?: InputType | PickerType | OtherType // 表单组件类型，默认值text可省略
  value?: string | number | boolean | Array<> // 当前表单组件的值，可以不指定，用于回显
  rules?: Array<{}> | {} // 表单校验规则，可以是数组或对象， TODO：类型需要细化
  data?: string[] | AnyObject[] // 表单数据，用于选择器、单选框、复选框等
  disabled?: boolean // 是否禁用，默认 false
  labelPosition?: LabelPosition // 标签位置，默认 top

  // 输入框
  size?: InputSize // 输入框尺寸，默认 lg
  textAlign?: InputTextAlign // 输入框对齐方式，默认 left
  placeholder?: string // 占位符
  placeholderStyle?: AnyObject // 自定义占位符样式
  maxlength?: number // 输入框最大长度
  height?: number | string // 输入框高度
  border?: boolean // 是否显示边框，默认 true
  borderColor?: string // 边框颜色，在border为true时有效，支持图鸟内置的边框颜色、hex、rgb、rgba

  // 选择器，可使用输入框的属性
  mask?: boolean // 显示遮罩
  zIndex?: number // Picker选择器的zIndex
  pickerValue?: string | number | boolean // 当前选择器的值，可以不指定，主要用于回显
  showConfirm?: boolean // 是否显示确定按钮
  showCancel?: boolean // 是否显示取消按钮
  cancelText?: string // 取消按钮的文本
  cancelColor?: string // 取消按钮的字体颜色
  confirmText?: string // 确认按钮的文本
  confirmColor?: string // 确认按钮的字体颜色

  // 树形选择器，可使用选择器的属性
  labelKey?: string // 不指定的话，默认为 label
  valueKey?: string // 不指定的话，默认为 value
  childrenKey?: string // 不指定的话，默认为 children

  // 日期时间选择器，可使用选择器的属性
  mode?:  DateTimePickerMode | CalendarMode // 选择器模式
  format?: string // 日期格式，可省略，默认 YYYY-MM-DD
  minTime?: string // 开始日期
  maxTime?: string // 结束日期

  // 日历，可使用日期时间选择器的属性
  showLunar?: boolean // 显示农历
  activeTextColor?: string // 激活文字颜色
  activeBgColor?: string // 激活背景颜色
  minDate?: string // 当mode为range时有效，开始日期
  maxDate?: string // 当mode为range时有效，结束日期
  rangeStartDesc?: string // 当mode为range时有效，默认“开始”
  rangeEndDesc?: string // 当mode为range时有效，默认“结束”
  rangeTextColor?: string // 当mode为range时有效，区间文字颜色
  rangeBgColor?: string // 当mode为range时有效，区间背景颜色

  // 上传
  limit?: number // 允许上传的文件个数，可省略，默认1
  maxSize?: number // 文件上传大小限制，可省略，默认3MB
  extensions?: string[] // 允许上传的文件类型，可省略，默认 ['jpg','jpeg', 'png']

  // 开关
  activeColor?: string // 激活的颜色
  activeValue?: number | string | boolean // 激活的值
  inactiveValue?: number | string | boolean // 未激活的值

  // 步进器
  step?: number // 步长
  min?: number // 最小值
  max?: number // 最大值
  textColor?: string // 文字颜色
  bgColor?: string // 背景颜色
  inputDisabled?: boolean // 禁止输入

  // 事件
  click?: () => void // 点击
  input?: () => void // 输入
  change?: () => void // 改变
  confirm?: () => void // 确定
  cancel?: () => void // 取消
  oversizeOrNoSupport?: () => void // 上传文件超过大小或不支持的文件类型
}

// 文件上传的返回类型
interface UploadResult {
  link: string
  domain: string
  name: string
  originalName: string
  attachId: string
}

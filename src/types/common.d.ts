// 文件上传的类型
interface UploadResult {
  link: string
  domain: string
  name: string
  originalName: string
  attachId: string
}


interface AppForm {
  columns: Array<AppFormItem>
  labelPosition?: string
  labelWidth?: number
}

interface AppFormItem {
  label: string
  prop: string
  value?: string | number | boolean | Array<>
  pickerValue?: string | number | boolean
  type?: string
  format?: string
  placeholder?: string
  textAlign?: string
  size?: string
  labelPosition?: string
  maxlength?: number
  rules?: Array<{}> | {}
  data?: Array<{}>
  mode?: string
  limit?: number
  maxSize?: number
  extensions?: Array<>
  rangeStartDesc?: string
  rangeEndDesc?: string
  minDate?: string
  maxDate?: string
  minTime?: string
  maxTime?: string
  activeTextColor?: string
  activeBgColor?: string
  rangeTextColor?: string
  rangeBgColor?: string
  showLunar?: boolean
  mask?: boolean
  disabled?: boolean
  border?: boolean
  borderColor?: string
  placeholderStyle?: {}
  height?: number | string

  click?: () => void
  input?: () => void
  change?: () => void
  confirm?: () => void
  cancel?: () => void
  oversizeOrNoSupport?: () => void
}

<script setup lang="ts">
const form = $ref(null)

const props = defineProps({
  config: { type: Object, default: () => ({}) },
})

const emit = defineEmits(['confirm'])

// 判断数组的元素类型
function checkArrayElementType(arr) {
  return checkElementType(arr[0])
}

// 判断元素类型
function checkElementType(element) {
  if (element instanceof Array) {
    return 'array'
  } else if (typeof element === 'string') {
    return 'string'
  } else if (typeof element === 'object') {
    return 'object'
  }
}

// 初始化表单数据
;(async () => {
  if (props.config) {
    const config = props.config

    let data = null
    if (props.config?.initData) {
      data = await props.config.initData()
    }

    config.formModel = {}
    config.columns = config.columns.map(item => {
      if (!item.type) {
        // 没有指定type的话，默认为输入框
        item.componentType = 'input' // 组件类型
        item.inputType = 'text' // 输入框类型
        item.value = data?.[item.prop] ?? item.value ?? '' // 当前输入框显示的值，可以不指定，主要用于回显
        item.placeholder = item.placeholder ?? `请输入${item.label}`
        config.formModel[item.prop] = item.value
      } else if (['text', 'number', 'idcard', 'digit', 'textarea', 'password'].includes(item.type)) {
        // 输入框
        item.componentType = 'input'
        item.inputType = item.type
        item.value = data?.[item.prop] ?? item.value ?? '' // 当前输入框显示的值，可以不指定，主要用于回显
        item.placeholder = item.placeholder ?? `请输入${item.label}`
        config.formModel[item.prop] = item.value
      } else if (['select', 'calendar', 'dateTimePicker', 'regionPicker', 'upload'].includes(item.type)) {
        // select 选择框
        // calendar 日历
        // dateTimePicker 日期时间选择器
        // regionPicker 地区选择器
        // upload 上传
        item.componentType = 'input'
        item.inputType = 'select'
        item.open = item.open ?? false // 控制Picker的显示与隐藏
        item.placeholder = item.placeholder ?? `请选择${item.label}`

        // 设置表单的默认值
        if (['regionPicker'].includes(item.type)) {
          item.value = data?.[item.prop] ?? item.value ?? [] // 当前输入框显示的值，可以不指定，主要用于回显
          item.pickerValue = data?.[item.prop] ?? item.pickerValue ?? [] // 当前选择器的值，可以不指定，主要用于回显
        } else if (item.type === 'upload') {
          if (typeof data?.[item.prop] === 'string') {
            data[item.prop] = data[item.prop].split(',')
          }
          item.value = (data?.[item.prop] ?? item.value ?? []).map(img => import.meta.env.VITE_APP_OSS + img) // 当前上传框显示的图片
          item.pickerValue = data?.[item.prop] ?? item.pickerValue ?? [] // 当前上传框的值，不含域名
          item.componentType = 'upload'
          item.placeholder = item.placeholder ?? `请上传${item.label}`
        } else {
          item.value = data?.[item.prop] ?? item.value ?? '' // 当前输入框显示的值，可以不指定，主要用于回显
          item.pickerValue = data?.[item.prop] ?? item.pickerValue ?? '' // 当前选择器的值，可以不指定，主要用于回显
        }

        if (item.type === 'select') {
          item.labelKey = item.labelKey ?? 'label' // 不指定的话，默认为 label
          item.valueKey = item.valueKey ?? 'value' // 不指定的话，默认为 value
          item.childrenKey = item.childrenKey ?? 'children' // 不指定的话，默认为 children
          item.current = item.current ?? '' // 设置默认选中的值
          item.arrayType = checkArrayElementType(item.data) // 选择器数组元素类型
        } else if (item.type === 'calendar') {
          item.format = 'YYYY-MM-DD'
        } else if (item.type === 'dateTimePicker') {
          item.mode = item.mode ?? 'date'
          const format = {
            year: 'YYYY',
            yearmonth: 'YYYY-MM',
            date: 'YYYY-MM-DD',
            datetime: 'YYYY-MM-DD HH:mm:ss',
            time: 'HH:mm:ss',
          }
          item.format = format[item.mode]
        }
        config.formModel[item.prop] = item.pickerValue
      } else {
        // 其他类型，包括：radio、checkbox、switch、numberBox、slider
        item.componentType = item.type
        item.value = data?.[item.prop] ?? item.value ?? '' // 当前输入框显示的值，可以不指定，主要用于回显
        config.formModel[item.prop] = item.value
      }
      return item
    })
  }
})()

// 计算表单值
const computedConfig = $computed(() => {
  const config = props.config
  config.formModel = {}
  config.columns = config.columns.map(item => {
    if (['select', 'calendar', 'dateTimePicker', 'regionPicker', 'upload'].includes(item.type)) {
      config.formModel[item.prop] = item.pickerValue
    } else {
      config.formModel[item.prop] = item.value
    }
    return item
  })
  return config
})

// 文件上传
async function upload(e, item) {
  const res: UploadResult = await api.upload(e) as UploadResult
  item.pickerValue.push(res.name)
  return res.link
}

// 文件删除
function remove(e, item) {
  for (const index in item.pickerValue) {
    if (Object.prototype.hasOwnProperty.call(item.pickerValue, index)) {
      const img = item.pickerValue[index]
      if (e.url.includes(img)) {
        item.pickerValue.splice(index, 1)
      }
    }
  }
  return true
}

// 调用自定义方法
function invokeEventFunc(item, method, value) {
  // 选择框
  if (item.inputType === 'select') {
    if (method === 'click') {
      // 点击打开选择器，如果禁用则不弹出选择框
      if (item.disabled) {
        return
      }
      item.open = true
    } else if (method === 'confirm') {
      item.open = false
      if (item.type === 'select') {
        // 如果没有选中任何值，则直接关闭选择器弹窗
        if (!item.pickerValue) {
          return
        }

        // 选择器
        if (checkElementType(value) === 'array') {
          // 多列选择器，树状选择器
          item.value = value.map(val => typeof val === 'string' ? val : val[item.labelKey])
          item.current = value
        } else {
          // 单列选择器
          item.value = typeof value === 'string' ? value : value[item.labelKey] // 当前显示的值
          item.current = value // 当前选中的数据
        }
      } else if (item.type === 'calendar') {
        // 日历
        if (['multi', 'range'].includes(item.mode)) {
          // 多选模式
          item.pickerValue = item.pickerValue.map(val => dayjs(val).format(item.format))
        } else {
          // 单选模式
          item.pickerValue = dayjs(item.pickerValue).format(item.format)
        }
        item.value = item.pickerValue
      } else if (item.type === 'dateTimePicker') {
        // 日期时间选择器
        if (item.mode === 'time') {
          item.pickerValue = dayjs().format('YYYY-MM-DD') + ' ' + item.pickerValue
        }
        item.pickerValue = dayjs(item.pickerValue).format(item.format)
        item.value = item.pickerValue
      } else if (item.type === 'regionPicker') {
        // 地区选择器
        item.value = value.map(val => val.name)
      }
    }
  } else if (item.type === 'numberBox') {
    // 步进器
    if (method === 'input') {
      // 验证输入值范围
      if (value < item.min) {
        item.value = item.min
      } else if (value > item.max) {
        item.value = item.max
      }
    }
  }

  // 调用自定义方法
  item?.[method]?.(value)
}

// 提交表单
function submitForm() {
  console.info('提交的表单：', computedConfig.formModel)
  form?.validate(valid => {
    if (valid) {
      emit('confirm', computedConfig.formModel)
    } else {
      uni.showToast({
        title: '表单校验失败',
        icon: 'none',
      })
    }
  })
}

console.info('初始化表单数据：', computedConfig)
</script>

<template>
  <view class="p-20 bg-white">
    <tn-form
      ref="form"
      :model="computedConfig.formModel"
      :label-position="computedConfig.labelPosition ?? 'top'"
      :label-width="computedConfig.labelWidth ?? 'auto'"
    >
      <tn-form-item
        v-for="(item, index) in computedConfig.columns"
        :key="index"
        :prop="item.prop"
        :label="item.label"
        :label-position="item.labelPosition ?? computedConfig.labelPosition ?? 'top'"
        :rules="item.rules"
      >
        <!-- 输入框 -->
        <tn-input
          v-if="item.componentType === 'input'"
          v-model="item.value"
          :placeholder="item.placeholder"
          :text-align="item.textAlign ?? 'left'"
          :size="item.size ?? 'lg'"
          :type="item.inputType ?? 'text'"
          :disabled="item.disabled ?? false"
          :height="item.height"
          :placeholder-style="item.placeholderStyle"
          :border="item.border ?? true"
          :border-color="item.borderColor"
          :maxlength="item.maxlength"
          :clearable="item.clearable ?? true"
          :show-password="item.showPassword ?? false"
          :trim="item.trim ?? true"
          :custom-style="item.customStyle"
          :custom-class="item.customClass"
          @input="invokeEventFunc(item, 'input', $event)"
          @click="invokeEventFunc(item, 'click', $event)"
        ></tn-input>
        <!-- 选择框 -->
        <tn-picker
          v-if="item.componentType === 'input' && item.type === 'select'"
          v-model="item.pickerValue"
          v-model:open="item.open"
          :data="item.data"
          :show-cancel="item.showCancel ?? true"
          :cancel-text="item.cancelText ?? '取消'"
          :cancel-color="item.cancelColor"
          :show-confirm="item.showConfirm ?? true"
          :confirm-text="item.confirmText ?? '确定'"
          :confirm-color="item.confirmColor"
          :label-key="item.labelKey"
          :value-key="item.valueKey"
          :children-key="item.childrenKey"
          :mask="item.mask ?? true"
          :z-index="item.zIndex ?? 1000"
          @change="(val, index, nodeItem) => invokeEventFunc(item, 'change', nodeItem)"
          @confirm="(val, nodeItem) => invokeEventFunc(item, 'confirm', nodeItem)"
        />
        <!-- 单选框 -->
        <tn-radio-group
          v-if="item.componentType === 'radio'"
          v-model="item.value"
          :border="item.border ?? false"
          :disabled="item.disabled ?? false"
          :label-disabled="item.disabled ?? false"
          :active-color="item.activeColor"
          @change="invokeEventFunc(item, 'change', $event)"
        >
          <tn-radio
            v-for="(radio, radioIndex) in item.data"
            :key="radioIndex"
            :label="radio.value"
            :active-color="radio.activeColor"
          >{{ radio.label }}</tn-radio>
        </tn-radio-group>
        <!-- 复选框 -->
        <tn-checkbox-group
          v-if="item.componentType === 'checkbox'"
          v-model="item.value"
          :border="item.border ?? false"
          :disabled="item.disabled ?? false"
          :label-disabled="item.disabled ?? false"
          :active-color="item.activeColor"
          @change="invokeEventFunc(item, 'change', $event)"
        >
          <tn-checkbox
            v-for="(checkbox, checkboxndex) in item.data"
            :key="checkboxndex"
            :label="checkbox.value"
            :active-color="checkbox.activeColor"
          >{{ checkbox.label }}</tn-checkbox>
        </tn-checkbox-group>
        <!-- 开关 -->
        <tn-switch
          v-if="item.componentType === 'switch'"
          v-model="item.value"
          :disabled="item.disabled ?? false"
          :active-value="item.activeValue ?? true"
          :inactive-value="item.inactiveValue ?? false"
          :active-color="item.activeColor"
          @change="invokeEventFunc(item, 'change', $event)"
        />
        <!-- 日历 -->
        <tn-popup
          v-if="item.componentType === 'input' && item.type === 'calendar'"
          v-model="item.open"
          :overlay-closeable="false"
          open-direction="bottom"
        >
          <view class="tn-pt">
            <tn-calendar
              v-model="item.pickerValue"
              :mode="item.mode"
              :range-start-desc="item.rangeStartDesc"
              :range-end-desc="item.rangeEndDesc"
              :min-date="item.minDate"
              :max-date="item.maxDate"
              :active-bg-color="item.activeBgColor"
              :active-text-color="item.activeTextColor"
              :range-bg-color="item.rangeBgColor"
              :range-text-color="item.rangeTextColor"
              :show-lunar="item.showLunar ?? false"
            />
          </view>
          <view class="tn-mt tn-w-full tn-pb">
            <tn-button
              font-size="36"
              custom-class="popup-calendar-button"
              :custom-style="{
                margin: '0rpx 30rpx',
                width: 'calc(100% - 60rpx)',
                padding: '20rpx 30rpx'
              }"
              @click="invokeEventFunc(item, 'confirm', $event)"
            >
              确定
            </tn-button>
          </view>
        </tn-popup>
        <!-- 日期时间选择器 -->
        <tn-date-time-picker
          v-if="item.componentType === 'input' && item.type === 'dateTimePicker'"
          v-model="item.pickerValue"
          v-model:open="item.open"
          :mode="item.mode"
          :mask="item.mask ?? true"
          :min-time="item.minTime"
          :max-time="item.maxTime"
          :format="item.format"
          :show-cancel="item.showCancel ?? true"
          :cancel-text="item.cancelText ?? '取消'"
          :cancel-color="item.cancelColor"
          :show-confirm="item.showConfirm ?? true"
          :confirm-text="item.confirmText ?? '确定'"
          :confirm-color="item.confirmColor"
          :z-index="item.zIndex ?? 1000"
          @change="invokeEventFunc(item, 'change', $event)"
          @confirm="invokeEventFunc(item, 'confirm', $event)"
        />
        <!-- 地区选择器 -->
        <tn-region-picker
          v-if="item.componentType === 'input' && item.type === 'regionPicker'"
          v-model="item.pickerValue"
          v-model:open="item.open"
          :mask="item.mask ?? true"
          :show-cancel="item.showCancel ?? true"
          :cancel-text="item.cancelText ?? '取消'"
          :cancel-color="item.cancelColor"
          :show-confirm="item.showConfirm ?? true"
          :confirm-text="item.confirmText ?? '确定'"
          :confirm-color="item.confirmColor"
          :z-index="item.zIndex ?? 1000"
          @change="(val, nodeItem) => invokeEventFunc(item, 'change', nodeItem)"
          @confirm="(val, nodeItem) => invokeEventFunc(item, 'confirm', nodeItem)"
        />
        <!-- 步进器 -->
        <tn-number-box
          v-if="item.componentType === 'numberBox'"
          v-model="item.value"
          :step="item.step"
          :min="item.min"
          :max="item.max"
          :disabled="item.disabled ?? false"
          :size="item.size || 'lg'"
          :text-color="item.textColor"
          :bg-color="item.bgColor"
          :input-disabled="item.inputDisabled ?? true"
          @input="invokeEventFunc(item, 'input', $event)"
          @change="invokeEventFunc(item, 'change', $event)"
        />
        <!-- 滑动条 -->
        <tn-slider
          v-if="item.componentType === 'slider'"
          v-model="item.value"
          :step="item.step"
          :min="item.min"
          :max="item.max"
          :disabled="item.disabled ?? false"
          :size="item.size || 'lg'"
          :active-color="item.activeColor"
          :inactive-color="item.inactiveColor"
          :slider-bar-size="item.sliderBarSize"
          :slider-height="item.sliderHeight"
          @input="invokeEventFunc(item, 'input', $event)"
          @change="invokeEventFunc(item, 'change', $event)"
        />
        <!-- 文件上传 -->
        <tn-image-upload
          v-if="item.componentType === 'upload'"
          v-model="item.value"
          action=""
          :disabled="item.disabled ?? false"
          :custom-upload-handler="e => upload(e, item)"
          :before-remove="e => remove(e, item)"
          :limit="item.limit ?? 1"
          :multiple="item.multiple ?? true"
          :max-size="item.maxSize ?? 3 * 1024 * 1024"
          :extensions="item.extensions ?? ['jpg', 'jpeg', 'png']"
          :size-type="item.sizeType ?? ['original', 'compressed']"
          :source-type="item.sourceType ?? ['album', 'camera']"
          :auto-remove-faild-file="item.autoRemoveFaildFile ?? true"
          @oversize-or-no-support="invokeEventFunc(item, 'oversizeOrNoSupport', $event)"
        ></tn-image-upload>
      </tn-form-item>
    </tn-form>
    <tn-button size="lg" :custom-style="{ width: '100%', height: '100rpx' }" @click="submitForm"> 提交 </tn-button>
  </view>
</template>

<style lang="scss" scoped>
</style>

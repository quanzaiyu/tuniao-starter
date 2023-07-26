<script setup>
const props = defineProps({
  config: { type: Object, default: () => ({}) },
})

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
const computedConfig = computed(() => {
  const config = props.config
  config.columns = config.columns.map(item => {
    // !item.type：没有指定类型，默认为输入框
    // 或者类型为 'text', 'number', 'idcard', 'digit', 'textarea', 'password', 'select' 的输入框
    if (!item.type || ['text', 'number', 'idcard', 'digit', 'textarea', 'password', 'select'].includes(item.type)) {
      if (item.type === 'select') {
        // 选择框
        item.open = item.open ?? false // 控制Picker的显示与隐藏
        item.value = item.value ?? '' // 当前输入框显示的值，可以不指定，主要用于回显
        item.pickerValue = item.pickerValue ?? '' // 当前选择器的值，可以不指定，主要用于回显
        item.labelKey = item.labelKey ?? 'label' // 不指定的话，默认为 label
        item.valueKey = item.valueKey ?? 'value' // 不指定的话，默认为 value
        item.childrenKey = item.childrenKey ?? 'children'
        item.current = '' // 设置默认选中的值
        item.arrayType = checkArrayElementType(item.data)
      } else {
        // 输入框
        item.value = item.value ?? '' // 当前输入框显示的值，可以不指定，主要用于回显
      }
      return { ...item, componentType: 'input' }
    }
    // 其他类型
    return { ...item, componentType: item.type }
  })
  return config
})

// 从树中查找指定的对象
function findObjectByValue(tree, value, valueKey = 'value', childrenKey = 'children') {
  for (let i = 0; i < tree.length; i++) {
    if (tree[i][valueKey] === value) {
      return tree[i]
    }
    if (tree[i][childrenKey]) {
      const result = findObjectByValue(tree[i].children, value, valueKey, childrenKey)
      if (result) {
        return result
      }
    }
  }
  return null
}

// 选择器方法处理
// item 当前选择框实例
// value 当前选择框的值
// type 类型 1 单列选择器  2 多列选择器 3 树状选择器
// arrayType 数组中元素的类型（是字符串数组还是对象数组）
function selectConfirm(item, value, type, arrayType) {
  if (type === 1) {
    // 单列选择器
    if (arrayType === 'object') {
      // 对象数组
      value = findObjectByValue(item.data, value, item.valueKey, item.childrenKey)
      item.value = value[item.labelKey]
    } else if (arrayType === 'string') {
      // 字符串数组
      item.value = value
    }
    // 当前选中的数据
    item.current = value
  } else if (type === 2) {
    // 多列选择器
    item.value = [] // 当前显示的值
    item.current = [] // 当前选中的数据
    for (const i in value) {
      if (arrayType === 'object') {
        const currentValue = findObjectByValue(item.data[i], value[i], item.valueKey, item.childrenKey)
        item.value.push(currentValue[item.labelKey])
        item.current.push(currentValue)
      } else if (arrayType === 'string') {
        item.value.push(value[i])
        item.current.push(value[i])
      }
    }
  } else if (type === 3) {
    // 树状选择器
    item.value = [] // 当前显示的值
    item.current = [] // 当前选中的数据
    for (const i in value) {
      const currentValue = findObjectByValue(item.data, value[i], item.valueKey, item.childrenKey)
      item.value.push(currentValue[item.labelKey])
      item.current.push(currentValue)
    }
  }
}

// 调用自定义方法
function invokeEventFunc(item, method, value) {
  // 选择框
  if (method === 'click') {
    // 点击打开选择器，如果禁用则不弹出选择框
    if (item.disabled) {
      return
    }
    item.open = true
  } else if (item.type === 'select') {
    if (method === 'confirm') {
      if (checkElementType(value) === 'array') {
        const arrayType = checkArrayElementType(item.data[0])
        if (arrayType === undefined) {
          // 树状选择器
          selectConfirm(item, value, 3)
        } else {
          // 多列选择器
          selectConfirm(item, value, 2, arrayType)
        }
      } else {
        // 单列选择框
        selectConfirm(item, value, 1, item.arrayType)
      }
    } else if (method === 'cancel') {
      // 取消，恢复上次被选中的值
      if (item.arrayType === 'object') {
        // eslint-disable-next-line no-prototype-builtins
        const isTree = item.data[0].hasOwnProperty(item.childrenKey)
        if (isTree) {
          // 树状选择器
          item.pickerValue = item.current.map(i => i[item.valueKey])
        } else {
          // 单列选择：对象数组
          item.pickerValue = item.current?.[item.valueKey]
        }
      } else if (item.arrayType === 'string') {
        // 单列选择：字符串数组
        item.pickerValue = item.current
      } else if (item.arrayType === 'array') {
        const arrayType = checkArrayElementType(item.current)
        if (arrayType === 'object') {
          // 多列选择：对象数组
          item.pickerValue = item.current.map(i => i[item.valueKey])
        } else if (arrayType === 'string') {
          // 多列选择：字符串数组
          item.pickerValue = item.current
        }
      }
    }
  }

  // 调用自定义方法
  item?.[method]?.(value)
}

const form = $ref(null)
</script>

<template>
  <view class="p-20">
    <tn-form ref="form" :label-position="computedConfig.labelPosition ?? 'top'">
      <tn-form-item v-for="(item, index) in computedConfig.columns" :key="index" :label-position="item.labelPosition ?? computedConfig.labelPosition ?? 'top'" :rules="item.rules">
        <template #label>
          <text>{{ item.label }}</text>
        </template>
        <!-- 输入框 -->
        <tn-input
          v-if="item.componentType === 'input'"
          v-model="item.value"
          :placeholder="item.placeholder ?? `请输入${item.label}`"
          :text-align="item.textAlign ?? 'left'"
          :size="item.size ?? 'lg'"
          :type="item.type ?? 'text'"
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
          @change="invokeEventFunc(item, 'change', $event)"
          @confirm="invokeEventFunc(item, 'confirm', $event)"
          @cancel="invokeEventFunc(item, 'cancel', $event)"
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
      </tn-form-item>
    </tn-form>
  </view>
</template>
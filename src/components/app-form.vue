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
    if (!item.type) {
      // 没有指定类型，默认为输入框
      return { ...item, componentType: 'input' }
    }
    if (['text', 'number', 'idcard', 'digit', 'textarea', 'password', 'select'].includes(item.type)) {
      // 选择框类型
      if (item.type === 'select') {
        item.open = item.open ?? false // 控制Picker的显示与隐藏
        item.value = item.value ?? '' // 当前输入框显示的值，可以不指定，主要用于回显
        item.pickerValue = item.pickerValue ?? '' // 当前选择器的值，可以不指定，主要用于回显
        item.labelKey = item.labelKey ?? 'label' // 不指定的话，默认为 label
        item.valueKey = item.valueKey ?? 'value' // 不指定的话，默认为 value
        item.childrenKey = item.childrenKey ?? 'children'
        item.current = '' // 设置默认选中的值
        item.arrayType = checkArrayElementType(item.data)
      } else {
        item.value = item.value ?? '' // 当前输入框显示的值，可以不指定，主要用于回显
      }
      // 输入框类型
      return { ...item, componentType: 'input' }
    }
    return { ...item, componentType: item.type }
  })
  return config
})

// 从树中查找指定的对象
function findObjectByValue(tree, value, valueKey = 'value') {
  for (let i = 0; i < tree.length; i++) {
    if (tree[i][valueKey] === value) {
      return tree[i]
    }
    if (tree[i].children) {
      const result = findObjectByValue(tree[i].children, value, valueKey)
      if (result) {
        return result
      }
    }
  }
  return null
}

// 调用自定义方法
function invokeEventFunc(item, method, e) {
  // 选择框
  if (item.type === 'select') {
    if (checkElementType(e) === 'array') {
      // 多列选择器
      item.value = e
    } else {
      // 单列选择器
      if (method === 'click') {
        // 点击打开选择器，如果禁用则不弹出选择框
        if (item.disabled) {
          return
        }
        item.open = true
      } else if (method === 'confirm') {
        // 确定
        if (item.arrayType === 'object') {
          // 对象数组
          e = findObjectByValue(item.data, e)
          item.value = e[item.labelKey]
        } else if (item.arrayType === 'string') {
          // 字符串数组
          item.value = e
        }
        item.current = e
      } else if (method === 'cancel' || method === 'change') {
        // 取消，恢复上次被选中的值
        if (item.arrayType === 'object') {
        // 对象数组
          item.pickerValue = item.current?.[item.valueKey]
        } else if (item.arrayType === 'string') {
        // 字符串数组
          item.pickerValue = item.current
        }
      }
    }
  }

  // 调用自定义方法
  item?.[method]?.(e)
}

const form = $ref(null)
</script>

<template>
  <view class="p-20">
    <tn-form ref="form" :label-position="computedConfig.labelPosition || 'top'">
      <tn-form-item v-for="(item, index) in computedConfig.columns" :key="index" :label-position="item.labelPosition || 'top'" :rules="item.rules">
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
          @change="(value, index) => invokeEventFunc(item, 'change', { value, index })"
          @confirm="invokeEventFunc(item, 'confirm', $event)"
          @cancel="invokeEventFunc(item, 'cancel', $event)"
        />

      </tn-form-item>
    </tn-form>
  </view>
</template>

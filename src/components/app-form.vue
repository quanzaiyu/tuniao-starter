<script setup>
const props = defineProps({
  config: { type: Object, default: () => ({}) },
})

const computedConfig = initConfig(props.config)
function initConfig(config) {
  config.columns = config.columns.map(item => {
    if (!item.type) {
      return { ...item, componentType: 'input' }
    }
    if (['text', 'number', 'idcard', 'digit', 'textarea', 'password', 'select'].includes(item.type)) {
      return { ...item, componentType: 'input' }
    }
    return { ...item, componentType: item.type }
  })
  return config
}

function invokeEventFunc(item, filed, e) {
  item?.[filed]?.(e, item)
}

console.info(computedConfig)

const form = $ref(null)
</script>

<template>
  <view class="p-20">
    <tn-form ref="form" :label-position="computedConfig.labelPosition || 'top'">
      <tn-form-item v-for="(item, index) in computedConfig.columns" :key="index" :label-position="item.labelPosition || 'top'" :rules="item.rules">
        <template #label>
          <text>{{ item.label }}</text>
        </template>
        <tn-input
          v-if="item.componentType === 'input'"
          v-model="item.value"
          :placeholder="item.placeholder || `请输入${item.label}`"
          :text-align="item.textAlign || 'left'"
          :size="item.size || 'lg'"
          :type="item.type || 'text'"
          :disabled="item.disabled || false"
          :height="item.height"
          :placeholder-style="item.placeholderStyle"
          :border="item.border || true"
          :border-color="item.borderColor"
          :maxlength="item.maxlength"
          @input="invokeEventFunc(item, 'input', $event)"
        ></tn-input>
      </tn-form-item>
    </tn-form>
  </view>
</template>

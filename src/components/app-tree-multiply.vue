<script setup>
const props = defineProps({
  localdata: { type: Array, default: () => ([]) },
  value: { type: [Array, String], default: () => ([]) },
  placeholder: { type: String, default: '' },
  selectParent: { type: Boolean, default: false },
  selectRoot: { type: Boolean, default: false },
})

const tree = $ref(null)
const emit = defineEmits(['change'])

const valueNum = $computed(() => {
  if (typeof props.value === 'string') {
    return props.value?.split(',')?.length
  }
  return props.value?.length || 0
})

function showPicker() {
  tree._show()
}

function selectChange(e) {
  emit('change', e)
}
</script>

<template lang="pug">
view
  .h-70.w-full.border.border-solid.border-main-10.flex-between.text-main-4.pl-20.pr-10.rounded-10.box-border(@click="showPicker")
    view {{ valueNum ? '已选' + valueNum + '项' : placeholder || '请选择' }}
    .text-36.text-main-5.i-mdi-chevron-down
  comp-tree(
    ref="tree",
    :value="value",
    :range="localdata",
    :multiple="true",
    :select-parent="selectParent",
    :select-root="selectRoot",
    range-key="text",
    id-key="value",
    confirm-color="#4e8af7",
    @confirm="selectChange"
  )
</template>

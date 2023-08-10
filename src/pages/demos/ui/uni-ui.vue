<script setup lang="ts">
const layout = $ref(null)
const fab = $ref(null)

const pattern = $ref({
  color: '#7A7E83',
  backgroundColor: '#fff',
  selectedColor: '#007AFF',
  buttonColor: '#007AFF',
  iconColor: '#fff',
})

const content = $ref([
  {
    iconPath: '/static/image.png',
    selectedIconPath: '/static/image-active.png',
    text: '相册',
    active: false,
  },
  {
    iconPath: '/static/home.png',
    selectedIconPath: '/static/home-active.png',
    text: '首页',
    active: false,
  },
  {
    iconPath: '/static/star.png',
    selectedIconPath: '/static/star-active.png',
    text: '收藏',
    active: false,
  },
])

const horizontal = $ref('left')
const vertical = $ref('bottom')
const direction = $ref('horizontal')

function trigger(e) {
  console.info(e)
  this.content[e.index].active = !e.item.active
  uni.showModal({
    title: '提示',
    content: `您${this.content[e.index].active ? '选中了' : '取消了'}${e.item.text}`,
    success: function (res) {
      if (res.confirm) {
        console.info('用户点击确定')
      } else if (res.cancel) {
        console.info('用户点击取消')
      }
    },
  })
}

function fabClick() {
  uni.showToast({
    title: '点击了悬浮按钮',
    icon: 'none',
  })
}

</script>

<template>
  <Layout ref="layout" title="页面模板">
    <uni-fab
      ref="fab"
      :pattern="pattern"
      :content="content"
      :horizontal="horizontal"
      :vertical="vertical"
      :direction="direction"
      @trigger="trigger"
      @fabClick="fabClick"
    />
  </Layout>
</template>

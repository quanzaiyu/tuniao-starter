function setSkin(el, binding) {
  el.style.color = 'blue'
}

export const skin = {
  created: setSkin,
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated: setSkin,
  beforeUnmount() {},
  unmounted() {},
}

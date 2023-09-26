export default {
  data() {
    return {
    }
  },
  computed: {
    $oss() {
      return import.meta.env.VITE_APP_OSS || ''
    },
    $upload() {
      return import.meta.env.VITE_APP_UPLOAD || ''
    },
    $store() {
      return uni.$store
    },
    // 使用dayjs格式化日期时间
    $formatTime() {
      return (timeStr, format = 'YYYY-MM-DD') => {
        return dayjs(timeStr).format(format)
      }
    },
  },
  onLoad() {},
  onHide() {},
  methods: {
    go(path) {
      if (path) {
        nav.to(path)
      }
    },
  },
}

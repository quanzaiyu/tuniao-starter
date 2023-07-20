<template>
  <view class="basePageClass" :style="initAttr(config,'style',{})"
        :catchtouchmove="select.init || asFocus"
        @touchstart="touchStart" @touchend="touchEnd"
        :class="initAttr(config,'class','')">
    <navbar v-if="config.navbar" :bg-color="initNavbar('bgColor', undefined)"
            :text-color="initNavbar('textColor', undefined)"
            :frosted="initNavbar('frosted', false)"
            :opacity="initNavbar('opacity', 1)"
            :back-icon="initNavbar('backIcon', undefined)"
            :back-text="initNavbar('backText', undefined)"
            :home-icon="initNavbar('homeIcon', asFocus?'':undefined)"
            :bottom-shadow="initNavbar('bottomShadow', false)"
            :safe-area-inset-right="initNavbar('safeAreaInsetRight', true)"
            :center="initNavbar('center', true)"
            :before-back="navbarBeforeBack"
            :before-home="navbarBeforeHome"
            :index-url="initNavbar('indexUrl', indexUrl)"
            :fixed="initNavbar('fixed', true)"
            :placeholder="initNavbar('placeholder', true)"
            :z-index="initNavbar('zIndex', 20090)">
      <template v-slot:default>
        <slot name="navbarSlot">
          <text style="font-size: 32rpx;">
            {{ initNavbar('title', '') }}
          </text>
        </slot>
      </template>
    </navbar>
    <nav-index-button v-if="config.home" :indexPath="initHome('indexUrl',indexUrl)" :bottom="initHome('bottom',300)"
                      :right="initHome('right',75)"></nav-index-button>
    <loading v-if="config.loading"/>
    <tnPopup v-if="config.popup"
             v-model="config.popup.show"
             :open-direction="initPopup('openDirection','center')"
             :width="initPopup('width',undefined)"
             :height="initPopup('height',undefined)"
             :bg-color="initPopup('bgColor','#fff')"
             :radius="initPopup('radius',15)"
             :overlay="initPopup('overlay',true)"
             :overlay-opacity="initPopup('overlayOpacity',0.5)"
             :overlay-closeable="initPopup('overlayCloseable',true)"
             :close-btn="initPopup('closeBtn',false)"
             :close-btn-position="initPopup('closeBtnPosition','right-top')"
             :safe-area-inset-bottom="initPopup('safeAreaInsetBottom',true)"
             :z-index="initPopup('zIndex',30000)"
             :top="initPopup('top',undefined)"
             @open="initMethod(config.popup,'open')"
             @close="initMethod(config.popup,'close')">
      <slot name="popup"></slot>
      <template #closeBtn>
        <slot name="closePopupBtn"></slot>
      </template>
    </tnPopup>
    <baseUtils :config="config"/>
    <tn-sticky v-if="config.sticky"
               :enabled="initAttr(config.sticky,'enabled',true)"
               :offset-top="initAttr(config.sticky,'offsetTop',customBar)"
               :z-index="initAttr(config.sticky,'zIndex',10030)">
      <view
        :class="stickyShow?'custom-sticky-show':'custom-sticky-hide'"
        class="custom-sticky tn-gray-disabled_shadow tn-white_bg tn-pt-sm tn-pb-sm tn-border-bottom tn-gray-light_border">
        <view
          class="custom-sticky-search tn-pl-sm tn-pr-sm tn-flex tn-flex-center">
          <search-box v-model="likeName"
                      v-if="config.sticky.search"
                      style="flex: 1;background-color: #F8F8F8;border-radius: 60rpx 0 0 60rpx;"
                      :text-align="initAttr(config.sticky.search,'textAlign','left')"
                      :border="false"
                      :placeholder="initAttr(config.sticky.search,'placeholder')"
                      @search="search"
                      @clear="clear"
                      @blur="blur"
                      @focus="asFocus = true"
                      :focus="initAttr(config.sticky.search,'focus',false)"
                      :search-button="likeName!=oldLikeName"/>
        </view>
        <view class="custom-sticky-search-focus" :style="{height: `calc(100vh - ${customBar}rpx - 94rpx)`}"
              v-if="this.config?.sticky?.search.logKey && asFocus">
          <view v-if="this.config?.sticky?.search.asLog">
            <view class="tn-p-sm tn-flex tn-flex-start-between tn-pb-0">
              <view class="tn-text-sm tn-black_text tn-text-bold">
                <tn-icon name="history"></tn-icon>
                最近搜索
              </view>
              <view class="tn-grey_text tn-text-sm" @click="clearLogs">
                删除
                <tn-icon name="delete"></tn-icon>
              </view>
            </view>
            <view v-if="searchLogs.length>0" class="tn-flex tn-pb-lg tn-flex-wrap">
              <view class="tn-ml-sm tn-text-sm tn-mt-sm"
                    v-for="(log,index) in searchLogs"
                    :key="index + log"
                    @click="logClick(log)"
                    style="background-color: #F4F4F4;border-radius: 40rpx;color: #9C9C9C;padding: 15rpx 30rpx">
                #
                <text class="tn-text-sm" style="margin-left: 6rpx">{{ log }}</text>
              </view>
            </view>
            <view class="empty__item tn-pt-xl" v-else>
              <tn-empty mode="history" color="#9C9C9C"></tn-empty>
            </view>
          </view>
          <slot name="searchLog" :logs="searchLogs"></slot>
        </view>
        <slot v-else name="sticky"></slot>
      </view>
    </tn-sticky>
    <tn-overlay :show="asFocus"/>
    <tn-popup v-if="select.init" v-model="select.show" width="100vw" open-direction="bottom" height="900rpx"
              :overlay-closeable="false">
      <view v-if="select.show" class="tn-flex tn-flex-column" style="height: 100%;">
        <view class="tn-p-sm tn-flex tn-flex-center">
          <view class="tn-type-info_text" @click="selectMethod.close">取消</view>
          <view class="tn-flex-1 tn-flex tn-flex-center tn-text-lg tn-black_text tn-text-bold">
            {{ select.title ? select.title : '请选择数据' }}
          </view>
          <view class="tn-type-primary_text" @click="selectMethod.confirm()">
            确认
          </view>
        </view>
        <view class="tn-p-sm tn-border-bottom tn-gray-disabled_border">
          <search-box v-model="select.keyword"
                      :placeholder="select.placeholder"
                      style="flex: 1;background-color: #F8F8F8;border-radius: 60rpx 0 0 60rpx;"
                      text-align="center"
                      :border="true"
                      @search="selectMethod.restart"
                      :search-button="true"/>
        </view>
        <view class="tn-flex-1" style="overflow: hidden">
          <scroll-page @listData="selectMethod.listData" ref="scrollPage"
                       style="width: 100%;overflow: auto;height: calc(100% - 20rpx)">
            <view class="tn-border-bottom tn-ml-sm tn-mr-sm tn-p-sm tn-flex tn-flex-center-start "
                  v-if="select.data.length>0"
                  v-for="(item,index) in select.data"
                  :key="index"
                  @click="selectMethod.click(item)"
                  :class="select.value===item.value || (Array.isArray(select.value) && select.value.indexOf(item.value)>-1)?
                                          'tn-type-primary_border':'tn-gray-disabled_border'">
              <view class="tn-flex-start-center">
                <tn-checkbox-group
                  v-if="select.multiple"
                  v-model="select.value"
                  :size="select.size"
                  :active-color="select.activeColor"
                  :min="select.min"
                  :max="select.max"
                >
                  <tn-checkbox name="select" :label="item.value"></tn-checkbox>
                </tn-checkbox-group>
                <tn-radio v-else :label="item.value" v-model="select.value"/>
              </view>
              <slot name="selectSlot" :row="item">
                <view class="tn-flex-1">
                  {{ item.label }}
                </view>
              </slot>
            </view>
          </scroll-page>
        </view>
      </view>
    </tn-popup>
    <nav-right-button v-if="asScroll" icon="totop-simple" @click="scrollTop"/>
    <slot/>
  </view>
</template>

<script>
  import util from '@/utils/util'
  import navbar from '@tuniao/tnui-vue3-uniapp/components/navbar/src/navbar.vue'
  import loading from './loading'
  import tnPopup from '@tuniao/tnui-vue3-uniapp/components/popup/src/popup.vue'
  import baseUtils from './base-utils'
  import tnSticky from '@tuniao/tnui-vue3-uniapp/components/sticky/src/sticky.vue'
  import searchBox from '@tuniao/tnui-vue3-uniapp/components/search-box/src/search-box.vue'
  import tnOverlay from '@tuniao/tnui-vue3-uniapp/components/overlay/src/overlay.vue'
  import {set, get, remove} from '@/utils/cookie'
  import tnEmpty from '@tuniao/tnui-vue3-uniapp/components/empty/src/empty.vue'
  import NavRightButton from "./nav-right-button";
  import tnRadio from '@tuniao/tnui-vue3-uniapp/components/radio/src/radio.vue'
  import tnCheckboxGroup from '@tuniao/tnui-vue3-uniapp/components/checkbox/src/checkbox-group.vue'
  import tnCheckbox from '@tuniao/tnui-vue3-uniapp/components/checkbox/src/checkbox.vue'
  import scrollPage from './scroll-page'

  export default {
    props: {
      config: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    components: {
      NavRightButton,
      navbar, loading, tnPopup, baseUtils, tnSticky, searchBox, tnOverlay, tnEmpty,
      tnRadio, tnCheckbox, tnCheckboxGroup, scrollPage
    },
    name: "",
    data() {
      let that = this
      return {
        select: {},
        defaultSelect: {
          init: false,
          show: false,
          value: '',
          values: {},
          data: [],
          keyword: ''
        },
        selectMethod: {
          restart() {
            that.select.data.length = 0
            that.$refs.scrollPage.restart()
          },
          listData(val, none) {
            if (that.select.listData) {
              that.select.listData(that.select.keyword, val, (obj) => {
                if (Array.isArray(obj)) {
                  console.log(that.select.data.length)
                  that.select.data.push(...obj)
                  none(obj.length > 0 ? -1 : 0)
                } else {
                  let {data, total} = obj
                  that.select.data.push(...data)
                  none(total)
                }
              })
            } else {
              none(0)
            }

          },
          click(row) {
            if (that.select.multiple) {
              let index = that.select.value.indexOf(row.value)
              if (index > -1) {
                that.select.value.splice(index, 1)
                that.select.values.splice(index, 1)
              } else {
                that.select.value.push(row.value)
                that.select.values.push(row)
              }
            } else {
              that.select.value = row.value
              that.select.values = row
            }
          },
          getData() {
            return that.select.data.filter(v => {
              if (that.select.keyword) {
                return v.label.indexOf(that.select.keyword) > -1
              }
              return true
            })
          },
          confirm() {
            if (that.select.resolve) {
              that.select.resolve({
                value: that.select.value,
                values: that.select.values
              })
            }
            this.close()
          },
          close() {
            that.select = util.deepClone(that.defaultSelect)
            if (that.select.close) {
              that.select.close()
            }
          },
        },
        customBar: 0,
        showPopup: true,
        indexUrl: '/pages/index/index',
        likeName: '',
        oldLikeName: '',
        asBlur: true,
        asFocus: false,
        touchStartX: 0,
        touchStartY: 0,
        stickyShow: true,
        showOverlay: true,
        searchLogs: [],
        asScroll: false,
        stickyShake: {
          time: 1000,
          date: null,
          start(bool) {
            let now = (new Date()).getTime()
            if (bool !== that.stickyShow && !this.date || now - this.date > this.time) {
              that.stickyShow = bool
              this.date = now
            }
          }
        }
      }
    },
    created() {
      this.getNavbarHeight()
      this.initPageScroll()
      if (this.config?.sticky?.search.logKey) {
        let logs = get(this.config?.sticky?.search.logKey)
        this.searchLogs = logs ? logs : []
      }
      this.initSelect()
    },
    methods: {
      clearLogs() {
        uni.showModal({
          title: '温馨提示',
          content: "是否清除搜索记录",
          confirmColor: '#01beff',
          cancelColor: '#ff444f',
          cancelText: '取  消',
          confirmText: '确  认',
          success(res) {
            if (res.confirm) {
              this.searchLogs.length = 0
              remove(this.config?.sticky?.search.logKey)
            }
          },
          fail() {
            resolve(false)
          },
        });
      },
      scrollTop() {
        uni.pageScrollTo({
          scrollTop: 0,
          duration: 500
        })
        this.stickyShow = true
      },
      setLogs(val) {
        if (this.config?.sticky?.search.logKey && this.config?.sticky?.search.asLog && val) {
          let logs = this.searchLogs.filter(v => v != val)
          logs.unshift(val)
          this.searchLogs = logs
          set(this.config?.sticky?.search.logKey, logs)
        }
      },
      search(val) {
        this.asBlur = false
        if (this.config.sticky.search.query) {
          this.config.sticky.search.query(val)
          this.setLogs(val)
          this.asFocus = false
        }
        this.oldLikeName = val
      },
      logClick(val) {
        this.likeName = val
        this.search(val)
      },
      clear() {
        this.asBlur = false
      },
      blur() {
        setTimeout(() => {
          if (this.asBlur) {
            this.likeName = this.oldLikeName
            this.asFocus = false
          }
          this.asBlur = true
        }, 300)
      },
      initPageScroll() {
        if (!this.config.onScroll) {
          this.config.onScroll = (val) => {
            this.asScroll = val >= 600
          }
        }
      },
      getNavbarHeight() {
        uni.getSystemInfo({
          success: (e) => {
            // this.compareVersion(e.SDKVersion, '2.5.0')
            let statusBar = 0  //状态栏高度
            let customBar = 0  // 状态栏高度 + 导航栏高度
            let navbar = 0 // 自定义标题与胶囊对齐高度

            // #ifdef MP
            statusBar = e.statusBarHeight
            customBar = e.statusBarHeight + 45
            if (e.platform === 'android') {
              customBar = e.statusBarHeight + 50
            }
            // #endif

            // #ifdef MP-WEIXIN
            statusBar = e.statusBarHeight
            const custom = wx.getMenuButtonBoundingClientRect()
            customBar = custom.bottom + custom.top - e.statusBarHeight
            navbar = (custom.top - e.statusBarHeight) * 2 + custom.height
            // #endif

            // #ifdef MP-ALIPAY
            statusBar = e.statusBarHeight
            customBar = e.statusBarHeight + e.titleBarHeight
            // #endif

            // #ifdef APP-PLUS
            statusBar = e.statusBarHeight
            customBar = e.statusBarHeight + 45
            // #endif

            // #ifdef H5
            statusBar = 0
            customBar = e.statusBarHeight + 45
            // #endif
            this.customBar = customBar
          }
        })
      },
      async navbarBeforeBack() {
        if (this.asFocus) {
          this.asFocus = false
          return false
        }
        if (this.config.navbar && this.config.navbar.hasOwnProperty('beforeBack') && this.config.navbar['beforeBack']) {
          return await this.config.navbar['beforeBack']()
        }
        return true
      },
      async navbarBeforeHome() {
        if (this.config.navbar && this.config.navbar.hasOwnProperty('beforeHome') && this.config.navbar['beforeHome']) {
          return await this.config.navbar['beforeHome']()
        }
        return true
      },
      // 初始化方法点击
      initMethod(item, filed, values) {
        if (item && item.hasOwnProperty(filed) && item[filed]) {
          values = values ? values : []
          values.push(item)
          values.push(this.config)
          item[filed](...values)
        }
      },
      initPopup(filed, defaultValue) {
        return this.initAttr(this.config.popup, filed, defaultValue)
      },
      initNavbar(filed, defaultValue) {
        return this.initAttr(this.config.navbar, filed, defaultValue)
      },
      initHome(filed, defaultValue) {
        return this.initAttr(this.config.home, filed, defaultValue)
      },
      initAttr(item, filed, defaultValue, values) {
        if (item && item.hasOwnProperty(filed) && item[filed] !== undefined) {
          values = values ? values : []
          values.push(item)
          values.push(this.config)
          return typeof item[filed] === 'function' ? item[filed](...values) : item[filed]
        }
        return defaultValue
      },
      /**
       * 触摸开始
       **/
      touchStart(e) {
        this.touchStartX = e.touches[0].clientX;
        this.touchStartY = e.touches[0].clientY;
      },
      touchmove() {
        return false
      },
      /**
       * 触摸结束
       **/
      touchEnd(e) {
        if (this.select.init || this.asFocus) {
          return
        }
        let deltaX = e.changedTouches[0].clientX - this.touchStartX;
        let deltaY = e.changedTouches[0].clientY - this.touchStartY;
        if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY)) {
          if (deltaX >= 0) {
            // 从左往右滑
          } else {
            // 从右往左滑
          }
        } else if (Math.abs(deltaY) > 0 && Math.abs(deltaX) < Math.abs(deltaY)) {
          if (deltaY < -60) {
            // 上滑
            this.stickyShow = false
          } else if (deltaY > 0) {
            // 下滑
            // 上滑
            this.stickyShow = true
          }
        } else {
          // 可能是误触
        }
      },
      initSelect() {
        let that = this
        if (!this.config.$select) {
          this.config.$select = function (option = {}) {
            that.select = Object.assign(util.deepClone(that.defaultSelect), option)
            if (that.select.multiple) {
              that.select.values = []
              if (!that.select.value) {
                that.select.value = []
              }
            }
            that.select.init = true
            return new Promise((resolve, reject) => {
              that.select.resolve = resolve
              that.select.reject = reject
              that.$nextTick(() => {
                that.select.show = true
              })
            })
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  $animation-time: 0.25s;
  $animation-delay: 0.15s;
  /* 入场动画 start */
  @keyframes sing-animation {
    0% {
      transform: scaleY(0);
    }
    100% {
      transform: scaleY(1);
    }
  }

  /* 出场动画 start */
  @keyframes out-animation {
    0% {
      transform: scaleY(1);
    }
    100% {
      transform: scaleY(0);
    }
  }

  .custom-sticky {
    width: 100%;
    transform-origin: center top;

    &-search {
      width: 100%;
    }

    &-search-focus {
      width: 100%;
      position: absolute;
      background-color: white;
      transform-origin: center top;
      transform: scaleY(0);
      animation: sing-animation $animation-time $animation-delay ease forwards;
    }
  }

  .custom-sticky-show {
    transform: scaleY(0);
    animation: sing-animation $animation-time $animation-delay ease forwards;
  }

  .custom-sticky-hide {
    animation: out-animation $animation-time $animation-delay ease forwards;
  }
</style>

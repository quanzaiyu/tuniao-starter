<template>
    <view
            class="page-item-content">
        <view :class="asRemove?'page-item-content-delete':''"
              class="page-item-block tn-mt-sm tn-ml-sm tn-mr-sm tn-pl-sm tn-pr-sm tn-white_bg tn-radius"
              @click="click(null)">
            <view>
                <slot name="rowTop">
                </slot>
                <view v-for="(item,index2) in config.fileds.filter(v=>!initAttr(v,'hide',false,[row[v.prop]]))"
                      :key="item.prop + index2">
                    <view v-if="!item.slot"
                          class="page-item-row tn-flex tn-flex-center-start tn-text">
                        <view :class="initAttr(item,'labelClass',initConfigAttr('labelClass',''),[row[item.prop]])"
                              class="page-item-row-label tn-gray_text" :style="Object.assign(initAttr(item,'labelStyle',initConfigAttr('labelStyle',{}),[row[item.prop]]),{
								width: initAttr(item,'labelWidth',initConfigAttr('labelWidth','160rpx'),[row[item.prop]])
							})">
                            <text :key="index"
                                  v-for="(label,index) in Array.from(initAttr(item,'label','',[row[item.prop]]))">
                                {{ label }}
                            </text>
                        </view>
                        <view :class="initAttr(item,'valueClass',initConfigAttr('valueClass',''),[row[item.prop]])"
                              class="tn-black_text tn-text-ellipsis-1 tn-flex-1 tn-ml-sm"
                              :style="initAttr(item,'valueStyle',initConfigAttr('valueStyle',{}),[row[item.prop]])">
                            {{ filedFilter(item) }}
                        </view>
                    </view>
                    <slot v-else :name="item.slot">
                    </slot>
                </view>
                <slot name="rowInfo">
                </slot>
            </view>
            <view v-if="config.buttons && config.buttons.filter(v=>!initAttr(v,'hide',false)).length>0">
                <view class="bottom-button tn-gray-disabled_border tn-border-top tn-flex tn-fl tn-flex-center-start">
                    <view v-for="(button,index) in config.buttons.filter(v=>!initAttr(v,'hide',false))"
                          @click.stop="click(button)"
                          class="blue bottom-button-block tn-flex tn-flex-center-start tn-flex-1"
                          style="justify-content: center;position: relative">
                        <view v-if="index>0 && !button.slot"
                              style="width: 1px;height: 50rpx;background-color: #e4e7ed;position: absolute;left: 0"></view>
                        <tnButton width="100%"
                                  @click="click(button)"
                                  :text-color="initAttr(button,'color','#01beff')"
                                  v-if="!button.slot" :class="initAttr(button,'class','')"
                                  :text="initAttr(button,'text',true)"
                                  :type="initAttr(button,'type','info')"
                                  :shape="initAttr(button,'shape',undefined)"
                                  :size="initAttr(button,'size',undefined)"
                                  :plain="initAttr(button,'plain',undefined)"
                                  debounce
                                  :disabled="initAttr(button,'disabled',false)"
                                  :loading="loading || initAttr(button,'loading',false)">
                            {{ initAttr(button, 'name', '') }}
                        </tnButton>
                        <slot v-if="button.slot" :name="button.slot" :row="row">
                        </slot>
                    </view>
                </view>
            </view>
            <slot name="bottom" :row="row">
            </slot>
        </view>
    </view>
</template>

<script>
    import tnButton from '@tuniao/tnui-vue3-uniapp/components/button/src/button.vue'
    import dayjs from "dayjs";

    export default {
        components: {tnButton},
        name: 'item',
        props: {
            row: {
                type: Object,
                default() {
                    return {}
                }
            },
            config: {
                type: Object,
                default() {
                    return {
                        fileds: []
                    }
                }
            }
        },
        data() {
            return {
                asRemove: false,
                loading: false
            }
        },
        methods: {
            click(button) {
                if (!this.loading) {
                    if (button) {
                        if (button.detail) {
                            this.toDetail(button.readonly)
                        } else {
                            if (button.click) {
                                this.loading = true
                                button.click(this.row, () => {
                                    this.loading = false
                                }, () => {
                                    this.asRemove = true
                                    setTimeout(() => {
                                        this.row.$remove = true
                                        this.asRemove = false
                                        this.loading = false
                                    }, 1500)
                                })
                            }
                        }
                    } else {
                        if (this.config.click) {
                            this.config.click(this.row, this.config)
                        } else {
                            this.toDetail(true)
                        }
                    }
                }
            },
            toDetail(readonly) {
                let url = this.config.detail
                if (url) {
                    uni.navigateTo({
                        url,
                        data: {
                            ...this.row,
                            readonly: readonly ? true : false
                        },

                    })
                }
            },
            // 初始化config属性
            initConfigAttr(filed, defaultValue, values) {
                if (this.config.hasOwnProperty(filed) && this.config[filed] !== undefined) {
                    values = values ? values : []
                    values.push(this.row)
                    values.push(this.config)
                    return typeof this.config[filed] === 'function' ? this.config[filed](...values) : this.config[filed]
                }
                return defaultValue
            },
            // 初始化其他属性
            initAttr(item, filed, defaultValue, values) {
                if (item && item.hasOwnProperty(filed) && item[filed] !== undefined) {
                    values = values ? values : []
                    values.push(this.row)
                    values.push(item)
                    values.push(this.config)
                    return typeof item[filed] === 'function' ? item[filed](...values) : item[filed]
                }
                return defaultValue
            },
            // 控制数据过滤事件
            filedFilter(item) {
                if (this.row[item.prop] == null || this.row[item.prop] == undefined) {
                    return ''
                }
                // eslint-disable-next-line no-prototype-builtins
                if (item.hasOwnProperty('time')) {
                    if (this.row[item.prop]) {
                        if (item.time == 'date') {
                            return dayjs(this.row[item.prop]).format('YYYY-MM-dd')
                        } else if (item.time == 'time') {
                            return dayjs(this.row[item.prop]).format('HH:mm:ss')
                        } else if (item.time == 'datetime') {
                            return dayjs(this.row[item.prop]).format('YYYY-MM-dd HH:mm:ss')
                        }
                        return dayjs(this.row[item.prop]).format(item.time)
                    } else {
                        return ''
                    }
                }
                if (item.filedFilter) {
                    return item.filedFilter(this.row[item.prop], this.row, item, this.config)
                }
                return this.row[item.prop]
            }
        }
    }
</script>

<style scoped lang="scss">
  /* 退场动画 start */
  @keyframes remove-animation {
    0% {
      transform: scaleY(1) translateX(0);
    }
    100% {
      transform: scaleY(0) translateX(-100vw);
      margin-top: -100%;
    }
  }

  .page-item-content-delete {
    animation: remove-animation 1s 1s ease-out forwards;
  }

  .page-item-content {
    width: 100%;
    overflow: hidden;

    .page-item-block {
      overflow: hidden;
      transform-origin: center top;
      transform: scaleY(1);

      .page-item-row {
        min-height: 60rpx;

        .page-item-row-label {
          display: flex;
          justify-content: space-between
        }
      }

      .bottom-button {
        min-height: 70rpx;

        .bottom-button-block {
          height: 100%;
        }

        .bottom-button-row {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 30rpx;
        }
      }
    }
  }
</style>

<template>
    <view v-if="status!=2 || config.data.length>0">
        <view v-for="(item,index) in config.data" :key="index">
            <view v-if="!item.$remove">
                <slot :row="item">
                </slot>
            </view>
        </view>
        <!-- 分页烂模块 -->
        <view v-if="showLoading" class="tn-mt">
            <load-more color="#838383" size="32" :text="loadText" @click="search" :status="statusJson[status]"/>
        </view>
    </view>
    <view class="empty__item tn-pt-xl" v-else>
        <tn-empty :mode="initAttr('empty','search')" color="#838383" size="100"></tn-empty>
    </view>
    <view class="tn-flex tn-flex-center-between"
          v-if="config.buttons && config.buttons.filter(v=>!initAttrItem(v,'hide',false)).length>0"
          style="height: 120rpx;position: fixed;bottom: 20rpx;left: 20rpx;width: calc(100% - 40rpx);z-index: 1001;overflow: hidden">
        <view class="tn-flex-1 tn-flex tn-flex-center"
              @click="buttonClick(button)"
              v-for="(button,index) in config.buttons.filter(v=>!initAttrItem(v,'hide',false))" :key="index">
            <view style="width: calc(100% - 20rpx);"
                  class="tn-text-2xl tn-white_text tn-radius tn-text-center tn-pt-sm  tn-pb-sm"
                  :class="button.class">
                <tn-icon :name="button.icon"/>
                {{ button.name }}
            </view>
        </view>
    </view>
    <view style="height: 140rpx"
          v-if="config.buttons && config.buttons.filter(v=>!initAttrItem(v,'hide',false)).length>0"></view>
</template>

<script>
    import loadMore from '@tuniao/tnui-vue3-uniapp/components/loadmore/src/loadmore.vue'
    import tnEmpty from '@tuniao/tnui-vue3-uniapp/components/empty/src/empty.vue'

    export default {
        components: {loadMore, tnEmpty},
        name: "custom-page",
        props: {
            config: {
                type: Object,
                default() {
                    return {}
                }
            }
        },
        data() {
            let that = this
            return {
                statusJson: {
                    1: 'loadmore',
                    0: 'loading',
                    2: 'nomore'
                },
                // 0加载中 1待加载 2加载完成
                status: 1,
                query: {},
                showLoading: true,
                loadText: {
                    loadmore: '点击或下拉加载',
                    loading: '快速加载中...',
                    nomore: '已加载完成'
                }
            };
        },
        created() {
            this.init()
        },
        methods: {
            buttonClick(button) {
                if (button.url) {
                    uni.navigateTo({
                        url: button.url
                    })
                } else {
                    if (button.click) {
                        button.click(this.config)
                    }
                }
            },
            search() {
                if (this.status == 1 && this.config.listData) {
                    this.status = 0
                    let obj = this.config.listData(JSON.parse(JSON.stringify(this.config.queryParam)), this.config, (data,
                                                                                                                     total) => {
                        this.susses({
                            data: data,
                            total: total
                        })
                    })
                    if (Object.prototype.toString.call(obj) === "[object Promise]") {
                        obj.then(val => {
                            this.susses(val)
                        })
                    } else {
                        if (obj) {
                            this.susses(obj)
                        }
                    }
                }
            },
            restart() {
                this.config.data.length = 0
                this.config.queryParam.current = 1
                this.status = 1
                this.search()
            },
            init() {
                if (!this.config.data) {
                    this.$set(this.config, 'data', [])
                }
                if (!this.config.total) {
                    this.$set(this.config, 'total', 0)
                }
                if (!this.config.queryParam) {
                    this.$set(this.config, 'queryParam', {
                        current: 1,
                        size: 10
                    })
                }
                if (!this.config.queryParam.hasOwnProperty('current')) {
                    this.$set(this.config.queryParam, 'current', 1)
                }
                if (!this.config.queryParam.hasOwnProperty('size')) {
                    this.$set(this.config.queryParam, 'size', 10)
                }
                this.showLoading = this.initAttr('showLoading', true)
                let that = this
                this.search()
                this.config.restart = () => {
                    that.restart()
                }
                this.config.search = () => {
                    that.search()
                }
            },
            initAttrItem(item, filed, defaultValue, values) {
                if (item && item.hasOwnProperty(filed) && item[filed] !== undefined) {
                    values = values ? values : []
                    values.push(item)
                    values.push(this.config)
                    return typeof item[filed] === 'function' ? item[filed](...values) : item[filed]
                }
                return defaultValue
            },
            initAttr(filed,
                     defaultValue) {
                if (this.config.hasOwnProperty(filed)) {
                    return typeof this.config[filed] === 'function' ? this.config[filed](this.config) : this.config[filed]
                }
                return defaultValue
            },
            // 请求成功
            susses(json) {
                if (json) {
                    if (Array.isArray(json)) {
                        this.config.data.push(...json)
                    } else if (typeof json == 'object') {
                        let {
                            data,
                            total
                        } = json ? json : {}
                        if (data) {
                            data.map(v => v.$remove = false)
                            this.config.data.push(...data)
                        }
                        if (this.config.queryParam.current * this.config.queryParam.size < total) {
                            this.status = 1
                            this.config.queryParam.current++
                        } else {
                            this.status = 2
                        }
                    }
                }
            }
        }
    }
</script>

<style scoped>
</style>

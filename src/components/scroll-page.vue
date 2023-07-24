<template>
    <scroll-view scroll-with-animation @scrolltolower="search"
                 style="height: 100%;width: 100%"
                 scroll-y>
        <view v-if="status!=2 || total>0">
            <slot>
            </slot>
            <!-- 分页烂模块 -->
            <view v-if="showLoading" class="tn-mt">
                <load-more color="#838383" size="32" :text="loadText" @click="search" :status="statusJson[status]"/>
            </view>
        </view>
        <view class="empty__item tn-pt-xl" v-else>
            <tn-empty mode="search" color="#838383" size="100"></tn-empty>
        </view>
    </scroll-view>
</template>

<script>
    import loadMore from '@tuniao/tnui-vue3-uniapp/components/loadmore/src/loadmore.vue'
    import tnEmpty from '@tuniao/tnui-vue3-uniapp/components/empty/src/empty.vue'

    export default {
        components: {loadMore, tnEmpty},
        name: "scroll-page",
        props: {
            size: {
                type: Number,
                default: 10
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
                loadText: {
                    loadmore: '点击或下拉加载',
                    loading: '快速加载中...',
                    nomore: '已加载完成'
                },
                total: 0,
                current: 1,
                showLoading: true
            };
        },
        created() {
            this.search()
        },
        methods: {
            search() {
                if (this.status == 1) {
                    this.status = 0
                    this.$emit('listData', {
                        current: this.current,
                        size: this.size
                    }, (total) => {
                        if (total == -1) {
                            this.showLoading = false
                            this.status = 2
                            this.total = 10
                        } else {
                            this.total = total
                            if (this.current * this.size < total) {
                                this.status = 1
                                this.current++
                            } else {
                                this.status = 2
                            }
                        }
                    })
                }
            },
            restart() {
                this.current = 1
                this.status = 1
                this.search()
            }
        }
    }
</script>

<style scoped>
    .page-not-data {
        width: 100%;
        padding-top: 20%;
        text-align: center;
        font-size: 30vw;
    }
</style>

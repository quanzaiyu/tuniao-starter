<template>
    <base-page :config="pageConfig">
<!--        <base-form :config="formConfig" v-if="!pageConfig.loading">-->
      <!--        </base-form>-->
    </base-page>
</template>

<script>
    // import baseForm from '@/components/base-form'
    import util from '@/utils/util'

    export default {
        // components: {baseForm},
        data() {
            let that = this
            return {
                currentTabbar: 0,
                pageConfig: {
                    loading: true,
                    style: util.formStyle,
                    navbar: util.navbar('新增用户'),
                    sticky: {
                        search: {
                            logKey: 'homeSearch',
                            asLog: true,
                            query(val) {
                                that.listConfig.queryParam.name = val
                                that.listConfig.restart()
                            }
                        }
                    }
                },
                value: [],
                options: [],
                formConfig: {
                    buttons: [
                        {
                            prop: 'submit',
                            async click(bean) {
                                let data = bean.id ? await updateById(bean) : await save(bean)
                                if (data) {
                                    that.$toast("保存成功")
                                    that.pageConfig.loading = true
                                    that.formConfig.bean = data
                                    that.formConfig.readonly = true
                                    that.none()
                                }
                            }
                        }, {
                            prop: 'reset'
                        }, {
                            prop: 'update'
                        }
                    ],
                    readonly: false,
                    bean: {name: [1, 2]},
                    values: [
                        {
                            label: '选择器测试',
                            prop: 'name',
                            types: 'select',
                            rule: {
                                required: true,
                            },
                            click(val, bean, restart) {
                                that.pageConfig.$select({
                                    value: val,
                                    multiple: true,
                                    listData(val, queryParam, resolve) {
                                        setTimeout(() => {
                                            let data = []
                                            for (let i = queryParam.size * (queryParam.current - 1); i < queryParam.size * queryParam.current; i++) {
                                                data.push({
                                                    label: '数字' + i + val,
                                                    value: i
                                                })
                                            }
                                            resolve({
                                                data,
                                                total: 30
                                            })
                                        }, 2000)
                                    }
                                }).then(({value, values}) => {
                                    bean.name = value
                                    restart()
                                })
                            },
                            options() {
                                return that.options
                            },
                            filedFilter(val, item) {
                                let label = ''
                                if (that.options && that.options.length > 0) {
                                    if (val) {
                                        let values = that.options.filter(v => val.indexOf(v.value) > -1)
                                        label = values.map(v => {
                                            return v.label
                                        }).join("，")
                                    }
                                }
                                return label
                            }
                        }, {
                            label: '姓名',
                            prop: 'name',
                            rule: {
                                required: true,
                            }
                        },
                        {
                            label: '身份证号', prop: 'card', rule: {
                                required: true,
                            }
                        },
                        {
                            label: '联系电话', prop: 'phone', rule: {
                                required: true,
                            }, type: 'number'
                        },
                        {
                            label: '出生日期',
                            prop: 'date',
                            rule: {
                                required: true,
                            },
                            types: 'select',
                            date: {
                                mode: 'date'
                            }
                        },
                        {
                            label: '电子邮箱', prop: 'email', rule: {
                                required: true,
                            }, type: 'number'
                        },
                        {
                            label: '住址', prop: 'address'
                        },
                        {
                            label: '年龄', prop: 'age', rule: {
                                required: true,
                            }, types: 'number', min: 16, max: 100
                        },
                        {
                            label: '性别', prop: 'number',
                            rule: {}, types: 'radio',
                            options: [{
                                label: '男',
                                value: 1,
                                icon: 'sex-male'
                            }, {
                                label: "女",
                                value: 2,
                                icon: 'sex-female'
                            }, {
                                label: '未知',
                                value: 3,
                                icon: 'sex'
                            }]
                        },
                        {
                            label: '是否注册', prop: 'asZc',
                            rule: {}, types: 'switch',
                            inactiveText: "否",
                            activeText: '是'
                        },
                        {
                            label: '爱好', prop: 'checkbox',
                            rule: {}, types: 'checkbox',
                            labelLeft: true,
                            options: [{
                                label: '游戏',
                                value: 1,
                                icon: 'game-fill'
                            }, {
                                label: "游泳",
                                value: 2,
                                icon: 'sport-swim'
                            }, {
                                label: "骑车",
                                value: 3,
                                icon: 'sport-cycle'
                            }, {
                                label: "跑步",
                                value: 4,
                                icon: 'sport-run'
                            }, {
                                label: '生物',
                                value: 5,
                                icon: 'biology'
                            }, {
                                label: '化学',
                                value: 6,
                                icon: 'chemistry'
                            }]
                        },
                        {
                            label: '旅游图片',
                            prop: 'images',
                            types: 'images',
                            type: 'textarea'
                        },
                        {
                            label: '身份证', prop: 'card',
                            rule: {}, types: 'images', limit: 1, tipTitle: '上传身份证', rightLabel: '清空',
                            rightLabelIcon: 'delete', rightLabelClick(val, bean, item) {
                                item.$clearImages(true)
                            }
                        },
                        {
                            group: true, prop: 'user', values: [
                                {label: '个人介绍', prop: 'remark', type: 'textarea'},
                            ]
                        },
                    ]
                }
            }
        },
        onLoad(option) {
            for (let i = 0; i < 100; i++) {
                this.options.push({
                    label: '数字' + i,
                    value: i
                })
            }
            console.log(this.options)
            console.log(this.pageConfig.loading)
            this.none()
        },
        mounted() {
        },
        methods: {
            clickCalendar() {
            },
            none() {
                this.$nextTick(() => {
                    this.pageConfig.loading = false
                })
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>

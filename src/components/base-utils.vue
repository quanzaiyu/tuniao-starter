<template>
    <tn-picker
            v-if="picker.init"
            v-model:open="picker.show"
            v-model="picker.value"
            :label-key="picker.labelKey"
            :value-key="picker.valueKey"
            :children-key="picker.childrenKey"
            :show-cancel="picker.showCancel"
            :cancel-text="picker.cancelText"
            :cancel-color="picker.cancelColor"
            :show-confirm="picker.showConfirm"
            :confirm-text="picker.confirmText"
            :confirm-color="picker.confirmColor"
            :mask="picker.mask"
            :z-index="picker.zIndex"
            :data="picker.data"
            @confirm="pickerMethod.confirm"
            @change="pickerMethod.change"
            @cancel="pickerMethod.cancel"
            @close="pickerMethod.close"/>

    <tn-date-time-picker
            v-if="datePicker.init"
            v-model:open="datePicker.show"
            v-model="datePicker.value"
            :mode="datePicker.mode"
            :min-year="datePicker.minYear"
            :max-year="datePicker.maxYear"
            :min-time="datePicker.minTime"
            :max-time="datePicker.maxTime"
            :show-cancel="datePicker.showCancel"
            :cancel-text="datePicker.canceText"
            :cancel-color="datePicker.cancelColor"
            :show-confirm="datePicker.showConfirm"
            :confirm-text="datePicker.confirmText"
            :confirm-color="datePicker.confirmColor"
            :mask="datePicker.mask"
            :z-index="datePicker.zIndex"
            @confirm="datePickerMethod.confirm"
            @change="datePickerMethod.change"
            @cancel="datePickerMethod.cancel"
            @close="datePickerMethod.close"/>
    <tn-region-picker
            v-if="regionPicker.init"
            v-model:open="regionPicker.show"
            v-model="regionPicker.value"
            :show-cancel="regionPicker.showCancel"
            :cancel-text="regionPicker.canceText"
            :cancel-color="regionPicker.cancelColor"
            :show-confirm="regionPicker.showConfirm"
            :confirm-text="regionPicker.confirmText"
            :confirm-color="regionPicker.confirmColor"
            :z-index="regionPicker.zIndex"
            @confirm="regionPickerMethod.confirm"
            @change="regionPickerMethod.change"
            @cancel="regionPickerMethod.cancel"
            @close="regionPickerMethod.close"
    />
    <tn-popup v-if="calendar.init" v-model="calendar.show" width="100vw" open-direction="bottom" height="850rpx">
        <view style="width: 100%;height: 730rpx">
            <tn-calendar
                    v-model:open="calendar.show"
                    v-model="calendar.value"
                    :mode="calendar.mode"
                    :min-date="calendar.minDate"
                    :max-date="calendar.maxDate"
                    :active-bg-color="calendar.activeBgColor"
                    :actice-text-color="calendar.acticeTextColor"
                    :range-bg-color="calendar.rangeBgColor"
                    :range-text-color="calendar.rangeTextColor"
                    :allow-change-year="calendar.allowChangeYear"
                    :allow-change-month="calendar.allowChangeMonth"
                    :show-lunar="calendar.showLunar"
                    :range-start-desc="calendar.rangeStartDesc"
                    @change="regionCalendarMethod.change"
                    :range-end-desc="calendar.rangeEndDesc"/>
        </view>
        <view class="tn-text-center tn-p-sm tn-text-lg tn-type-primary_bg tn-radius tn-m-sm tn-ml-xl tn-mr-xl"
              @click="regionCalendarMethod.confirm(calendar.value)">
            选择所选日期
        </view>
    </tn-popup>

</template>

<script>
    import tnPicker from '@tuniao/tnui-vue3-uniapp/components/picker/src/picker.vue'
    import tnDateTimePicker from '@tuniao/tnui-vue3-uniapp/components/date-time-picker/src/date-time-picker.vue'
    import tnRegionPicker from '@tuniao/tnui-vue3-uniapp/components/region-picker/src/region-picker.vue'
    import tnCalendar from '@tuniao/tnui-vue3-uniapp/components/calendar/src/calendar.vue'
    import tnPopup from "@tuniao/tnui-vue3-uniapp/components/popup/src/popup.vue";
    import dayjs from 'dayjs'
    import tnRadioGroup from '@tuniao/tnui-vue3-uniapp/components/radio/src/radio-group.vue'

    export default {
        name: "",
        components: {
            tnPicker, tnDateTimePicker, tnRegionPicker, tnCalendar, tnPopup,
            tnRadioGroup
        },
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
                dateFormat: "YYYY-MM-DD HH:mm:ss",
                defaultPicker: {
                    value: '',
                    show: false,
                    data: [],
                    init: false,
                    mask: true
                },
                picker: {},
                pickerMethod: {
                    confirm(value) {
                        if (that.picker.resolve) {
                            that.picker.resolve(value)
                        }
                    },
                    change(value) {
                        if (that.picker.change) {
                            that.picker.change(value)
                        }
                    },
                    cancel() {
                        if (that.picker.reject) {
                            that.picker.reject()
                        }
                    },
                    close() {
                        that.picker.init = false
                        if (that.picker.close) {
                            that.picker.close()
                        }
                    },
                },

                defaultDatePicker: {
                    value: '',
                    show: false,
                    init: false,
                    mask: true
                },
                datePicker: {},
                datePickerMethod: {
                    confirm(value) {
                        if (that.datePicker.resolve) {
                            that.datePicker.resolve(that.datePicker.mode == 'time' ? value : dayjs(value).format(that.dateFormat))
                        }
                    },
                    change(value) {
                        if (that.datePicker.change) {
                            that.datePicker.change(that.datePicker.mode == 'time' ? value : dayjs(value).format(that.dateFormat))
                        }
                    },
                    cancel() {
                        if (that.datePicker.reject) {
                            that.datePicker.reject()
                        }
                    },
                    close() {
                        that.datePicker.init = false
                        if (that.datePicker.close) {
                            that.datePicker.close()
                        }
                    },
                },

                defaultRegionPicker: {
                    value: '',
                    show: false,
                    init: false,
                    mask: true
                },
                regionPicker: {},
                regionPickerMethod: {
                    confirm(value) {
                        if (that.regionPicker.resolve) {
                            that.regionPicker.resolve(value)
                        }
                    },
                    change(value) {
                        if (that.regionPicker.change) {
                            that.regionPicker.change(value)
                        }
                    },
                    cancel() {
                        if (that.regionPicker.reject) {
                            that.regionPicker.reject()
                        }
                    },
                    close() {
                        that.regionPicker.init = false
                        if (that.regionPicker.close) {
                            that.regionPicker.close()
                        }
                    },
                },
                defaultCalendar: {
                    value: '',
                    show: false,
                    init: false,
                    allowChangeYear: true,
                    allowChangeMonth: true,
                    showLunar: true,
                    mode: 'range'
                },
                calendar: {},
                regionCalendarMethod: {
                    format(value) {
                        if (value) {
                            if (Array.isArray(value) && value.length > 0) {
                                value = [dayjs(value[0]).format(that.dateFormat), dayjs(value[1]).format(that.dateFormat)]
                            } else {
                                value = dayjs(value).format(that.dateFormat)
                            }
                        }
                        return value
                    },
                    confirm(value) {
                        if (that.calendar.resolve) {
                            that.calendar.resolve(this.format(value))
                        }
                        this.close()
                    },
                    change(value) {
                        if (that.calendar.change) {
                            that.calendar.change(this.format(value))
                        }
                    },
                    cancel() {
                        if (that.calendar.reject) {
                            that.calendar.reject()
                        }
                    },
                    close() {
                        that.calendar.init = false
                        if (that.calendar.close) {
                            that.calendar.close()
                        }
                    },
                },

            }
        },
        created() {
            this.initPicker()
            this.initDatePicker()
            this.initRegionPicker()
            this.initCalendar()
        },
        methods: {
            initPicker() {
                let that = this
                if (!this.config.$picker) {
                    this.config.$picker = function (option = {}) {
                        that.picker = Object.assign({
                            ...that.defaultPicker
                        }, option)
                        that.picker.init = true
                        return new Promise((resolve, reject) => {
                            that.picker.resolve = resolve
                            that.picker.reject = reject
                            that.$nextTick(() => {
                                that.picker.show = true
                            })
                        })
                    }
                }
            },
            initDatePicker() {
                let that = this
                if (!this.config.$datePicker) {
                    this.config.$datePickerFormat = function (value, option) {
                        return that.datePickerMethod.format(value, option)
                    }
                    this.config.$datePicker = function (option = {}) {
                        that.datePicker = Object.assign({
                            ...that.defaultDatePicker,
                            maxDate: dayjs().year(2100).format('YYYY-MM-DD'),
                            minDate: dayjs().format('YYYY-MM-DD'),
                        }, option)
                        that.datePicker.init = true
                        return new Promise((resolve, reject) => {
                            that.datePicker.resolve = resolve
                            that.datePicker.reject = reject
                            that.$nextTick(() => {
                                that.datePicker.show = true
                            })
                        })
                    }
                }
            },
            initRegionPicker() {
                let that = this
                if (!this.config.$regionPicker) {
                    this.config.$regionPicker = function (option = {}) {
                        that.regionPicker = Object.assign({
                            ...that.defaultRegionPicker
                        }, option)
                        that.regionPicker.init = true
                        return new Promise((resolve, reject) => {
                            that.regionPicker.resolve = resolve
                            that.regionPicker.reject = reject
                            that.$nextTick(() => {
                                that.regionPicker.show = true
                            })
                        })
                    }
                }
            },
            initCalendar() {
                let that = this
                if (!this.config.$calendar) {
                    this.config.$calendar = function (option = {}) {
                        that.calendar = Object.assign({
                            ...that.defaultCalendar,
                            maxDate: dayjs().year(2100).format('YYYY-MM-DD'),
                            minDate: dayjs().format('YYYY-MM-DD'),
                        }, option)
                        that.calendar.init = true
                        return new Promise((resolve, reject) => {
                            that.calendar.resolve = resolve
                            that.calendar.reject = reject
                            that.$nextTick(() => {
                                that.calendar.show = true
                            })
                        })
                    }
                }
            }
        }
    }
</script>

<style scoped>

</style>

<template>
  <view class="baseForm" :class="initFrom('readonly',false)?'tn-pl-sm tn-pr-sm tn-form-readonly':''"
        :style="initFrom('readonly',false)?{}:{width: 'calc(100% - 40rpx)',margin: '0 20rpx'}">
    <tn-from ref="formRef"
             :model="config.bean"
             :size="initFrom('size',undefined)"
             :disabled="initFrom('disabled',false)"
             :label-position="initFrom('labelPosition','top')"
             :require-asterisk-position="initFrom('requireAsteriskPosition','left')"
             :hide-required-asterisk="initFrom('hideRequiredAsterisk',initFrom('readonly',false))"
             :label-width="initFrom('labelWidth',200)"
             :label-suffix="initFrom('labelSuffix','')"
             :status-icon="initFrom('statusIcon',true)"
             :validate-on-rule-change="initFrom('validateOnRuleChange',true)">
      <tn-from-item
        :label-width="initFromItem(item,'labelWidth',300)"
        :label-position="getLabelPosition(item)"
        :size="initFromItem(item,'size',undefined)"
        :prop="item.propName"
        :error="initFromItem(item,'error',undefined)"
        :show-message="initFromItem(item,'showMessage',false)"
        :validate-status="initFromItem(item,'validateStatus')"
        :rules="initRule(item)"
        v-for="(item,index) in domValues.filter(value => {return !initFromItem(value,'hide',false)})"
        :key="index">
        <template #label>
          <view v-if="initFrom('readonly',false)"
                style="font-size: 30rpx;font-weight: 549;color: #9C9C9C">
            {{ initAttr(item, 'label') }}
          </view>
          <view v-else-if="!initFrom('labelSlot',false) && !initFromItem(item,'labelSlot',false)"
                style="padding: 20rpx 0 20rpx 20rpx;font-size: 34rpx;font-weight: 650;margin-left: -15rpx;display: flex;flex: 1;">
            <tn-icon v-if="initAttr(item, 'icon',false)" :name="initAttr(item, 'icon')"
                     style="margin-right: 6rpx"/>
            {{ initAttr(item, 'label') }}
            <view
              style="flex: 1;display: flex;justify-content: flex-end;align-items: center;font-size: 26rpx;font-weight: 550;color: #9C9C9C"
              @click="getMethods(item,'rightLabelClick')">
              {{ initAttr(item, 'rightLabel') }}
              <tn-icon v-if="initAttr(item, 'rightLabelIcon',false)"
                       :name="initAttr(item, 'rightLabelIcon')" style="margin-left: 6rpx"/>
            </view>
          </view>
          <slot :item="item" v-else :name="initFromItem(item,'labelSlotName','fromLabel')"/>
        </template>
        <view @click="getClickMethods(item)" style="width: 100%;"
              v-if="!initFrom('readonly',false)"
              :style="{'text-align': initFromItem(item,'textAlign','right')}">
          <view v-if="initFromItem(item,'slot',false)">
            <slot :bean="item.$bean" :item="item" :name="item.slotName || item.propName"></slot>
          </view>
          <view style="background: #F4F4F4;border-radius: 10rpx;overflow: hidden;padding: 6rpx 10rpx"
                v-else-if="initFormType(item,'input')">
            <tn-input
              @input="getMethods(item,'input',[$event])"
              @change="getMethods(item,'change',[$event])"
              @focus="getMethods(item,'focus',[$event])"
              @blur="getMethods(item,'blur',[$event])"
              @clear="getMethods(item,'clear',[$event])"
              @confirm="getMethods(item,'confirm',[$event])"
              :type="initFromItem(item,'type',undefined)"
              :disabled="initFromItem(item,'disabled',undefined)"
              :size="initFromItem(item,'size',undefined)"
              :height="initFromItem(item,'height',undefined)"
              :text-align="initFromItem(item,'textAlign',undefined)"
              :placeholder="initPlaceholder(item)"
              :placeholder-style="initFromItem(item,'placeholderStyle',{color: '#9C9C9C'})"
              :border="initFromItem(item,'border',false)"
              :border-color="initFromItem(item,'borderColor',undefined)"
              :clearable="initFromItem(item,'clearable',true)"
              :maxlength="initFromItem(item,'maxlength',255)"
              :auto-height="initFromItem(item,'autoHeight',false)"
              :confirm-type="initFromItem(item,'confirmType',undefined)"
              :focus="initFromItem(item,'focus',undefined)"
              :right-icon="initFromItem(item,'rightIcon','')"
              :show-password="initFromItem(item,'showPassword',undefined)"
              :cursor-spacing="initFromItem(item,'cursorSpacing',undefined)"
              :selection-start="initFromItem(item,'selectionStart',undefined)"
              :selection-end="initFromItem(item,'selectionEnd',undefined)"
              :show-confirm-bar="initFromItem(item,'showConfirmBar',undefined)"
              :trim="initFromItem(item,'trim',undefined)"
              :custom-style="initFromItem(item,'customStyle',{})"
              :custom-class="initFromItem(item,'customClass',undefined)"
              v-model="item.$bean[item.prop]">
              <template #prefix>
                <slot :name="item.slotName?item.slotName:item.propName + 'prefix'"></slot>
              </template>
              <template #suffix>
                <slot :name="item.slotName?item.slotName:item.propName + 'suffix'"></slot>
              </template>
            </tn-input>
          </view>
          <view style="background: #F4F4F4;border-radius: 10rpx;overflow: hidden;padding: 6rpx 0 6rpx 10rpx"
                v-else-if="initFormType(item,'select')">
            <tn-input
              disabled
              :size="initFromItem(item,'size',undefined)"
              :text-align="initFromItem(item,'textAlign',undefined)"
              :placeholder="initPlaceholder(item,true)"
              :placeholder-style="initFromItem(item,'placeholderStyle',{color: '#9C9C9C'})"
              :border="initFromItem(item,'border',false)"
              :border-color="initFromItem(item,'borderColor',undefined)"
              right-icon="right"
              :custom-style="initFromItem(item,'customStyle',{})"
              :custom-class="initFromItem(item,'customClass',undefined)"
              v-model="item.$label">
            </tn-input>
          </view>
          <tn-image-upload
            v-else-if="initFormType(item,'images') && initFromItem(item,'limit',9)!==1"
            v-model="item.images"
            :disabled="initFromItem(item,'disabled',initFrom('disabled',false))"
            :action="baseApi + initFromItem(item,'action','/blade-resource/oss/endpoint/put-file')"
            :name="initFromItem(item,'name','file')"
            :header="initFromItem(item,'header',headers)"
            :form-data="initFromItem(item,'formData',{})"
            :limit="initFromItem(item,'limit',9)"
            multiple
            auto-remove-faild-file
            :ref="item.propName"
            :auto-upload="initFromItem(item,'autoUpload',undefined)"
            :show-remove="initFromItem(item,'showRemove',undefined)"
            :show-error-tips="initFromItem(item,'showErrorTips',undefined)"
            :show-upload-progress="initFromItem(item,'showUploadProgress',undefined)"
            :size-type="initFromItem(item,'sizeType',undefined)"
            :source-type="initFromItem(item,'sourceType',undefined)"
            :max-size="initFromItem(item,'maxSize',2 * 1024 * 1024)"
            :custom-upload-callback="(e)=>{ return uploadCallback(item,e)}"
            @remove="(e)=>{removeImage(item,e)}"
            :extensions="initFromItem(item,'extensions',undefined)">
          </tn-image-upload>
          <tn-image-upload
            v-else-if="initFormType(item,'images') && initFromItem(item,'limit',9)===1"
            v-model="item.images"
            :disabled="initFromItem(item,'disabled',initFrom('disabled',false))"
            :action="baseApi + initFromItem(item,'action','/blade-resource/oss/endpoint/put-file')"
            :name="initFromItem(item,'name','file')"
            :header="initFromItem(item,'header',headers)"
            :form-data="initFromItem(item,'formData',{})"
            :limit="1"
            :ref="item.propName"
            :before-upload="beforeUpload(item)"
            auto-remove-faild-file
            :max-size="initFromItem(item,'maxSize',2 * 1024 * 1024)"
            :custom-upload-callback="(e)=>{ return uploadCallback(item,e)}"
            :extensions="initFromItem(item,'extensions',undefined)">
            <template #uploadBtn v-if="initFromItem(item,'limit',9)==1">
              <view class="tn-flex tn-flex-center-center tn-gray-light_bg"
                    style="width: 100%;height: 300rpx;border-radius: 30rpx;overflow: hidden"
                    @tap.stop="chooseFile(item)">
                <view
                  v-if="initFromItem(item,'tipTitle',false)">
                  {{ initFromItem(item, 'tipTitle', '') }}
                </view>
                <img v-if="initFromItem(item,'tipImg',false)" style="width: 100%;height: 100%"
                     :src="initFromItem(item,'tipImg',false)"/>
                <slot :name="item.slotName?item.slotName:item.propName + 'uploadBtn'"/>
              </view>
            </template>
            <template #uploadImage="{ data }" v-if="initFromItem(item,'limit',9)==1">
              <view
                style="width: 100%; height: 300rpx;position: relative">
                <image @tap.stop="chooseFile(item)"
                       style="width: 100%; height: 100%"
                       :src="data.url"
                       mode="aspectFill"
                />
              </view>
            </template>
          </tn-image-upload>
          <tn-number-box v-else-if="initFormType(item,'number')"
                         :disabled="initFromItem(item,'disabled',initFrom('disabled',false))"
                         :size="initFromItem(item,'size','lg')"
                         :width="initFromItem(item,'width',undefined)"
                         :height="initFromItem(item,'height',undefined)"
                         :font-size="initFromItem(item,'fontSize',undefined)"
                         :bg-color="initFromItem(item,'bgColor',undefined)"
                         :text-color="initFromItem(item,'textColor',undefined)"
                         :min="initFromItem(item,'min',undefined)"
                         :max="initFromItem(item,'max',undefined)"
                         :step="initFromItem(item,'step',undefined)"
                         :input-disabled="initFromItem(item,'inputDisabled',initFrom('disabled',false))"
                         :input-spacing="initFromItem(item,'inputSpacing',20)"
                         v-model="item.$bean[item.prop]"
          />
          <tn-radio-group v-else-if="initFormType(item,'radio')"
                          v-model="item.$bean[item.prop]"
                          :size="initFromItem(item,'size','lg')"
                          :disabled="initFromItem(item,'disabled',undefined)"
                          :label-disabled="initFromItem(item,'labelDisabled',undefined)"
                          :border="initFromItem(item,'border',undefined)"
                          :active-color="initFromItem(item,'activeColor',undefined)"
                          :wrap="initFromItem(item,'wrap',undefined)"
          >
            <tn-radio :label="info.value" v-for="(info,index) in getOptions(item)"
                      v-if="!initFromItem(item,'labelLeft',false)">
              <text>{{ info.label }}</text>
              <tn-icon v-if="initAttr(info, 'icon',false)" :name="info.icon"/>
            </tn-radio>
            <tn-radio :label="info.value" v-for="(info,index) in getOptions(item)" v-else>
              <template #left>
                <text>{{ info.label }}</text>
                <tn-icon v-if="initAttr(info, 'icon',false)" :name="info.icon"/>
              </template>
            </tn-radio>
          </tn-radio-group>
          <tn-checkbox-group v-else-if="initFormType(item,'checkbox')"
                             v-model="item.$bean[item.prop]"
                             :size="initFromItem(item,'size','lg')"
                             :disabled="initFromItem(item,'disabled',undefined)"
                             :label-disabled="initFromItem(item,'labelDisabled',undefined)"
                             :border="initFromItem(item,'border',undefined)"
                             :active-color="initFromItem(item,'activeColor',undefined)"
                             :wrap="initFromItem(item,'wrap',undefined)"
                             :min="initFromItem(item,'min',undefined)"
                             :max="initFromItem(item,'max',undefined)"
          >
            <tn-checkbox :label="info.value" v-for="(info,index) in getOptions(item)"
                         v-if="!initFromItem(item,'labelLeft',false)">
              <text>{{ info.label }}</text>
              <tn-icon v-if="initAttr(info, 'icon',false)" :name="info.icon"/>
            </tn-checkbox>
            <tn-checkbox :label="info.value" v-for="(info,index) in getOptions(item)" v-else>
              <template #left>
                <text>{{ info.label }}</text>
                <tn-icon v-if="initAttr(info, 'icon',false)" :name="info.icon"/>
              </template>
            </tn-checkbox>
          </tn-checkbox-group>
          <tn-switch v-else-if="initFormType(item,'switch')"
                     v-model="item.$bean[item.prop]"
                     :shape="initFromItem(item,'shape',undefined)"
                     :width="initFromItem(item,'width',120)"
                     :loading="initFromItem(item,'loading',undefined)"
                     :inactive-color="initFromItem(item,'inactiveColor','否')"
                     :active-color="initFromItem(item,'activeColor','是')"
                     :inactive-text="initFromItem(item,'inactiveText',undefined)"
                     :active-text="initFromItem(item,'activeText',undefined)"
                     :inactive-icon="initFromItem(item,'inactiveIcon',undefined)"
                     :active-icon="initFromItem(item,'activeIcon',undefined)"
                     :inactive-value="initFromItem(item,'inactiveValue',0)"
                     :active-value="initFromItem(item,'activeValue',1)"
                     :size="initFromItem(item,'size',undefined)"
                     :disabled="initFromItem(item,'disabled',undefined)">
          </tn-switch>
        </view>
        <view v-else :class="getLabelPosition(item)==='top'?'tn-mt-sm tn-text-left':'tn-text-right'"
              style="color: #080808;line-height: 40rpx" class="tn-text-lg">
          <view v-if="initFromItem(item,'readSlot',false)">
            <slot :bean="item.$bean" :item="item" :name="item.slotName"></slot>
          </view>
          <view v-else-if="initFormType(item,'input')">
            <view v-if="!validateNull(item.$bean[item.prop])">
              {{ item.$bean[item.prop] }}
            </view>
            <view v-else class="tn-gray_text tn-text-sm">
              暂无数据
            </view>
          </view>
          <view v-else-if="initFormType(item,'select') || initFormType(item,'number') || initFormType(item,'radio') ">
            <view v-if="!validateNull(item.$bean[item.prop])">
              {{ filedFilter(item.$bean[item.prop], item) }}
            </view>
            <view v-else class="tn-gray_text tn-text-sm">
              暂无数据
            </view>
          </view>
          <view v-else-if="initFormType(item,'switch')">
            {{
              item.$bean[item.prop] === initFromItem(item, 'activeValue', 1) ? initFromItem(item,
                'activeText', '是') : initFromItem(item, 'activeColor', '否')
            }}
          </view>
          <view v-else-if="initFormType(item,'checkbox')">
            <view v-if="!validateNull(item.$bean[item.prop])">
              {{ filedFilter(item.$bean[item.prop], item) }}
            </view>
            <view v-else class="tn-gray_text tn-text-sm">
              暂无数据
            </view>
          </view>
          <view v-else-if="initFormType(item,'images')">
            <tnPhotoAlbum :data="getImages(item.$bean[item.prop])"
                          v-if="item.$bean[item.prop] && item.$bean[item.prop].length>0"/>
            <view v-else class="tn-flex tn-flex-center-center tn-gray-light_bg"
                  style="width: 100%;height: 300rpx;border-radius: 30rpx;overflow: hidden">
              <tn-empty mode="data" color="#9C9C9C">
                <template #tips>暂无图片</template>
              </tn-empty>
            </view>
          </view>
        </view>
      </tn-from-item>
    </tn-from>
    <view class="tn-flex tn-flex-center-between"
          v-if="config.buttons && config.buttons.filter(v=>!initAttr(v,'hide',false)).length>0"
          style="height: 120rpx;position: fixed;bottom: 20rpx;width: calc(100% - 40rpx);z-index: 10001;overflow: hidden">
      <view class="tn-flex-1 tn-flex tn-flex-center"
            @click="buttonClick(button)"
            v-for="(button,index) in config.buttons.filter(v=>!initAttr(v,'hide',false))" :key="index">
        <view style="width: calc(100% - 20rpx);"
              class="tn-text-2xl tn-white_text tn-radius tn-text-center tn-pt-sm  tn-pb-sm"
              :class="button.class">
          <tn-icon v-if="initAttr(button, 'icon',false)" :name="button.icon"/>
          {{ button.name }}
        </view>
      </view>
    </view>
    <view style="height: 140rpx;"
          v-if="config.buttons && config.buttons.filter(v=>!initAttr(v,'hide',false)).length>0"></view>
    <baseUtils :config="utilConfig"/>
  </view>
</template>

<script>

  import util from '@/utils/util'
  import baseUtils from './base-utils'

  import dayjs from "dayjs"

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
      baseUtils
    },
    name: "",
    data() {
      let that = this
      return {
        validateNull: util.validateNull,
        baseApi: this.$store.state.env.baseApi,
        headers: Object.assign({}, this.$store.state.env.HEADERS),
        domValues: [],
        utilConfig: {},
        loading: false,
        error: {
          time: 1000,
          date: null,
          start(message) {
            let time = new Date().getTime() - this.time
            if (!this.date || this.date <= time) {
              uni.showToast({
                title: message,
                icon: 'none'
              })
              this.date = new Date().getTime()
            }
          }
        },
        buttonJson: {
          submit: {
            name: '保 存',
            class: 'tn-gradient-bg__cool-6',
            icon: 'folder-add-fill',
            check: true,
            hide() {
              return that.initFrom('readonly', false)
            }
          },
          reset: {
            name: '重 置',
            class: 'tn-gradient-bg__orange',
            reset: true,
            icon: 'group-null',
            hide() {
              return that.initFrom('readonly', false)
            }
          },
          update: {
            name: '修 改',
            class: 'tn-gradient-bg__cool-5',
            icon: 'edit-write-fill',
            update: true,
            hide() {
              return !that.initFrom('readonly', false)
            }
          }
        }
      }
    },
    created() {
      this.headers[this.$store.state.env.header] = 'bearer ' + this.$store.state.user.token
      this.init()
    },
    methods: {
      dateFormat(value, datePickerJson) {
        if (value) {
          if (!datePickerJson.mode || datePickerJson.mode == 'date') {
            value = dayjs(value).format('YYYY-MM-DD')
          } else if (datePickerJson.mode == 'datetime') {
            value = dayjs(value).format('YYYY-MM-DD HH:mm:ss')
          } else if (datePickerJson.mode == 'yearmonth') {
            value = dayjs(value).format('YYYY-MM')
          }
        }
        return value
      },
      check() {
        return new Promise(resolve => {
          this.$refs.formRef.validate((valid) => {
            resolve(valid)
          })
        })
      },
      async buttonClick(button) {
        if (button.check && !(await this.check())) {
          return false
        }
        if (button.reset) {
          this.$refs.formRef.resetFields()
          this.initRules(this.config.values, this.config.bean)
        }
        if (button.update) {
          this.config.readonly = false
        }
        uni.showLoading({
          title: "操作中",
          mask: true
        })
        if (button.click) {
          const bean = JSON.parse(JSON.stringify(this.config.bean))
          let obj = button.click(bean, button, this.config, () => {
            uni.hideLoading()
          })
          if (Object.prototype.toString.call(obj) === "[object Promise]") {
            obj.then(() => {
              uni.hideLoading()
            })
          } else {
            uni.hideLoading()
          }
        } else {
          uni.hideLoading()
        }
      },
      getImages(val) {
        if (typeof val === 'string') {
          if (val) {
            return [this.$store.state.env.baseImageUrl + val]
          }
          return []
        } else {
          return val.map(v => {
            return this.$store.state.env.baseImageUrl + v
          })
        }
      },
      filedFilter(val, item) {
        if (item.filedFilter) {
          return item.filedFilter(val, item.$bean, this.getOptions(item))
        } else {
          if (this.initFormType(item, 'checkbox')) {
            let option = this.getOptions(item)
            let label = ''
            if (option && option.length > 0) {
              if (val) {
                let values = option.filter(v => val.indexOf(v.value) > -1)
                label = values.map(v => {
                  return v.label
                }).join("，")
              }
            }
            return label
          } else if (item.date) {
            return this.dateFormat(val, this.initFromItem(item, 'date', {}))
          } else {
            let option = this.getOptions(item)
            let label = val
            if (option && option.length > 0) {
              let values = option.filter(v => {
                if (typeof v === 'string') {
                  return v === val
                }
                return v.value === val
              })
              if (values.length > 0) {
                label = typeof values[0] === 'string' ? values[0] : values[0].label
              }
            }
            return label
          }
        }
      },
      getLabelPosition(item) {
        let defaultInfo = ''
        let type = this.initFromItem(item, 'types', 'input')
        switch (type) {
          case 'number':
          case 'switch':
            defaultInfo = 'left';
            break;
          case 'radio':
          case 'select':
            if (this.initFrom('readonly', false)) {
              defaultInfo = 'left'
            }
            break;
          case 'checkbox':
          case 'images':
            defaultInfo = 'top'
            break;
          case 'input':
            if (this.initFrom('readonly', false)) {
              defaultInfo = this.initFromItem(item, 'type') === 'textarea' ? 'top' : 'left'
            }
            break;
        }
        return this.initFromItem(item, 'labelPosition', defaultInfo)
      },
      chooseFile(item) {
        let image = this.$refs[item.propName][0]
        image.chooseFile()
      },
      clear(item, value, asShow) {
        let m = () => {
          let image = this.$refs[item.propName][0]
          image.clear()
          item.images.splice(0, 1)
          item.$bean[item.prop] = value
        }
        if (asShow) {
          uni.showModal({
            title: '温馨提示',
            content: "是否清空上传图片？",
            confirmColor: '#01beff',
            cancelColor: '#ff444f',
            cancelText: '取  消',
            confirmText: '确  认',
            success(res) {
              if (res.confirm) {
                m()
              }
            },
            fail() {
              resolve(false)
            },
          });
        }
      },
      beforeUpload(item) {
        return () => {
          this.clear(item, '')
          return true
        }
      },
      removeImage(item, e) {
        let bool = this.initFromItem(item, 'limit', 9) === 1
        if (bool) {
          item.images.splice(0, 1)
          item.$bean[item.prop] = ''
        } else {
          let index = item.images.indexOf(e)
          if (index > -1) {
            item.images.splice(index, 1)
            item.$bean[item.prop].splice(index, 1)
          }
        }
      },
      uploadCallback(item, res) {
        if (res.statusCode == 200) {
          let json = JSON.parse(res.data)
          if (json.code == 200) {
            let bool = this.initFromItem(item, 'limit', 9) === 1
            if (bool) {
              item.images = [this.$store.state.env.baseImageUrl + json.data.name]
              item.$bean[item.prop] = json.data.name
            } else {
              item.$bean[item.prop].push(json.data.name)
            }
            return this.$store.state.env.baseImageUrl + json.data.name
          }
        }
        return ''
      },
      selectClick(item) {
        let method = null
        if (item.date) {
          this.utilConfig.$datePicker({
            value: item.$bean[item.prop],
            ...this.initFromItem(item, 'date', {})
          }).then(val => {
            this.$set(item, '$label', this.dateFormat(val, this.initFromItem(item, 'date', {})))
            this.$set(item.$bean, item.prop, val)
          })
        } else if (item.region) {
          method = this.utilConfig.$regionPicker({
            value: item.$bean[item.prop],
            ...this.initFromItem(item, 'region', {})
          })
        } else {
          method = this.utilConfig.$picker({
            value: item.$bean[item.prop],
            data: this.getOptions(item)
          })
        }
        if (method) {
          method.then(val => {
            this.$set(item, '$label', this.filedFilter(val, item))
            this.$set(item.$bean, item.prop, val)
          })
        }
      },
      getOptions(item) {
        return this.initFromItem(item, 'options', [])
      },
      initFormType(item, type) {
        return this.initAttr(item, 'types', 'input', [item.$bean[item.prop], item.$bean]) === type
      },
      initRequired(item, rule, filed, defaultValue) {
        return this.initAttr(rule, filed, defaultValue, [item.$bean[item.prop], item.$bean])
      },
      initRule(val) {
        let rules = val.rules ? val.rules : []
        if (val.rule && rules.filter(v => v.validatorBool).length === 0) {
          let trigger = ['blur']
          // 加入自定义校验规则
          const json = {
            validatorBool: true,
            // eslint-disable-next-line no-prototype-builtins
            required: this.initRequired(val, val.rule, 'required', false),
            validator: (rule, val2, callback) => {
              let value = val.$bean[val.prop]
              const label = val.rule.label ? this.initRequired(val, val.rule, "label") : this.initFromItem(val, "label", '')
              const json = {
                bool: true,
                message: '请' + (!val.select ? '输入' : '选择') + label
              }
              for (const key in val.rule) {
                let keyValue = this.initRequired(val, val.rule, key, false)
                switch (key) {
                  case 'required':
                    if (keyValue && util.validateNull(value)) {
                      json.bool = false
                    }
                    break
                  case 'phone':
                    if (keyValue && (value && !util.validateMobile(value))) {
                      json.bool = false
                      json.message = `请输入正确的` + label
                    }
                    break
                  case 'creditCode':
                    if (keyValue && (value && !/^9[0-9A-HJ-NPQRTUWXY]\d{6}[0-9A-HJ-NPQRTUWXY]{10}/.test(value))) {
                      json.bool = false
                      json.message = `请输入正确的` + label
                    }
                    break
                  case 'min':
                    if (keyValue && value && value.length < keyValue) {
                      json.bool = false
                      json.message = label + `长度不能少于${keyValue}位`
                    }
                    break
                  case 'max':
                    if (keyValue && value && value.length > keyValue) {
                      json.bool = false
                      json.message = label + `长度不能超过${keyValue}位`
                    }
                    break
                  case 'maxNum':
                    if (keyValue && value && value > keyValue) {
                      json.bool = false
                      json.message = label + `不能大于${keyValue}`
                    }
                    break
                  case 'minNum':
                    if (keyValue && value && value < keyValue) {
                      json.bool = false
                      json.message = label + `不能小于${keyValue}`
                    }
                    break
                  case 'plate':
                    if (keyValue && (value && !/^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/.test(value))) {
                      json.bool = false
                      json.message = `请输入正确的` + label
                    }
                    break
                  case 'patterns':
                    if (keyValue && (value && !keyValue.test(value))) {
                      json.bool = false
                      json.message = `请输入正确的` + label
                    }
                    break
                  case 'validator':
                    json.message = val.rule[key](value, val)
                    if (json.message !== true) {
                      json.bool = false
                    }
                }
                if (!json.bool) {
                  break
                }
              }
              if (!json.bool) {
                this.error.start(json.message)
                callback(new Error(json.message))
              } else {
                callback()
              }
            },
            trigger: trigger
          }
          rules.push(json)
        }
        return rules
      },
      init() {
        if (!this.config.bean) {
          this.config.bean = {}
        }
        if (this.config.readonly === undefined) {
          this.config.readonly = false
        }
        // 加载每个数据的校验功能
        if (this.config.values) {
          this.initRules(this.config.values, this.config.bean)
        }
        if (this.config.buttons) {
          this.config.buttons.filter(button => {
            if (this.buttonJson.hasOwnProperty(button.prop)) {
              Object.assign(button, this.buttonJson[button.prop])
            }
          })
        }
      },
      // 初始化校验表单
      initRules(values, bean, propPri) {
        if (!propPri) {
          this.domValues.length = 0
        }
        let copyValues = []
        copyValues.push(...values)
        copyValues.map(val => {
          if (propPri) {
            val.$groupName = propPri
          }
          if (!val.propName) {
            val.propName = (propPri ? propPri + "_" : "") + val.prop
          }
          if (bean[val.prop] === undefined) {
            if (val.group) {
              this.$set(bean, val.prop, {})
            }
          }
          if (val.group) {
            val.$label = ""
            this.initRules(val.values, bean[val.prop], val.propName)
          } else {
            val.$bean = bean
            this.$set(val, '$label', this.filedFilter(bean[val.prop], val))
            if (bean[val.prop] === undefined) {
              if (this.initFormType(val, 'images')) {
                let value = []
                if (this.initFromItem(val, 'limit', 9) === 1) {
                  value = ''
                }
                this.$set(bean, val.prop, value)
                this.$set(val, 'images', [])
                this.$set(val, '$clearImages', (asShow) => {
                  this.clear(val, value, asShow)
                })
              } else if (this.initFormType(val, 'number')) {
                this.$set(bean, val.prop, this.initFromItem(val, 'min', 0))
              } else if (this.initFormType(val, 'checkbox')) {
                this.$set(bean, val.prop, [])
              } else if (this.initFormType(val, 'switch')) {
                this.$set(bean, val.prop, this.initFromItem(val, 'inactiveValue', 0))
              } else {
                this.$set(bean, val.prop, null)
              }
            } else {
              if (this.initFormType(val, 'images')) {
                if (bean[val.prop]) {
                  let data = Array.isArray(bean[val.prop]) ? bean[val.prop].map(v => {
                    return this.$store.state.env.baseImageUrl + v
                  }) : [this.$store.state.env.baseImageUrl + bean[val.prop]]
                  this.$set(val, 'images', data)
                } else {
                  this.$set(val, 'images', [])
                }
                let value = []
                if (this.initFromItem(val, 'limit', 9) === 1) {
                  value = ''
                }
                this.$set(val, '$clearImages', (asShow) => {
                  this.clear(val, value, asShow)
                })
              }
            }
            this.domValues.push(val)
          }
        })
      },
      getClickMethods(item) {
        if (this.initFromItem(item, 'disabled', undefined)) {
          return
        }
        if (item && item.hasOwnProperty('click') && item.click !== undefined) {
          let values = [item.$bean[item.prop], item.$bean, () => {
            if (this.initFormType(item, 'select')) {
              this.$set(item, '$label', this.filedFilter(item.$bean[item.prop], item))
            }
          }]
          item.click(...values)
        } else {
          if (this.initFormType(item, 'select')) {
            this.selectClick(item)
          }
        }
      },
      getMethods(item, filed, values) {
        if (item && item.hasOwnProperty(filed) && item[filed] !== undefined) {
          values = values ? values : []
          values.push(...[item.$bean[item.prop], item.$bean, item, this.config])
          item[filed](...values)
        }
      },
      initPlaceholder(item, change) {
        return this.initFromItem(item, 'placeholder', this.initFromItem(item, 'disabled', false) ? '暂无数据' : (`请${change ? '选择' : '输入'}` + this.initFromItem(item, 'label')))
      },
      initFromItem(item, filed, defaultValue) {
        return this.initAttr(item, filed, defaultValue, [item.$bean[item.prop], item.$bean])
      },
      initFrom(filed, defaultValue) {
        return this.initAttr(this.config, filed, defaultValue, [this.config.bean])
      },
      initAttr(item, filed, defaultValue, values) {
        if (item && item.hasOwnProperty(filed) && item[filed] !== undefined) {
          values = values ? values : []
          values.push(item)
          values.push(this.config)
          return typeof item[filed] === 'function' ? item[filed](...values) : item[filed]
        }
        return defaultValue
      }
    }
  }
</script>

<style scoped>
</style>

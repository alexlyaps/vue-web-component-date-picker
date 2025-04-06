<template>
  <div :class="['input-field', `bottom-indent--${bottomIndent}`]">
    <label v-if="label" class="input-label">{{ label }}</label>
    <div :class="['input-wrapper', { 'has-error': error, 'input-wrapper--disabled': disabled }]">
      <span v-if="leftIcon" class="icon left-icon">
        <SvgIcon :name="leftIcon" size="20" />
      </span>
      <input
        :type="inputType"
        :placeholder="placeholder"
        :class="['input-element', { 'with-icons': leftIcon || rightIcon }]"
        :value="value"
        :disabled="disabled"
        @input="updateValue($event.target.value)"
        @focus="$emit('inputFocus')"
        @blur="$emit('inputBlur')"
      />
      <button type="button" v-if="rightIcon || type === 'password'" class="icon right-icon" @click="handleRightButtonClick">
        <SvgIcon :name="type === 'password' ? (passwordVisible ? 'eye-off' : 'eye') : rightIcon" size="16" />
      </button>
    </div>
    <p v-if="hint && !error" class="input-hint">{{ hint }}</p>
    <p v-if="error" class="input-error">{{ error }}</p>
  </div>
</template>

<script>
import SvgIcon from '@/components/SvgIcon/SvgIcon.vue';

export default {
  components: { SvgIcon },
  name: 'InputField',
  props: {
    label: { type: String, default: '' },
    placeholder: { type: String, default: '' },
    leftIcon: { type: String, default: '' },
    rightIcon: { type: String, default: '' },
    hint: { type: String, default: '' },
    error: { type: String, default: '' },
    disabled: { type: Boolean, default: false },
    bottomIndent: { type: Number, default: 0 },
    onRightButtonClick: { type: Function, default: () => {} },
    modelValue: { type: String, default: '' }, // значение передается через v-model
    type: { type: String, default: 'text' },
  },
  emits: ['update:modelValue', 'inputFocus', 'inputBlur'],
  data() {
    return {
      passwordVisible: false, // состояние видимости пароля
    };
  },
  computed: {
    value: {
      get() {
        return this.modelValue;
      },
      set(newValue) {
        this.$emit('update:modelValue', newValue);
      },
    },
    inputType() {
      if (this.type === 'password') {
        return this.passwordVisible ? 'text' : 'password';
      }
      return this.type;
    },
  },
  methods: {
    updateValue(newValue) {
      this.value = newValue;
    },
    handleRightButtonClick(event) {
      event.preventDefault();
      if (this.type === 'password') {
        this.passwordVisible = !this.passwordVisible;
      } else if (this.onRightButtonClick) {
        this.onRightButtonClick(event);
      }
    },
  },
};
</script>

<style src="./styles.scss" lang="scss" scoped />

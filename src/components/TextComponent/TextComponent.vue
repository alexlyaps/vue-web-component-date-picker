<!-- TextComponent.vue -->
<template>
  <component :is="tag" :class="textClasses">
    <slot></slot>
  </component>
</template>

<script>
import { computed } from 'vue';

const VALID_TAGS = ['p', 'span', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'div'];
const VALID_SIZES = [
  'text-xs',
  'text-sm',
  'text-md',
  'text-lg',
  'text-xl',
  'display-xs',
  'display-sm',
  'display-md',
  'display-lg',
  'display-xl',
  'display-2xl',
];
const VALID_WEIGHTS = ['regular', 'medium', 'semibold', 'bold'];
const VALID_ALIGN = ['left', 'right', 'center'];
const VALID_COLORS = [
  'gray-25',
  'gray-50',
  'gray-100',
  'gray-200',
  'gray-300',
  'gray-400',
  'gray-500',
  'gray-600',
  'gray-700',
  'gray-800',
  'gray-900',
  'primary-25',
  'primary-50',
  'primary-100',
  'primary-200',
  'primary-300',
  'primary-400',
  'primary-500',
  'primary-600',
  'primary-700',
  'primary-800',
  'primary-900',
  'error-25',
  'error-50',
  'error-100',
  'error-200',
  'error-300',
  'error-400',
  'error-500',
  'error-600',
  'error-700',
  'error-800',
  'error-900',
  'warning-25',
  'warning-50',
  'warning-100',
  'warning-200',
  'warning-300',
  'warning-400',
  'warning-500',
  'warning-600',
  'warning-700',
  'warning-800',
  'warning-900',
  'success-25',
  'success-50',
  'success-100',
  'success-200',
  'success-300',
  'success-400',
  'success-500',
  'success-600',
  'success-700',
  'success-800',
  'success-900',
];

export default {
  name: 'TextComponent',
  setup(props) {
    const textClasses = computed(() => ({
      text: true,
      [`text--${props.size}`]: true,
      [`text--${props.weight}`]: true,
      [`text--${props.align}`]: props.align,
      [`text--text-overflow-hidden`]: props.textOverflow,
      [`color--${props.color}`]: true,
      [`top-indent--${props.topIndent}`]: props.topIndent,
      [`bottom-indent--${props.bottomIndent}`]: props.bottomIndent,
    }));

    return { textClasses };
  },
  props: {
    tag: {
      type: String,
      default: 'span',
      validator: (value) => VALID_TAGS.includes(value),
    },
    size: {
      type: String,
      default: 'text-md',
      validator: (value) => VALID_SIZES.includes(value),
    },
    weight: {
      type: String,
      default: 'regular',
      validator: (value) => VALID_WEIGHTS.includes(value),
    },
    align: {
      type: String,
      default: 'left',
      validator: (value) => VALID_ALIGN.includes(value),
    },
    textOverflow: {
      type: Boolean,
      default: false,
    },
    topIndent: {
      type: Number,
      default: 0,
    },
    bottomIndent: {
      type: Number,
      default: 0,
    },
    color: {
      type: String,
      default: 'gray-900',
      validator: (value) => VALID_COLORS.includes(value),
    },
  },
};
</script>

<style src="./TextComponent.scss" lang="scss" />

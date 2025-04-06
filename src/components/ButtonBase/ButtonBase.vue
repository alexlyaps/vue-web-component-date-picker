<template>
  <component :is="tag" :to="to" :class="buttonClasses" :disabled="tag === 'button' ? disabled : null" @click="onClick">
    <template v-if="leftIcon">
      <SvgIcon :name="leftIcon" :size="iconSize" :rightIndent="iconIndent" />
    </template>
    <template v-if="caption">
      {{ caption }}
    </template>
    <template v-if="rightIcon">
      <SvgIcon :name="rightIcon" :size="iconSize" :leftIndent="iconIndent" />
    </template>
    <template v-if="singleIcon">
      <SvgIcon :name="singleIcon" :size="iconSize" />
    </template>
    <template v-if="options">
      <DropdownMenu
        v-if="dropdown"
        :options="options"
        :selectedIndex="selectedIndex"
        @select="handleSelect"
        :offset="dropdownOffset"
        textSm
        :right="dropdownRight"
        :center="dropdownCenter"
        :wide="dropdownWide"
      />
    </template>
  </component>
</template>

<script>
import { computed } from 'vue';
import SvgIcon from '@/components/SvgIcon/SvgIcon.vue';
import DropdownMenu from '@/components/DropdownMenu/DropdownMenu.vue';

const VALID_SIZES = ['sm', 'md', 'lg', 'xl', '2xl'];
const VALID_VARIANTS = ['primary', 'secondary', 'secondary_gray', 'tertiary', 'tertiary_gray', 'link_color', 'link_gray'];

export default {
  name: 'ButtonBase',
  components: { SvgIcon, DropdownMenu },
  props: {
    caption: { type: String, default: null },
    size: { type: String, default: 'md', validator: (value) => VALID_SIZES.includes(value) },
    variant: { type: String, default: 'primary', validator: (value) => VALID_VARIANTS.includes(value) },
    disabled: { type: Boolean, default: false },
    fullwidth: { type: Boolean, default: false },
    bottomIndent: { type: Number, default: 0 },
    leftIcon: { type: String, default: null },
    rightIcon: { type: String, default: null },
    singleIcon: { type: String, default: null },
    justifyLeft: { type: Boolean, default: false },
    dropdown: { type: Boolean, default: false },
    dropdownRight: { type: Boolean, default: false },
    dropdownOffset: { type: Boolean, default: false },
    dropdownCenter: { type: Boolean, default: false },
    dropdownWide: { type: Boolean, default: false },
    to: { type: String, default: null },
    options: { type: Array, default: null },
  },
  emits: ['click', 'select'],
  methods: {
    handleSelect(option) {
      this.$emit('select', option);
    },
  },
  setup(props, { emit }) {
    const buttonClasses = computed(() => ({
      'button-base': true,
      [`button-base--${props.variant}`]: true,
      [`button-base--${props.size}`]: !props.singleIcon,
      'button-base--fullwidth': props.fullwidth,
      'button-base--disabled': props.disabled,
      [`bottom-indent--${props.bottomIndent}`]: props.bottomIndent,
      [`button-base-single-icon--${props.size}`]: props.singleIcon,
      'button-base--justify-left': props.justifyLeft,
      link: props.to,
    }));

    const iconSize = computed(() => {
      if (props.size === 'sm') return 16;
      if (props.size === 'md' || props.size === 'lg' || props.size === 'xl') return 20;
      if (props.size === '2xl') return 24;
      return 20;
    });

    const tag = computed(() => (props.to ? 'RouterLink' : 'button'));

    const iconIndent = computed(() => {
      if (props.size === 'sm' || props.size === 'md' || props.size === 'lg' || props.size === 'xl') return 8;
      if (props.size === '2xl') return 12;
      return 8;
    });

    const onClick = (event) => {
      if (!props.disabled) {
        emit('click', event);
      }
    };

    return { buttonClasses, iconSize, iconIndent, onClick, tag };
  },
};
</script>

<style src="./ButtonBase.scss" lang="scss" scoped />

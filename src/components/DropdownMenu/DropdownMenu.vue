<template>
  <ul
    :class="[
      'dropdown-menu',
      { 'dropdown-menu--pressed-bottom': pressedBottom },
      { 'dropdown-menu--offset': offset },
      { 'dropdown-menu--offset-right': right },
      { 'dropdown-menu--offset-center': center },
      { 'dropdown-menu--offset-wide': wide },
    ]"
    ref="menu"
  >
    <li
      v-for="(option, index) in options"
      :key="index"
      @mousedown.prevent="$emit('select', option)"
      :class="[
        'dropdown-menu__item',
        { 'dropdown-menu__item--sm': textSm },
        { 'dropdown-menu__item--selected': index === selectedIndex },
        { 'dropdown-menu__item--danger': option.danger },
      ]"
    >
      <TextComponent
        tag="div"
        align="left"
        :size="option.subtitle ? 'text-md' : 'text-sm'"
        weight="medium"
        :color="option.danger ? 'error-500' : option.subtitle ? 'gray-900' : 'gray-700'"
        >{{ option.label }}</TextComponent
      >
      <TextComponent v-if="option.subtitle" tag="div" align="left" size="text-sm" weight="regular" color="gray-400">{{
        option.subtitle
      }}</TextComponent>
    </li>
  </ul>
</template>

<script>
import TextComponent from '@/components/TextComponent/TextComponent.vue';

export default {
  name: 'DropdownMenu',
  components: { TextComponent },
  emits: ['select'],
  props: {
    options: {
      type: Array,
      required: true,
      // default: () => [{ label: '', subtitle: '', value: '' }],
    },
    selectedIndex: {
      type: Number,
      default: -1,
    },
    pressedBottom: {
      type: Boolean,
      default: false,
    },
    offset: {
      type: Boolean,
      default: false,
    },
    right: {
      type: Boolean,
      default: false,
    },
    textSm: {
      type: Boolean,
      default: false,
    },
    center: {
      type: Boolean,
      default: false,
    },
    wide: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    scrollToSelected() {
      if (this.selectedIndex === -1) return;

      const menuElement = this.$refs.menu;
      const selectedElement = menuElement.children[this.selectedIndex];
      if (!selectedElement) return;

      const scrollTop = menuElement.scrollTop;
      const offsetTop = selectedElement.offsetTop;
      const elementHeight = selectedElement.offsetHeight;
      const containerHeight = menuElement.clientHeight;

      if (offsetTop < scrollTop) {
        menuElement.scrollTop = offsetTop;
      } else if (offsetTop + elementHeight > scrollTop + containerHeight) {
        menuElement.scrollTop = offsetTop + elementHeight - containerHeight;
      }
    },
  },
  watch: {
    selectedIndex() {
      this.$nextTick(this.scrollToSelected);
    },
  },
};
</script>

<style src="./DropdownMenu.scss" lang="scss" scoped />

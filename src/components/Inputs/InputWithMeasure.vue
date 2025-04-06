<template>
  <div :class="['input-field', `bottom-indent--${bottomIndent}`]">
    <label v-if="label" class="input-label">{{ label }}</label>
    <div class="input-wrapper">
      <input
        type="number"
        :placeholder="placeholder"
        class="input-element"
        :value="modelValue"
        :disabled="disabled"
        @input="updateValue($event.target.value)"
      />
      <span class="current-measure">
        {{ options[selectedIndex].label }}
      </span>
      <button type="button" class="icon right-icon" @click="handleDropdownClick">
        <SvgIcon :name="showDropdown ? 'chevron-up' : 'chevron-down'" size="16" />
      </button>
      <DropdownMenu v-show="showDropdown" :options="options" :selectedIndex="selectedIndex" @select="selectOption" />
    </div>
  </div>
</template>

<script>
import SvgIcon from '@/components/SvgIcon/SvgIcon.vue';
import DropdownMenu from '@/components/DropdownMenu/DropdownMenu.vue';

export default {
  components: { SvgIcon, DropdownMenu },
  name: 'InputWithMeasure',
  props: {
    label: { type: String, default: '' },
    options: { type: Array, default: () => ['%', 'px'] },
    placeholder: { type: String, default: '' },
    disabled: { type: Boolean, default: false },
    bottomIndent: { type: Number, default: 0 },
    modelValue: { type: String, default: '' }, // значение передается через v-model
  },
  data() {
    return {
      showDropdown: false,
      selectedIndex: 0,
    };
  },

  mounted() {
    document.addEventListener('click', this.closeDropdown);
  },
  beforeUnmount() {
    document.removeEventListener('click', this.closeDropdown);
  },
  methods: {
    closeDropdown(event) {
      if (!this.$el.contains(event.target)) {
        this.showDropdown = false;
      }
    },
    updateValue(newValue) {
      this.value = newValue;
    },
    handleDropdownClick(event) {
      event.preventDefault();
      this.showDropdown = !this.showDropdown;
    },
    selectOption(option) {
      this.$emit('select', option);
      this.showDropdown = false;
      this.selectedIndex = this.options.indexOf(option);
    },
  },
};
</script>

<style src="./styles.scss" lang="scss" scoped />

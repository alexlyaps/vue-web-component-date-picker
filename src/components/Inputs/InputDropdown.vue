<template>
  <div class="input-dropdown" @click="toggleDropdown">
    <label v-if="label" class="input-label">{{ label }}</label>
    <div class="input-dropdown-container">
      <input
        v-model="searchTerm"
        @input="filterOptions"
        @keydown.down.prevent="handleArrowDown"
        @keydown.up.prevent="handleArrowUp"
        @keydown.enter.prevent="handleEnter"
        @keydown.esc="handleEscape"
        :placeholder="placeholder"
        class="input-dropdown__input"
        ref="input"
      />
      <span class="chevron-icon" :class="{ 'chevron-icon--rotated': showDropdown }">
        <SvgIcon name="chevron-down" size="16" />
      </span>
      <DropdownMenu
        v-if="showDropdown"
        :options="displayOptions"
        :selectedIndex="selectedIndex"
        @select="selectOption"
        class="dropdown-menu--wide"
      />
    </div>
  </div>
</template>

<script>
import SvgIcon from '@/components/SvgIcon/SvgIcon.vue';
import DropdownMenu from '@/components/DropdownMenu/DropdownMenu.vue';

export default {
  name: 'InputDropdown',
  components: {
    SvgIcon,
    DropdownMenu,
  },
  props: {
    label: {
      type: String,
      default: '',
    },
    options: {
      type: Array,
      required: true,
    },
    placeholder: {
      type: String,
      default: 'Select an option',
    },
  },
  data() {
    return {
      searchTerm: '',
      showDropdown: false,
      filteredOptions: [],
      selectedIndex: -1,
    };
  },
  computed: {
    displayOptions() {
      if (!this.searchTerm) return this.options;
      const searchLower = this.searchTerm.toLowerCase();
      return this.options.filter((option) => option.label.toLowerCase().includes(searchLower));
    },
  },
  mounted() {
    document.addEventListener('click', this.handleOutsideClick);
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleOutsideClick);
  },
  methods: {
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
      if (this.showDropdown) {
        this.searchTerm = '';
        this.filteredOptions = this.options;
        this.selectedIndex = -1;
      }
    },
    handleOutsideClick(event) {
      if (!this.$el.contains(event.target)) {
        this.showDropdown = false;
      }
    },
    filterOptions() {
      this.selectedIndex = -1;
    },
    selectOption(option) {
      this.searchTerm = option.label;
      this.showDropdown = false;
      this.$emit('select', option);
    },
    handleArrowDown() {
      if (!this.showDropdown) {
        this.toggleDropdown();
        return;
      }
      this.selectedIndex = Math.min(this.selectedIndex + 1, this.displayOptions.length - 1);
    },
    handleArrowUp() {
      if (!this.showDropdown) return;
      this.selectedIndex = Math.max(this.selectedIndex - 1, -1);
    },
    handleEnter() {
      if (!this.showDropdown) return;
      if (this.selectedIndex >= 0) {
        this.selectOption(this.displayOptions[this.selectedIndex]);
      }
    },
    handleEscape() {
      this.showDropdown = false;
      this.selectedIndex = -1;
    },
  },
};
</script>

<style src="./styles.scss" lang="scss" scoped />

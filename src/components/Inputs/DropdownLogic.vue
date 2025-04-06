<template>
  <div :class="['input-field', `bottom-indent--${bottomIndent}`]">
    <label v-if="label" class="input-label">{{ label }}</label>
    <div
      @click="handleDropdownClick"
      :class="['input-wrapper', `width--${width}`]"
    >
      <span class="current-measure">
        {{ options[selectedIndex].label }}
      </span>

      <SvgIcon
        :name="showDropdown ? 'chevron-up' : 'chevron-down'"
        size="16"
        color="error-500"
      />

      <DropdownMenu
        v-show="showDropdown"
        :options="options"
        :selectedIndex="selectedIndex"
        @select="selectOption"
        class="dropdown-menu--wide"
      />
    </div>
  </div>
</template>

<script>
import SvgIcon from "@/components/SvgIcon/SvgIcon.vue";
import DropdownMenu from "@/components/DropdownMenu/DropdownMenu.vue";

export default {
  components: { SvgIcon, DropdownMenu },
  name: "DropdownLogic",
  props: {
    label: { type: String, default: "" },
    options: { type: Array, default: () => ["%", "px"] },
    bottomIndent: { type: Number, default: 0 },
    width: { type: String, default: "wide" },
  },
  data() {
    return {
      showDropdown: false,
      selectedIndex: 0,
    };
  },

  mounted() {
    document.addEventListener("click", this.closeDropdown);
  },
  beforeUnmount() {
    document.removeEventListener("click", this.closeDropdown);
  },
  methods: {
    closeDropdown(event) {
      if (!this.$el.contains(event.target)) {
        this.showDropdown = false;
      }
    },

    handleDropdownClick(event) {
      event.preventDefault();
      this.showDropdown = !this.showDropdown;
    },
    selectOption(option) {
      this.$emit("select", option);
      this.showDropdown = false;
      this.selectedIndex = this.options.indexOf(option);
    },
  },
};
</script>

<style src="./styles.scss" lang="scss" scoped />

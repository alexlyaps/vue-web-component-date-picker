<template>
  <div
    :class="[
      'row',
      `row--direction-${direction}`,
      `row--align-${alignItems}`,
      `row--justify-${justifyItems}`,
      `column-gap--${columnGap}`,
      `row-gap--${rowGap}`,
      `bottom-indent--${bottomIndent}`,
      { 'row--relative': relative },
      { 'row--wrap': wrap },
    ]"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: 'RowComponent',
  props: {
    direction: {
      type: String,
      default: 'column',
      validator: (value) => ['row', 'column'].includes(value),
    },
    alignItems: {
      type: String,
      default: 'start',
      validator: (value) => ['start', 'center', 'flex-end'].includes(value),
    },
    justifyItems: {
      type: String,
      default: 'start',
      validator: (value) => ['start', 'center', 'flex-end', 'space-between'].includes(value),
    },
    columnGap: {
      type: Number,
      default: 0,
    },
    rowGap: {
      type: Number,
      default: 0,
    },
    bottomIndent: {
      type: Number,
      default: 0,
    },
    relative: {
      type: Boolean,
      default: false,
    },
    wrap: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style src="./RowComponent.scss" lang="scss" scoped />

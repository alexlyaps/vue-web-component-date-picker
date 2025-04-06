<template>
  <svg :width="size" :height="size" :class="svgClasses">
    <use :xlink:href="`#${name}`"></use>
  </svg>
</template>

<script>
import { computed } from 'vue';

export default {
  props: {
    name: {
      type: String,
      required: true, // Имя иконки, соответствующее файлу SVG
    },
    size: {
      type: [String, Number],
      default: 24, // Размер по умолчанию
    },
    color: {
      type: String,
      default: '', // Цвет по умолчанию
    },
    topIndent: {
      type: Number,
      default: 0,
    },
    rightIndent: {
      type: Number,
      default: 0,
    },
    bottomIndent: {
      type: Number,
      default: 0,
    },
    leftIndent: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    const svgClasses = computed(() => ({
      [`color--${props.color}`]: props.color,
      [`top-indent--${props.topIndent}`]: props.topIndent,
      [`right-indent--${props.rightIndent}`]: props.rightIndent,
      [`bottom-indent--${props.bottomIndent}`]: props.bottomIndent,
      [`left-indent--${props.leftIndent}`]: props.leftIndent,
    }));

    return { svgClasses };
  },
};
</script>

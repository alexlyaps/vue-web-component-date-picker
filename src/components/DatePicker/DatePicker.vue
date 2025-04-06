<template>
  <div class="date-picker">
    <RowComponent
      direction="row"
      alignItems="center"
      justify-items="space-between"
      :bottomIndent="16"
    >
      <SvgIcon
        name="chevron-left"
        size="20"
        :color="leftArrow ? 'plum-blue' : 'pale-orange'"
        @click="$emit('leftClick')"
      />
      <TextComponent size="text-md" weight="semibold" color="plum-blue">
        {{ monthString }} {{ year }}
      </TextComponent>
      <SvgIcon
        name="chevron-right"
        size="20"
        :color="rightArrow ? 'plum-blue' : 'pale-orange'"
        @click="$emit('rightClick')"
      />
    </RowComponent>
    <RowComponent
      direction="row"
      alignItems="center"
      justify-items="start"
      :bottomIndent="16"
    >
      <div class="date-picker__date" v-for="(day, index) in days" :key="index">
        <TextComponent
          size="text-md"
          align="center"
          weight="semibold"
          color="plum-blue"
        >
          {{ day }}
        </TextComponent>
      </div>
    </RowComponent>
    <div class="date-picker__dates">
      <div
        v-for="(date, index) in calendarDays"
        :class="
          !date
            ? 'date-picker__date'
            : isFirstOrLastInRange(date)
              ? 'date-picker__date--selected'
              : isBetweenInRange(date)
                ? 'date-picker__date--between'
                : 'date-picker__date'
        "
        :key="index"
        @click="$emit('selectDate', date, month, year)"
        @mouseover="$emit('mouseOverDate', date, month, year)"
      >
        <TextComponent
          size="text-md"
          :weight="date === today ? 'semibold' : 'regular'"
          :color="isFirstOrLastInRange(date) ? 'pale-orange' : 'plum-blue'"
          align="center"
        >
          {{ date || "" }}
        </TextComponent>
      </div>
    </div>
  </div>
</template>

<script>
import RowComponent from "@/components/RowComponent/RowComponent.vue";
import TextComponent from "@/components/TextComponent/TextComponent.vue";
import SvgIcon from "@/components/SvgIcon/SvgIcon.vue";

export default {
  name: "DatePicker",
  emits: ["leftClick", "rightClick", "mouseOverDate"],
  components: {
    RowComponent,
    TextComponent,
    SvgIcon,
  },
  props: {
    date: {
      type: Number,
      default: new Date().getDate(),
    },
    month: {
      type: Number,
      default: new Date().getMonth(),
    },
    year: {
      type: Number,
      default: new Date().getFullYear(),
    },
    selectedRange: {
      type: Array,
      default: () => [],
    },
    preSelectedRange: {
      type: Array,
      default: () => [],
    },
    rightArrow: {
      type: Boolean,
      default: true,
    },
    leftArrow: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    generateCalendar(year, month) {
      const firstDayOfMonth = new Date(year, month, 1).getDay(); // День недели 1-го числа (0 = Вс, 6 = Сб)
      const daysInMonth = new Date(year, month + 1, 0).getDate(); // Количество дней в месяце

      // Сдвиг дней (если 1-е число выпадает на Воскресенье, то передвигаем в Понедельник)
      const offset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

      this.calendarDays = new Array(offset)
        .fill(null)
        .concat(Array.from({ length: daysInMonth }, (_, i) => i + 1));
    },
    isFirstOrLastInRange(date) {
      if (this.selectedRange.length) {
        const firstDate = this.selectedRange[0];
        const lastDate = this.selectedRange[this.selectedRange.length - 1];
        const preLastDate =
          this.preSelectedRange[this.preSelectedRange.length - 1];
        let result =
          (date === firstDate.getDate() &&
            this.month === firstDate.getMonth()) ||
          (date === lastDate.getDate() && this.month === lastDate.getMonth());
        if (this.preSelectedRange.length) {
          result =
            (date === firstDate.getDate() &&
              this.month === firstDate.getMonth()) ||
            (date === lastDate.getDate() &&
              this.month === lastDate.getMonth()) ||
            (date === preLastDate.getDate() &&
              this.month === preLastDate.getMonth());
        }
        return result;
      }
    },
    isBetweenInRange(date) {
      // Если предварительный диапазон не заполнен до двух дат – возвращаем false
      // if (this.preSelectedRange.length < 2 && !this.selectedRange.length) {
      //   return false;
      // }

      // Проверка для preSelectedRange: исключая первый и последний элемент
      const isInPreRange = this.preSelectedRange.some((d, index) => {
        return (
          index !== 0 &&
          index !== this.preSelectedRange.length - 1 &&
          d.getDate() === date &&
          this.month === d.getMonth() &&
          this.year === d.getFullYear()
        );
      });

      // Проверка для selectedRange: исключая первый и последний элемент
      const isInSelectedRange = this.selectedRange.some((d, index) => {
        return (
          index !== 0 &&
          index !== this.selectedRange.length - 1 &&
          d.getDate() === date &&
          this.month === d.getMonth() &&
          this.year === d.getFullYear()
        );
      });

      return isInPreRange || isInSelectedRange;
    },
  },

  data() {
    return {
      calendarDays: [], // Даты текущего месяца

      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
    };
  },
  computed: {
    monthString() {
      return this.months[this.month];
    },
    days() {
      return ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
    },
    today() {
      const now = new Date();
      const month = now.getMonth();
      const year = now.getFullYear();
      if (this.year === year && this.month === month) {
        return new Date().getDate();
      }
      return null;
    },
  },
  watch: {
    month() {
      this.generateCalendar(this.year, this.month);
    },
    year() {
      this.generateCalendar(this.year, this.month);
    },
  },
  mounted() {
    this.generateCalendar(this.year, this.month);
  },
};
</script>

<style src="./DatePicker.scss" lang="scss" scoped />

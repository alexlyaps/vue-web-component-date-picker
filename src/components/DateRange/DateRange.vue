<template>
  <div class="date-range-wrapper">
    <div class="date-range-content">
      <div class="date-range-content__badges" grid-area="badges">
        <TextComponent
          tag="h3"
          size="display-sm"
          align="center"
          weight="semibold"
          color="plum-blue"
        >
          Date Picker
        </TextComponent>
      </div>
      <div class="date-range-content__left">
        <div class="input-container">
          <InputField
            left-icon="calendar"
            v-model="modelDateLeft"
            :bottomIndent="16"
            placeholder="dd/mm/yyyy"
          />
        </div>
        <DatePicker
          @rightClick="handleLeftCalendarRight"
          @leftClick="handleLeftCalendarLeft"
          @selectDate="handleSelectDate"
          @mouseOverDate="handleMouseOverDate"
          :month="leftMonth"
          :year="leftYear"
          :date="leftDate"
          :selectedRange="selectedRange"
          :preSelectedRange="preSelectedRange"
          :right-arrow="!leftPickerLimit"
        />
      </div>
      <div class="date-range-content__right">
        <div class="input-container">
          <InputField
            left-icon="calendar"
            v-model="modelDateRight"
            :bottomIndent="16"
            placeholder="dd/mm/yyyy"
          />
        </div>
        <DatePicker
          @rightClick="handleRightCalendarRight"
          @leftClick="handleRightCalendarLeft"
          @selectDate="handleSelectDate"
          @mouseOverDate="handleMouseOverDate"
          :month="rightMonth"
          :year="rightYear"
          :date="rightDate"
          :selectedRange="selectedRange"
          :preSelectedRange="preSelectedRange"
          :leftArrow="!rightPickerLimit"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, watch } from "vue";

import TextComponent from "@/components/TextComponent/TextComponent.vue";
import DatePicker from "@/components/DatePicker/DatePicker.vue";
import InputField from "@/components/Inputs/InputField.vue";

defineProps({
  isVisible: Boolean,
});

const selectedRange = ref([]);

const isValidDate = (day, month, year) => {
  const date = new Date(year, month - 1, day);
  return (
    date.getFullYear() === +year &&
    date.getMonth() === month - 1 &&
    date.getDate() === +day
  );
};

const leftDate = ref(null);
const leftMonth = ref(new Date().getMonth());
const leftYear = ref(new Date().getFullYear());
const leftPickerLimit = ref(true);
const modelDateLeft = ref("");
const isChosenWithClick = ref(true);

const handleLeftCalendarRight = () => {
  // Проверяем, чтобы leftMonth не был всего на 1 месяц позади rightMonth
  if (
    leftYear.value === rightYear.value &&
    leftMonth.value + 1 === rightMonth.value
  ) {
    return;
  }

  leftMonth.value++;
  if (leftMonth.value > 11) {
    leftMonth.value = 0;
    leftYear.value++;
  }
};

const handleLeftCalendarLeft = () => {
  leftMonth.value--;
  if (leftMonth.value < 0) {
    leftMonth.value = 11;
    leftYear.value--;
  }
};

const rightDate = ref(null);
const rightMonth = ref(new Date().getMonth() + 1);
const rightYear = ref(new Date().getFullYear());
const rightPickerLimit = ref(true);
const modelDateRight = ref("");

const handleRightCalendarRight = () => {
  rightMonth.value++;
  if (rightMonth.value > 11) {
    rightMonth.value = 0;
    rightYear.value++;
  }
};

const handleRightCalendarLeft = () => {
  // Проверяем, чтобы rightMonth не был всего на 1 месяц впереди leftMonth
  if (
    rightYear.value === leftYear.value &&
    rightMonth.value === leftMonth.value + 1
  ) {
    return;
  }

  rightMonth.value--;
  if (rightMonth.value < 0) {
    rightMonth.value = 11;
    rightYear.value--;
  }
};

watch([leftMonth, rightMonth], () => {
  if (leftMonth.value === rightMonth.value - 1) {
    leftPickerLimit.value = true;
    rightPickerLimit.value = true;
  } else {
    leftPickerLimit.value = false;
    rightPickerLimit.value = false;
  }
});

const handleSelectDate = (date, month, year) => {
  const selectedDate = new Date(year, month, date);

  if (selectedRange.value.length === 0) {
    selectedRange.value.push(selectedDate);
    preSelectedRange.value = [];
  } else if (selectedRange.value.length === 1) {
    selectedRange.value = [...preSelectedRange.value];
    preSelectedRange.value = [];
  } else {
    selectedRange.value = [selectedDate];
    preSelectedRange.value = [];
  }

  isChosenWithClick.value = true;
};

const preSelectedRange = ref([]);

const handleMouseOverDate = (date, month, year) => {
  const selectedDate = new Date(year, month, date);
  if (selectedRange.value.length === 1) {
    const startDate = selectedRange.value[0];
    const endDate = selectedDate;
    preSelectedRange.value = [];
    for (
      let currentDate = new Date(startDate);
      currentDate <= endDate;
      currentDate.setDate(currentDate.getDate() + 1)
    ) {
      preSelectedRange.value.push(new Date(currentDate));
    }
  }
};

const rebuildRange = (startDate, endDate) => {
  const range = [];

  for (
    let current = new Date(startDate);
    current <= endDate;
    current.setDate(current.getDate() + 1)
  ) {
    range.push(new Date(current));
  }

  return range;
};

const emit = defineEmits(["updateRange", "calendarClick"]);

watch(
  selectedRange,
  () => {
    if (selectedRange.value.length === 1) {
      const date = selectedRange.value[0];
      modelDateLeft.value = `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1).toString().padStart(2, "0")}/${date.getFullYear()}`;
    } else if (selectedRange.value.length >= 2) {
      const date = selectedRange.value[selectedRange.value.length - 1];
      modelDateRight.value = `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1).toString().padStart(2, "0")}/${date.getFullYear()}`;
    }
    emit("rangeUpdate", selectedRange);
  },
  { deep: true }
);

watch(modelDateLeft, (formatted) => {
  const match = formatted.match(/^\d{1,2}\/\d{1,2}\/\d{4}$/);
  if (!match) return;
  let [day, month, year] = formatted.split("/").map(Number);
  if (!isValidDate(day, month, year)) return;
  const leftDate = new Date(year, month - 1, day);
  selectedRange.value =
    selectedRange.value.length === 0
      ? [leftDate]
      : rebuildRange(
          leftDate,
          selectedRange.value[selectedRange.value.length - 1]
        );
  leftMonth.value = month - 1;
  leftYear.value = year;
  if (month - 1 === rightMonth.value) {
    rightMonth.value += 1;
    rightYear.value = year;
  }
});

watch(modelDateRight, (formatted) => {
  const match = formatted.match(/^\d{1,2}\/\d{1,2}\/\d{4}$/);
  if (!match) return;
  let [day, month, year] = formatted.split("/").map(Number);
  if (!isValidDate(day, month, year)) return;
  const rightDate = new Date(year, month - 1, day);
  if (selectedRange.value.length >= 1) {
    selectedRange.value = rebuildRange(selectedRange.value[0], rightDate);
  }
  if (month - 1 !== leftMonth.value) {
    rightMonth.value = month - 1;
    rightYear.value = year;
  }
});
</script>

<style src="./DateRange.scss" lang="scss" scoped />

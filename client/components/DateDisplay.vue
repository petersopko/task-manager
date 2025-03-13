<template>
  <span :class="className"> {{ prefix }}{{ formattedDate }} </span>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  date: {
    type: String,
    required: true,
  },
  prefix: {
    type: String,
    default: "",
  },
  className: {
    type: String,
    default: "text-sm text-gray-500",
  },
  format: {
    type: String,
    default: "local", // 'local', 'iso', 'relative'
  },
});

const formattedDate = computed(() => {
  if (!props.date) return "";

  const dateObj = new Date(props.date);

  switch (props.format) {
    case "iso":
      return dateObj.toISOString().split("T")[0];
    case "relative":
      return getRelativeTimeString(dateObj);
    case "local":
    default:
      return dateObj.toLocaleDateString();
  }
});

function getRelativeTimeString(date: Date): string {
  const now = new Date();
  const diffInMs = date.getTime() - now.getTime();
  const diffInDays = Math.round(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) return "Today";
  if (diffInDays === 1) return "Tomorrow";
  if (diffInDays === -1) return "Yesterday";
  if (diffInDays > 0) return `In ${diffInDays} days`;
  return `${Math.abs(diffInDays)} days ago`;
}
</script>

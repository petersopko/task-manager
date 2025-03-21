<template>
  <button
    :type="type"
    :class="[
      'inline-flex items-center justify-center rounded focus:outline-none transition-colors',
      sizeClasses,
      variantClasses,
      fullWidth ? 'w-full' : '',
      disabled ? 'opacity-50 cursor-not-allowed' : '',
      className,
    ]"
    :disabled="disabled || loading"
    @click="$emit('click', $event)"
  >
    <span v-if="loading" class="mr-2">
      <svg
        class="animate-spin h-4 w-4"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </span>
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
const props = defineProps({
  // Button variants
  variant: {
    type: String,
    default: "primary",
    validator: (value: string) =>
      ["primary", "secondary", "danger", "text", "outline"].includes(value),
  },
  // Button sizes
  size: {
    type: String,
    default: "md",
    validator: (value: string) => ["sm", "md", "lg"].includes(value),
  },
  // Button type attribute
  type: {
    type: String as () => "button" | "submit" | "reset",
    default: "button",
  },
  // Full width button
  fullWidth: {
    type: Boolean,
    default: false,
  },
  // Disabled state
  disabled: {
    type: Boolean,
    default: false,
  },
  // Loading state
  loading: {
    type: Boolean,
    default: false,
  },
  // Additional classes
  className: {
    type: String,
    default: "",
  },
});

// Define emits
defineEmits(["click"]);

// Compute size classes based on size prop
const sizeClasses = computed(() => {
  switch (props.size) {
    case "sm":
      return "px-3 py-1.5 text-sm";
    case "lg":
      return "px-6 py-3 text-base";
    default: // md
      return "px-4 py-2 text-sm";
  }
});

// Compute variant classes based on variant prop
const variantClasses = computed(() => {
  switch (props.variant) {
    case "primary":
      return "bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50";
    case "secondary":
      return "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50";
    case "danger":
      return "bg-red-600 text-white hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-opacity-50";
    case "text":
      return "text-blue-600 hover:text-blue-800 hover:underline";
    case "outline":
      return "border border-gray-300 text-gray-700 hover:bg-gray-100 focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50";
    default:
      return "bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50";
  }
});
</script>

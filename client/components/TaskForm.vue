<template>
  <div
    class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50"
  >
    <div class="bg-white rounded-lg p-6 max-w-md w-full">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-bold">{{ task ? "Edit Task" : "Add Task" }}</h2>
        <Button
          @click="$emit('close')"
          variant="text"
          size="sm"
          className="text-gray-500 hover:text-gray-700"
        >
          <span class="text-2xl">&times;</span>
        </Button>
      </div>

      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label for="title" class="block text-gray-700 mb-2">Title</label>
          <input
            id="title"
            v-model="form.title"
            type="text"
            class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            required
            autocomplete="off"
          />
        </div>

        <div class="mb-4">
          <label for="description" class="block text-gray-700 mb-2"
            >Description</label
          >
          <textarea
            id="description"
            v-model="form.description"
            class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            rows="3"
            autocomplete="off"
          ></textarea>
        </div>

        <div class="mb-4">
          <label for="status" class="block text-gray-700 mb-2">Status</label>
          <select
            id="status"
            v-model="form.status"
            class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            required
            autocomplete="off"
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>

        <div class="mb-6">
          <label for="dueDate" class="block text-gray-700 mb-2">Due Date</label>
          <div class="relative" @click="openDatePicker">
            <input
              id="dueDate"
              ref="datePickerInput"
              v-model="form.dueDate"
              type="date"
              class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 cursor-pointer date-input"
              autocomplete="off"
            />
            <div
              class="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div class="flex justify-end space-x-2">
          <Button type="button" @click="$emit('close')" variant="outline">
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            :loading="loading"
            :disabled="loading"
          >
            {{ loading ? "Saving..." : "Save" }}
          </Button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import type { Task, TaskFormData } from "~/types";
import Button from "~/components/Button.vue";

const props = defineProps<{
  task: Task | null;
}>();

const emit = defineEmits<{
  close: [];
  save: [taskData: TaskFormData];
}>();

const loading = ref(false);
const datePickerInput = ref<HTMLInputElement | null>(null);

// Function to open the date picker
function openDatePicker() {
  if (datePickerInput.value) {
    datePickerInput.value.showPicker
      ? datePickerInput.value.showPicker()
      : datePickerInput.value.focus();
  }
}

// Initialize form with task data or defaults
const form = reactive<TaskFormData>({
  title: props.task?.title || "",
  description: props.task?.description || "",
  status: props.task?.status || "pending",
  dueDate: props.task?.dueDate
    ? new Date(props.task.dueDate).toISOString().split("T")[0]
    : null,
});

// Handle form submission
async function handleSubmit() {
  loading.value = true;

  try {
    // Validate form data
    if (!form.title || form.title.trim() === "") {
      alert("Title is required");
      loading.value = false;
      return;
    }

    // Prepare data for submission
    const taskData: TaskFormData = {
      title: form.title.trim(),
      description: form.description ? form.description.trim() : "",
      status: form.status || "pending",
      dueDate: form.dueDate || null,
    };

    // Emit the data to parent component to handle the save
    emit("save", taskData);
    emit("close");
  } catch (e) {
    console.error("Error preparing task data:", e);
    alert("Failed to prepare task data. Please try again.");
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
/* Hide the default calendar icon in date inputs */
.date-input::-webkit-calendar-picker-indicator {
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  cursor: pointer;
}
</style>

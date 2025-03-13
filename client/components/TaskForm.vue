<template>
  <Modal
    :isOpen="isOpen"
    :title="task ? 'Edit Task' : 'Add Task'"
    @close="$emit('close')"
  >
    <form @submit.prevent="handleSubmit">
      <FormInput
        id="title"
        label="Title"
        v-model="form.title"
        required
        autocomplete="off"
      />

      <FormTextarea
        id="description"
        label="Description"
        v-model="form.description"
        autocomplete="off"
      />

      <FormSelect
        id="status"
        label="Status"
        v-model="form.status"
        required
        autocomplete="off"
      >
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="done">Done</option>
      </FormSelect>

      <FormDatePicker
        id="dueDate"
        label="Due Date"
        :model-value="form.dueDate || ''"
        @update:model-value="form.dueDate = $event || null"
      />

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
  </Modal>
</template>

<script setup lang="ts">
import type { Task, TaskFormData } from "~/types";

const props = defineProps<{
  task: Task | null;
  isOpen?: boolean;
}>();

// Default value for isOpen
const isOpen = props.isOpen !== undefined ? props.isOpen : true;

const emit = defineEmits<{
  close: [];
  save: [taskData: TaskFormData];
}>();

const loading = ref(false);

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

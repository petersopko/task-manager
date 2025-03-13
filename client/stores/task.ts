import type { Task } from "~/types";

export const useTaskStore = defineStore("task", () => {
  // State
  const tasks = ref<Task[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const currentTask = ref<Task | null>(null);
  const config = useRuntimeConfig();

  // Actions
  async function fetchTasks() {
    loading.value = true;
    error.value = null;

    try {
      const { find } = useStrapi<Task>();
      const response = await find("tasks");

      // Handle the response based on its structure
      if (response && response.data) {
        // Type assertion to handle the unknown type
        const responseData = response.data as any[];
        tasks.value = Array.isArray(responseData)
          ? responseData
          : [responseData];
      } else {
        tasks.value = [];
      }
      return tasks.value;
    } catch (err: any) {
      error.value = "Failed to load tasks. Please try again.";
      return [];
    } finally {
      loading.value = false;
    }
  }

  async function deleteTask(taskId: number) {
    // Convert to number if it's a string
    if (typeof taskId === "string") {
      taskId = parseInt(taskId, 10);
    }

    if (!taskId || isNaN(taskId)) {
      error.value = "Invalid task ID";
      return false;
    }

    // Find the task in our list - use loose equality to handle string/number differences
    const taskIndex = tasks.value.findIndex(
      (task) => Number(task.id) === Number(taskId)
    );

    if (taskIndex === -1) {
      error.value = "Task not found";
      return false;
    }

    // Optimistically remove from UI
    const deletedTask = tasks.value.splice(taskIndex, 1)[0];

    try {
      // Get the JWT token from localStorage
      const jwt = localStorage.getItem("strapi_jwt");
      if (!jwt) {
        throw new Error("Authentication token not found");
      }

      // Direct fetch approach - more reliable
      const apiUrl = `${
        useRuntimeConfig().public.strapi.url
      }/api/tasks/${taskId}`;

      const response = await fetch(apiUrl, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Failed to delete task (${response.status}): ${errorText}`
        );
      }

      return true;
    } catch (err: any) {
      // Restore the task in the UI
      tasks.value.splice(taskIndex, 0, deletedTask);

      error.value = err.message || "Failed to delete task";
      return false;
    }
  }

  async function createTask(taskData: Partial<Task>) {
    loading.value = true;
    error.value = null;

    try {
      const { create } = useStrapi<Task>();
      // Create task with the proper structure expected by Strapi
      const response = await create("tasks", taskData);

      if (response && response.data) {
        // Add to our list - type assertion to handle the response
        const newTask = response.data as unknown as Task;
        tasks.value.push(newTask);
        return newTask;
      } else {
        throw new Error("Failed to create task: Invalid response");
      }
    } catch (err: any) {
      error.value = "Failed to create task. Please try again.";
      return null;
    } finally {
      loading.value = false;
    }
  }

  async function updateTask(taskId: number, taskData: Partial<Task>) {
    loading.value = true;
    error.value = null;

    try {
      const { update } = useStrapi<Task>();
      // Update task with the proper structure expected by Strapi
      const response = await update("tasks", taskId.toString(), taskData);

      if (response && response.data) {
        // Update in our list - type assertion to handle the response
        const updatedTask = response.data as unknown as Task;
        const index = tasks.value.findIndex((t) => t.id === taskId);
        if (index !== -1) {
          tasks.value[index] = updatedTask;
        }
        return updatedTask;
      } else {
        throw new Error("Failed to update task: Invalid response");
      }
    } catch (err: any) {
      error.value = "Failed to update task. Please try again.";
      return null;
    } finally {
      loading.value = false;
    }
  }

  function setCurrentTask(task: Task | null) {
    if (task) {
      // Create a clean copy of the task with only the needed properties
      currentTask.value = {
        id: task.id,
        title: task.title,
        description: task.description,
        status: task.status,
        dueDate: task.dueDate,
      };
    } else {
      currentTask.value = null;
    }
  }

  return {
    // State
    tasks,
    loading,
    error,
    currentTask,

    // Actions
    fetchTasks,
    deleteTask,
    createTask,
    updateTask,
    setCurrentTask,
  };
});

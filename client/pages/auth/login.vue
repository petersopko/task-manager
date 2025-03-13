<template>
  <div class="flex justify-center">
    <div class="w-full max-w-md bg-white p-8 rounded shadow-md">
      <h1 class="text-2xl font-bold mb-6 text-center">Login</h1>

      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label for="identifier" class="block text-gray-700 mb-2">Email</label>
          <input
            id="identifier"
            v-model="form.identifier"
            type="email"
            class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            required
            autocomplete="email"
          />
        </div>

        <div class="mb-6">
          <label for="password" class="block text-gray-700 mb-2"
            >Password</label
          >
          <input
            id="password"
            v-model="form.password"
            type="password"
            class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            required
            autocomplete="current-password"
          />
        </div>

        <div v-if="error" class="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {{ error }}
        </div>

        <Button
          type="submit"
          variant="primary"
          :loading="loading"
          :disabled="loading"
          fullWidth
        >
          {{ loading ? "Logging in..." : "Login" }}
        </Button>
      </form>

      <div class="mt-4 text-center">
        <p>
          Don't have an account?
          <Button
            @click="router.push('/auth/register')"
            variant="text"
            size="sm"
            className="text-blue-600 hover:underline"
          >
            Register
          </Button>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
// Use the auth store
const authStore = useAuthStore();
const router = useRouter();
import Button from "~/components/Button.vue";

const form = reactive({
  identifier: "",
  password: "",
});

const loading = ref(false);
const error = ref(null);

// Redirect if already logged in
onMounted(() => {
  if (authStore.isAuthenticated) {
    router.push("/tasks");
  }
});

async function handleLogin() {
  error.value = null;
  loading.value = true;

  try {
    const success = await authStore.login(form);

    if (success) {
      // Use router.push instead of window.location for a cleaner navigation
      // without triggering a full page refresh
      router.push("/tasks");
    } else {
      error.value =
        authStore.error?.message ||
        "Login failed. Please check your credentials.";
    }
  } catch (e) {
    console.error("Login error:", e);
    error.value = e.message || "Login failed. Please check your credentials.";
  } finally {
    loading.value = false;
  }
}
</script>

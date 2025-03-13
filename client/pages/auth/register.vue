<template>
  <div class="flex justify-center">
    <div class="w-full max-w-md bg-white p-8 rounded shadow-md">
      <h1 class="text-2xl font-bold mb-6 text-center">Register</h1>

      <form @submit.prevent="handleRegister">
        <div class="mb-4">
          <label for="email" class="block text-gray-700 mb-2">Email</label>
          <input
            id="email"
            v-model="form.email"
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
            minlength="6"
            autocomplete="new-password"
          />
          <p class="text-xs text-gray-500 mt-1">
            Password must be at least 6 characters
          </p>
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
          {{ loading ? "Registering..." : "Register" }}
        </Button>
      </form>

      <div class="mt-4 text-center">
        <p>
          Already have an account?
          <Button
            @click="router.push('/auth/login')"
            variant="text"
            size="sm"
            className="text-blue-600 hover:underline"
          >
            Login
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
  email: "",
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

async function handleRegister() {
  error.value = null;
  loading.value = true;

  try {
    // Create registration data with username set to email
    const registrationData = {
      username: form.email,
      email: form.email,
      password: form.password,
    };

    const success = await authStore.register(registrationData);

    if (success) {
      // Use window.location for a full page refresh to ensure state is clean
      window.location.href = "/tasks";
    } else {
      // Check if the error is that the email is already taken
      if (authStore.error?.error?.message?.includes("already taken")) {
        error.value =
          "This email is already registered. Please use a different email or try logging in.";
      } else {
        error.value =
          authStore.error?.message || "Registration failed. Please try again.";
      }
    }
  } catch (e) {
    console.error("Registration error:", e);
    error.value = e.message || "Registration failed. Please try again.";
  } finally {
    loading.value = false;
  }
}
</script>

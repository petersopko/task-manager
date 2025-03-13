<template>
  <div class="flex justify-center">
    <div class="w-full max-w-md bg-white p-8 rounded shadow-md">
      <h1 class="text-2xl font-bold mb-6 text-center">Login</h1>

      <form @submit.prevent="handleLogin">
        <FormInput
          id="identifier"
          label="Email"
          v-model="form.identifier"
          type="email"
          required
          autocomplete="email"
        />

        <FormInput
          id="password"
          label="Password"
          v-model="form.password"
          type="password"
          required
          autocomplete="current-password"
        />

        <ErrorAlert :message="error" />

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

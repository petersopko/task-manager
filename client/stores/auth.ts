import type { User, LoginCredentials, RegisterData } from "~/types";

export const useAuthStore = defineStore("auth", () => {
  // State
  const user = ref<User | null>(null);
  const loading = ref(false);
  const error = ref<any>(null);
  const initialized = ref(false); // Add a flag to track initialization

  // Getters
  const isAuthenticated = computed(() => !!user.value);
  const userEmail = computed(
    () => user.value?.email || user.value?.username || ""
  );

  // Actions
  async function initialize() {
    // Skip if already initialized or on server or already loading
    if (import.meta.server || user.value || initialized.value || loading.value)
      return;

    loading.value = true;
    error.value = null;

    try {
      const { fetchUser } = useStrapiAuth();
      const jwt = localStorage.getItem("strapi_jwt");

      if (jwt) {
        const userData = await fetchUser();
        if (userData) {
          // Convert the ref to a plain object
          user.value = JSON.parse(JSON.stringify(userData));
        } else {
          localStorage.removeItem("strapi_jwt");
        }
      }
    } catch (err) {
      error.value = err;
      localStorage.removeItem("strapi_jwt");
    } finally {
      loading.value = false;
      initialized.value = true; // Mark as initialized
    }
  }

  async function login(credentials: LoginCredentials) {
    loading.value = true;
    error.value = null;

    try {
      const { login } = useStrapiAuth();
      const response = await login(credentials);

      if (response && response.jwt) {
        localStorage.setItem("strapi_jwt", response.jwt);

        // Use the user data from the login response if available
        if (response.user) {
          user.value = JSON.parse(JSON.stringify(response.user));
          initialized.value = true; // Mark as initialized since we have the user
          return true;
        }

        // If user data is not in the response, fetch it
        const { fetchUser } = useStrapiAuth();
        const userData = await fetchUser();
        if (userData) {
          user.value = JSON.parse(JSON.stringify(userData));
          initialized.value = true; // Mark as initialized
        }

        return true;
      } else {
        throw new Error("No JWT token received from login response");
      }
    } catch (err) {
      error.value = err;
      return false;
    } finally {
      loading.value = false;
    }
  }

  async function register(userData: RegisterData) {
    loading.value = true;
    error.value = null;

    try {
      const { register } = useStrapiAuth();
      const response = await register(userData);

      if (response && response.jwt) {
        localStorage.setItem("strapi_jwt", response.jwt);

        // Use the user data from the register response if available
        if (response.user) {
          user.value = JSON.parse(JSON.stringify(response.user));
          initialized.value = true; // Mark as initialized
          return true;
        }

        // If user data is not in the response, fetch it
        const { fetchUser } = useStrapiAuth();
        const fetchedUser = await fetchUser();
        if (fetchedUser) {
          user.value = JSON.parse(JSON.stringify(fetchedUser));
          initialized.value = true; // Mark as initialized
        }

        return true;
      } else {
        throw new Error("No JWT token received from registration response");
      }
    } catch (err) {
      error.value = err;
      return false;
    } finally {
      loading.value = false;
    }
  }

  async function logout() {
    loading.value = true;

    try {
      const { logout } = useStrapiAuth();
      await logout();

      // Clear local state
      user.value = null;
      initialized.value = false; // Reset initialization flag
      localStorage.removeItem("strapi_jwt");

      return true;
    } catch (err) {
      error.value = err;
      return false;
    } finally {
      loading.value = false;
    }
  }

  return {
    // State
    user,
    loading,
    error,
    initialized,

    // Getters
    isAuthenticated,
    userEmail,

    // Actions
    initialize,
    login,
    register,
    logout,
  };
});

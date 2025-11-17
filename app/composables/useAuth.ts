import type { User } from "~/types";

export const useAuth = () => {
  const user = useState<User | null>("auth.user", () => null);
  const isAuthenticated = computed(() => !!user.value);

  const login = async (email: string, password: string) => {
    try {
      const { data } = await $fetch<{ success: boolean; data: { user: User; token: string } }>("/api/auth/login", {
        method: "POST",
        body: { email, password },
      });

      if (data?.user) {
        user.value = data.user;
        // Store token in cookie
        const token = useCookie("auth-token", { maxAge: 60 * 60 * 24 * 7 }); // 7 days
        token.value = data.token;
        return { success: true, user: data.user };
      }
      return { success: false, error: "Login failed" };
    } catch (error: any) {
      return { success: false, error: error.message || "Login failed" };
    }
  };

  const logout = async () => {
    try {
      await $fetch("/api/auth/logout", { method: "POST" });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      user.value = null;
      const token = useCookie("auth-token");
      token.value = null;
    }
  };

  const checkAuth = async () => {
    try {
      const token = useCookie("auth-token");
      if (!token.value) {
        user.value = null;
        return false;
      }

      const { data } = await $fetch<{ success: boolean; data: User }>("/api/auth/me");
      if (data) {
        user.value = data;
        return true;
      }
      return false;
    } catch (error) {
      user.value = null;
      return false;
    }
  };

  return {
    user: readonly(user),
    isAuthenticated,
    login,
    logout,
    checkAuth,
  };
};


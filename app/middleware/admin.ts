export default defineNuxtRouteMiddleware(async (to) => {
  // Only protect admin routes
  if (!to.path.startsWith("/admin")) {
    return;
  }

  // Allow login page
  if (to.path === "/admin/login" || to.path === "/login") {
    return;
  }

  try {
    // Check auth status
    const token = useCookie("auth-token");
    if (!token.value) {
      return navigateTo("/admin/login");
    }

    // Verify token by calling API
    const response = await $fetch<{ success: boolean; data?: any }>("/api/auth/me", {
      headers: {
        Cookie: `auth-token=${token.value}`,
      },
    }).catch(() => ({ success: false }));

    if (!response?.success) {
      return navigateTo("/admin/login");
    }
  } catch (error) {
    return navigateTo("/admin/login");
  }
});


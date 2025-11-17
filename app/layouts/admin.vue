<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
    <div class="flex">
      <!-- Sidebar -->
      <aside
        v-motion-slide-left
        class="w-64 bg-white border-r border-gray-200 min-h-screen sticky top-0 shadow-sm"
      >
        <div class="p-6">
          <NuxtLink
            to="/admin"
            class="flex items-center space-x-3 mb-8 group"
            v-motion-fade
          >
            <div class="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
              <span class="text-primary-foreground font-bold text-lg">THP</span>
            </div>
            <div>
              <span class="font-bold text-lg block">Admin Panel</span>
              <span class="text-xs text-gray-500">Thịnh Hưng Phát</span>
            </div>
          </NuxtLink>

          <!-- User Info -->
          <div
            v-if="user"
            class="mb-6 p-3 bg-gray-50 rounded-lg border border-gray-200"
            v-motion-fade
          >
            <div class="flex items-center space-x-3">
              <div class="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <span class="text-primary font-semibold">{{ user.name?.charAt(0) || "A" }}</span>
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900 truncate">{{ user.name }}</p>
                <p class="text-xs text-gray-500 truncate">{{ user.email }}</p>
              </div>
            </div>
          </div>

          <nav class="space-y-1">
            <NuxtLink
              to="/admin"
              class="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-100 transition-all group"
              active-class="bg-primary text-primary-foreground shadow-md"
            >
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span class="font-medium">Dashboard</span>
            </NuxtLink>
            <NuxtLink
              to="/admin/posts"
              class="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-100 transition-all group"
              active-class="bg-primary text-primary-foreground shadow-md"
            >
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span class="font-medium">Bài viết</span>
            </NuxtLink>
                  <NuxtLink
                    to="/admin/projects"
                    class="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-100 transition-all group"
                    active-class="bg-primary text-primary-foreground shadow-md"
                  >
                    <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 21h4.5m-7.5 0h10.5m-14.25-7.5h18M3.75 21a.75.75 0 01-.75-.75V6.75A1.5 1.5 0 014.5 5.25h15a1.5 1.5 0 011.5 1.5v13.5a.75.75 0 01-.75.75M7.5 9.75h.008v.008H7.5v-.008zM7.5 12.75h.008v.008H7.5v-.008zM7.5 15.75h.008v.008H7.5v-.008zM12 9.75h4.5m-4.5 3h4.5m-4.5 3h2.25" />
                    </svg>
                    <span class="font-medium">Dự án</span>
                  </NuxtLink>
            <NuxtLink
              to="/admin/users"
              class="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-100 transition-all group"
              active-class="bg-primary text-primary-foreground shadow-md"
            >
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <span class="font-medium">Người dùng</span>
            </NuxtLink>
                  <NuxtLink
                    to="/admin/projects"
                    class="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-100 transition-all group"
                    active-class="bg-primary text-primary-foreground shadow-md"
                  >
                    <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 17L9 20 6 20 6 4 18 4 18 20 15 20 14.25 17z" />
                      <path stroke-linecap="round" stroke-linejoin="round" d="M9 8h6m-6 4h6" />
                    </svg>
                    <span class="font-medium">Dự án</span>
                  </NuxtLink>
          </nav>

          <div class="mt-8 pt-6 border-t border-gray-200">
            <button
              @click="handleLogout"
              class="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-red-50 text-red-600 transition-all group"
            >
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span class="font-medium">Đăng xuất</span>
            </button>
            <NuxtLink
              to="/"
              class="mt-2 flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-100 transition-all text-gray-600"
            >
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span class="font-medium">Về website</span>
            </NuxtLink>
          </div>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="flex-1 p-8">
        <div
          v-motion-fade
          class="max-w-7xl mx-auto"
        >
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
const { user, logout } = useAuth();
const router = useRouter();

const handleLogout = async () => {
  await logout();
  router.push("/admin/login");
};
</script>


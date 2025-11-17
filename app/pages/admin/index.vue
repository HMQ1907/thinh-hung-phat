<template>
  <div>
    <div
      v-motion-fade
      class="mb-8"
    >
      <h1 class="text-4xl font-bold mb-2 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Dashboard</h1>
      <p class="text-gray-600">Tổng quan về website và thống kê</p>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div
        v-for="(stat, index) in statCards"
        :key="index"
        v-motion-slide-visible-once-bottom
        :delay="index * 100"
        class="group bg-white p-6 rounded-2xl border border-gray-200 hover:border-primary/50 hover:shadow-xl transition-all duration-300"
      >
        <div class="flex items-center justify-between mb-4">
          <div class="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
            <component :is="stat.icon" class="h-6 w-6 text-primary" />
          </div>
          <span class="text-2xl font-bold text-gray-900">{{ stat.value }}</span>
        </div>
        <h3 class="text-sm font-semibold text-gray-600 uppercase tracking-wide">{{ stat.label }}</h3>
      </div>
    </div>

    <!-- Welcome Card -->
    <div
      v-motion-slide-visible-once-bottom
      class="bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-8 md:p-12 text-primary-foreground shadow-2xl"
    >
      <div class="max-w-2xl">
        <h2 class="text-3xl font-bold mb-4">Chào mừng đến với Admin Panel</h2>
        <p class="text-lg opacity-95 leading-relaxed mb-6">
          Quản lý nội dung, người dùng và các tính năng khác của website Thịnh Hưng Phát một cách dễ dàng và hiệu quả.
        </p>
        <div class="flex flex-wrap gap-4">
          <NuxtLink
            to="/admin/posts"
            class="px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-xl font-semibold hover:bg-white/30 transition-all border border-white/30"
          >
            Quản lý bài viết
          </NuxtLink>
          <NuxtLink
            to="/admin/users"
            class="px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-xl font-semibold hover:bg-white/30 transition-all border border-white/30"
          >
            Quản lý người dùng
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "admin",
  middleware: "admin" as any,
});

useHead({
  title: "Admin Dashboard - Thịnh Hưng Phát",
});

const stats = ref({
  posts: 0,
  users: 0,
  contacts: 0,
});

// Fetch stats
const { data: postsData } = await useFetch("/api/admin/posts");
const { data: usersData } = await useFetch("/api/admin/users");
const { data: contactsData } = await useFetch("/api/admin/contacts");

stats.value = {
  posts: postsData.value?.data?.length || 0,
  users: usersData.value?.data?.length || 0,
  contacts: contactsData.value?.data?.length || 0,
};

const statCards = computed(() => [
  {
    label: "Tổng bài viết",
    value: stats.value.posts,
    icon: "svg",
  },
  {
    label: "Người dùng",
    value: stats.value.users,
    icon: "svg",
  },
  {
    label: "Liên hệ mới",
    value: stats.value.contacts,
    icon: "svg",
  },
]);
</script>


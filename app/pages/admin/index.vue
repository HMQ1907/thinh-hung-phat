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
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
      <div
        v-for="(stat, index) in statCards"
        :key="index"
        v-motion-slide-visible-once-bottom
        :delay="index * 50"
        class="group bg-white p-6 rounded-2xl border border-gray-200 hover:border-primary/50 hover:shadow-xl transition-all duration-300 cursor-pointer"
        @click="stat.link && navigateTo(stat.link)"
      >
        <div class="flex items-start justify-between mb-3">
          <div 
            class="w-14 h-14 rounded-xl flex items-center justify-center transition-colors shadow-sm"
            :class="stat.iconBg"
          >
            <component :is="stat.icon" class="h-7 w-7" :class="stat.iconColor" />
          </div>
        </div>
        <div class="space-y-1">
          <h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wider">{{ stat.label }}</h3>
          <p class="text-3xl font-bold" :class="stat.valueColor">{{ stat.value }}</p>
        </div>
        <div v-if="stat.change" class="mt-3 flex items-center text-xs" :class="stat.changeColor">
          <svg class="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="stat.changeIcon" />
          </svg>
          <span>{{ stat.change }}</span>
        </div>
      </div>
    </div>

    <!-- Quick Actions Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <NuxtLink
        to="/admin/posts"
        v-motion-slide-visible-once-bottom
        :delay="200"
        class="group bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl p-6 border border-blue-200 hover:shadow-lg transition-all duration-300"
      >
        <div class="flex items-center justify-between mb-4">
          <div class="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center group-hover:scale-110 transition-transform">
            <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <svg class="h-5 w-5 text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </div>
        <h3 class="text-lg font-bold text-gray-900 mb-1">Quản lý bài viết</h3>
        <p class="text-sm text-gray-600">Tạo và chỉnh sửa nội dung bài viết</p>
      </NuxtLink>

      <NuxtLink
        to="/admin/projects"
        v-motion-slide-visible-once-bottom
        :delay="250"
        class="group bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-2xl p-6 border border-purple-200 hover:shadow-lg transition-all duration-300"
      >
        <div class="flex items-center justify-between mb-4">
          <div class="w-12 h-12 rounded-xl bg-purple-500 flex items-center justify-center group-hover:scale-110 transition-transform">
            <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 21h4.5m-7.5 0h10.5m-14.25-7.5h18M3.75 21a.75.75 0 01-.75-.75V6.75A1.5 1.5 0 014.5 5.25h15a1.5 1.5 0 011.5 1.5v13.5a.75.75 0 01-.75.75M7.5 9.75h.008v.008H7.5v-.008zM7.5 12.75h.008v.008H7.5v-.008zM7.5 15.75h.008v.008H7.5v-.008zM12 9.75h4.5m-4.5 3h4.5m-4.5 3h2.25" />
            </svg>
          </div>
          <svg class="h-5 w-5 text-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </div>
        <h3 class="text-lg font-bold text-gray-900 mb-1">Quản lý dự án</h3>
        <p class="text-sm text-gray-600">Quản lý các dự án tiêu biểu</p>
      </NuxtLink>

      <NuxtLink
        to="/admin/products"
        v-motion-slide-visible-once-bottom
        :delay="300"
        class="group bg-gradient-to-br from-green-50 to-green-100/50 rounded-2xl p-6 border border-green-200 hover:shadow-lg transition-all duration-300"
      >
        <div class="flex items-center justify-between mb-4">
          <div class="w-12 h-12 rounded-xl bg-green-500 flex items-center justify-center group-hover:scale-110 transition-transform">
            <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
            </svg>
          </div>
          <svg class="h-5 w-5 text-green-600 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </div>
        <h3 class="text-lg font-bold text-gray-900 mb-1">Quản lý sản phẩm</h3>
        <p class="text-sm text-gray-600">Quản lý danh mục sản phẩm</p>
      </NuxtLink>

      <NuxtLink
        to="/admin/categories"
        v-motion-slide-visible-once-bottom
        :delay="350"
        class="group bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-2xl p-6 border border-orange-200 hover:shadow-lg transition-all duration-300"
      >
        <div class="flex items-center justify-between mb-4">
          <div class="w-12 h-12 rounded-xl bg-orange-500 flex items-center justify-center group-hover:scale-110 transition-transform">
            <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
            </svg>
          </div>
          <svg class="h-5 w-5 text-orange-600 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </div>
        <h3 class="text-lg font-bold text-gray-900 mb-1">Quản lý danh mục</h3>
        <p class="text-sm text-gray-600">Phân loại sản phẩm và bài viết</p>
      </NuxtLink>

      <NuxtLink
        to="/admin/contacts"
        v-motion-slide-visible-once-bottom
        :delay="400"
        class="group bg-gradient-to-br from-red-50 to-red-100/50 rounded-2xl p-6 border border-red-200 hover:shadow-lg transition-all duration-300"
      >
        <div class="flex items-center justify-between mb-4">
          <div class="w-12 h-12 rounded-xl bg-red-500 flex items-center justify-center group-hover:scale-110 transition-transform">
            <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
          </div>
          <svg class="h-5 w-5 text-red-600 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </div>
        <h3 class="text-lg font-bold text-gray-900 mb-1">Quản lý liên hệ</h3>
        <p class="text-sm text-gray-600">Xem và trả lời tin nhắn khách hàng</p>
      </NuxtLink>

      <NuxtLink
        to="/admin/users"
        v-motion-slide-visible-once-bottom
        :delay="450"
        class="group bg-gradient-to-br from-indigo-50 to-indigo-100/50 rounded-2xl p-6 border border-indigo-200 hover:shadow-lg transition-all duration-300"
      >
        <div class="flex items-center justify-between mb-4">
          <div class="w-12 h-12 rounded-xl bg-indigo-500 flex items-center justify-center group-hover:scale-110 transition-transform">
            <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <svg class="h-5 w-5 text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </div>
        <h3 class="text-lg font-bold text-gray-900 mb-1">Quản lý người dùng</h3>
        <p class="text-sm text-gray-600">Quản lý tài khoản admin</p>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { h } from 'vue';

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
  newContacts: 0,
  projects: 0,
  categories: 0,
  products: 0,
});

// Fetch stats
const { data: postsData } = await useFetch("/api/admin/posts");
const { data: usersData } = await useFetch("/api/admin/users");
const { data: contactsData } = await useFetch("/api/admin/contacts");
const { data: projectsData } = await useFetch("/api/admin/projects");
const { data: categoriesData } = await useFetch("/api/admin/categories");
const { data: productsData } = await useFetch("/api/admin/products");

stats.value = {
  posts: postsData.value?.data?.length || 0,
  users: usersData.value?.data?.length || 0,
  contacts: contactsData.value?.data?.length || 0,
  newContacts: contactsData.value?.data?.filter((c: any) => c.status === 'new').length || 0,
  projects: projectsData.value?.data?.length || 0,
  categories: categoriesData.value?.data?.length || 0,
  products: productsData.value?.data?.length || 0,
};

const PostIcon = () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' })
]);

const UserIcon = () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' })
]);

const ContactIcon = () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9' })
]);

const ProjectIcon = () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M9.75 21h4.5m-7.5 0h10.5m-14.25-7.5h18M3.75 21a.75.75 0 01-.75-.75V6.75A1.5 1.5 0 014.5 5.25h15a1.5 1.5 0 011.5 1.5v13.5a.75.75 0 01-.75.75M7.5 9.75h.008v.008H7.5v-.008zM7.5 12.75h.008v.008H7.5v-.008zM7.5 15.75h.008v.008H7.5v-.008zM12 9.75h4.5m-4.5 3h4.5m-4.5 3h2.25' })
]);

const CategoryIcon = () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z' })
]);

const ProductIcon = () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z' })
]);

const statCards = computed(() => [
  {
    label: "Tổng bài viết",
    value: stats.value.posts,
    icon: PostIcon,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    valueColor: "text-gray-900",
    link: "/admin/posts",
  },
  {
    label: "Tổng dự án",
    value: stats.value.projects,
    icon: ProjectIcon,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
    valueColor: "text-gray-900",
    link: "/admin/projects",
  },
  {
    label: "Danh mục",
    value: stats.value.categories,
    icon: CategoryIcon,
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
    valueColor: "text-gray-900",
    link: "/admin/categories",
  },
  {
    label: "Sản phẩm",
    value: stats.value.products,
    icon: ProductIcon,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    valueColor: "text-gray-900",
    link: "/admin/products",
  },
  {
    label: "Người dùng",
    value: stats.value.users,
    icon: UserIcon,
    iconBg: "bg-indigo-100",
    iconColor: "text-indigo-600",
    valueColor: "text-gray-900",
    link: "/admin/users",
  },
  {
    label: "Liên hệ mới",
    value: stats.value.newContacts,
    icon: ContactIcon,
    iconBg: "bg-red-100",
    iconColor: "text-red-600",
    valueColor: stats.value.newContacts > 0 ? "text-red-600" : "text-gray-900",
    link: "/admin/contacts",
    change: stats.value.newContacts > 0 ? `${stats.value.newContacts} cần xử lý` : null,
    changeColor: stats.value.newContacts > 0 ? "text-red-600" : "text-gray-500",
    changeIcon: stats.value.newContacts > 0 ? "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" : "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
  },
]);
</script>


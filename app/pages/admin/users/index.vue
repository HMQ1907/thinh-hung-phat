<template>
  <div>
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold">Quản lý người dùng</h1>
      <NuxtLink
        to="/admin/users/new"
        class="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
      >
        + Thêm người dùng
      </NuxtLink>
    </div>

    <div v-if="pending" class="text-center py-12">
      <p class="text-muted-foreground">Đang tải...</p>
    </div>
    <div v-else-if="error" class="text-center py-12">
      <p class="text-red-500">{{ error.message }}</p>
    </div>
    <div v-else class="bg-white rounded-lg border shadow-sm overflow-hidden">
      <table class="w-full">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vai trò</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày tạo</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="user in users" :key="user.id" class="hover:bg-gray-50">
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm font-medium text-gray-900">{{ user.name }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-500">{{ user.email }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span
                :class="{
                  'px-2 py-1 text-xs rounded-full': true,
                  'bg-blue-100 text-blue-800': user.role === 'admin',
                  'bg-gray-100 text-gray-800': user.role === 'editor',
                }"
              >
                {{ user.role === 'admin' ? 'Quản trị viên' : 'Biên tập viên' }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ formatDate(user.created_at) }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
              <NuxtLink
                :to="`/admin/users/${user.id}/edit`"
                class="text-primary hover:text-primary/80"
              >
                Sửa
              </NuxtLink>
              <button
                @click="handleDelete(user.id)"
                class="text-red-600 hover:text-red-800"
              >
                Xóa
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="users.length === 0" class="text-center py-12">
        <p class="text-muted-foreground">Chưa có người dùng nào</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { User, APIResponse } from "~/types";

definePageMeta({
  layout: "admin",
  middleware: "admin" as any,
});

useHead({
  title: "Quản lý người dùng - Admin",
});

const { data: response, pending, error, refresh } = await useFetch<APIResponse<User[]>>("/api/admin/users");

const users = computed(() => response.value?.data || []);

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("vi-VN");
};

const handleDelete = async (id: string) => {
  if (!confirm("Bạn có chắc muốn xóa người dùng này?")) return;

  try {
    await $fetch(`/api/admin/users/${id}`, {
      method: "DELETE",
    });
    refresh();
  } catch (error: any) {
    alert("Có lỗi xảy ra: " + error.message);
  }
};
</script>


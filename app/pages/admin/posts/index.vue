<template>
  <div>
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold">Quản lý bài viết</h1>
      <NuxtLink
        to="/admin/posts/new"
        class="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
      >
        + Tạo bài viết mới
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
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tiêu đề</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày tạo</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="post in posts" :key="post.id" class="hover:bg-gray-50">
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm font-medium text-gray-900">{{ post.title }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span
                :class="{
                  'px-2 py-1 text-xs rounded-full': true,
                  'bg-yellow-100 text-yellow-800': post.status === 'draft',
                  'bg-green-100 text-green-800': post.status === 'published',
                  'bg-gray-100 text-gray-800': post.status === 'archived',
                }"
              >
                {{ getStatusLabel(post.status) }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ formatDate(post.created_at) }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
              <NuxtLink
                :to="`/admin/posts/${post.id}/edit`"
                class="text-primary hover:text-primary/80"
              >
                Sửa
              </NuxtLink>
              <button
                @click="handleDelete(post.id)"
                class="text-red-600 hover:text-red-800"
              >
                Xóa
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="posts.length === 0" class="text-center py-12">
        <p class="text-muted-foreground">Chưa có bài viết nào</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Post, APIResponse } from "~/types";

definePageMeta({
  layout: "admin",
  middleware: "admin" as any,
});

useHead({
  title: "Quản lý bài viết - Admin",
});

const { data: response, pending, error, refresh } = await useFetch<APIResponse<Post[]>>("/api/admin/posts");

const posts = computed(() => response.value?.data || []);

const getStatusLabel = (status: string) => {
  const labels: Record<string, string> = {
    draft: "Nháp",
    published: "Đã xuất bản",
    archived: "Đã lưu trữ",
  };
  return labels[status] || status;
};

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("vi-VN");
};

const handleDelete = async (id: string) => {
  if (!confirm("Bạn có chắc muốn xóa bài viết này?")) return;

  try {
    await $fetch(`/api/admin/posts/${id}`, {
      method: "DELETE",
    });
    refresh();
  } catch (error: any) {
    alert("Có lỗi xảy ra: " + error.message);
  }
};
</script>


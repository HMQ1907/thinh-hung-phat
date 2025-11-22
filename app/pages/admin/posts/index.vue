<template>
  <div>
    <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
      <div>
        <p class="text-sm uppercase tracking-[0.4em] text-gray-400">Posts</p>
        <h1 class="text-3xl font-bold text-gray-900">Quản lý bài viết</h1>
        <p class="text-sm text-gray-500">Tạo, chỉnh sửa và quản lý các bài viết trên website.</p>
      </div>
      <UiButton
        to="/admin/posts/new"
        variant="primary"
        size="md"
      >
        <template #icon>
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
        </template>
        Tạo bài viết mới
      </UiButton>
    </div>

    <div v-if="pending" class="text-center py-20">
      <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      <p class="mt-4 text-gray-600 font-medium">Đang tải...</p>
    </div>
    <div v-else-if="error" class="text-center py-20">
      <div class="inline-block p-4 bg-red-50 border border-red-200 rounded-xl">
        <p class="text-red-600 font-semibold">{{ error.message }}</p>
      </div>
    </div>
    <div v-else class="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <table class="w-full">
        <thead class="bg-gradient-to-r from-gray-50 to-gray-100/50">
          <tr>
            <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Tiêu đề</th>
            <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Trạng thái</th>
            <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Ngày tạo</th>
            <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Thao tác</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-100">
          <tr v-for="post in posts" :key="post.id" class="hover:bg-gray-50/50 transition-colors">
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
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center gap-2">
                <UiButton
                  v-if="post.status !== 'published'"
                  @click="handlePublish(post.id)"
                  variant="success"
                  size="sm"
                  title="Xuất bản bài viết"
                >
                  <template #icon>
                    <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </template>
                  Publish
                </UiButton>
                <UiButton
                  :to="`/admin/posts/${post.id}/edit`"
                  variant="outline"
                  size="sm"
                >
                  <template #icon>
                    <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </template>
                  Sửa
                </UiButton>
                <UiButton
                  @click="handleDelete(post.id)"
                  variant="danger"
                  size="sm"
                >
                  <template #icon>
                    <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </template>
                  Xóa
                </UiButton>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="posts.length === 0" class="text-center py-16">
        <div class="inline-block p-8 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
          <svg class="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p class="text-gray-600 font-medium">Chưa có bài viết nào</p>
        </div>
      </div>
    </div>

    <ClientOnly>
      <UiConfirmDialog
        :is-open="confirmDialog.isOpen.value"
        :title="confirmDialog.options.value.title"
        :message="confirmDialog.options.value.message"
        :confirm-text="confirmDialog.options.value.confirmText"
        :cancel-text="confirmDialog.options.value.cancelText"
        :variant="confirmDialog.options.value.variant"
        @confirm="confirmDialog.handleConfirm"
        @cancel="confirmDialog.handleCancel"
      />
    </ClientOnly>
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

const confirmDialog = useConfirm();
const toast = useToast();

const handlePublish = async (id: string) => {
  try {
    // Lấy đầy đủ thông tin post trước
    const postResponse = await $fetch<APIResponse<Post>>(`/api/admin/posts/${id}`);
    const post = postResponse.data;
    
    if (!post) {
      toast.error("Không tìm thấy bài viết");
      return;
    }

    // Update chỉ status
    await $fetch(`/api/admin/posts/${id}`, {
      method: "PUT",
      body: {
        title: post.title,
        slug: post.slug,
        content: post.content,
        excerpt: post.excerpt || null,
        thumbnail: post.thumbnail || null,
        status: "published",
        category_id: post.category_id || null,
        featured: post.featured || false,
      },
    });
    toast.success("Đã xuất bản bài viết thành công");
    await refresh();
  } catch (error: any) {
    console.error("Publish error:", error);
    toast.error("Có lỗi xảy ra: " + (error.message || "Không xác định"));
  }
};

const handleDelete = async (id: string) => {
  const confirmed = await confirmDialog.confirm({
    title: 'Xoá bài viết',
    message: 'Bạn có chắc muốn xoá bài viết này? Hành động này không thể hoàn tác.',
    confirmText: 'Xoá',
    cancelText: 'Hủy',
    variant: 'danger',
  });
  
  if (!confirmed) return;

  try {
    await $fetch(`/api/admin/posts/${id}`, {
      method: "DELETE",
    });
    toast.success('Đã xoá bài viết thành công');
    refresh();
  } catch (error: any) {
    toast.error('Có lỗi xảy ra: ' + (error.message || 'Không xác định'));
  }
};
</script>


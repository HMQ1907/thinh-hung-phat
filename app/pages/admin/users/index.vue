<template>
  <div>
    <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
      <div>
        <p class="text-sm uppercase tracking-[0.4em] text-gray-400">Users</p>
        <h1 class="text-3xl font-bold text-gray-900">Quản lý người dùng</h1>
        <p class="text-sm text-gray-500">Quản lý tài khoản admin và editor.</p>
      </div>
      <UiButton
        to="/admin/users/new"
        variant="primary"
        size="md"
      >
        <template #icon>
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
        </template>
        Thêm người dùng
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
            <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Tên</th>
            <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Email</th>
            <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Vai trò</th>
            <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Ngày tạo</th>
            <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Thao tác</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-100">
          <tr v-for="user in users" :key="user.id" class="hover:bg-gray-50/50 transition-colors">
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
            <td class="px-6 py-4 whitespace-nowrap">
              <UiButton
                @click="handleDelete(user.id)"
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
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="users.length === 0" class="text-center py-16">
        <div class="inline-block p-8 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
          <svg class="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <p class="text-gray-600 font-medium">Chưa có người dùng nào</p>
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
import type { User, APIResponse } from "~/types";

definePageMeta({
  layout: "admin",
  middleware: "admin" as any,
});

useHead({
  title: "Quản lý người dùng - Admin",
});

const confirmDialog = useConfirm();
const toast = useToast();

const { data: response, pending, error, refresh } = await useFetch<APIResponse<User[]>>("/api/admin/users");

const users = computed(() => response.value?.data || []);

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("vi-VN");
};

const handleDelete = async (id: string) => {
  const confirmed = await confirmDialog.confirm({
    title: 'Xoá người dùng',
    message: 'Bạn có chắc muốn xoá người dùng này? Hành động này không thể hoàn tác.',
    confirmText: 'Xoá',
    cancelText: 'Hủy',
    variant: 'danger',
  });
  
  if (!confirmed) return;

  try {
    await $fetch(`/api/admin/users/${id}`, {
      method: "DELETE",
    });
    toast.success('Đã xoá người dùng thành công');
    refresh();
  } catch (error: any) {
    toast.error('Có lỗi xảy ra: ' + (error.message || 'Không xác định'));
  }
};
</script>


<template>
  <div class="space-y-8">
    <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <p class="text-sm uppercase tracking-[0.4em] text-gray-400">Contacts</p>
        <h1 class="text-3xl font-bold text-gray-900">Quản lý liên hệ</h1>
        <p class="text-sm text-gray-500">Xem và quản lý các tin nhắn liên hệ từ khách hàng.</p>
      </div>
      <div class="flex gap-2">
        <select
          v-model="statusFilter"
          class="rounded-xl border border-gray-200 px-4 py-2 text-sm font-semibold focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          <option value="">Tất cả</option>
          <option value="new">Mới</option>
          <option value="read">Đã đọc</option>
          <option value="replied">Đã trả lời</option>
        </select>
      </div>
    </div>

    <div class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-xl font-semibold text-gray-900">Danh sách liên hệ</h2>
        <p class="text-sm text-gray-500">{{ filteredContacts.length }} liên hệ</p>
      </div>

      <div v-if="pending" class="grid gap-4">
        <div v-for="s in 3" :key="s" class="h-32 animate-pulse rounded-xl bg-gray-100"></div>
      </div>

      <div v-else-if="error" class="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
        Không tải được liên hệ: {{ error }}
      </div>

      <div v-else-if="filteredContacts.length === 0" class="rounded-xl border border-dashed border-gray-200 p-8 text-center text-gray-500">
        Chưa có liên hệ nào.
      </div>

      <div v-else class="space-y-4">
        <div
          v-for="contact in filteredContacts"
          :key="contact.id"
          class="rounded-xl border border-gray-100 p-6 transition hover:shadow-md"
          :class="{
            'border-blue-200 bg-blue-50/50': contact.status === 'new',
            'border-gray-200 bg-white': contact.status !== 'new',
          }"
        >
          <div class="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div class="flex-1 space-y-3">
              <div class="flex items-start justify-between">
                <div>
                  <h3 class="text-lg font-semibold text-gray-900">{{ contact.name }}</h3>
                  <div class="mt-1 flex flex-wrap gap-2 text-sm text-gray-600">
                    <a :href="`mailto:${contact.email}`" class="hover:text-primary transition-colors">
                      {{ contact.email }}
                    </a>
                    <span v-if="contact.phone" class="text-gray-400">•</span>
                    <a v-if="contact.phone" :href="`tel:${contact.phone}`" class="hover:text-primary transition-colors">
                      {{ contact.phone }}
                    </a>
                  </div>
                </div>
                <span
                  class="rounded-full px-3 py-1 text-xs font-semibold"
                  :class="{
                    'bg-blue-100 text-blue-700': contact.status === 'new',
                    'bg-gray-100 text-gray-700': contact.status === 'read',
                    'bg-green-100 text-green-700': contact.status === 'replied',
                  }"
                >
                  {{ getStatusLabel(contact.status) }}
                </span>
              </div>
              <div class="rounded-lg bg-gray-50 p-4">
                <p class="text-sm text-gray-700 whitespace-pre-line leading-relaxed">{{ contact.message }}</p>
              </div>
              <div class="text-xs text-gray-500">
                {{ formatDate(contact.created_at) }}
              </div>
            </div>
            <div class="flex flex-col gap-2 md:ml-4">
              <select
                :value="contact.status"
                @change="handleStatusChange(contact.id, ($event.target as HTMLSelectElement).value)"
                class="rounded-lg border border-gray-200 px-3 py-2 text-sm font-semibold focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value="new">Mới</option>
                <option value="read">Đã đọc</option>
                <option value="replied">Đã trả lời</option>
              </select>
              <UiButton
                @click="handleDelete(contact.id)"
                variant="danger"
                size="sm"
              >
                <template #icon>
                  <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </template>
                Xoá
              </UiButton>
            </div>
          </div>
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
import type { Contact, APIResponse } from "~/types";

definePageMeta({
  layout: "admin",
  middleware: "admin" as any,
});

useHead({
  title: "Quản lý liên hệ - Admin",
});

const statusFilter = ref("");
const confirmDialog = useConfirm();
const toast = useToast();

const { data: response, pending, error, refresh } = useFetch<APIResponse<Contact[]>>("/api/admin/contacts");

const contacts = computed(() => response.value?.data || []);

const filteredContacts = computed(() => {
  if (!statusFilter.value) return contacts.value;
  return contacts.value.filter((c) => c.status === statusFilter.value);
});

const getStatusLabel = (status: string) => {
  const labels: Record<string, string> = {
    new: "Mới",
    read: "Đã đọc",
    replied: "Đã trả lời",
  };
  return labels[status] || status;
};

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const handleStatusChange = async (id: string, newStatus: string) => {
  try {
    await $fetch(`/api/admin/contacts/${id}`, {
      method: "PUT",
      body: { status: newStatus },
    });
    toast.success("Đã cập nhật trạng thái");
    await refresh();
  } catch (err: any) {
    console.error("Update status error:", err);
    toast.error("Có lỗi xảy ra: " + (err.message || "Không xác định"));
  }
};

const handleDelete = async (id: string) => {
  const confirmed = await confirmDialog.confirm({
    title: "Xoá liên hệ",
    message: "Bạn có chắc muốn xoá liên hệ này? Hành động này không thể hoàn tác.",
    confirmText: "Xoá",
    cancelText: "Hủy",
    variant: "danger",
  });

  if (!confirmed) return;

  try {
    await $fetch(`/api/admin/contacts/${id}`, {
      method: "DELETE",
    });
    toast.success("Đã xoá liên hệ thành công");
    await refresh();
  } catch (err: any) {
    console.error("Delete contact error:", err);
    toast.error("Có lỗi xảy ra: " + (err.message || "Không xác định"));
  }
};
</script>


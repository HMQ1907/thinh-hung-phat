<template>
  <div class="space-y-8">
    <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <p class="text-sm uppercase tracking-[0.4em] text-gray-400">Categories</p>
        <h1 class="text-3xl font-bold text-gray-900">Quản lý danh mục</h1>
        <p class="text-sm text-gray-500">Thêm, chỉnh sửa hoặc xoá các danh mục sản phẩm.</p>
      </div>
      <UiButton
        type="button"
        @click="toggleForm"
        variant="primary"
        size="md"
      >
        <template #icon>
          <svg v-if="!showForm" class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          <svg v-else class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </template>
        {{ showForm ? "Đóng form" : "Thêm danh mục" }}
      </UiButton>
    </div>

    <div v-if="showForm" class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <form @submit.prevent="handleSubmit" class="space-y-5">
        <div>
          <label class="mb-2 block text-sm font-semibold text-gray-700">Tên danh mục *</label>
          <input
            v-model="form.name"
            type="text"
            required
            class="w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            placeholder="Nhập tên danh mục"
          />
        </div>

        <div>
          <label class="mb-2 block text-sm font-semibold text-gray-700">Slug *</label>
          <input
            v-model="form.slug"
            type="text"
            required
            @input="manualSlug = true"
            class="w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            placeholder="ten-danh-muc"
          />
        </div>

        <div>
          <label class="mb-2 block text-sm font-semibold text-gray-700">Mô tả</label>
          <textarea
            v-model="form.description"
            rows="3"
            class="w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            placeholder="Mô tả về danh mục"
          />
        </div>

        <div class="flex justify-end gap-3 pt-4 border-t border-gray-200">
          <UiButton
            type="button"
            @click="resetForm"
            variant="outline"
            size="md"
          >
            Reset
          </UiButton>
          <UiButton
            type="submit"
            :disabled="submitting"
            :loading="submitting"
            variant="primary"
            size="md"
          >
            {{ editingId ? "Cập nhật" : "Lưu danh mục" }}
          </UiButton>
        </div>
      </form>
    </div>

    <div class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div class="flex items-center justify-between">
        <h2 class="text-xl font-semibold text-gray-900">Danh sách danh mục</h2>
        <p class="text-sm text-gray-500">{{ categories.length }} danh mục</p>
      </div>

      <div v-if="pending" class="mt-6 grid gap-4">
        <div v-for="s in 3" :key="s" class="h-20 animate-pulse rounded-xl bg-gray-100"></div>
      </div>

      <div v-else-if="error" class="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
        Không tải được danh mục: {{ error }}
      </div>

      <div v-else-if="categories.length === 0" class="mt-6 rounded-xl border border-dashed border-gray-200 p-8 text-center text-gray-500">
        Chưa có danh mục nào.
      </div>

      <div v-else class="mt-6 space-y-4">
        <div
          v-for="category in categories"
          :key="category.id"
          class="flex flex-col gap-4 rounded-xl border border-gray-100 p-4 md:flex-row md:items-center md:justify-between"
        >
          <div>
            <h3 class="text-lg font-semibold text-gray-900">{{ category.name }}</h3>
            <p class="text-sm text-gray-500">{{ category.slug }}</p>
            <p v-if="category.description" class="mt-1 text-sm text-gray-600">{{ category.description }}</p>
          </div>
          <div class="flex gap-2">
            <UiButton
              @click="handleEdit(category)"
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
              @click="handleDelete(category.id)"
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
import { generateSlug } from "~/utils/constants";
import type { Category, APIResponse } from "~/types";

definePageMeta({
  layout: "admin",
  middleware: "admin" as any,
});

useHead({
  title: "Quản lý danh mục - Admin",
});

const showForm = ref(false);
const submitting = ref(false);
const editingId = ref<string | null>(null);
const confirmDialog = useConfirm();
const toast = useToast();

const form = reactive({
  name: "",
  slug: "",
  description: "",
});

watch(
  () => form.name,
  (value) => {
    if (!manualSlug.value) {
      form.slug = generateSlug(value || "");
    }
  }
);

const manualSlug = ref(false);

const { data: response, pending, error, refresh } = useFetch<APIResponse<Category[]>>("/api/admin/categories");

const categories = computed(() => response.value?.data || []);

const toggleForm = () => {
  showForm.value = !showForm.value;
  if (!showForm.value) {
    resetForm();
  }
};

const resetForm = () => {
  form.name = "";
  form.slug = "";
  form.description = "";
  manualSlug.value = false;
  editingId.value = null;
};

const handleEdit = (category: Category) => {
  editingId.value = category.id;
  form.name = category.name;
  form.slug = category.slug;
  form.description = category.description || "";
  manualSlug.value = true;
  showForm.value = true;
};

const handleSubmit = async () => {
  if (!form.name || !form.slug) return;
  submitting.value = true;

  try {
    if (editingId.value) {
      await $fetch(`/api/admin/categories/${editingId.value}`, {
        method: "PUT",
        body: {
          ...form,
          description: form.description || null,
        },
      });
      toast.success('Đã cập nhật danh mục thành công');
    } else {
      await $fetch("/api/admin/categories", {
        method: "POST",
        body: {
          ...form,
          description: form.description || null,
        },
      });
      toast.success('Đã tạo danh mục thành công');
    }

    resetForm();
    showForm.value = false;
    await refresh();
  } catch (err: any) {
    console.error("Save category error:", err);
    toast.error('Có lỗi xảy ra: ' + (err.message || 'Không xác định'));
  } finally {
    submitting.value = false;
  }
};

const handleDelete = async (id: string) => {
  const confirmed = await confirmDialog.confirm({
    title: 'Xoá danh mục',
    message: 'Bạn có chắc muốn xoá danh mục này? Hành động này không thể hoàn tác.',
    confirmText: 'Xoá',
    cancelText: 'Hủy',
    variant: 'danger',
  });
  
  if (!confirmed) return;

  try {
    await $fetch(`/api/admin/categories/${id}`, {
      method: "DELETE",
    });
    toast.success('Đã xoá danh mục thành công');
    await refresh();
  } catch (err: any) {
    console.error("Delete category error:", err);
    toast.error('Có lỗi xảy ra: ' + (err.message || 'Không xác định'));
  }
};
</script>


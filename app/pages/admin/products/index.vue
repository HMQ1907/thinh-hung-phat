<template>
  <div class="space-y-8">
    <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <p class="text-sm uppercase tracking-[0.4em] text-gray-400">Products</p>
        <h1 class="text-3xl font-bold text-gray-900">Quản lý sản phẩm</h1>
        <p class="text-sm text-gray-500">Thêm, chỉnh sửa hoặc xoá các sản phẩm than đá.</p>
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
        {{ showForm ? "Đóng form" : "Thêm sản phẩm" }}
      </UiButton>
    </div>

    <div v-if="showForm" class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <form @submit.prevent="handleSubmit" class="grid gap-5 md:grid-cols-2">
        <div class="md:col-span-1">
          <label class="mb-2 block text-sm font-semibold text-gray-700">Tên sản phẩm *</label>
          <input
            v-model="form.name"
            type="text"
            required
            class="w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            placeholder="Nhập tên sản phẩm"
          />
        </div>

        <div class="md:col-span-1">
          <label class="mb-2 block text-sm font-semibold text-gray-700">Slug *</label>
          <input
            v-model="form.slug"
            type="text"
            required
            @input="manualSlug = true"
            class="w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            placeholder="ten-san-pham"
          />
        </div>


        <div class="md:col-span-1">
          <label class="mb-2 block text-sm font-semibold text-gray-700">Danh mục</label>
          <select
            v-model="form.category_id"
            class="w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="">Không có</option>
            <option v-for="cat in categories" :key="cat.id" :value="cat.id">
              {{ cat.name }}
            </option>
          </select>
        </div>

        <div class="md:col-span-1">
          <label class="mb-2 block text-sm font-semibold text-gray-700">Giá (VNĐ)</label>
          <input
            v-model.number="form.price"
            type="number"
            min="0"
            class="w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            placeholder="0"
          />
        </div>

        <div class="md:col-span-2">
          <AdminImageUpload
            v-model="form.image_url"
            label="Hình ảnh sản phẩm"
          />
        </div>

        <div class="md:col-span-2">
          <label class="mb-2 block text-sm font-semibold text-gray-700">Mô tả</label>
          <textarea
            v-model="form.description"
            rows="4"
            class="w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            placeholder="Mô tả về sản phẩm"
          />
        </div>

        <div class="md:col-span-1">
          <label class="mb-2 block text-sm font-semibold text-gray-700">Trạng thái</label>
          <select
            v-model="form.status"
            class="w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <div class="md:col-span-2 flex justify-end gap-3 pt-4 border-t border-gray-200">
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
            {{ editingId ? "Cập nhật" : "Lưu sản phẩm" }}
          </UiButton>
        </div>
      </form>
    </div>

    <div class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div class="flex items-center justify-between">
        <h2 class="text-xl font-semibold text-gray-900">Danh sách sản phẩm</h2>
        <p class="text-sm text-gray-500">{{ products.length }} sản phẩm</p>
      </div>

      <div v-if="pending" class="mt-6 grid gap-4">
        <div v-for="s in 3" :key="s" class="h-20 animate-pulse rounded-xl bg-gray-100"></div>
      </div>

      <div v-else-if="error" class="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
        Không tải được sản phẩm: {{ error }}
      </div>

      <div v-else-if="products.length === 0" class="mt-6 rounded-xl border border-dashed border-gray-200 p-8 text-center text-gray-500">
        Chưa có sản phẩm nào.
      </div>

      <div v-else class="mt-6 space-y-4">
        <div
          v-for="product in products"
          :key="product.id"
          class="flex flex-col gap-4 rounded-xl border border-gray-100 p-4 md:flex-row md:items-center md:justify-between"
        >
          <div class="flex items-center gap-4">
            <img
              v-if="product.image_url"
              :src="product.image_url"
              :alt="product.name"
              class="h-16 w-16 rounded-xl object-cover"
            />
            <div v-else class="flex h-16 w-16 items-center justify-center rounded-xl bg-gray-100 text-lg font-semibold text-gray-600">
              {{ product.name?.charAt(0) }}
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-900">{{ product.name }}</h3>
              <p class="text-sm text-gray-500">{{ product.slug }}</p>
              <p v-if="product.price" class="text-sm font-semibold text-primary">
                {{ formatPrice(product.price) }}
              </p>
            </div>
          </div>
          <div class="flex gap-2">
            <UiButton
              @click="handleEdit(product)"
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
              @click="handleDelete(product.id)"
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
import type { Product, Category, APIResponse } from "~/types";

definePageMeta({
  layout: "admin",
  middleware: "admin" as any,
});

useHead({
  title: "Quản lý sản phẩm - Admin",
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
  price: null as number | null,
  image_url: "",
  category_id: "",
  status: "active" as "active" | "inactive",
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

const { data: response, pending, error, refresh } = useFetch<APIResponse<Product[]>>("/api/admin/products");
const { data: categoriesResponse } = await useFetch<APIResponse<Category[]>>("/api/admin/categories");

const products = computed(() => response.value?.data || []);
const categories = computed(() => categoriesResponse.value?.data || []);

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};

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
  form.price = null;
  form.image_url = "";
  form.category_id = "";
  form.status = "active";
  manualSlug.value = false;
  editingId.value = null;
};

const handleEdit = (product: Product) => {
  editingId.value = product.id;
  form.name = product.name;
  form.slug = product.slug;
  form.description = product.description || "";
  form.price = product.price || null;
  form.image_url = product.image_url || "";
  form.category_id = product.category_id || "";
  form.status = product.status;
  manualSlug.value = true;
  showForm.value = true;
};

const handleSubmit = async () => {
  if (!form.name || !form.slug) return;
  submitting.value = true;

  try {
    if (editingId.value) {
      await $fetch(`/api/admin/products/${editingId.value}`, {
        method: "PUT",
        body: {
          ...form,
          description: form.description || null,
          price: form.price || null,
          image_url: form.image_url || null,
          category_id: form.category_id || null,
        },
      });
      toast.success('Đã cập nhật sản phẩm thành công');
    } else {
      await $fetch("/api/admin/products", {
        method: "POST",
        body: {
          ...form,
          description: form.description || null,
          price: form.price || null,
          image_url: form.image_url || null,
          category_id: form.category_id || null,
        },
      });
      toast.success('Đã tạo sản phẩm thành công');
    }

    resetForm();
    showForm.value = false;
    await refresh();
  } catch (err: any) {
    console.error("Save product error:", err);
    toast.error('Có lỗi xảy ra: ' + (err.message || 'Không xác định'));
  } finally {
    submitting.value = false;
  }
};

const handleDelete = async (id: string) => {
  const confirmed = await confirmDialog.confirm({
    title: 'Xoá sản phẩm',
    message: 'Bạn có chắc muốn xoá sản phẩm này? Hành động này không thể hoàn tác.',
    confirmText: 'Xoá',
    cancelText: 'Hủy',
    variant: 'danger',
  });
  
  if (!confirmed) return;

  try {
    await $fetch(`/api/admin/products/${id}`, {
      method: "DELETE",
    });
    toast.success('Đã xoá sản phẩm thành công');
    await refresh();
  } catch (err: any) {
    console.error("Delete product error:", err);
    toast.error('Có lỗi xảy ra: ' + (err.message || 'Không xác định'));
  }
};
</script>


<template>
  <form @submit.prevent="handleSubmit" class="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 space-y-6">
    <div>
      <label for="title" class="block text-sm font-semibold text-gray-700 mb-2">Tiêu đề *</label>
      <input
        id="title"
        v-model="form.title"
        type="text"
        required
        class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
        placeholder="Nhập tiêu đề bài viết"
      />
    </div>

    <div>
      <label for="slug" class="block text-sm font-semibold text-gray-700 mb-2">Slug *</label>
      <input
        id="slug"
        v-model="form.slug"
        type="text"
        required
        class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
        placeholder="bai-viet-moi"
      />
      <p class="text-xs text-gray-500 mt-1">URL-friendly version of title</p>
    </div>

    <div>
      <label for="excerpt" class="block text-sm font-semibold text-gray-700 mb-2">Mô tả ngắn</label>
      <textarea
        id="excerpt"
        v-model="form.excerpt"
        rows="3"
        class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition resize-none"
        placeholder="Mô tả ngắn về bài viết"
      ></textarea>
    </div>

    <div>
      <label for="content" class="block text-sm font-semibold text-gray-700 mb-2">Nội dung *</label>
      <textarea
        id="content"
        v-model="form.content"
        rows="12"
        required
        class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition resize-none font-sans"
        placeholder="Nhập nội dung bài viết"
      ></textarea>
    </div>

    <div>
      <AdminImageUpload
        v-model="form.thumbnail"
        label="Hình ảnh thumbnail"
      />
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label for="status" class="block text-sm font-semibold text-gray-700 mb-2">Trạng thái</label>
        <select
          id="status"
          v-model="form.status"
          class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
        >
          <option value="draft">Nháp</option>
          <option value="published">Đã xuất bản</option>
          <option value="archived">Đã lưu trữ</option>
        </select>
      </div>

      <div>
        <label for="category" class="block text-sm font-semibold text-gray-700 mb-2">Danh mục</label>
        <select
          id="category"
          v-model="form.category_id"
          class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
        >
          <option value="">Không có</option>
          <option v-for="cat in categories" :key="cat.id" :value="cat.id">
            {{ cat.name }}
          </option>
        </select>
      </div>
    </div>

    <div class="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
      <input
        id="featured"
        v-model="form.featured"
        type="checkbox"
        class="h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary"
      />
      <label for="featured" class="text-sm font-semibold text-gray-700 cursor-pointer">Bài viết nổi bật</label>
    </div>

    <div class="flex justify-end gap-3 pt-4 border-t border-gray-200">
      <UiButton
        to="/admin/posts"
        variant="outline"
        size="md"
      >
        Hủy
      </UiButton>
      <UiButton
        type="submit"
        :disabled="submitting"
        :loading="submitting"
        variant="primary"
        size="md"
      >
        {{ props.post ? "Cập nhật bài viết" : "Lưu bài viết" }}
      </UiButton>
    </div>

    <div v-if="error" class="p-4 bg-red-50 border border-red-200 text-red-800 rounded-xl">
      <div class="flex items-center gap-2">
        <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span class="font-semibold">{{ error }}</span>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import type { Post, Category, APIResponse } from "~/types";

const props = defineProps<{
  post?: Post;
}>();

const emit = defineEmits<{
  saved: [];
}>();

const form = reactive({
  title: props.post?.title || "",
  slug: props.post?.slug || "",
  excerpt: props.post?.excerpt || "",
  content: props.post?.content || "",
  thumbnail: props.post?.thumbnail || "",
  status: props.post?.status || "draft",
  category_id: props.post?.category_id || "",
  featured: props.post?.featured || false,
});

const submitting = ref(false);
const error = ref("");

// Fetch categories
const { data: categoriesResponse } = await useFetch<APIResponse<Category[]>>("/api/admin/categories");
const categories = computed(() => categoriesResponse.value?.data || []);

const handleSubmit = async () => {
  submitting.value = true;
  error.value = "";

  try {
    if (props.post) {
      // Update
      await $fetch(`/api/admin/posts/${props.post.id}`, {
        method: "PUT",
        body: form,
      });
    } else {
      // Create
      await $fetch("/api/admin/posts", {
        method: "POST",
        body: form,
      });
    }
    emit("saved");
  } catch (err: any) {
    error.value = err.message || "Có lỗi xảy ra";
  } finally {
    submitting.value = false;
  }
};
</script>


<template>
  <form @submit.prevent="handleSubmit" class="bg-white rounded-lg border shadow-sm p-6 space-y-6">
    <div>
      <label for="title" class="block text-sm font-medium mb-2">Tiêu đề *</label>
      <input
        id="title"
        v-model="form.title"
        type="text"
        required
        class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        placeholder="Nhập tiêu đề bài viết"
      />
    </div>

    <div>
      <label for="slug" class="block text-sm font-medium mb-2">Slug *</label>
      <input
        id="slug"
        v-model="form.slug"
        type="text"
        required
        class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        placeholder="bai-viet-moi"
      />
      <p class="text-xs text-muted-foreground mt-1">URL-friendly version of title</p>
    </div>

    <div>
      <label for="excerpt" class="block text-sm font-medium mb-2">Mô tả ngắn</label>
      <textarea
        id="excerpt"
        v-model="form.excerpt"
        rows="3"
        class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        placeholder="Mô tả ngắn về bài viết"
      ></textarea>
    </div>

    <div>
      <label for="content" class="block text-sm font-medium mb-2">Nội dung *</label>
      <textarea
        id="content"
        v-model="form.content"
        rows="10"
        required
        class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-mono"
        placeholder="Nhập nội dung bài viết"
      ></textarea>
    </div>

    <div>
      <label for="thumbnail" class="block text-sm font-medium mb-2">Hình ảnh</label>
      <input
        id="thumbnail"
        v-model="form.thumbnail"
        type="url"
        class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        placeholder="https://example.com/image.jpg"
      />
    </div>

    <div class="grid grid-cols-2 gap-4">
      <div>
        <label for="status" class="block text-sm font-medium mb-2">Trạng thái</label>
        <select
          id="status"
          v-model="form.status"
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="draft">Nháp</option>
          <option value="published">Đã xuất bản</option>
          <option value="archived">Đã lưu trữ</option>
        </select>
      </div>

      <div>
        <label for="category" class="block text-sm font-medium mb-2">Danh mục</label>
        <select
          id="category"
          v-model="form.category_id"
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">Không có</option>
          <option v-for="cat in categories" :key="cat.id" :value="cat.id">
            {{ cat.name }}
          </option>
        </select>
      </div>
    </div>

    <div class="flex items-center space-x-2">
      <input
        id="featured"
        v-model="form.featured"
        type="checkbox"
        class="h-4 w-4 rounded border-gray-300"
      />
      <label for="featured" class="text-sm font-medium">Bài viết nổi bật</label>
    </div>

    <div class="flex justify-end space-x-4">
      <NuxtLink
        to="/admin/posts"
        class="px-6 py-2 border rounded-lg font-semibold hover:bg-gray-50 transition-colors"
      >
        Hủy
      </NuxtLink>
      <button
        type="submit"
        :disabled="submitting"
        class="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50"
      >
        {{ submitting ? "Đang lưu..." : "Lưu bài viết" }}
      </button>
    </div>

    <div v-if="error" class="p-4 bg-red-50 text-red-800 rounded-lg">
      {{ error }}
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


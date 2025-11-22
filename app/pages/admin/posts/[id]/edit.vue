<template>
  <div class="space-y-6">
    <div>
      <p class="text-sm uppercase tracking-[0.4em] text-gray-400">Edit Post</p>
      <h1 class="text-3xl font-bold text-gray-900">Chỉnh sửa bài viết</h1>
    </div>
    <div v-if="pending" class="text-center py-12">
      <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      <p class="mt-4 text-gray-600">Đang tải...</p>
    </div>
    <div v-else-if="!post" class="text-center py-12">
      <p class="text-red-600">Không tìm thấy bài viết</p>
    </div>
    <AdminPostForm v-else :post="post" @saved="handleSaved" />
  </div>
</template>

<script setup lang="ts">
import type { Post, APIResponse } from "~/types";

definePageMeta({
  layout: "admin",
  middleware: "admin" as any,
});

const route = useRoute();
const router = useRouter();
const id = route.params.id as string;

useHead({
  title: "Chỉnh sửa bài viết - Admin",
});

const { data: response, pending } = await useFetch<APIResponse<Post>>(`/api/admin/posts/${id}`);

const post = computed(() => response.value?.data);

const handleSaved = () => {
  router.push("/admin/posts");
};
</script>


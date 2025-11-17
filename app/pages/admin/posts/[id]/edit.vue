<template>
  <div>
    <h1 class="text-3xl font-bold mb-8">Chỉnh sửa bài viết</h1>
    <div v-if="pending" class="text-center py-12">
      <p class="text-muted-foreground">Đang tải...</p>
    </div>
    <PostForm v-else-if="post" :post="post" @saved="handleSaved" />
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


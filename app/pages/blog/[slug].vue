<template>
  <div>
    <div v-if="pending" class="text-center py-12">
      <p class="text-muted-foreground">Đang tải...</p>
    </div>
    <div v-else-if="error" class="text-center py-12">
      <p class="text-red-500">Không tìm thấy bài viết</p>
    </div>
    <div v-else-if="post">
      <!-- Hero Section -->
      <section class="relative h-[400px] flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div v-if="post.thumbnail" class="absolute inset-0">
          <NuxtImg :src="post.thumbnail" :alt="post.title" class="w-full h-full object-cover opacity-50" />
        </div>
        <div class="absolute inset-0 bg-black/60"></div>
        <div class="container mx-auto px-4 relative z-10 text-center">
          <div v-if="post.category" class="mb-4">
            <span class="text-sm px-3 py-1 bg-primary text-primary-foreground rounded">{{ post.category.name }}</span>
          </div>
          <h1 class="text-4xl md:text-5xl font-bold mb-4">{{ post.title }}</h1>
          <div class="flex items-center justify-center space-x-4 text-gray-200">
            <span>{{ formatDate(post.created_at) }}</span>
            <span v-if="post.author">• {{ post.author.name }}</span>
          </div>
        </div>
      </section>

      <!-- Content -->
      <article class="py-16 md:py-24">
        <div class="container mx-auto px-4 max-w-4xl">
          <div class="prose prose-lg max-w-none" v-html="post.content"></div>
        </div>
      </article>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Post, APIResponse } from "~/types";

const route = useRoute();
const slug = route.params.slug as string;

const { data: response, pending, error } = await useFetch<APIResponse<Post>>(`/api/posts/${slug}`);

const post = computed(() => response.value?.data);

useHead({
  title: post.value ? `${post.value.title} - Thịnh Hưng Phát` : "Bài viết",
  meta: [
    {
      name: "description",
      content: post.value?.excerpt || post.value?.content || "Bài viết",
    },
  ],
});

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
</script>


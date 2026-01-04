<template>
  <div>
    <!-- Hero Section -->
    <section class="relative h-[500px] flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
      <div
        class="absolute inset-0 opacity-20 bg-gradient-to-br from-white/10 to-transparent"
      ></div>
      <div class="absolute inset-0 bg-black/40"></div>
      <div class="container mx-auto px-4 relative z-10 text-center">
        <h1
          v-motion-fade
          class="text-5xl md:text-6xl font-bold mb-6"
        >
          Tin tức
        </h1>
        <p
          v-motion-fade
          :delay="100"
          class="text-xl md:text-2xl text-gray-200"
        >
          Cập nhật mới nhất về ngành than đá
        </p>
      </div>
    </section>

    <!-- Blog Posts -->
    <section class="py-20 md:py-28 bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div class="container mx-auto px-4">
        <div v-if="pending" class="text-center py-20">
          <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p class="mt-4 text-gray-600">Đang tải bài viết...</p>
        </div>
        <div v-else-if="error" class="text-center py-20">
          <div class="inline-block p-4 bg-red-50 border border-red-200 rounded-xl">
            <p class="text-red-600 font-semibold">Có lỗi xảy ra: {{ error.message }}</p>
          </div>
        </div>
        <div v-else-if="posts && posts.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <NuxtLink
            v-for="(post, index) in posts"
            :key="post.id"
            :to="`/blog/${post.slug}`"
            v-motion-slide-visible-once-bottom
            :delay="index * 50"
            class="group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-primary/50 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
          >
            <div class="relative h-64 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
              <NuxtImg
                v-if="post.thumbnail"
                :src="post.thumbnail"
                :alt="post.title"
                class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
              <div v-else class="w-full h-full flex items-center justify-center text-gray-400">
                <svg class="h-20 w-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div v-if="post.category" class="absolute top-4 left-4">
                <span class="px-3 py-1.5 bg-primary text-primary-foreground rounded-full text-xs font-semibold shadow-lg">
                  {{ post.category.name }}
                </span>
              </div>
            </div>
            <div class="p-6">
              <h2 class="text-xl font-bold mb-3 text-gray-900 line-clamp-2 group-hover:text-primary transition-colors">{{ post.title }}</h2>
              <p class="text-gray-600 mb-4 line-clamp-3 leading-relaxed">{{ post.excerpt || post.content }}</p>
              <div class="flex items-center justify-between pt-4 border-t border-gray-100">
                <span class="text-sm text-gray-500">{{ formatDate(post.created_at) }}</span>
                <div class="flex items-center text-primary font-semibold group-hover:gap-2 transition-all">
                  <span class="text-sm">Đọc thêm</span>
                  <svg class="h-4 w-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </NuxtLink>
        </div>
        <div v-else class="text-center py-20">
          <div class="inline-block p-8 bg-gray-50 rounded-2xl border border-gray-200">
            <svg class="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p class="text-gray-600 font-medium">Chưa có bài viết nào</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { Post, APIResponse } from "~/types";

useHead({
  title: "Tin tức - Thành Hưng Phát",
  meta: [
    { name: "description", content: "Tin tức và cập nhật mới nhất về ngành than đá" },
  ],
});

const { data: response, pending, error } = await useFetch<APIResponse<Post[]>>("/api/posts", {
  query: { limit: 100 },
  default: () => ({ data: [], status: 200, success: true }),
});

const posts = computed(() => {
  const data = response.value?.data || [];
  console.log("[Blog] Posts loaded:", data.length, "posts");
  return data;
});

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
</script>


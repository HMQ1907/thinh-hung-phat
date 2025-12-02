<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
    <!-- Loading / Error -->
    <div v-if="pending" class="flex items-center justify-center py-24">
      <div class="text-center">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        <p class="mt-4 text-gray-600 font-medium">Đang tải...</p>
      </div>
    </div>
    <div v-else-if="error" class="flex items-center justify-center py-24">
      <div class="inline-block p-6 bg-red-50 border border-red-200 rounded-2xl">
        <p class="text-red-600 font-semibold">Không tìm thấy bài viết</p>
      </div>
    </div>

    <!-- Article -->
    <article v-else-if="post" class="py-12 md:py-16">
      <div class="container mx-auto px-4 max-w-5xl">
        <div class="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          <!-- Header Section -->
          <header class="px-6 md:px-10 pt-10 md:pt-12 pb-6 md:pb-8 bg-gradient-to-br from-gray-50 via-white to-gray-50">
            <div class="space-y-6">
              <!-- Category & Meta -->
              <div class="flex flex-wrap items-center gap-4 text-sm">
                <NuxtLink
                  v-if="post.category"
                  :to="`/blog?category=${post.category.slug}`"
                  class="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full font-semibold hover:bg-primary/20 transition-colors"
                >
                  {{ post.category.name }}
                </NuxtLink>
                <div class="flex items-center gap-4 text-gray-500">
                  <span class="flex items-center gap-2">
                    <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {{ formatDate(post.created_at) }}
                  </span>
                  <span v-if="post.author" class="flex items-center gap-2">
                    <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    {{ post.author.name }}
                  </span>
                </div>
              </div>

              <!-- Title -->
              <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                {{ post.title }}
              </h1>

              <!-- Excerpt -->
              <p v-if="post.excerpt" class="text-lg md:text-xl text-gray-600 leading-relaxed">
                {{ post.excerpt }}
              </p>
            </div>
          </header>

          <!-- Featured Image -->
          <div v-if="post.thumbnail" class="bg-gray-50">
            <div class="px-4 md:px-10 py-8 md:py-10">
              <div class="relative overflow-hidden rounded-3xl shadow-2xl">
                <NuxtImg
                  :src="post.thumbnail"
                  :alt="post.title"
                  class="w-full h-auto object-cover"
                  sizes="sm:100vw md:100vw lg:1200px"
                  loading="eager"
                />
              </div>
            </div>
          </div>

          <!-- Content -->
          <div class="px-6 md:px-10 pb-10 md:pb-12 bg-white">
            <div
              class="prose prose-lg prose-gray max-w-none
                prose-headings:font-bold prose-headings:text-gray-900
                prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6
                prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                prose-strong:text-gray-900 prose-strong:font-semibold
                prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-6
                prose-ol:list-decimal prose-ol:pl-6 prose-ol:mb-6
                prose-li:mb-2 prose-li:text-gray-700
                prose-img:rounded-2xl prose-img:shadow-lg prose-img:my-8
                prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-gray-600
                prose-code:text-primary prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded
                prose-pre:bg-gray-900 prose-pre:text-gray-100"
              v-html="post.content"
            ></div>

            <!-- Share Section -->
            <div class="mt-12 pt-8 border-t border-gray-100">
              <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div>
                  <h3 class="text-lg font-semibold text-gray-900 mb-3">Chia sẻ bài viết</h3>
                  <div class="flex gap-3">
                    <a
                      href="#"
                      class="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center hover:bg-blue-200 transition-colors"
                      aria-label="Share on Facebook"
                    >
                      <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </a>
                    <a
                      href="#"
                      class="w-10 h-10 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center hover:bg-sky-200 transition-colors"
                      aria-label="Share on Twitter"
                    >
                      <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                    </a>
                  </div>
                </div>
                <UiButton
                  to="/blog"
                  variant="outline"
                  size="md"
                >
                  <template #icon>
                    <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                  </template>
                  Quay lại tin tức
                </UiButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  </div>
</template>

<script setup lang="ts">
import type { Post, APIResponse } from "~/types";

const route = useRoute();
const slug = route.params.slug as string;

const { data: response, pending, error } = await useFetch<APIResponse<Post | null>>(
  `/api/posts/${slug}`,
  {
    default: () => ({ data: null, status: 200, success: true }),
  }
);

const post = computed(() => response.value?.data ?? null);

useHead({
  title: post.value ? `${post.value.title} - Thành Hưng Phát` : "Bài viết",
  meta: [
    {
      name: "description",
      content: post.value?.excerpt || post.value?.content?.substring(0, 160) || "Bài viết",
    },
    {
      property: "og:title",
      content: post.value?.title || "Bài viết",
    },
    {
      property: "og:description",
      content: post.value?.excerpt || post.value?.content?.substring(0, 160) || "Bài viết",
    },
    {
      property: "og:image",
      content: post.value?.thumbnail || "",
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

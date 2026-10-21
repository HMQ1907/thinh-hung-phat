<template>
  <div>
    <PageHero
      eyebrow="Tin tức"
      code="// 05"
      subtitle="Cập nhật mới nhất về ngành than đá, năng lượng và hoạt động của Thành Hưng Phát."
      :crumbs="[{ label: 'Tin tức' }]"
    >
      Tin tức & <span class="text-grad">góc nhìn</span> ngành năng lượng
    </PageHero>

    <section class="py-20 md:py-28">
      <div class="mx-auto max-w-7xl px-4 md:px-6">
        <div v-if="pending" class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div v-for="i in 6" :key="i" class="h-96 animate-pulse rounded-3xl border border-white/5 bg-white/[0.03]" />
        </div>
        <div v-else-if="error" class="rounded-3xl border border-red-400/30 bg-red-400/10 p-6 text-center text-red-300">
          Có lỗi xảy ra: {{ error.message }}
        </div>

        <template v-else-if="posts.length">
          <!-- Bài nổi bật -->
          <NuxtLink
            v-reveal
            v-spotlight
            :to="`/blog/${featured.slug}`"
            class="spot group mb-6 grid grid-cols-1 overflow-hidden rounded-3xl border border-white/[0.08] bg-coal-850/80 lg:grid-cols-2"
          >
            <div class="relative aspect-[16/10] overflow-hidden bg-coal-800 lg:aspect-auto lg:min-h-[380px]">
              <NuxtImg
                v-if="featured.thumbnail"
                :src="featured.thumbnail"
                :alt="featured.title"
                width="1000"
                format="webp"
                class="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <div v-else class="dots-bg absolute inset-0" />
              <div class="absolute inset-0 bg-gradient-to-r from-transparent to-coal-850/40" />
            </div>
            <div class="flex flex-col justify-center p-8 md:p-12">
              <div class="flex items-center gap-3">
                <span class="rounded-full bg-ember-400 px-3 py-1 text-xs font-semibold text-coal-950">Mới nhất</span>
                <span v-if="featured.category" class="font-mono text-xs uppercase tracking-widest text-neon-300">{{ featured.category.name }}</span>
              </div>
              <h2 class="font-display mt-5 text-3xl font-bold leading-tight text-white transition group-hover:text-neon-300 md:text-4xl">
                {{ featured.title }}
              </h2>
              <p class="mt-4 line-clamp-3 leading-relaxed text-slate-400">{{ stripHtml(featured.excerpt || featured.content) }}</p>
              <div class="mt-8 flex items-center justify-between">
                <time class="font-mono text-xs uppercase tracking-widest text-slate-500">{{ formatDate(featured.created_at) }}</time>
                <span class="inline-flex items-center gap-2 text-sm font-medium text-ember-300">
                  Đọc bài viết <span class="transition group-hover:translate-x-1">→</span>
                </span>
              </div>
            </div>
          </NuxtLink>

          <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div v-for="(post, index) in rest" :key="post.id" v-reveal="(index % 3) * 90">
              <PostCard :post="post" />
            </div>
          </div>
        </template>

        <div v-else class="rounded-3xl border border-dashed border-white/10 py-20 text-center text-slate-500">
          Chưa có bài viết nào
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { Post, APIResponse } from "~/types";

useHead({
  title: "Tin tức - Thành Hưng Phát",
  meta: [{ name: "description", content: "Tin tức và cập nhật mới nhất về ngành than đá" }],
});

const { data: response, pending, error } = await useFetch<APIResponse<Post[]>>("/api/posts", {
  query: { limit: 100 },
  default: () => ({ data: [], status: 200, success: true }),
});

const posts = computed(() => response.value?.data || []);
const featured = computed(() => posts.value[0]!);
const rest = computed(() => posts.value.slice(1));

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("vi-VN", { year: "numeric", month: "long", day: "numeric" });

const stripHtml = (s?: string) => (s || "").replace(/<[^>]*>/g, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
</script>

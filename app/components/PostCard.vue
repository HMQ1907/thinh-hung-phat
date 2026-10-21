<template>
  <NuxtLink
    :to="`/blog/${post.slug}`"
    v-spotlight
    class="spot group flex h-full flex-col overflow-hidden rounded-3xl border border-white/[0.08] bg-coal-850/80 transition duration-500 hover:-translate-y-1.5"
  >
    <div class="relative aspect-[16/10] overflow-hidden bg-coal-800">
      <NuxtImg
        v-if="post.thumbnail"
        :src="post.thumbnail"
        :alt="post.title"
        width="640"
        format="webp"
        class="h-full w-full object-cover transition duration-700 group-hover:scale-110"
        loading="lazy"
      />
      <div v-else class="dots-bg flex h-full w-full items-center justify-center">
        <span class="font-display text-5xl font-bold text-white/10">THP</span>
      </div>
      <div class="absolute inset-0 bg-gradient-to-t from-coal-850 via-transparent to-transparent" />
      <span
        v-if="post.category"
        class="absolute left-4 top-4 rounded-full bg-neon-400/90 px-3 py-1 text-xs font-semibold text-coal-950 backdrop-blur"
      >
        {{ post.category.name }}
      </span>
    </div>
    <div class="flex flex-1 flex-col p-6">
      <time class="font-mono text-xs uppercase tracking-widest text-slate-500">{{ formatDate(post.created_at) }}</time>
      <h3 class="font-display mt-3 line-clamp-2 text-xl font-semibold leading-snug text-white transition group-hover:text-neon-300">
        {{ post.title }}
      </h3>
      <p class="mt-3 line-clamp-2 flex-1 text-sm leading-relaxed text-slate-400">{{ stripHtml(post.excerpt || post.content) }}</p>
      <div class="mt-5 inline-flex items-center gap-2 text-sm font-medium text-ember-300">
        Đọc bài viết
        <span class="transition group-hover:translate-x-1">→</span>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { Post } from "~/types";
defineProps<{ post: Post }>();

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("vi-VN", { year: "numeric", month: "long", day: "numeric" });

const stripHtml = (s?: string) => (s || "").replace(/<[^>]*>/g, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
</script>

<template>
  <div>
    <!-- Thanh tiến độ đọc -->
    <div class="fixed inset-x-0 top-0 z-[60] h-0.5">
      <div class="h-full bg-gradient-to-r from-neon-400 to-ember-400 shadow-[0_0_10px_#3ad8cf]" :style="{ width: readProgress + '%' }" />
    </div>

    <div v-if="pending" class="flex min-h-[70vh] items-center justify-center">
      <div class="h-12 w-12 animate-spin rounded-full border-2 border-white/10 border-t-neon-400" />
    </div>
    <div v-else-if="error || !post" class="flex min-h-[70vh] flex-col items-center justify-center gap-6 px-4 pt-24 text-center">
      <div class="font-display text-7xl font-bold text-white/10">404</div>
      <p class="text-slate-400">Không tìm thấy bài viết</p>
      <NuxtLink to="/blog" class="btn btn-ghost">← Quay lại tin tức</NuxtLink>
    </div>

    <article v-else>
      <header class="noise relative isolate overflow-hidden pb-12 pt-36 md:pt-44">
        <div class="absolute inset-0 -z-10">
          <div class="grid-bg absolute inset-0" />
          <div class="absolute -left-40 top-10 h-[420px] w-[420px] rounded-full bg-neon-500/20 blur-[120px]" />
          <div class="absolute -right-32 top-40 h-[380px] w-[380px] rounded-full bg-ember-500/10 blur-[120px]" />
        </div>
        <div class="mx-auto max-w-4xl px-4 md:px-6">
          <nav class="mb-8 flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-slate-500">
            <NuxtLink to="/" class="hover:text-neon-300">Trang chủ</NuxtLink>
            <span class="text-white/20">/</span>
            <NuxtLink to="/blog" class="hover:text-neon-300">Tin tức</NuxtLink>
          </nav>

          <div class="flex flex-wrap items-center gap-4 text-sm">
            <NuxtLink
              v-if="post.category"
              :to="`/blog?category=${post.category.slug}`"
              class="rounded-full border border-neon-400/40 bg-neon-400/10 px-4 py-1.5 font-medium text-neon-300 transition hover:bg-neon-400/20"
            >
              {{ post.category.name }}
            </NuxtLink>
            <span class="font-mono text-xs uppercase tracking-widest text-slate-500">{{ formatDate(post.created_at) }}</span>
            <span v-if="post.author" class="text-slate-400">· {{ post.author.name }}</span>
          </div>

          <h1 class="font-display mt-6 text-4xl font-bold leading-[1.1] tracking-tight text-white md:text-6xl">{{ post.title }}</h1>
          <p v-if="post.excerpt" class="mt-6 text-xl leading-relaxed text-slate-400">{{ post.excerpt }}</p>
        </div>
      </header>

      <div v-if="post.thumbnail" class="mx-auto max-w-5xl px-4 md:px-6">
        <div class="hud relative">
          <span class="hud-c tl" /><span class="hud-c tr" /><span class="hud-c bl" /><span class="hud-c br" />
          <NuxtImg :src="post.thumbnail" :alt="post.title" width="1400" format="webp" class="h-auto w-full object-cover" loading="eager" />
        </div>
      </div>

      <div class="mx-auto max-w-3xl px-4 py-16 md:px-6 md:py-20">
        <div class="thp-prose" v-html="post.content"></div>

        <div class="mt-16 flex flex-col items-start justify-between gap-6 border-t border-white/5 pt-8 sm:flex-row sm:items-center">
          <div>
            <div class="font-mono text-xs uppercase tracking-widest text-slate-500">Chia sẻ bài viết</div>
            <div class="mt-3 flex gap-3">
              <a
                :href="`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`"
                target="_blank"
                rel="noopener"
                class="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 text-slate-300 transition hover:border-neon-400/60 hover:text-neon-300"
                aria-label="Chia sẻ lên Facebook"
              >
                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <button
                type="button"
                class="flex h-11 items-center justify-center rounded-xl border border-white/10 px-4 text-sm text-slate-300 transition hover:border-neon-400/60 hover:text-neon-300"
                @click="copyLink"
              >
                {{ copied ? "Đã sao chép ✓" : "Sao chép link" }}
              </button>
            </div>
          </div>
          <NuxtLink to="/blog" class="btn btn-ghost">← Quay lại tin tức</NuxtLink>
        </div>
      </div>
    </article>
  </div>
</template>

<script setup lang="ts">
import type { Post, APIResponse } from "~/types";

const route = useRoute();
const slug = route.params.slug as string;
const requestURL = useRequestURL();
const shareUrl = computed(() => requestURL.href);
const copied = ref(false);
const readProgress = ref(0);

const { data: response, pending, error } = await useFetch<APIResponse<Post | null>>(`/api/posts/${slug}`, {
  default: () => ({ data: null, status: 200, success: true }),
});

const post = computed(() => response.value?.data ?? null);

const onScroll = () => {
  const h = document.documentElement;
  const max = h.scrollHeight - h.clientHeight;
  readProgress.value = max > 0 ? Math.min(100, (h.scrollTop / max) * 100) : 0;
};
onMounted(() => {
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
});
onBeforeUnmount(() => window.removeEventListener("scroll", onScroll));

const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(window.location.href);
    copied.value = true;
    setTimeout(() => (copied.value = false), 2000);
  } catch {}
};

useHead({
  title: post.value ? `${post.value.title} - Thành Hưng Phát` : "Bài viết",
  meta: [
    { name: "description", content: post.value?.excerpt || post.value?.content?.substring(0, 160) || "Bài viết" },
    { property: "og:title", content: post.value?.title || "Bài viết" },
    { property: "og:description", content: post.value?.excerpt || post.value?.content?.substring(0, 160) || "Bài viết" },
    { property: "og:image", content: post.value?.thumbnail || "" },
  ],
});

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("vi-VN", { year: "numeric", month: "long", day: "numeric" });
</script>

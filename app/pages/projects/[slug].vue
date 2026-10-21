<template>
  <div>
    <div v-if="pending" class="flex min-h-[70vh] items-center justify-center">
      <div class="h-12 w-12 animate-spin rounded-full border-2 border-white/10 border-t-neon-400" />
    </div>

    <div v-else-if="error || !project?.name" class="flex min-h-[70vh] flex-col items-center justify-center gap-6 px-4 pt-24 text-center">
      <div class="font-display text-7xl font-bold text-white/10">404</div>
      <p class="text-slate-400">Không tìm thấy dự án</p>
      <NuxtLink to="/projects" class="btn btn-ghost">← Quay lại danh sách dự án</NuxtLink>
    </div>

    <article v-else>
      <PageHero
        eyebrow="Dự án"
        :image="project.thumbnail"
        :crumbs="[{ label: 'Dự án', to: '/projects' }, { label: project.name }]"
        :title="project.name"
      >
        <template #extra>
          <div class="flex flex-wrap gap-3">
            <span v-if="project.location" class="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-slate-200">
              <svg class="h-4 w-4 text-ember-300" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0zM19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
              {{ project.location }}
            </span>
            <span v-if="project.completed_at" class="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 font-mono text-xs uppercase tracking-widest text-neon-300">
              Hoàn thành · {{ formatDate(project.completed_at) }}
            </span>
          </div>
        </template>
      </PageHero>

      <!-- Featured Image -->
      <div v-if="project.thumbnail" class="mx-auto -mt-4 max-w-6xl px-4 md:px-6">
        <div class="hud relative">
          <span class="hud-c tl" /><span class="hud-c tr" /><span class="hud-c bl" /><span class="hud-c br" />
          <NuxtImg :src="project.thumbnail" :alt="project.name" width="1400" format="webp" class="h-auto w-full object-cover" loading="eager" />
        </div>
      </div>

      <!-- Content -->
      <div class="mx-auto max-w-4xl px-4 py-16 md:px-6 md:py-24">
        <div v-if="project.description" class="space-y-6">
          <p v-for="(paragraph, index) in descriptionParagraphs" :key="index" class="text-lg leading-relaxed text-slate-300 md:text-xl">
            {{ paragraph }}
          </p>
        </div>
      </div>

      <!-- Gallery -->
      <section v-if="project.gallery && project.gallery.length > 0" class="border-t border-white/5 bg-coal-900/50 py-20">
        <div class="mx-auto max-w-7xl px-4 md:px-6">
          <SectionHeading eyebrow="Thư viện" subtitle="Khám phá các hình ảnh chi tiết về dự án">Hình ảnh dự án</SectionHeading>
          <div class="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
            <button
              v-for="(image, index) in project.gallery"
              :key="index"
              type="button"
              v-reveal="(index % 2) * 90"
              @click="lightbox = index"
              class="group relative aspect-video overflow-hidden rounded-2xl border border-white/[0.08]"
            >
              <NuxtImg
                :src="image"
                :alt="`${project.name} - Hình ${index + 1}`"
                width="900"
                format="webp"
                class="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <div class="absolute inset-0 bg-coal-950/0 transition group-hover:bg-coal-950/30" />
              <span class="absolute bottom-4 left-4 rounded-full bg-coal-950/70 px-3 py-1 font-mono text-xs text-neon-300 backdrop-blur">
                IMG_{{ String(index + 1).padStart(2, "0") }}
              </span>
            </button>
          </div>
        </div>
      </section>

      <div class="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <NuxtLink to="/projects" class="btn btn-ghost">← Quay lại danh sách dự án</NuxtLink>
      </div>

      <!-- Lightbox -->
      <Teleport to="body">
        <Transition enter-active-class="transition duration-300" enter-from-class="opacity-0" leave-active-class="transition duration-200" leave-to-class="opacity-0">
          <div
            v-if="lightbox !== null && project.gallery"
            class="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur"
            @click.self="lightbox = null"
          >
            <img :src="project.gallery[lightbox]" :alt="`${project.name} - Hình ${lightbox + 1}`" class="max-h-[85vh] max-w-full rounded-xl" />
            <button type="button" class="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white" aria-label="Đóng" @click="lightbox = null">✕</button>
            <button
              v-if="project.gallery.length > 1"
              type="button"
              class="absolute left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 text-white"
              aria-label="Ảnh trước"
              @click="lightbox = (lightbox - 1 + project.gallery.length) % project.gallery.length"
            >
              ‹
            </button>
            <button
              v-if="project.gallery.length > 1"
              type="button"
              class="absolute right-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 text-white"
              aria-label="Ảnh sau"
              @click="lightbox = (lightbox + 1) % project.gallery.length"
            >
              ›
            </button>
          </div>
        </Transition>
      </Teleport>
    </article>
  </div>
</template>

<script setup lang="ts">
import type { Project, APIResponse } from "~/types";

const route = useRoute();
const slug = route.params.slug as string;
const lightbox = ref<number | null>(null);

const { data: response, pending, error } = await useFetch<APIResponse<Project>>(`/api/projects/${slug}`, {
  default: () => ({ data: {} as Project, status: 200, success: true }),
});

const project = computed(() => response.value?.data);

const descriptionParagraphs = computed(() => {
  if (!project.value?.description) return [];
  return project.value.description
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0);
});

useHead({
  title: project.value?.name ? `${project.value.name} - Thành Hưng Phát` : "Dự án",
  meta: [
    { name: "description", content: project.value?.description || "Chi tiết dự án của Thành Hưng Phát" },
    { property: "og:title", content: project.value?.name || "Dự án" },
    { property: "og:description", content: project.value?.description || "Chi tiết dự án của Thành Hưng Phát" },
    { property: "og:image", content: project.value?.thumbnail || "" },
  ],
});

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("vi-VN", { year: "numeric", month: "long", day: "numeric" });
};
</script>

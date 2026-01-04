<template>
  <div>
    <div v-if="pending" class="text-center py-20">
      <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      <p class="mt-4 text-gray-600 font-medium">Đang tải dự án...</p>
    </div>

    <div v-else-if="error" class="text-center py-20">
      <div class="inline-block p-6 bg-red-50 border border-red-200 rounded-2xl">
        <p class="text-red-600 font-semibold">Không tìm thấy dự án</p>
      </div>
    </div>

    <article v-else-if="project" class="min-h-screen bg-white">
      <!-- Breadcrumb -->
      <div class="bg-gray-50 border-b border-gray-100">
        <div class="container mx-auto px-4 max-w-7xl py-4">
          <nav class="flex items-center gap-2 text-sm text-gray-600">
            <NuxtLink to="/" class="hover:text-primary transition-colors">Trang chủ</NuxtLink>
            <svg class="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
            <NuxtLink to="/projects" class="hover:text-primary transition-colors">Dự án</NuxtLink>
            <svg class="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
            <span class="text-gray-900 font-medium truncate max-w-xs">{{ project.name }}</span>
          </nav>
        </div>
      </div>

      <!-- Header Section -->
      <header class="bg-gradient-to-br from-gray-50 via-white to-gray-50 py-12 md:py-20">
        <div class="container mx-auto px-4 max-w-7xl">
          <div class="max-w-4xl mx-auto space-y-6">
            <!-- Location & Status -->
            <div class="flex flex-wrap items-center gap-3 text-sm">
              <div
                v-if="project.location"
                class="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full font-semibold shadow-sm"
              >
                <svg class="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {{ project.location }}
              </div>
              <div
                v-if="project.completed_at"
                class="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-full font-medium"
              >
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Hoàn thành: {{ formatDate(project.completed_at) }}
              </div>
            </div>

            <!-- Title -->
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight">
              {{ project.name }}
            </h1>
          </div>
        </div>
      </header>

      <!-- Featured Image -->
      <div v-if="project.thumbnail" class="bg-gradient-to-b from-gray-50 to-white">
        <div class="container mx-auto px-4 max-w-7xl py-8 md:py-12">
          <div class="max-w-6xl mx-auto">
            <div class="relative overflow-hidden rounded-2xl md:rounded-3xl shadow-2xl ring-1 ring-gray-200/50">
              <NuxtImg
                :src="project.thumbnail"
                :alt="project.name"
                class="w-full h-auto object-cover"
                sizes="sm:100vw md:100vw lg:1200px"
                loading="eager"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Content -->
      <div class="bg-white py-12 md:py-20">
        <div class="container mx-auto px-4 max-w-7xl">
          <div class="max-w-4xl mx-auto">
            <!-- Description -->
            <div v-if="project.description" class="prose prose-lg prose-gray max-w-none mb-16">
              <div class="space-y-6 text-gray-700 leading-relaxed">
                <p
                  v-for="(paragraph, index) in descriptionParagraphs"
                  :key="index"
                  class="text-lg md:text-xl leading-relaxed"
                >
                  {{ paragraph }}
                </p>
              </div>
            </div>

            <!-- Gallery -->
            <div v-if="project.gallery && project.gallery.length > 0" class="mt-20">
              <div class="mb-10">
                <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Hình ảnh dự án</h2>
                <p class="text-gray-600">Khám phá các hình ảnh chi tiết về dự án</p>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <div
                  v-for="(image, index) in project.gallery"
                  :key="index"
                  class="group relative overflow-hidden rounded-2xl aspect-video shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
                >
                  <NuxtImg
                    :src="image"
                    :alt="`${project.name} - Hình ${index + 1}`"
                    class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    sizes="sm:100vw md:50vw lg:600px"
                  />
                  <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                  <div class="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div class="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg text-sm font-medium text-gray-900">
                      Hình {{ index + 1 }}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Back Button -->
            <div class="mt-20 pt-12 border-t border-gray-200">
              <UiButton
                to="/projects"
                variant="outline"
                size="lg"
                class="group"
              >
                <template #icon>
                  <svg class="h-5 w-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                </template>
                Quay lại danh sách dự án
              </UiButton>
            </div>
          </div>
        </div>
      </div>
    </article>
  </div>
</template>

<script setup lang="ts">
import type { Project, APIResponse } from "~/types";

const route = useRoute();
const slug = route.params.slug as string;

const { data: response, pending, error } = await useFetch<APIResponse<Project>>(`/api/projects/${slug}`, {
  default: () => ({ data: {} as Project, status: 200, success: true }),
});

const project = computed(() => response.value?.data);

const descriptionParagraphs = computed(() => {
  if (!project.value?.description) return [];
  return project.value.description
    .split(/\n\s*\n/)
    .map(p => p.trim())
    .filter(p => p.length > 0);
});

useHead({
  title: project.value ? `${project.value.name} - Thành Hưng Phát` : "Dự án",
  meta: [
    {
      name: "description",
      content: project.value?.description || "Chi tiết dự án của Thành Hưng Phát",
    },
    {
      property: "og:title",
      content: project.value?.name || "Dự án",
    },
    {
      property: "og:description",
      content: project.value?.description || "Chi tiết dự án của Thành Hưng Phát",
    },
    {
      property: "og:image",
      content: project.value?.thumbnail || "",
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

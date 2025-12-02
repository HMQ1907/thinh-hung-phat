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

    <article v-else-if="project" class="min-h-screen">
      <!-- Header Section -->
      <header class="bg-gradient-to-br from-gray-50 via-white to-gray-50 py-16 md:py-24 border-b border-gray-100">
        <div class="container mx-auto px-4 max-w-4xl">
          <div class="space-y-6">
            <!-- Location & Status -->
            <div class="flex flex-wrap items-center gap-4 text-sm">
              <div
                v-if="project.location"
                class="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full font-semibold"
              >
                <svg class="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {{ project.location }}
              </div>
              <div
                v-if="project.completed_at"
                class="flex items-center gap-2 text-gray-500"
              >
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Hoàn thành: {{ formatDate(project.completed_at) }}
              </div>
            </div>

            <!-- Title -->
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              {{ project.name }}
            </h1>
          </div>
        </div>
      </header>

      <!-- Featured Image -->
      <div v-if="project.thumbnail" class="bg-gray-100">
        <div class="container mx-auto px-4 max-w-5xl py-12 md:py-16">
          <div class="relative overflow-hidden rounded-3xl shadow-2xl">
            <NuxtImg
              :src="project.thumbnail"
              :alt="project.name"
              class="w-full h-auto object-cover"
              sizes="sm:100vw md:100vw lg:1200px"
              loading="eager"
            />
          </div>
        </div>
      </div>

      <!-- Content -->
      <div class="bg-white py-12 md:py-16">
        <div class="container mx-auto px-4 max-w-4xl">
          <!-- Description -->
          <div v-if="project.description" class="prose prose-lg prose-gray max-w-none mb-12">
            <p class="text-lg text-gray-700 leading-relaxed whitespace-pre-line">{{ project.description }}</p>
          </div>

          <!-- Gallery -->
          <div v-if="project.gallery && project.gallery.length > 0" class="mt-16">
            <h2 class="text-3xl font-bold mb-8 text-gray-900">Hình ảnh dự án</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div
                v-for="(image, index) in project.gallery"
                :key="index"
                class="group relative overflow-hidden rounded-2xl aspect-video shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <NuxtImg
                  :src="image"
                  :alt="`${project.name} - Hình ${index + 1}`"
                  class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  sizes="sm:100vw md:50vw lg:600px"
                />
                <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
              </div>
            </div>
          </div>

          <!-- Back Button -->
          <div class="mt-16 pt-8 border-t border-gray-200">
            <UiButton
              to="/projects"
              variant="outline"
              size="md"
            >
              <template #icon>
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </template>
              Quay lại danh sách dự án
            </UiButton>
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
  default: () => ({ data: null, status: 200, success: true }),
});

const project = computed(() => response.value?.data);

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

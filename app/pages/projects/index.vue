<template>
  <div>
    <!-- Hero -->
    <section class="relative overflow-hidden bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 py-24 text-white">
      <div class="container mx-auto px-4">
        <div class="max-w-3xl">
          <p class="text-sm uppercase tracking-[0.4em] text-white/60">Projects</p>
          <h1 class="mt-4 text-4xl font-bold md:text-5xl">Dự án tiêu biểu</h1>
          <p class="mt-6 text-lg text-white/80">
            Những công trình chúng tôi đã thực hiện cho các đối tác lớn trong và ngoài nước. Mỗi dự án đều đảm bảo chất lượng than, tiến độ giao hàng và dịch vụ chuyên nghiệp.
          </p>
        </div>
      </div>
      <div class="absolute inset-y-0 right-0 hidden w-1/2 bg-linear-to-l from-white/5 to-transparent lg:block"></div>
    </section>

    <!-- Projects Grid -->
    <section class="bg-linear-to-b from-white to-gray-100 py-20">
      <div class="container mx-auto px-4">
        <div class="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 class="mt-3 text-3xl font-bold text-gray-900">Các dự án đã thực hiện</h2>
          </div>
        </div>

        <div v-if="pending" class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div v-for="s in 6" :key="s" class="h-72 rounded-2xl bg-white shadow animate-pulse" />
        </div>

        <div v-else-if="error" class="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">
          Không tải được dữ liệu dự án. Vui lòng thử lại sau.
        </div>

        <div v-else-if="projects.length === 0" class="rounded-2xl border border-dashed border-gray-200 p-12 text-center text-gray-500">
          Chưa có dự án nào được công bố.
        </div>

        <div v-else class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <article
            v-for="project in projects"
            :key="project.id"
            class="group flex flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
          >
            <div class="relative h-56 w-full overflow-hidden">
              <img
                v-if="project.thumbnail"
                :src="project.thumbnail"
                :alt="project.name"
                class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div
                v-else
                class="flex h-full w-full items-center justify-center bg-linear-to-br from-slate-900 to-slate-700 text-white text-lg font-semibold"
              >
                {{ project.name.charAt(0) }}
              </div>
              <span
                class="absolute left-4 top-4 rounded-full bg-white/90 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-gray-800 shadow"
              >
                {{ project.location || "Việt Nam" }}
              </span>
            </div>
            <div class="flex flex-1 flex-col space-y-4 p-6">
              <div>
                <p class="text-xs uppercase tracking-[0.4em] text-gray-400">Hoàn thành</p>
                <h3 class="mt-2 text-xl font-semibold text-gray-900">{{ project.name }}</h3>
                <p class="mt-2 text-sm text-gray-600 line-clamp-3">{{ project.description }}</p>
              </div>
              <div class="mt-auto flex items-center justify-between text-sm text-gray-500">
                <span>{{ formatDate(project.completed_at || project.created_at) }}</span>
                <span class="font-medium text-primary">Xem chi tiết</span>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { Project } from "~/types";

useHead({
  title: "Dự án tiêu biểu - Thịnh Hưng Phát",
  meta: [
    {
      name: "description",
      content: "Danh sách dự án tiêu biểu của Thịnh Hưng Phát, cung cấp than đá chất lượng cho đối tác toàn quốc.",
    },
  ],
});

const { data, error, pending } = useFetch<Project[]>("/api/projects", {
  default: () => [],
});

const projects = computed<Project[]>(() => data.value || []);

const formatDate = (value?: string) => {
  if (!value) return "Đang triển khai";
  return new Intl.DateTimeFormat("vi-VN", { year: "numeric", month: "short" }).format(new Date(value));
};
</script>



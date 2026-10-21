<template>
  <div>
    <PageHero
      eyebrow="Dự án"
      code="// 03"
      subtitle="Những công trình chúng tôi đã thực hiện cho các đối tác lớn trong và ngoài nước — đảm bảo chất lượng than, tiến độ giao hàng và dịch vụ chuyên nghiệp."
      :crumbs="[{ label: 'Dự án' }]"
    >
      Dự án <span class="text-grad">tiêu biểu</span>
    </PageHero>

    <section class="py-20 md:py-28">
      <div class="mx-auto max-w-7xl px-4 md:px-6">
        <div v-if="pending" class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div v-for="s in 6" :key="s" class="h-96 animate-pulse rounded-3xl border border-white/5 bg-white/[0.03]" />
        </div>

        <div v-else-if="error" class="rounded-3xl border border-red-400/30 bg-red-400/10 p-6 text-red-300">
          Không tải được dữ liệu dự án. Vui lòng thử lại sau.
        </div>

        <div v-else-if="projects.length === 0" class="rounded-3xl border border-dashed border-white/10 p-16 text-center text-slate-500">
          Chưa có dự án nào được công bố.
        </div>

        <div v-else class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div v-for="(project, i) in projects" :key="project.id" v-reveal="(i % 3) * 90" :class="i === 0 && projects.length % 3 === 2 ? 'lg:col-span-2' : ''">
            <NuxtLink
              :to="`/projects/${project.slug}`"
              v-spotlight
              class="spot group relative flex h-full min-h-[420px] flex-col justify-end overflow-hidden rounded-3xl border border-white/[0.08] bg-coal-850"
            >
              <NuxtImg
                v-if="project.thumbnail"
                :src="project.thumbnail"
                :alt="project.name"
                width="1000"
                format="webp"
                class="absolute inset-0 !z-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div v-else class="dots-bg absolute inset-0 !z-0 flex items-center justify-center">
                <span class="font-display text-8xl font-bold text-white/5">{{ project.name.charAt(0) }}</span>
              </div>
              <div class="absolute inset-0 !z-0 bg-gradient-to-t from-coal-950 via-coal-950/60 to-transparent" />

              <span class="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-coal-950/60 px-3 py-1.5 text-xs font-medium text-white backdrop-blur">
                <svg class="h-3.5 w-3.5 text-ember-300" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0zM19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                {{ project.location || "Việt Nam" }}
              </span>

              <div class="p-6 md:p-8">
                <div class="font-mono text-xs uppercase tracking-widest text-neon-300">{{ formatDate(project.completed_at || project.created_at) }}</div>
                <h3 class="font-display mt-3 text-2xl font-semibold leading-snug text-white md:text-3xl">{{ project.name }}</h3>
                <p class="mt-3 line-clamp-2 text-sm leading-relaxed text-slate-300/80">{{ project.description }}</p>
                <div class="mt-5 inline-flex items-center gap-2 text-sm font-medium text-ember-300">
                  Xem chi tiết <span class="transition group-hover:translate-x-1">→</span>
                </div>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { Project, APIResponse } from "~/types";

useHead({
  title: "Dự án tiêu biểu - Thành Hưng Phát",
  meta: [
    {
      name: "description",
      content: "Danh sách dự án tiêu biểu của Thành Hưng Phát, cung cấp than đá chất lượng cho đối tác toàn quốc.",
    },
  ],
});

const { data: response, error, pending } = useFetch<APIResponse<Project[]>>("/api/projects", {
  default: () => ({ data: [], status: 200, success: true }),
});

const projects = computed<Project[]>(() => response.value?.data || []);

const formatDate = (value?: string) => {
  if (!value) return "Đang triển khai";
  return new Intl.DateTimeFormat("vi-VN", { year: "numeric", month: "short" }).format(new Date(value));
};
</script>

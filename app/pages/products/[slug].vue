<template>
  <div>
    <div v-if="pending" class="flex min-h-[70vh] items-center justify-center">
      <div class="h-12 w-12 animate-spin rounded-full border-2 border-white/10 border-t-neon-400" />
    </div>
    <div v-else-if="error || !product" class="flex min-h-[70vh] flex-col items-center justify-center gap-6 px-4 pt-24 text-center">
      <div class="font-display text-7xl font-bold text-white/10">404</div>
      <p class="text-slate-400">Không tìm thấy sản phẩm</p>
      <NuxtLink to="/products" class="btn btn-ghost">← Quay lại danh sách</NuxtLink>
    </div>

    <div v-else>
      <section class="noise relative isolate overflow-hidden pb-16 pt-32 md:pb-24 md:pt-40">
        <div class="absolute inset-0 -z-10">
          <NuxtImg :src="product.image_url || '/thandep.jpg'" alt="" width="1920" format="webp" class="h-full w-full object-cover opacity-20 blur-sm" />
          <div class="absolute inset-0 bg-gradient-to-b from-coal-950/70 via-coal-950/90 to-coal-950" />
          <div class="grid-bg absolute inset-0" />
          <div class="absolute -left-40 top-20 h-[420px] w-[420px] rounded-full bg-neon-500/20 blur-[120px]" />
        </div>

        <div class="mx-auto max-w-7xl px-4 md:px-6">
          <nav class="mb-10 flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-slate-500">
            <NuxtLink to="/" class="hover:text-neon-300">Trang chủ</NuxtLink>
            <span class="text-white/20">/</span>
            <NuxtLink to="/products" class="hover:text-neon-300">Sản phẩm</NuxtLink>
            <span class="text-white/20">/</span>
            <span class="max-w-[16rem] truncate text-slate-300">{{ product.name }}</span>
          </nav>

          <div class="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-16">
            <!-- Image -->
            <div class="hud relative">
              <span class="hud-c tl" /><span class="hud-c tr" /><span class="hud-c bl" /><span class="hud-c br" />
              <div class="relative aspect-square overflow-hidden bg-coal-850">
                <NuxtImg
                  :src="product.image_url || '/thandep.jpg'"
                  :alt="product.name"
                  width="1000"
                  format="webp"
                  class="h-full w-full object-cover"
                  loading="eager"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-coal-950/60 via-transparent to-transparent" />
                <div class="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-transparent via-neon-400/15 to-transparent" style="animation: scan 5s linear infinite" />
              </div>
            </div>

            <!-- Details -->
            <div class="lg:sticky lg:top-28">
              <div class="eyebrow">Sản phẩm</div>
              <h1 class="font-display mt-5 text-4xl font-bold leading-tight text-white md:text-5xl">{{ product.name }}</h1>

              <p v-if="product.description" class="mt-6 whitespace-pre-line text-lg leading-relaxed text-slate-400">
                {{ product.description }}
              </p>

              <div v-if="specs.length" class="mt-10 overflow-hidden rounded-2xl border border-white/[0.08] bg-coal-850/70">
                <div class="flex items-center justify-between border-b border-white/5 px-5 py-3 font-mono text-xs uppercase tracking-widest text-slate-500">
                  <span>Thông số kỹ thuật</span>
                  <span class="text-neon-300">SPEC</span>
                </div>
                <dl>
                  <div
                    v-for="([key, value], i) in specs"
                    :key="key"
                    :class="['flex items-center justify-between gap-6 px-5 py-4', i < specs.length - 1 ? 'border-b border-white/5' : '']"
                  >
                    <dt class="text-sm text-slate-400">{{ key }}</dt>
                    <dd class="text-right font-mono text-sm font-medium text-white">{{ value }}</dd>
                  </div>
                </dl>
              </div>

              <div class="mt-10 flex flex-col gap-3 sm:flex-row">
                <NuxtLink to="/contact" class="btn btn-ember flex-1">
                  Liên hệ đặt hàng
                  <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14m-6-6 6 6-6 6" />
                  </svg>
                </NuxtLink>
                <a href="tel:0933888575" class="btn btn-ghost flex-1">Gọi 0933 888 575</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product, APIResponse } from "~/types";

const route = useRoute();
const slug = route.params.slug as string;

const { data: response, pending, error } = await useFetch<APIResponse<Product>>(`/api/products/${slug}`);

const product = computed(() => response.value?.data);

const specs = computed<[string, any][]>(() => {
  const s = product.value?.specifications;
  if (!s || typeof s !== "object") return [];
  return Object.entries(s);
});

useHead({
  title: product.value ? `${product.value.name} - Thành Hưng Phát` : "Sản phẩm",
  meta: [
    {
      name: "description",
      content: product.value?.description || "Chi tiết sản phẩm",
    },
  ],
});
</script>

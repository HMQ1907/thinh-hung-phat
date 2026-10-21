<template>
  <NuxtLink
    :to="`/products/${product.slug}`"
    v-spotlight
    class="spot group flex h-full flex-col overflow-hidden rounded-3xl border border-white/[0.08] bg-coal-850/80 transition duration-500 hover:-translate-y-1.5"
  >
    <div class="relative aspect-[4/3] overflow-hidden bg-coal-800">
      <NuxtImg
        v-if="product.image_url"
        :src="product.image_url"
        :alt="product.name"
        width="640"
        format="webp"
        class="h-full w-full object-cover transition duration-700 group-hover:scale-110"
        loading="lazy"
      />
      <div v-else class="flex h-full w-full items-center justify-center">
        <NuxtImg src="/thandep.jpg" alt="" width="640" format="webp" class="h-full w-full object-cover opacity-40" loading="lazy" />
      </div>
      <div class="absolute inset-0 bg-gradient-to-t from-coal-850 via-coal-850/10 to-transparent" />
      <span class="absolute left-4 top-4 rounded-full border border-white/15 bg-coal-950/60 px-3 py-1 font-mono text-[11px] tracking-widest text-neon-300 backdrop-blur">
        P-{{ String(index + 1).padStart(2, "0") }}
      </span>
      <span
        class="absolute right-4 top-4 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full bg-ember-400 text-coal-950 opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100"
      >
        <svg class="h-4 w-4 -rotate-45" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14m-6-6 6 6-6 6" />
        </svg>
      </span>
    </div>
    <div class="flex flex-1 flex-col p-6">
      <h3 class="font-display text-xl font-semibold text-white transition group-hover:text-neon-300">{{ product.name }}</h3>
      <p class="mt-3 line-clamp-2 flex-1 text-sm leading-relaxed text-slate-400">{{ product.description }}</p>
      <div class="mt-5 flex items-center justify-between border-t border-white/5 pt-4 font-mono text-xs uppercase tracking-widest">
        <span class="text-slate-500">Xem chi tiết</span>
        <span class="text-ember-300 transition group-hover:translate-x-1">→</span>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { Product } from "~/types";
defineProps<{ product: Product; index: number }>();
</script>

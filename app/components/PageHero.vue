<template>
  <section class="noise relative isolate overflow-hidden border-b border-white/5 pb-16 pt-36 md:pb-24 md:pt-44">
    <!-- nền -->
    <div class="absolute inset-0 -z-10">
      <NuxtImg
        v-if="image"
        :src="image"
        alt=""
        width="1920"
        format="webp"
        class="h-full w-full object-cover opacity-30"
        loading="eager"
      />
      <div class="absolute inset-0 bg-gradient-to-b from-coal-950/60 via-coal-950/85 to-coal-950" />
      <div class="grid-bg absolute inset-0" />
      <div class="absolute -left-40 top-10 h-[420px] w-[420px] rounded-full bg-neon-500/20 blur-[120px]" />
      <div class="absolute -right-32 bottom-0 h-[380px] w-[380px] rounded-full bg-ember-500/15 blur-[120px]" />
    </div>

    <div class="relative mx-auto max-w-7xl px-4 md:px-6">
      <!-- breadcrumb -->
      <nav v-if="crumbs?.length" class="mb-8 flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-slate-500">
        <NuxtLink to="/" class="transition hover:text-neon-300">Trang chủ</NuxtLink>
        <template v-for="(c, i) in crumbs" :key="i">
          <span class="text-white/20">/</span>
          <NuxtLink v-if="c.to" :to="c.to" class="transition hover:text-neon-300">{{ c.label }}</NuxtLink>
          <span v-else class="max-w-[16rem] truncate text-slate-300">{{ c.label }}</span>
        </template>
      </nav>

      <div class="eyebrow">
        <span v-if="code" class="text-white/35">{{ code }}</span>
        {{ eyebrow }}
      </div>
      <h1 class="font-display mt-6 max-w-4xl text-balance text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-7xl">
        <slot>{{ title }}</slot>
      </h1>
      <p v-if="subtitle" class="mt-6 max-w-2xl text-lg leading-relaxed text-slate-400 md:text-xl">
        {{ subtitle }}
      </p>
      <div v-if="$slots.extra" class="mt-8">
        <slot name="extra" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  eyebrow: string;
  title?: string;
  subtitle?: string;
  code?: string;
  image?: string;
  crumbs?: { label: string; to?: string }[];
}>();
</script>

<template>
  <div :class="['max-w-3xl', align === 'center' ? 'mx-auto text-center' : '']">
    <div v-if="eyebrow" v-reveal class="eyebrow">
      <span v-if="index" class="text-white/35">{{ index }}</span>
      {{ eyebrow }}
    </div>
    <h2
      v-reveal="80"
      class="font-display mt-5 text-balance text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl md:text-5xl"
    >
      <slot />
    </h2>
    <p v-if="subtitle" v-reveal="160" class="mt-5 text-base leading-relaxed text-slate-400 md:text-lg">
      {{ subtitle }}
    </p>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{ eyebrow?: string; index?: string; subtitle?: string; align?: "left" | "center" }>(),
  { align: "left" }
);
</script>

<template>
  <header :class="['sticky top-0 z-50 w-full transition-all duration-300', isOverHero ? 'bg-transparent text-white border-transparent' : 'bg-white/95 backdrop-blur-md text-gray-900 border-b border-gray-200 shadow-sm']">
    <nav class="container mx-auto flex h-16 md:h-20 items-center justify-between px-4 md:px-6">
      <!-- Logo -->
      <NuxtLink to="/" class="flex items-center space-x-3 group">
        <div class="h-10 w-10 md:h-12 md:w-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
          <span class="text-primary-foreground font-bold text-lg md:text-xl">THP</span>
        </div>
        <span class="font-bold text-lg md:text-xl hidden sm:inline-block group-hover:text-primary transition-colors">Thịnh Hưng Phát</span>
      </NuxtLink>

      <!-- Desktop Navigation -->
      <div class="hidden md:flex items-center space-x-1">
        <NuxtLink
          v-for="item in navItems"
          :key="item.href"
          :to="item.href"
          :class="[
            isOverHero ? 'text-white/90 hover:text-white' : 'text-gray-700 hover:text-gray-900',
            'px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200',
            'hover:bg-white/10'
          ]"
          active-class="bg-primary text-primary-foreground shadow-md"
        >
          {{ item.label }}
        </NuxtLink>
      </div>

      <!-- Mobile Menu Button -->
      <button
        @click="mobileMenuOpen = !mobileMenuOpen"
        class="md:hidden p-2"
        aria-label="Toggle menu"
      >
        <svg
          class="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            v-if="!mobileMenuOpen"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
          <path
            v-else
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </nav>

    <!-- Mobile Menu -->
    <div
      v-if="mobileMenuOpen"
      class="md:hidden border-t bg-background"
      v-motion-slide-top
    >
      <div class="container mx-auto px-4 py-4 space-y-2">
        <NuxtLink
          v-for="item in navItems"
          :key="item.href"
          :to="item.href"
          @click="mobileMenuOpen = false"
          class="block py-2 text-sm font-medium transition-colors hover:text-primary"
          active-class="text-primary"
        >
          {{ item.label }}
        </NuxtLink>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue';

const mobileMenuOpen = ref(false);
const isOverHero = ref(true); // Start with true, assuming we're at top
let heroObserver: IntersectionObserver | null = null;

const navItems = [
  { href: '/', label: 'Trang chủ' },
  { href: '/about', label: 'Giới thiệu' },
  { href: '/products', label: 'Sản phẩm' },
  { href: '/projects', label: 'Dự án' },
  { href: '/blog', label: 'Tin tức' },
  { href: '/contact', label: 'Liên hệ' },
];

onMounted(() => {
  if (!process.client) return;

  // Try to observe the first big <section> (hero/banner) on the page.
  const heroEl = document.querySelector('section');

  if (heroEl && 'IntersectionObserver' in window) {
    heroObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // When hero is intersecting, we consider header over the banner
          isOverHero.value = entry.isIntersecting;
        });
      },
      { root: null, threshold: 0.1 }
    );
    heroObserver.observe(heroEl);
  } else {
    // Fallback: simple scroll check
    const onScroll = () => {
      isOverHero.value = window.scrollY < 120;
    };
    window.addEventListener('scroll', onScroll);
    // run once to set initial state
    onScroll();

    onBeforeUnmount(() => window.removeEventListener('scroll', onScroll));
  }
});

onBeforeUnmount(() => {
  if (heroObserver) {
    heroObserver.disconnect();
    heroObserver = null;
  }
});
</script>


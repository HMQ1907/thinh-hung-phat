<template>
  <header class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <nav class="container mx-auto flex h-16 items-center justify-between px-4">
      <!-- Logo -->
      <NuxtLink to="/" class="flex items-center space-x-2">
        <div class="flex items-center space-x-2">
          <div class="h-8 w-8 rounded bg-primary flex items-center justify-center">
            <span class="text-primary-foreground font-bold text-lg">THP</span>
          </div>
          <span class="font-bold text-xl hidden sm:inline-block">Thịnh Hưng Phát</span>
        </div>
      </NuxtLink>

      <!-- Desktop Navigation -->
      <div class="hidden md:flex items-center space-x-6">
        <NuxtLink
          v-for="item in navItems"
          :key="item.href"
          :to="item.href"
          class="text-sm font-medium transition-colors hover:text-primary"
          active-class="text-primary"
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
const mobileMenuOpen = ref(false);

const navItems = [
  { href: '/', label: 'Trang chủ' },
  { href: '/about', label: 'Giới thiệu' },
  { href: '/products', label: 'Sản phẩm' },
  { href: '/blog', label: 'Tin tức' },
  { href: '/contact', label: 'Liên hệ' },
];
</script>


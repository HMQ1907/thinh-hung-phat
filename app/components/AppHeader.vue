<template>
  <header class="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6 md:pt-4">
    <nav
      :class="[
        'mx-auto flex h-16 max-w-7xl items-center justify-between rounded-2xl px-3 transition-all duration-500 md:h-[72px] md:px-5',
        scrolled || mobileMenuOpen
          ? 'border border-white/10 bg-coal-900/75 shadow-[0_20px_60px_-20px_rgba(0,0,0,.8)] backdrop-blur-xl'
          : 'border border-transparent bg-transparent',
      ]"
    >
      <!-- Logo -->
      <NuxtLink to="/" class="group flex items-center gap-2" aria-label="Thành Hưng Phát - Trang chủ">
        <img
          src="/logo-thp-crop.png"
          alt="Thành Hưng Phát"
          width="502"
          height="142"
          class="h-9 w-auto object-contain drop-shadow-[0_0_18px_rgba(58,216,207,.35)] transition-transform duration-300 group-hover:scale-105 md:h-10"
        />
      </NuxtLink>

      <!-- Desktop Navigation -->
      <div class="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] p-1 lg:flex">
        <NuxtLink
          v-for="item in navItems"
          :key="item.href"
          :to="item.href"
          :class="[
            'relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300',
            isActive(item.href) ? 'text-coal-950' : 'text-slate-300 hover:text-white',
          ]"
        >
          <span
            v-if="isActive(item.href)"
            class="absolute inset-0 -z-0 rounded-full bg-gradient-to-r from-neon-300 to-neon-400 shadow-[0_0_24px_-4px_rgba(58,216,207,.8)]"
          />
          <span class="relative">{{ item.label }}</span>
        </NuxtLink>
      </div>

      <div class="flex items-center gap-2">
        <a
          href="tel:0933888575"
          class="hidden items-center gap-3 rounded-full border border-white/10 py-1.5 pl-1.5 pr-4 text-sm text-white transition hover:border-ember-400/60 md:flex"
        >
          <span class="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-ember-300 to-ember-500 text-coal-950">
            <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
          </span>
          <span class="font-mono tracking-wide">0933 888 575</span>
        </a>

        <!-- Mobile Menu Button -->
        <button
          @click="mobileMenuOpen = !mobileMenuOpen"
          class="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 text-white lg:hidden"
          :aria-expanded="mobileMenuOpen"
          aria-label="Mở menu"
        >
          <div class="relative h-3.5 w-5">
            <span :class="['absolute left-0 h-0.5 w-5 rounded bg-current transition-all duration-300', mobileMenuOpen ? 'top-1.5 rotate-45' : 'top-0']" />
            <span :class="['absolute left-0 top-1.5 h-0.5 w-5 rounded bg-current transition-opacity duration-300', mobileMenuOpen ? 'opacity-0' : '']" />
            <span :class="['absolute left-0 h-0.5 w-5 rounded bg-current transition-all duration-300', mobileMenuOpen ? 'top-1.5 -rotate-45' : 'top-3']" />
          </div>
        </button>
      </div>
    </nav>

    <!-- Mobile Menu -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-3"
      leave-active-class="transition duration-200 ease-in"
      leave-to-class="opacity-0 -translate-y-3"
    >
      <div
        v-if="mobileMenuOpen"
        class="mx-auto mt-2 max-w-7xl overflow-hidden rounded-2xl border border-white/10 bg-coal-900/95 backdrop-blur-xl lg:hidden"
      >
        <div class="p-3">
          <NuxtLink
            v-for="(item, i) in navItems"
            :key="item.href"
            :to="item.href"
            @click="mobileMenuOpen = false"
            :class="[
              'flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-medium transition',
              isActive(item.href) ? 'bg-neon-400/10 text-neon-300' : 'text-slate-200 hover:bg-white/5',
            ]"
          >
            <span>{{ item.label }}</span>
            <span class="font-mono text-xs text-white/30">0{{ i + 1 }}</span>
          </NuxtLink>
          <a href="tel:0933888575" class="btn btn-ember mt-3 w-full">Gọi 0933 888 575</a>
        </div>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
const mobileMenuOpen = ref(false);
const scrolled = ref(false);
const route = useRoute();

const navItems = [
  { href: "/", label: "Trang chủ" },
  { href: "/about", label: "Giới thiệu" },
  { href: "/products", label: "Sản phẩm" },
  { href: "/projects", label: "Dự án" },
  { href: "/blog", label: "Tin tức" },
  { href: "/contact", label: "Liên hệ" },
];

const isActive = (href: string) => (href === "/" ? route.path === "/" : route.path.startsWith(href));

const onScroll = () => {
  scrolled.value = window.scrollY > 24;
};

onMounted(() => {
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", onScroll);
});

watch(
  () => route.fullPath,
  () => {
    mobileMenuOpen.value = false;
  }
);
</script>

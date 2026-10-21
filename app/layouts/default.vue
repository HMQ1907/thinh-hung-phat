<template>
  <div class="site flex min-h-screen flex-col overflow-x-clip">
    <AppHeader />
    <main class="flex-1">
      <slot />
    </main>
    <AppFooter />

    <!-- Nút gọi nhanh (mobile) -->
    <a
      href="tel:0933888575"
      class="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-ember-300 to-ember-500 text-coal-950 shadow-[0_10px_40px_-8px_rgba(240,138,36,.9)] md:hidden"
      aria-label="Gọi hotline 0933 888 575"
    >
      <span class="absolute inset-0 rounded-full" style="animation: ring-soft 2.2s ease-out infinite" />
      <svg class="relative h-6 w-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
      </svg>
    </a>

    <ClientOnly>
      <Toaster position="top-right" theme="dark" />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
</script>

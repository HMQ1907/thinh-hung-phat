<template>
  <footer class="relative overflow-hidden border-t border-white/5 bg-coal-950">
    <div class="pointer-events-none absolute inset-0">
      <div class="dots-bg absolute inset-0 opacity-40 [mask-image:linear-gradient(to_bottom,transparent,black_40%)]" />
      <div class="absolute -bottom-40 left-1/2 h-[400px] w-[900px] -translate-x-1/2 rounded-full bg-neon-500/10 blur-[140px]" />
    </div>

    <div class="relative mx-auto max-w-7xl px-4 pt-20 md:px-6">
      <div class="grid grid-cols-1 gap-12 md:grid-cols-12">
        <!-- Company Info -->
        <div class="md:col-span-5">
          <img src="/logo-thp-crop.png" alt="Thành Hưng Phát" width="502" height="142" class="h-11 w-auto" />
          <p class="mt-6 max-w-sm leading-relaxed text-slate-400">
            Công ty TNHH Năng lượng Thành Hưng Phát — chuyên cung cấp than đá chất lượng cao, uy tín, giá cả hợp lý cho
            doanh nghiệp trên toàn quốc.
          </p>
          <div class="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 font-mono text-xs text-slate-400">
            <span class="relative flex h-2 w-2">
              <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span class="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            ĐANG HOẠT ĐỘNG · MST 0315184216
          </div>
        </div>

        <!-- Quick Links -->
        <div class="md:col-span-3">
          <h3 class="font-mono text-xs uppercase tracking-[0.25em] text-slate-500">Điều hướng</h3>
          <ul class="mt-6 space-y-3">
            <li v-for="l in links" :key="l.to">
              <NuxtLink :to="l.to" class="group inline-flex items-center gap-2 text-slate-300 transition hover:text-neon-300">
                <span class="h-px w-3 bg-white/20 transition-all duration-300 group-hover:w-6 group-hover:bg-neon-400" />
                {{ l.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Contact Info -->
        <div class="md:col-span-4">
          <h3 class="font-mono text-xs uppercase tracking-[0.25em] text-slate-500">Liên hệ</h3>
          <ul class="mt-6 space-y-4">
            <li>
              <a href="tel:0933888575" class="group block">
                <span class="block text-xs text-slate-500">Hotline</span>
                <span class="font-display text-2xl font-semibold text-white transition group-hover:text-ember-300">0933 888 575</span>
              </a>
            </li>
            <li>
              <a href="mailto:contact@thanhhungphat.com" class="group block">
                <span class="block text-xs text-slate-500">Email</span>
                <span class="text-slate-200 transition group-hover:text-neon-300">contact@thanhhungphat.com</span>
              </a>
            </li>
            <li>
              <span class="block text-xs text-slate-500">Địa chỉ</span>
              <span class="text-slate-300">256/22A đường Thạnh Xuân 25, Khu phố 2, TP. Hồ Chí Minh</span>
            </li>
          </ul>
          <div class="mt-6 flex gap-3">
            <a
              href="#"
              class="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 text-slate-300 transition hover:border-neon-400/60 hover:text-neon-300 hover:shadow-[0_0_24px_-6px_rgba(58,216,207,.8)]"
              aria-label="Facebook"
            >
              <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a
              href="https://zalo.me/0933888575"
              target="_blank"
              rel="noopener"
              class="flex h-11 items-center justify-center rounded-xl border border-white/10 px-4 text-sm font-bold text-slate-300 transition hover:border-neon-400/60 hover:text-neon-300 hover:shadow-[0_0_24px_-6px_rgba(58,216,207,.8)]"
              aria-label="Zalo"
            >
              Zalo
            </a>
          </div>
        </div>
      </div>

      <!-- Wordmark lớn (SVG để luôn vừa khung) -->
      <div class="mt-16 select-none" aria-hidden="true">
        <svg viewBox="0 0 1200 130" class="h-auto w-full">
          <defs>
            <linearGradient id="ft-wm" x1="0" x2="1">
              <stop offset="0%" stop-color="#7cebe4" stop-opacity=".35" />
              <stop offset="100%" stop-color="#f6b13c" stop-opacity=".25" />
            </linearGradient>
          </defs>
          <text
            x="600"
            y="112"
            text-anchor="middle"
            textLength="1196"
            lengthAdjust="spacingAndGlyphs"
            fill="none"
            stroke="url(#ft-wm)"
            stroke-width="1"
            style="font-family: var(--font-display); font-weight: 700; font-size: 132px"
          >
            THÀNH HƯNG PHÁT
          </text>
        </svg>
      </div>

      <div class="flex flex-col items-center justify-between gap-3 border-t border-white/5 py-6 text-sm text-slate-500 md:flex-row">
        <p>&copy; {{ year }} Thành Hưng Phát. Tất cả quyền được bảo lưu.</p>
        <p class="font-mono text-xs tracking-widest">SUSTAINABLE ENERGY · VIỆT NAM</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const year = new Date().getFullYear();
const links = [
  { to: "/about", label: "Giới thiệu" },
  { to: "/products", label: "Sản phẩm" },
  { to: "/projects", label: "Dự án" },
  { to: "/blog", label: "Tin tức" },
  { to: "/contact", label: "Liên hệ" },
];
</script>

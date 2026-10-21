<template>
  <!-- Biểu tượng "lõi năng lượng" lấy cảm hứng từ hoa văn trong logo THP -->
  <div class="relative aspect-square w-full" aria-hidden="true">
    <div class="absolute inset-[12%] rounded-full bg-ember-500/20 blur-3xl" />
    <div class="absolute inset-[22%] rounded-full bg-neon-500/20 blur-2xl" />

    <svg viewBox="0 0 400 400" class="absolute inset-0 h-full w-full">
      <defs>
        <linearGradient id="ec-g1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#fbcd6b" />
          <stop offset="55%" stop-color="#f08a24" />
          <stop offset="100%" stop-color="#e0569a" />
        </linearGradient>
        <linearGradient id="ec-g2" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stop-color="#1fb8b1" />
          <stop offset="100%" stop-color="#b5f5f1" />
        </linearGradient>
        <radialGradient id="ec-core">
          <stop offset="0%" stop-color="#fff7e0" />
          <stop offset="35%" stop-color="#fbcd6b" />
          <stop offset="100%" stop-color="#f08a24" stop-opacity="0" />
        </radialGradient>
      </defs>

      <!-- vòng ngoài có vạch chia -->
      <g class="origin-center animate-spin-slower" style="transform-box: fill-box">
        <circle cx="200" cy="200" r="190" fill="none" stroke="rgba(255,255,255,.08)" />
        <circle cx="200" cy="200" r="190" fill="none" stroke="url(#ec-g2)" stroke-width="1.5" stroke-dasharray="2 10" />
        <circle cx="200" cy="10" r="3.5" fill="#7cebe4" />
        <circle cx="390" cy="200" r="2.5" fill="#f6b13c" />
      </g>

      <!-- hoa văn "flower of life" -->
      <g class="origin-center animate-spin-slow" style="transform-box: fill-box">
        <circle
          v-for="i in 12"
          :key="i"
          :cx="200 + 62 * Math.cos((i * Math.PI) / 6)"
          :cy="200 + 62 * Math.sin((i * Math.PI) / 6)"
          r="62"
          fill="none"
          stroke="url(#ec-g1)"
          stroke-width="1"
          opacity="0.75"
        />
      </g>

      <g class="origin-center" style="transform-box: fill-box; animation: spin 50s linear infinite reverse">
        <circle cx="200" cy="200" r="150" fill="none" stroke="rgba(124,235,228,.25)" stroke-dasharray="60 14 4 14" />
        <circle cx="200" cy="200" r="132" fill="none" stroke="rgba(255,255,255,.06)" />
      </g>

      <circle cx="200" cy="200" r="46" fill="url(#ec-core)" />
      <circle cx="200" cy="200" r="9" fill="#fff7e0" />
    </svg>
  </div>
</template>

<template>
  <ClientOnly>
    <Transition name="splash">
      <div
        v-if="visible"
        class="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#05070a]"
      >
        <div class="grid-bg absolute inset-0 opacity-60" />
        <div class="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#1fb8b1]/15 blur-[120px]" />
        <div
          class="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-transparent via-[#3ad8cf]/10 to-transparent"
          style="animation: scan 2s linear infinite"
        />

        <div class="relative flex w-[min(420px,80vw)] flex-col items-center text-center">
          <img
            src="/logo-thp-crop.png"
            alt="Thành Hưng Phát"
            class="splash-logo h-auto w-full max-w-[300px] drop-shadow-[0_0_30px_rgba(58,216,207,.45)]"
          />
          <p class="mt-6 font-mono text-[11px] uppercase tracking-[0.5em] text-slate-500">
            Thành Hưng Phát · Energy
          </p>

          <div class="mt-8 h-px w-full overflow-hidden bg-white/10">
            <div
              class="h-full bg-gradient-to-r from-[#3ad8cf] to-[#f6b13c] shadow-[0_0_12px_#3ad8cf]"
              :style="{ width: progress + '%' }"
            />
          </div>
          <div class="mt-3 flex w-full justify-between font-mono text-[11px] tracking-widest text-slate-500">
            <span>KHỞI ĐỘNG HỆ THỐNG</span>
            <span class="text-[#7cebe4]">{{ String(progress).padStart(3, "0") }}%</span>
          </div>
        </div>
      </div>
    </Transition>
  </ClientOnly>
</template>

<script setup lang="ts">
// Màn hình chào chỉ hiện ở trang chủ, 1 lần mỗi phiên truy cập.
const visible = ref(false);
const progress = ref(0);
const route = useRoute();
let raf = 0;
let timer: ReturnType<typeof setTimeout> | null = null;
const DURATION = 1500;
const KEY = "thp-splash-seen";

const alreadySeen = () => {
  try {
    return sessionStorage.getItem(KEY) === "1";
  } catch {
    return false;
  }
};
const markSeen = () => {
  try {
    sessionStorage.setItem(KEY, "1");
  } catch {}
};

const run = () => {
  visible.value = true;
  progress.value = 0;
  const start = performance.now();
  const tick = (t: number) => {
    const k = Math.min(1, (t - start) / DURATION);
    progress.value = Math.round((1 - Math.pow(1 - k, 2)) * 100);
    if (k < 1) raf = requestAnimationFrame(tick);
    else timer = setTimeout(() => (visible.value = false), 250);
  };
  raf = requestAnimationFrame(tick);
  markSeen();
};

onMounted(() => {
  if (route.path !== "/" || alreadySeen()) return;
  if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
  run();
});

onBeforeUnmount(() => {
  cancelAnimationFrame(raf);
  if (timer) clearTimeout(timer);
});
</script>

<style scoped>
.splash-leave-active {
  transition: opacity 0.8s ease, transform 0.8s ease;
}
.splash-leave-to {
  opacity: 0;
  transform: scale(1.04);
}
.splash-logo {
  animation: splash-in 1s cubic-bezier(0.2, 0.7, 0.2, 1) both;
}
@keyframes splash-in {
  from {
    opacity: 0;
    filter: blur(12px);
    transform: scale(0.94);
  }
  to {
    opacity: 1;
    filter: none;
    transform: none;
  }
}
</style>

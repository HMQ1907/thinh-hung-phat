<template>
  <ClientOnly>
    <Transition name="splash">
      <div
        v-if="visible"
        class="fixed inset-0 z-[9999] flex items-center justify-center bg-white"
      >
        <div
          v-motion
          :initial="{ opacity: 0, scale: 0.95 }"
          :enter="{ opacity: 1, scale: 1, transition: { duration: 900, easing: 'ease-out' } }"
          class="flex flex-col items-center space-y-4 text-center"
        >
          <p class="text-sm uppercase tracking-[0.6em] text-slate-400">THANH HUNG PHAT</p>
          <div
            class="text-[clamp(40px,9vw,110px)] font-semibold uppercase tracking-[0.35em] text-transparent"
            :style="{ WebkitTextStroke: '1px rgba(59,130,246,0.6)' }"
          >
            Thành Hưng Phát
          </div>
          <div class="h-1 w-24 animate-pulse rounded-full bg-slate-300" />
        </div>
      </div>
    </Transition>
  </ClientOnly>
</template>

<script setup lang="ts">
const visible = ref(false);
let timer: ReturnType<typeof setTimeout> | null = null;
const route = useRoute();

const hideWithDelay = () => {
  if (timer) {
    clearTimeout(timer);
  }
  timer = setTimeout(() => {
    visible.value = false;
  }, 2200);
};

const triggerSplash = () => {
  if (!process.client) return;
  visible.value = true;
  hideWithDelay();
};

const shouldShowForRoute = () => route.path === "/";

onMounted(() => {
  if (shouldShowForRoute()) {
    triggerSplash();
  }
});

watch(
  () => route.fullPath,
  () => {
    if (shouldShowForRoute()) {
      triggerSplash();
    } else {
      visible.value = false;
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
    }
  }
);

onBeforeUnmount(() => {
  if (timer) {
    clearTimeout(timer);
  }
});
</script>

<style scoped>
.splash-leave-active {
  transition: opacity 1.5s ease-in-out;
}

.splash-enter-active {
  transition: opacity 0.3s ease-out;
}

.splash-enter-from,
.splash-leave-to {
  opacity: 0;
}
</style>



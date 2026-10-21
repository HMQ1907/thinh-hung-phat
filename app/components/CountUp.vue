<template>
  <span ref="el">{{ display }}</span>
</template>

<script setup lang="ts">
// Đếm số chạy khi cuộn tới. value: "7+", "100+", "24/7", "100%"...
const props = withDefaults(defineProps<{ value: string; duration?: number }>(), { duration: 1600 });

const el = ref<HTMLElement | null>(null);
const match = props.value.match(/^(\D*)(\d+)(.*)$/);
const isCountable = !!match && !props.value.includes("/");
const target = isCountable ? Number(match![2]) : 0;
const prefix = isCountable ? match![1] : "";
const suffix = isCountable ? match![3] : "";
const current = ref(target);
const display = computed(() => (isCountable ? `${prefix}${current.value}${suffix}` : props.value));

let io: IntersectionObserver | null = null;

onMounted(() => {
  if (!isCountable || !el.value || !("IntersectionObserver" in window)) return;
  if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
  current.value = 0;
  io = new IntersectionObserver(([entry]) => {
    if (!entry?.isIntersecting) return;
    io?.disconnect();
    const start = performance.now();
    const tick = (t: number) => {
      const k = Math.min(1, (t - start) / props.duration);
      const eased = 1 - Math.pow(1 - k, 3);
      current.value = Math.round(target * eased);
      if (k < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
  io.observe(el.value);
});

onBeforeUnmount(() => io?.disconnect());
</script>

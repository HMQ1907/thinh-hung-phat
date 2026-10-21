<template>
  <canvas ref="canvas" class="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true" />
</template>

<script setup lang="ts">
// Hạt "tàn lửa" bay lên + mạng lưới kết nối mờ, phản ứng theo chuột.
const props = withDefaults(defineProps<{ density?: number }>(), { density: 1 });

const canvas = ref<HTMLCanvasElement | null>(null);
let raf = 0;
let io: IntersectionObserver | null = null;
let ro: ResizeObserver | null = null;
let running = true;
let cleanup: (() => void) | null = null;

type P = { x: number; y: number; vx: number; vy: number; r: number; hue: "ember" | "neon"; life: number; tw: number };

onMounted(() => {
  const el = canvas.value;
  if (!el) return;
  const ctx = el.getContext("2d");
  if (!ctx) return;

  const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  let w = 0;
  let h = 0;
  let parts: P[] = [];
  const mouse = { x: -9999, y: -9999 };

  const spawn = (initial = false): P => ({
    x: Math.random() * w,
    y: initial ? Math.random() * h : h + 10,
    vx: (Math.random() - 0.5) * 0.25,
    vy: -(0.15 + Math.random() * 0.55),
    r: 0.6 + Math.random() * 1.8,
    hue: Math.random() < 0.62 ? "ember" : "neon",
    life: Math.random(),
    tw: Math.random() * Math.PI * 2,
  });

  const resize = () => {
    const rect = el.getBoundingClientRect();
    w = rect.width;
    h = rect.height;
    el.width = Math.floor(w * dpr);
    el.height = Math.floor(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = Math.round(Math.min(140, (w * h) / 11000) * props.density);
    parts = Array.from({ length: count }, () => spawn(true));
  };

  const draw = () => {
    ctx.clearRect(0, 0, w, h);

    // đường nối
    for (let i = 0; i < parts.length; i++) {
      const a = parts[i]!;
      for (let j = i + 1; j < parts.length; j++) {
        const b = parts[j]!;
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 110 * 110) {
          const o = (1 - Math.sqrt(d2) / 110) * 0.12;
          ctx.strokeStyle = `rgba(58,216,207,${o})`;
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    // hạt
    for (const p of parts) {
      p.tw += 0.04;
      const flicker = 0.55 + Math.sin(p.tw) * 0.35;
      const color = p.hue === "ember" ? `rgba(246,177,60,${flicker})` : `rgba(124,235,228,${flicker * 0.9})`;
      const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 5);
      g.addColorStop(0, color);
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r * 5, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  const step = () => {
    if (!running) return;
    for (let i = 0; i < parts.length; i++) {
      const p = parts[i]!;
      const dx = p.x - mouse.x;
      const dy = p.y - mouse.y;
      const d2 = dx * dx + dy * dy;
      if (d2 < 140 * 140) {
        const f = (1 - Math.sqrt(d2) / 140) * 0.6;
        p.vx += (dx / Math.sqrt(d2 + 0.01)) * f * 0.08;
        p.vy += (dy / Math.sqrt(d2 + 0.01)) * f * 0.08;
      }
      p.vx *= 0.985;
      p.vy = p.vy * 0.985 - 0.006;
      p.x += p.vx;
      p.y += p.vy;
      if (p.y < -20 || p.x < -30 || p.x > w + 30) parts[i] = spawn();
    }
    draw();
    raf = requestAnimationFrame(step);
  };

  const onMove = (e: PointerEvent) => {
    const r = el.getBoundingClientRect();
    mouse.x = e.clientX - r.left;
    mouse.y = e.clientY - r.top;
  };
  const onLeave = () => {
    mouse.x = -9999;
    mouse.y = -9999;
  };

  resize();
  window.addEventListener("pointermove", onMove, { passive: true });
  document.addEventListener("pointerleave", onLeave);
  cleanup = () => {
    window.removeEventListener("pointermove", onMove);
    document.removeEventListener("pointerleave", onLeave);
  };
  ro = new ResizeObserver(resize);
  ro.observe(el);

  if (reduce) {
    draw();
    return;
  }

  io = new IntersectionObserver(([entry]) => {
    const vis = !!entry?.isIntersecting;
    if (vis && !running) {
      running = true;
      raf = requestAnimationFrame(step);
    } else if (!vis) {
      running = false;
      cancelAnimationFrame(raf);
    }
  });
  io.observe(el);
  raf = requestAnimationFrame(step);
});

onBeforeUnmount(() => {
  cleanup?.();
  running = false;
  cancelAnimationFrame(raf);
  io?.disconnect();
  ro?.disconnect();
});
</script>

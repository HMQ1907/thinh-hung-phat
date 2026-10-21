// Directive dùng cho giao diện public:
//  - v-reveal: hiện dần phần tử khi cuộn tới (v-reveal="150" => trễ 150ms)
//  - v-spotlight: cập nhật vị trí chuột cho hiệu ứng đèn chiếu (.spot)
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("reveal", {
    getSSRProps() {
      return {};
    },
    mounted(el: HTMLElement, binding) {
      if (typeof window === "undefined" || !("IntersectionObserver" in window)) return;
      if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

      // Phần tử đã nằm trong màn hình lúc tải trang thì giữ nguyên để không bị nháy
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.92) return;

      const delay = Number(binding.value) || 0;
      el.style.setProperty("--reveal-delay", `${delay}ms`);
      el.classList.add("reveal");

      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              el.classList.add("is-in");
              io.disconnect();
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
      );
      io.observe(el);
      (el as any).__revealIO = io;
    },
    unmounted(el: HTMLElement) {
      (el as any).__revealIO?.disconnect();
    },
  });

  nuxtApp.vueApp.directive("spotlight", {
    getSSRProps() {
      return {};
    },
    mounted(el: HTMLElement) {
      const onMove = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - r.left}px`);
        el.style.setProperty("--my", `${e.clientY - r.top}px`);
      };
      el.addEventListener("pointermove", onMove);
      (el as any).__spotMove = onMove;
    },
    unmounted(el: HTMLElement) {
      const fn = (el as any).__spotMove;
      if (fn) el.removeEventListener("pointermove", fn);
    },
  });
});

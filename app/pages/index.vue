<template>
  <div>
    <!-- ============ HERO ============ -->
    <section class="noise relative isolate flex min-h-[100svh] items-center overflow-hidden pb-16 pt-24 md:pt-28">
      <div class="absolute inset-0 -z-10">
        <NuxtImg
          src="/thandep.jpg"
          alt="Than đá chất lượng cao"
          width="1920"
          format="webp"
          class="h-full w-full scale-105 object-cover opacity-45"
          loading="eager"
          fetchpriority="high"
        />
        <div class="absolute inset-0 bg-gradient-to-r from-coal-950 via-coal-950/80 to-coal-950/30" />
        <div class="absolute inset-0 bg-gradient-to-t from-coal-950 via-transparent to-coal-950/60" />
        <div class="grid-bg absolute inset-0 opacity-70" />
        <div class="absolute -left-32 top-1/4 h-[520px] w-[520px] rounded-full bg-neon-500/15 blur-[140px]" />
        <div class="absolute bottom-0 right-0 h-[600px] w-[600px] rounded-full bg-ember-500/15 blur-[160px]" />
      </div>
      <ClientOnly>
        <HeroCanvas class="-z-10" />
      </ClientOnly>

      <div class="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-6 px-4 lg:gap-14 md:px-6 lg:grid-cols-12">
        <div class="lg:col-span-7">
          <div v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0, transition: { duration: 700 } }" class="eyebrow">
            THP · Sustainable Energy
          </div>

          <h1
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :enter="{ opacity: 1, y: 0, transition: { duration: 800, delay: 120 } }"
            class="font-display mt-6 text-balance text-[2.5rem] font-bold leading-[1.04] tracking-tight text-white sm:text-6xl md:text-[4.25rem] xl:text-[4.6rem]"
          >
            Năng lượng bền vững từ
            <span class="text-grad block">than đá chất lượng cao</span>
          </h1>

          <p
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :enter="{ opacity: 1, y: 0, transition: { duration: 800, delay: 240 } }"
            class="mt-7 max-w-xl text-lg leading-relaxed text-slate-300 md:text-xl"
          >
            Thành Hưng Phát cung cấp than đá, than bùn và nhiên liệu cho lò hơi công nghiệp — tuyển chọn kỹ, giá minh bạch,
            giao hàng đúng hẹn trên toàn quốc.
          </p>

          <div
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :enter="{ opacity: 1, y: 0, transition: { duration: 800, delay: 360 } }"
            class="mt-10 flex flex-col gap-3 sm:flex-row"
          >
            <NuxtLink to="/products" class="btn btn-ember">
              Khám phá sản phẩm
              <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14m-6-6 6 6-6 6" />
              </svg>
            </NuxtLink>
            <NuxtLink to="/contact" class="btn btn-ghost">Nhận báo giá miễn phí</NuxtLink>
          </div>

          <!-- mini stats -->
          <div
            v-motion
            :initial="{ opacity: 0 }"
            :enter="{ opacity: 1, transition: { duration: 900, delay: 520 } }"
            class="mt-14 grid max-w-xl grid-cols-3 divide-x divide-white/10 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md"
          >
            <div v-for="s in stats.slice(0, 3)" :key="s.label" class="px-4 py-4 md:px-6">
              <div class="font-display text-2xl font-bold text-white md:text-3xl"><CountUp :value="s.value" /></div>
              <div class="mt-1 text-xs leading-snug text-slate-400 md:text-sm">{{ s.label }}</div>
            </div>
          </div>
        </div>

        <!-- Energy core visual -->
        <div class="relative order-first -mb-4 lg:order-none lg:col-span-5 lg:mb-0">
          <div
            v-motion
            :initial="{ opacity: 0, scale: 0.9 }"
            :enter="{ opacity: 1, scale: 1, transition: { duration: 1200, delay: 200 } }"
            class="relative mx-auto w-[min(78vw,340px)] sm:w-[420px] lg:w-full lg:max-w-[520px]"
          >
            <EnergyCore />

            <div class="glass absolute !bg-coal-900/70 -left-[6%] top-[10%] animate-float rounded-xl px-2.5 py-1.5 sm:rounded-2xl sm:px-4 sm:py-3 lg:-left-6 lg:top-[14%]">
              <div class="font-mono text-[9px] uppercase tracking-widest text-slate-500 sm:text-[10px]">Chất lượng</div>
              <div class="mt-0.5 flex items-center gap-1.5 text-xs font-semibold text-white sm:mt-1 sm:gap-2 sm:text-sm">
                <span class="h-2 w-2 rounded-full bg-ember-400 shadow-[0_0_10px_#f6b13c]" /> Nhiệt lượng cao
              </div>
            </div>
            <div class="glass absolute !bg-coal-900/70 -right-[6%] top-[46%] animate-float rounded-xl px-2.5 py-1.5 sm:rounded-2xl sm:px-4 sm:py-3 lg:-right-4 lg:top-[42%]" style="animation-delay: -2.5s">
              <div class="font-mono text-[9px] uppercase tracking-widest text-slate-500 sm:text-[10px]">Kiểm soát</div>
              <div class="mt-0.5 flex items-center gap-1.5 text-xs font-semibold text-white sm:mt-1 sm:gap-2 sm:text-sm">
                <span class="h-2 w-2 rounded-full bg-neon-400 shadow-[0_0_10px_#3ad8cf]" /> Độ ẩm thấp
              </div>
            </div>
            <div class="glass absolute !bg-coal-900/70 bottom-[4%] left-[2%] animate-float rounded-xl px-2.5 py-1.5 sm:rounded-2xl sm:px-4 sm:py-3 lg:bottom-[8%] lg:left-[8%]" style="animation-delay: -4.5s">
              <div class="font-mono text-[9px] uppercase tracking-widest text-slate-500 sm:text-[10px]">Logistics</div>
              <div class="mt-0.5 flex items-center gap-1.5 text-xs font-semibold text-white sm:mt-1 sm:gap-2 sm:text-sm">
                <span class="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]" /> Giao hàng toàn quốc
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>

    <!-- ============ MARQUEE ============ -->
    <div class="marquee-wrap relative overflow-hidden border-y border-white/5 bg-coal-900 py-5">
      <div class="marquee">
        <div v-for="n in 2" :key="n" class="flex shrink-0 items-center">
          <span
            v-for="t in marquee"
            :key="t + n"
            class="font-display flex items-center gap-8 px-8 text-lg font-semibold uppercase tracking-wider text-slate-500 md:text-xl"
          >
            {{ t }}
            <svg class="h-4 w-4 text-ember-400" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2 14.4 9.6 22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4z" /></svg>
          </span>
        </div>
      </div>
      <div class="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-coal-900 to-transparent" />
      <div class="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-coal-900 to-transparent" />
    </div>

    <!-- ============ ABOUT ============ -->
    <section id="about" class="relative py-24 md:py-32">
      <div class="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-4 md:px-6 lg:grid-cols-2 lg:gap-20">
        <div v-reveal class="hud relative">
          <span class="hud-c tl" /><span class="hud-c tr" /><span class="hud-c bl" /><span class="hud-c br" />
          <div class="relative aspect-[4/5] overflow-hidden rounded-sm md:aspect-[5/5]">
            <NuxtImg src="/thandep.jpg" alt="Than đá Thành Hưng Phát" width="1000" format="webp" class="h-full w-full object-cover" loading="lazy" />
            <div class="absolute inset-0 bg-gradient-to-tr from-coal-950/80 via-transparent to-neon-500/10" />
            <div class="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-transparent via-neon-400/15 to-transparent" style="animation: scan 5s linear infinite" />
          </div>
          <div class="glass absolute !bg-coal-900/70 -bottom-8 right-4 rounded-2xl p-5 md:-right-8">
            <div class="font-mono text-[10px] uppercase tracking-widest text-slate-500">Thành lập</div>
            <div class="font-display mt-1 text-4xl font-bold text-white">2018</div>
            <div class="mt-1 text-xs text-slate-400">TP. Hồ Chí Minh · Việt Nam</div>
          </div>
        </div>

        <div>
          <SectionHeading eyebrow="Về chúng tôi" index="01">
            Đối tác năng lượng <span class="text-grad-ember">đáng tin cậy</span> của doanh nghiệp
          </SectionHeading>
          <p v-reveal="120" class="mt-6 text-lg leading-relaxed text-slate-400">
            Thành Hưng Phát là công ty chuyên cung cấp than đá chất lượng cao với nhiều năm kinh nghiệm trong ngành năng
            lượng. Chúng tôi cam kết mang đến sản phẩm tốt nhất với giá cả hợp lý và dịch vụ chuyên nghiệp, đáp ứng mọi
            nhu cầu của khách hàng.
          </p>

          <div class="mt-10 grid grid-cols-2 gap-4">
            <div
              v-for="(s, i) in stats"
              :key="s.label"
              v-reveal="i * 90"
              v-spotlight
              class="spot rounded-2xl border border-white/[0.08] bg-coal-850/70 p-5"
            >
              <div class="font-display text-4xl font-bold text-white"><CountUp :value="s.value" /></div>
              <div class="mt-2 text-sm text-slate-400">{{ s.label }}</div>
            </div>
          </div>

          <NuxtLink v-reveal="200" to="/about" class="btn btn-ghost mt-10">
            Tìm hiểu thêm về THP
            <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14m-6-6 6 6-6 6" />
            </svg>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- ============ PRODUCTS ============ -->
    <section class="relative border-t border-white/5 bg-coal-900/50 py-24 md:py-32">
      <div class="dots-bg pointer-events-none absolute inset-0 opacity-30 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      <div class="relative mx-auto max-w-7xl px-4 md:px-6">
        <div class="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading eyebrow="Sản phẩm" index="02" subtitle="Khám phá các loại than đá chất lượng cao, phù hợp cho lò hơi công nghiệp và sản xuất.">
            Sản phẩm nổi bật
          </SectionHeading>
          <NuxtLink to="/products" class="btn btn-ghost shrink-0">Xem tất cả sản phẩm →</NuxtLink>
        </div>

        <div v-if="pending" class="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div v-for="i in 4" :key="i" class="h-96 animate-pulse rounded-3xl border border-white/5 bg-white/[0.03]" />
        </div>
        <div v-else-if="products.length" class="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div v-for="(product, index) in products.slice(0, 8)" :key="product.id" v-reveal="(index % 4) * 90">
            <ProductCard :product="product" :index="index" />
          </div>
        </div>
        <div v-else class="mt-14 rounded-3xl border border-dashed border-white/10 py-16 text-center text-slate-500">
          Chưa có sản phẩm nào
        </div>
      </div>
    </section>

    <!-- ============ BENEFITS (BENTO) ============ -->
    <section class="relative py-24 md:py-32">
      <div class="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-neon-400/40 to-transparent" />
      <div class="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading
          eyebrow="Vì sao chọn THP"
          index="03"
          align="center"
          subtitle="Hơn 7 năm kinh nghiệm — chất lượng vượt trội, dịch vụ chuyên nghiệp và cam kết đồng hành lâu dài."
        >
          Thành Hưng Phát — <span class="text-grad">đối tác tin cậy</span> của bạn
        </SectionHeading>

        <div class="mt-16 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="(b, i) in benefits"
            :key="b.title"
            v-reveal="(i % 3) * 100"
            v-spotlight
            :class="[
              'spot group overflow-hidden rounded-3xl border border-white/[0.08] bg-coal-850/70 p-7 md:p-8',
              [0, 3, 5].includes(i) ? 'lg:col-span-2' : '',
            ]"
          >
            <div class="flex items-start justify-between">
              <div
                class="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-transparent text-neon-300 transition duration-500 group-hover:border-neon-400/50 group-hover:text-ember-300 group-hover:shadow-[0_0_30px_-6px_rgba(58,216,207,.7)]"
              >
                <svg class="h-7 w-7" fill="none" stroke="currentColor" stroke-width="1.6" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" :d="b.icon" />
                </svg>
              </div>
              <span class="font-mono text-xs text-white/25">0{{ i + 1 }}</span>
            </div>
            <h3 class="font-display mt-8 text-2xl font-semibold text-white">{{ b.title }}</h3>
            <p class="mt-3 leading-relaxed text-slate-400">{{ b.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ============ PROCESS ============ -->
    <section class="relative overflow-hidden border-y border-white/5 bg-coal-900/60 py-24 md:py-32">
      <div class="grid-bg pointer-events-none absolute inset-0 opacity-50" />
      <div class="relative mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading eyebrow="Quy trình" index="04" subtitle="Quy trình rõ ràng, minh bạch từ lúc tiếp nhận yêu cầu đến khi than được giao tận nơi.">
          Từ mỏ than đến lò hơi của bạn
        </SectionHeading>

        <div class="relative mt-16 grid grid-cols-1 gap-6 md:grid-cols-4">
          <div class="absolute left-0 right-0 top-[27px] hidden h-px bg-gradient-to-r from-neon-400/0 via-neon-400/50 to-ember-400/0 md:block" />
          <div v-for="(step, i) in steps" :key="step.title" v-reveal="i * 120" class="relative">
            <div
              class="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border border-neon-400/40 bg-coal-950 font-mono text-sm font-medium text-neon-300 shadow-[0_0_30px_-8px_rgba(58,216,207,.9)]"
            >
              0{{ i + 1 }}
            </div>
            <h3 class="font-display mt-6 text-xl font-semibold text-white">{{ step.title }}</h3>
            <p class="mt-2 text-sm leading-relaxed text-slate-400">{{ step.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ============ BLOG ============ -->
    <section class="relative py-24 md:py-32">
      <div class="mx-auto max-w-7xl px-4 md:px-6">
        <div class="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading eyebrow="Tin tức" index="05" subtitle="Cập nhật thông tin mới nhất về ngành than đá và năng lượng.">
            Tin tức mới nhất
          </SectionHeading>
          <NuxtLink to="/blog" class="btn btn-ghost shrink-0">Xem tất cả tin tức →</NuxtLink>
        </div>

        <div v-if="postsPending" class="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div v-for="i in 3" :key="i" class="h-96 animate-pulse rounded-3xl border border-white/5 bg-white/[0.03]" />
        </div>
        <div v-else-if="posts.length" class="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div v-for="(post, index) in posts" :key="post.id" v-reveal="index * 100">
            <PostCard :post="post" />
          </div>
        </div>
        <div v-else class="mt-14 rounded-3xl border border-dashed border-white/10 py-16 text-center text-slate-500">
          Chưa có bài viết nào
        </div>
      </div>
    </section>

    <!-- ============ CTA ============ -->
    <section class="px-4 pb-24 md:px-6 md:pb-32">
      <div
        v-reveal
        class="noise relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-coal-800 via-coal-900 to-coal-950 px-6 py-16 text-center md:px-16 md:py-24"
      >
        <div class="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-neon-500/25 blur-[100px]" />
        <div class="absolute -bottom-24 -right-10 h-96 w-96 rounded-full bg-ember-500/25 blur-[110px]" />
        <div class="grid-bg absolute inset-0" />
        <div class="relative">
          <div class="eyebrow">Tư vấn miễn phí</div>
          <h2 class="font-display mx-auto mt-6 max-w-3xl text-4xl font-bold leading-tight text-white md:text-6xl">
            Cần tư vấn về <span class="text-grad">nhiên liệu</span> cho nhà máy?
          </h2>
          <p class="mx-auto mt-6 max-w-xl text-lg text-slate-400">
            Liên hệ ngay hôm nay để nhận tư vấn miễn phí và báo giá tốt nhất từ đội ngũ Thành Hưng Phát.
          </p>
          <div class="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href="tel:0933888575" class="btn btn-ember text-base">
              <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
              Gọi 0933 888 575
            </a>
            <NuxtLink to="/contact" class="btn btn-ghost text-base">Gửi yêu cầu báo giá</NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { Product, Post, APIResponse } from "~/types";

useHead({
  title: "Trang chủ - Thành Hưng Phát",
  meta: [{ name: "description", content: "Thành Hưng Phát - Chuyên cung cấp than đá chất lượng cao" }],
});

const stats = [
  { value: "7+", label: "Năm kinh nghiệm" },
  { value: "100+", label: "Dự án thành công" },
  { value: "300+", label: "Khách hàng tin tưởng" },
  { value: "24/7", label: "Hỗ trợ khách hàng" },
];

const marquee = ["Than đá", "Than bùn", "Nhiên liệu lò hơi", "Giao hàng toàn quốc", "Giá minh bạch", "Hỗ trợ 24/7"];

const benefits = [
  {
    icon: "M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48zM12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z",
    title: "Chất lượng vượt trội",
    description:
      "Than đá được tuyển chọn kỹ lưỡng từ các mỏ uy tín, đảm bảo nhiệt lượng cao và độ ẩm thấp, phù hợp cho mọi loại lò hơi công nghiệp.",
  },
  {
    icon: "M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z",
    title: "Giá cả cạnh tranh",
    description:
      "Cam kết giá tốt nhất thị trường với chính sách báo giá minh bạch, không phát sinh chi phí ẩn, giúp doanh nghiệp tối ưu chi phí sản xuất.",
  },
  {
    icon: "M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12",
    title: "Giao hàng nhanh chóng",
    description:
      "Hệ thống vận chuyển hiện đại với đội xe lớn, đảm bảo giao hàng đúng hẹn đến mọi địa điểm trên toàn quốc, hỗ trợ 24/7.",
  },
  {
    icon: "M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155",
    title: "Dịch vụ chuyên nghiệp",
    description:
      "Đội ngũ tư vấn giàu kinh nghiệm, hỗ trợ kỹ thuật tận tâm, đảm bảo khách hàng nhận được giải pháp tối ưu cho nhu cầu của mình.",
  },
  {
    icon: "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z",
    title: "Uy tín đã được chứng minh",
    description:
      "Được tin tưởng bởi hàng trăm doanh nghiệp lớn nhỏ, với tỷ lệ khách hàng quay lại lên đến 95%, minh chứng cho chất lượng dịch vụ.",
  },
  {
    icon: "M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 00-8.862 12.872M12.75 3.031a9 9 0 016.69 14.036m0 0l-.177-.529A2.25 2.25 0 0017.128 15H16.5l-.324-.324a1.453 1.453 0 00-2.328.377l-.036.073a1.586 1.586 0 01-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 01-5.276 3.67m0 0a9 9 0 01-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25",
    title: "Cam kết bền vững",
    description:
      "Tuân thủ nghiêm ngặt các tiêu chuẩn môi trường, cung cấp than sạch, hỗ trợ khách hàng trong việc giảm thiểu tác động môi trường.",
  },
];

const steps = [
  { title: "Tiếp nhận yêu cầu", description: "Lắng nghe nhu cầu sử dụng, loại lò hơi và sản lượng tiêu thụ của bạn." },
  { title: "Tư vấn & báo giá", description: "Đề xuất loại than phù hợp, báo giá minh bạch, không phát sinh chi phí ẩn." },
  { title: "Kiểm tra chất lượng", description: "Than được tuyển chọn, kiểm tra kỹ trước khi xuất kho." },
  { title: "Vận chuyển & giao hàng", description: "Giao hàng đúng hẹn tới tận nơi, hỗ trợ sau bán hàng 24/7." },
];

// Fetch products
const { data: productsResponse, pending } = await useFetch<APIResponse<Product[]>>("/api/products", {
  default: () => ({ data: [], status: 200, success: true }),
});
const products = computed(() => productsResponse.value?.data || []);

// Fetch posts
const { data: postsResponse, pending: postsPending } = await useFetch<APIResponse<Post[]>>("/api/posts", {
  query: { limit: 6 },
  default: () => ({ data: [], status: 200, success: true }),
});
const posts = computed(() => (postsResponse.value?.data || []).slice(0, 3));
</script>

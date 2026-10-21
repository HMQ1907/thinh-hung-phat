<template>
  <div>
    <PageHero
      eyebrow="Giới thiệu"
      code="// 01"
      image="/thandep.jpg"
      subtitle="Công ty TNHH Năng lượng Thành Hưng Phát · Thanh Hung Phat Energy Company Limited"
      :crumbs="[{ label: 'Giới thiệu' }]"
    >
      Năng lượng vững vàng <span class="text-grad">từ năm 2018</span>
    </PageHero>

    <!-- Overview -->
    <section class="relative py-24 md:py-28">
      <div class="mx-auto grid max-w-7xl grid-cols-1 gap-14 px-4 md:px-6 lg:grid-cols-12">
        <div class="lg:col-span-5">
          <SectionHeading eyebrow="Về chúng tôi" index="01">Đối tác tin cậy của doanh nghiệp & hộ gia đình</SectionHeading>
        </div>
        <div class="space-y-6 text-lg leading-relaxed text-slate-400 lg:col-span-7">
          <p v-reveal>
            <strong class="text-white">Công ty TNHH Năng lượng Thành Hưng Phát</strong> là một trong những công ty hàng đầu
            chuyên cung cấp than đá và các sản phẩm nhiên liệu chất lượng cao tại Việt Nam. Với nhiều năm kinh nghiệm trong
            ngành năng lượng, chúng tôi tự hào là đối tác tin cậy của nhiều doanh nghiệp và hộ gia đình.
          </p>
          <p v-reveal="100">
            Chúng tôi chuyên cung cấp <strong class="text-white">than bùn, than đá</strong> và các loại nhiên liệu rắn,
            lỏng, khí phục vụ cho các hệ thống lò hơi công nghiệp, sản xuất và các nhu cầu năng lượng khác. Với cam kết về
            chất lượng, uy tín và giá cả hợp lý, Thành Hưng Phát luôn nỗ lực mang đến những giải pháp năng lượng tối ưu cho
            khách hàng.
          </p>
        </div>
      </div>

      <!-- Company data panel -->
      <div class="mx-auto mt-20 max-w-7xl px-4 md:px-6">
        <div v-reveal class="overflow-hidden rounded-3xl border border-white/[0.08] bg-coal-850/60">
          <div class="flex items-center justify-between border-b border-white/5 px-6 py-4 font-mono text-xs uppercase tracking-widest text-slate-500">
            <span>Hồ sơ doanh nghiệp</span>
            <span class="flex items-center gap-2 text-emerald-400">
              <span class="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" /> Đang hoạt động
            </span>
          </div>
          <dl class="grid grid-cols-1 md:grid-cols-2">
            <div
              v-for="(item, i) in companyInfo"
              :key="item.label"
              v-spotlight
              :class="[
                'spot flex gap-5 border-white/5 p-6 md:p-8',
                item.wide ? 'md:col-span-2' : '',
                'border-b',
                !item.wide && i % 2 === 0 ? 'md:border-r' : '',
              ]"
            >
              <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-neon-300">
                <svg class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="1.7" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" :d="item.icon" />
                </svg>
              </div>
              <div>
                <dt class="font-mono text-xs uppercase tracking-widest text-slate-500">{{ item.label }}</dt>
                <dd class="font-display mt-2 text-xl font-semibold text-white">{{ item.value }}</dd>
                <dd v-if="item.sub" class="mt-1 text-sm text-slate-400">{{ item.sub }}</dd>
              </div>
            </div>
          </dl>
        </div>
      </div>
    </section>

    <!-- Legal representative -->
    <section class="relative border-y border-white/5 bg-coal-900/60 py-24 md:py-28">
      <div class="grid-bg pointer-events-none absolute inset-0 opacity-40" />
      <div class="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 md:px-6 lg:grid-cols-12">
        <div v-reveal class="hud relative mx-auto w-full max-w-sm lg:col-span-4">
          <span class="hud-c tl" /><span class="hud-c tr" /><span class="hud-c bl" /><span class="hud-c br" />
          <div class="relative aspect-square overflow-hidden">
            <NuxtImg src="/hotheanh.jpg" alt="Ông Hồ Thế Anh - Đại diện pháp luật" width="600" format="webp" class="h-full w-full object-cover" loading="lazy" />
            <div class="absolute inset-0 bg-gradient-to-t from-coal-950/70 via-transparent to-transparent" />
            <div class="absolute bottom-4 left-4 font-mono text-[11px] uppercase tracking-widest text-neon-300">ID · Đại diện pháp luật</div>
          </div>
        </div>
        <div class="lg:col-span-8">
          <SectionHeading eyebrow="Đại diện pháp luật" index="02">Ông Hồ Thế Anh</SectionHeading>
          <p v-reveal="120" class="mt-6 max-w-2xl text-lg leading-relaxed text-slate-400">
            Với vai trò là đại diện pháp luật của Công ty TNHH Năng lượng Thành Hưng Phát, ông Hồ Thế Anh đã dẫn dắt công ty
            phát triển vững mạnh từ khi thành lập vào năm 2018. Với tầm nhìn chiến lược và cam kết về chất lượng, ông đã xây
            dựng Thành Hưng Phát trở thành một trong những đơn vị uy tín trong lĩnh vực cung cấp nhiên liệu tại Việt Nam.
          </p>
        </div>
      </div>
    </section>

    <!-- Vision & Mission -->
    <section class="py-24 md:py-28">
      <div class="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 md:grid-cols-2 md:px-6">
        <div
          v-for="(vm, i) in visionMission"
          :key="vm.title"
          v-reveal="i * 120"
          v-spotlight
          class="spot relative overflow-hidden rounded-3xl border border-white/[0.08] bg-coal-850/70 p-8 md:p-10"
        >
          <div :class="['absolute -right-16 -top-16 h-56 w-56 rounded-full blur-[90px]', i === 0 ? 'bg-neon-500/25' : 'bg-ember-500/25']" />
          <div class="font-mono text-xs uppercase tracking-widest text-slate-500">{{ vm.tag }}</div>
          <h2 class="font-display mt-4 text-4xl font-bold text-white">{{ vm.title }}</h2>
          <p class="mt-5 text-lg leading-relaxed text-slate-400">{{ vm.text }}</p>
        </div>
      </div>
    </section>

    <!-- Core values -->
    <section class="border-t border-white/5 py-24 md:py-28">
      <div class="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading
          eyebrow="Giá trị cốt lõi"
          index="03"
          align="center"
          subtitle="Những nguyên tắc và giá trị này định hướng mọi hoạt động của chúng tôi."
        >
          Những giá trị chúng tôi <span class="text-grad">theo đuổi</span>
        </SectionHeading>
        <div class="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.06] sm:grid-cols-2 lg:grid-cols-4">
          <div v-for="(value, index) in coreValues" :key="value.title" v-reveal="index * 90" class="group bg-coal-900 p-8 transition hover:bg-coal-850">
            <div class="font-display text-6xl font-bold text-white/[0.07] transition group-hover:text-neon-400/30">0{{ index + 1 }}</div>
            <h3 class="font-display mt-6 text-2xl font-semibold text-white">{{ value.title }}</h3>
            <p class="mt-3 leading-relaxed text-slate-400">{{ value.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Why choose -->
    <section class="pb-24 md:pb-32">
      <div class="mx-auto max-w-7xl px-4 md:px-6">
        <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div
            v-for="(reason, i) in whyChooseUs"
            :key="reason.title"
            v-reveal="i * 100"
            v-spotlight
            class="spot rounded-3xl border border-white/[0.08] bg-coal-850/70 p-8"
          >
            <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-ember-300 to-ember-500 text-coal-950 shadow-[0_10px_30px_-8px_rgba(240,138,36,.8)]">
              <svg class="h-7 w-7" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" :d="reason.icon" />
              </svg>
            </div>
            <h3 class="font-display mt-6 text-2xl font-semibold text-white">{{ reason.title }}</h3>
            <p class="mt-3 leading-relaxed text-slate-400">{{ reason.description }}</p>
          </div>
        </div>
        <div v-reveal class="mt-14 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <NuxtLink to="/products" class="btn btn-ember">Xem sản phẩm</NuxtLink>
          <NuxtLink to="/contact" class="btn btn-ghost">Liên hệ tư vấn</NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: "Giới thiệu - Thành Hưng Phát",
  meta: [
    {
      name: "description",
      content:
        "Giới thiệu về Công ty TNHH Năng lượng Thành Hưng Phát - Chuyên cung cấp than đá, than bùn chất lượng cao. MST: 0315184216",
    },
  ],
});

const companyInfo = [
  {
    label: "Tên công ty",
    value: "Công ty TNHH Năng lượng Thành Hưng Phát",
    sub: "Thanh Hung Phat Energy Company Limited",
    icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
  },
  {
    label: "Mã số thuế",
    value: "0315184216",
    icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
  },
  {
    label: "Ngày thành lập",
    value: "23 tháng 7 năm 2018",
    sub: "Đang hoạt động",
    icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
  },
  {
    label: "Loại hình pháp lý",
    value: "Công ty TNHH hai thành viên trở lên",
    icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
  },
  {
    label: "Địa chỉ",
    value: "256/22A đường Thạnh Xuân 25, Khu phố 2",
    sub: "Phường Thạnh Xuân, Quận 12, Thành phố Hồ Chí Minh, Việt Nam",
    wide: true,
    icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z",
  },
  {
    label: "Ngành nghề chính",
    value: "Bán buôn nhiên liệu rắn, lỏng, khí và các sản phẩm liên quan",
    sub: "Chuyên cung cấp than đá, than bùn chất lượng cao cho các hệ thống lò hơi công nghiệp và sản xuất",
    wide: true,
    icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  },
];

const visionMission = [
  {
    tag: "Vision",
    title: "Tầm nhìn",
    text: "Trở thành công ty hàng đầu trong lĩnh vực cung cấp than đá và nhiên liệu tại Việt Nam, mang đến giá trị bền vững cho khách hàng, đối tác và cộng đồng thông qua các giải pháp năng lượng hiệu quả và thân thiện với môi trường.",
  },
  {
    tag: "Mission",
    title: "Sứ mệnh",
    text: "Cung cấp sản phẩm than đá, than bùn chất lượng cao với giá cả hợp lý, dịch vụ chuyên nghiệp và cam kết đáp ứng mọi nhu cầu của khách hàng. Chúng tôi luôn đặt chất lượng và uy tín lên hàng đầu.",
  },
];

const coreValues = [
  { title: "Chất lượng", description: "Đảm bảo sản phẩm đạt tiêu chuẩn cao nhất, được kiểm định kỹ lưỡng trước khi giao đến khách hàng." },
  { title: "Uy tín", description: "Xây dựng niềm tin với khách hàng qua từng giao dịch, cam kết thực hiện đúng những gì đã hứa." },
  { title: "Chuyên nghiệp", description: "Dịch vụ tận tâm, hỗ trợ 24/7, đội ngũ nhân viên giàu kinh nghiệm và nhiệt huyết." },
  { title: "Bền vững", description: "Cam kết phát triển bền vững, thân thiện với môi trường và đóng góp tích cực cho cộng đồng." },
];

const whyChooseUs = [
  {
    title: "Kinh nghiệm",
    description: "Hơn 7 năm hoạt động trong ngành với nhiều dự án thành công.",
    icon: "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z",
  },
  {
    title: "Giá cả hợp lý",
    description: "Cạnh tranh, minh bạch, không phát sinh chi phí ẩn.",
    icon: "M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    title: "Giao hàng nhanh",
    description: "Hệ thống vận chuyển hiện đại, đảm bảo giao hàng đúng hẹn.",
    icon: "M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12",
  },
];
</script>

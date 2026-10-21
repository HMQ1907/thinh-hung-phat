<template>
  <div>
    <PageHero
      eyebrow="Liên hệ"
      code="// 06"
      subtitle="Chúng tôi luôn sẵn sàng hỗ trợ bạn. Gửi yêu cầu để nhận tư vấn và báo giá tốt nhất."
      :crumbs="[{ label: 'Liên hệ' }]"
    >
      Kết nối với <span class="text-grad">Thành Hưng Phát</span>
    </PageHero>

    <section class="relative py-20 md:py-28">
      <div class="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 md:px-6 lg:grid-cols-12">
        <!-- Contact Info -->
        <div class="space-y-4 lg:col-span-5">
          <a
            v-for="(c, i) in contacts"
            :key="c.label"
            v-reveal="i * 80"
            v-spotlight
            :href="c.href"
            class="spot group flex items-start gap-5 rounded-3xl border border-white/[0.08] bg-coal-850/70 p-6"
          >
            <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-neon-300 transition group-hover:text-ember-300">
              <svg class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="1.7" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" :d="c.icon" />
              </svg>
            </div>
            <div>
              <div class="font-mono text-xs uppercase tracking-widest text-slate-500">{{ c.label }}</div>
              <div v-for="line in c.lines" :key="line" :class="['mt-1.5', c.big ? 'font-display text-2xl font-semibold text-white' : 'text-slate-200']">
                {{ line }}
              </div>
            </div>
          </a>
        </div>

        <!-- Contact Form -->
        <div v-reveal="120" class="relative overflow-hidden rounded-3xl border border-white/10 bg-coal-850/80 p-6 sm:p-8 md:p-10 lg:col-span-7">
          <div class="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-neon-500/15 blur-[100px]" />
          <div class="relative">
            <div class="eyebrow">Gửi tin nhắn</div>
            <h2 class="font-display mt-4 text-3xl font-bold text-white md:text-4xl">Yêu cầu tư vấn & báo giá</h2>

            <form @submit.prevent="handleSubmit" class="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div class="sm:col-span-2">
                <label for="name" class="mb-2 block text-sm font-medium text-slate-300">Họ và tên *</label>
                <input id="name" v-model="form.name" type="text" required class="field" placeholder="Nguyễn Văn A" />
              </div>
              <div>
                <label for="email" class="mb-2 block text-sm font-medium text-slate-300">Email *</label>
                <input id="email" v-model="form.email" type="email" required class="field" placeholder="ban@congty.vn" />
              </div>
              <div>
                <label for="phone" class="mb-2 block text-sm font-medium text-slate-300">Số điện thoại</label>
                <input id="phone" v-model="form.phone" type="tel" class="field" placeholder="09xx xxx xxx" />
              </div>
              <div class="sm:col-span-2">
                <label for="message" class="mb-2 block text-sm font-medium text-slate-300">Tin nhắn *</label>
                <textarea
                  id="message"
                  v-model="form.message"
                  required
                  rows="5"
                  class="field resize-none"
                  placeholder="Loại than cần mua, sản lượng dự kiến, địa điểm giao hàng..."
                ></textarea>
              </div>

              <div class="sm:col-span-2">
                <button type="submit" :disabled="submitting" class="btn btn-ember w-full disabled:cursor-not-allowed disabled:opacity-60">
                  <svg v-if="submitting" class="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.372 0 0 5.372 0 12h4z" />
                  </svg>
                  <svg v-else class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                  </svg>
                  {{ submitting ? "Đang gửi..." : "Gửi tin nhắn" }}
                </button>
              </div>

              <div v-if="submitSuccess" class="sm:col-span-2 flex items-center gap-3 rounded-2xl border border-emerald-400/30 bg-emerald-400/10 p-4 text-emerald-300">
                <svg class="h-5 w-5 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span class="font-medium">Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất có thể.</span>
              </div>
              <div v-if="submitError" class="sm:col-span-2 flex items-center gap-3 rounded-2xl border border-red-400/30 bg-red-400/10 p-4 text-red-300">
                <svg class="h-5 w-5 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span class="font-medium">{{ submitError }}</span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: "Liên hệ - Thành Hưng Phát",
  meta: [{ name: "description", content: "Liên hệ với Thành Hưng Phát để được tư vấn về sản phẩm than đá" }],
});

const contacts = [
  {
    label: "Hotline",
    lines: ["0933 888 575"],
    href: "tel:0933888575",
    big: true,
    icon: "M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z",
  },
  {
    label: "Email",
    lines: ["contact@thanhhungphat.com"],
    href: "mailto:contact@thanhhungphat.com",
    icon: "M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75",
  },
  {
    label: "Địa chỉ",
    lines: ["256/22A đường Thạnh Xuân 25, Khu phố 2, Phường Thới An, TP Hồ Chí Minh, Việt Nam"],
    href: undefined,
    icon: "M15 10.5a3 3 0 11-6 0 3 3 0 016 0zM19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z",
  },
  {
    label: "Giờ làm việc",
    lines: ["Thứ 2 - Thứ 6: 8:00 - 17:00", "Thứ 7: 8:00 - 12:00"],
    href: undefined,
    icon: "M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z",
  },
];

const form = reactive({
  name: "",
  email: "",
  phone: "",
  message: "",
});

const submitting = ref(false);
const submitSuccess = ref(false);
const submitError = ref("");

const handleSubmit = async () => {
  submitting.value = true;
  submitError.value = "";
  submitSuccess.value = false;

  try {
    const { data } = await $fetch<any>("/api/contacts", {
      method: "POST",
      body: form,
    });

    if (data) {
      submitSuccess.value = true;
      form.name = "";
      form.email = "";
      form.phone = "";
      form.message = "";
    }
  } catch (error: any) {
    submitError.value = error.message || "Có lỗi xảy ra khi gửi tin nhắn";
  } finally {
    submitting.value = false;
  }
};
</script>

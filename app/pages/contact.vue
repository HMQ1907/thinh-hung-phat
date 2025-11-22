<template>
  <div>
    <!-- Hero Section -->
      <section class="relative h-[500px] flex items-center justify-center bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
      <div
        class="absolute inset-0 opacity-20"
        style="background-image: url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%23ffffff&quot; fill-opacity=&quot;0.05&quot;%3E%3Cpath d=&quot;M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"
      ></div>
      <div class="absolute inset-0 bg-black/40"></div>
      <div class="container mx-auto px-4 relative z-10 text-center">
        <h1
          v-motion-fade
          class="text-5xl md:text-6xl font-bold mb-6"
        >
          Liên hệ
        </h1>
        <p
          v-motion-fade
          :delay="100"
          class="text-xl md:text-2xl text-gray-200"
        >
          Chúng tôi luôn sẵn sàng hỗ trợ bạn
        </p>
      </div>
    </section>

    <!-- Contact Form & Info -->
          <section class="py-20 md:py-28 bg-linear-to-br from-gray-50 via-white to-gray-50">
      <div class="container mx-auto px-4 max-w-6xl">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
          <!-- Contact Form -->
          <div
            v-motion-slide-visible-once-left
            class="bg-white rounded-2xl p-8 md:p-10 shadow-xl border border-gray-200"
          >
                   <h2 class="text-3xl font-bold mb-8 bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Gửi tin nhắn</h2>
            <form @submit.prevent="handleSubmit" class="space-y-6">
              <div>
                <label for="name" class="block text-sm font-semibold text-gray-700 mb-2">Họ và tên *</label>
                <input
                  id="name"
                  v-model="form.name"
                  type="text"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="Nhập họ và tên"
                />
              </div>
              <div>
                <label for="email" class="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="Nhập email"
                />
              </div>
              <div>
                <label for="phone" class="block text-sm font-semibold text-gray-700 mb-2">Số điện thoại</label>
                <input
                  id="phone"
                  v-model="form.phone"
                  type="tel"
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="Nhập số điện thoại"
                />
              </div>
              <div>
                <label for="message" class="block text-sm font-semibold text-gray-700 mb-2">Tin nhắn *</label>
                <textarea
                  id="message"
                  v-model="form.message"
                  required
                  rows="5"
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                  placeholder="Nhập tin nhắn của bạn"
                ></textarea>
              </div>
              <UiButton
                type="submit"
                :disabled="submitting"
                :loading="submitting"
                loading-text="Đang gửi..."
                variant="primary"
                size="lg"
                full-width
              >
                <template #icon>
                  <svg v-if="!submitting" class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </template>
                Gửi tin nhắn
              </UiButton>
              <div v-if="submitSuccess" class="p-4 bg-green-50 border border-green-200 text-green-800 rounded-xl">
                <div class="flex items-center space-x-2">
                  <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span class="font-medium">Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất có thể.</span>
                </div>
              </div>
              <div v-if="submitError" class="p-4 bg-red-50 border border-red-200 text-red-800 rounded-xl">
                <div class="flex items-center space-x-2">
                  <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span class="font-medium">{{ submitError }}</span>
                </div>
              </div>
            </form>
          </div>

          <!-- Contact Info -->
          <div>
            <h2 class="text-3xl font-bold mb-6">Thông tin liên hệ</h2>
            <div class="space-y-6">
                     <div class="flex items-start space-x-4">
                       <div class="shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <svg class="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </div>
                <div>
                  <h3 class="font-semibold mb-1 text-lg">Địa chỉ</h3>
                  <p class="text-muted-foreground">123 Đường ABC, Quận XYZ, TP.HCM</p>
                </div>
              </div>
                     <div class="flex items-start space-x-4">
                       <div class="shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <svg class="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                </div>
                <div>
                  <h3 class="font-semibold mb-1 text-lg">Điện thoại</h3>
                  <p class="text-muted-foreground">0123 456 789</p>
                </div>
              </div>
                     <div class="flex items-start space-x-4">
                       <div class="shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <svg class="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <div>
                  <h3 class="font-semibold mb-1 text-lg">Email</h3>
                  <p class="text-muted-foreground">info@thinhungphat.com</p>
                </div>
              </div>
                     <div class="flex items-start space-x-4">
                       <div class="shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <svg class="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 class="font-semibold mb-1 text-lg">Giờ làm việc</h3>
                  <p class="text-muted-foreground">Thứ 2 - Thứ 6: 8:00 - 17:00</p>
                  <p class="text-muted-foreground">Thứ 7: 8:00 - 12:00</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: "Liên hệ - Thịnh Hưng Phát",
  meta: [
    { name: "description", content: "Liên hệ với Thịnh Hưng Phát để được tư vấn về sản phẩm than đá" },
  ],
});

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
    const { data } = await $fetch("/api/contacts", {
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


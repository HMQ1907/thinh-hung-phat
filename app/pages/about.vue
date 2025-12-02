<template>
  <div>
    <!-- Hero Section -->
    <section class="relative h-[500px] flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
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
          Giới thiệu
        </h1>
        <p
          v-motion-fade
          :delay="100"
          class="text-xl md:text-2xl text-gray-200"
        >
          Về công ty Thành Hưng Phát
        </p>
      </div>
    </section>

    <!-- Content Section -->
    <section class="py-20 md:py-28 bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div class="container mx-auto px-4 max-w-4xl">
        <div
          v-motion-fade
          class="space-y-16"
        >
          <!-- About Us -->
          <div
            v-motion-slide-visible-once-bottom
            class="bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-gray-200"
          >
            <div class="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-6">
              Về chúng tôi
            </div>
            <h2 class="text-4xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Về chúng tôi</h2>
            <p class="text-lg text-gray-600 mb-6 leading-relaxed">
              Thành Hưng Phát là công ty chuyên cung cấp than đá chất lượng cao với nhiều năm kinh nghiệm trong ngành năng lượng.
            </p>
            <p class="text-lg text-gray-600 leading-relaxed">
              Chúng tôi tự hào là đối tác tin cậy của nhiều doanh nghiệp và hộ gia đình trong việc cung cấp nguồn năng lượng ổn định và hiệu quả.
            </p>
          </div>

          <!-- Vision -->
          <div
            v-motion-slide-visible-once-bottom
            class="bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-gray-200"
          >
            <div class="flex items-start space-x-4">
              <div class="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <svg class="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <div class="flex-1">
                <h2 class="text-3xl font-bold mb-4 text-gray-900">Tầm nhìn</h2>
                <p class="text-lg text-gray-600 leading-relaxed">
                  Trở thành công ty hàng đầu trong lĩnh vực cung cấp than đá tại Việt Nam, mang đến giá trị bền vững cho khách hàng và cộng đồng.
                </p>
              </div>
            </div>
          </div>

          <!-- Mission -->
          <div
            v-motion-slide-visible-once-bottom
            class="bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-gray-200"
          >
            <div class="flex items-start space-x-4">
              <div class="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <svg class="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div class="flex-1">
                <h2 class="text-3xl font-bold mb-4 text-gray-900">Sứ mệnh</h2>
                <p class="text-lg text-gray-600 leading-relaxed">
                  Cung cấp sản phẩm than đá chất lượng cao với giá cả hợp lý, dịch vụ chuyên nghiệp và cam kết đáp ứng mọi nhu cầu của khách hàng.
                </p>
              </div>
            </div>
          </div>

          <!-- Core Values -->
          <div
            v-motion-slide-visible-once-bottom
            class="bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-gray-200"
          >
            <h2 class="text-3xl font-bold mb-8 text-gray-900">Giá trị cốt lõi</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div
                v-for="(value, index) in coreValues"
                :key="index"
                class="flex items-start space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <div class="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <span class="text-primary font-bold">{{ index + 1 }}</span>
                </div>
                <div>
                  <h3 class="font-bold text-gray-900 mb-1">{{ value.title }}</h3>
                  <p class="text-gray-600 text-sm">{{ value.description }}</p>
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
  title: "Giới thiệu - Thành Hưng Phát",
  meta: [
    { name: "description", content: "Giới thiệu về công ty Thành Hưng Phát - Chuyên cung cấp than đá chất lượng cao" },
  ],
});

const coreValues = [
  {
    title: "Chất lượng",
    description: "Đảm bảo sản phẩm đạt tiêu chuẩn cao nhất",
  },
  {
    title: "Uy tín",
    description: "Xây dựng niềm tin với khách hàng qua từng giao dịch",
  },
  {
    title: "Chuyên nghiệp",
    description: "Dịch vụ tận tâm, hỗ trợ 24/7",
  },
  {
    title: "Bền vững",
    description: "Cam kết phát triển bền vững và thân thiện môi trường",
  },
];
</script>


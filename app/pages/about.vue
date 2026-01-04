<template>
  <div>
    <!-- Hero Section -->
    <section class="relative h-[500px] md:h-[600px] flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
      <div
        class="absolute inset-0 opacity-20"
        style="background-image: url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%23ffffff&quot; fill-opacity=&quot;0.05&quot;%3E%3Cpath d=&quot;M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"
      ></div>
      <div class="absolute inset-0 bg-black/40"></div>
      <div class="container mx-auto px-4 relative z-10 text-center">
        <h1
          v-motion-fade
          class="text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
        >
          Giới thiệu
        </h1>
        <p
          v-motion-fade
          :delay="100"
          class="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto"
        >
          Công ty TNHH Năng lượng Thành Hưng Phát
        </p>
        <p
          v-motion-fade
          :delay="200"
          class="text-lg md:text-xl text-gray-300 mt-4 max-w-2xl mx-auto"
        >
          Thanh Hung Phat Energy Company Limited
        </p>
      </div>
    </section>

    <!-- Company Information Section -->
    <section class="py-12 md:py-16 bg-white">
      <div class="container mx-auto px-4 max-w-7xl">
        <div class="max-w-5xl mx-auto">
          <!-- Company Overview Card -->
          <div
            v-motion-slide-visible-once-bottom
            class="bg-gradient-to-br from-primary/5 via-white to-primary/5 rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 mb-10"
          >
            <div class="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-6">
              Thông tin công ty
            </div>
            <h2 class="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Về chúng tôi
            </h2>
            <div class="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>
                <strong class="text-gray-900">Công ty TNHH Năng lượng Thành Hưng Phát</strong> là một trong những công ty hàng đầu chuyên cung cấp than đá và các sản phẩm nhiên liệu chất lượng cao tại Việt Nam. Với nhiều năm kinh nghiệm trong ngành năng lượng, chúng tôi tự hào là đối tác tin cậy của nhiều doanh nghiệp và hộ gia đình.
              </p>
              <p>
                Chúng tôi chuyên cung cấp <strong class="text-gray-900">than bùn, than đá</strong> và các loại nhiên liệu rắn, lỏng, khí phục vụ cho các hệ thống lò hơi công nghiệp, sản xuất và các nhu cầu năng lượng khác. Với cam kết về chất lượng, uy tín và giá cả hợp lý, Thành Hưng Phát luôn nỗ lực mang đến những giải pháp năng lượng tối ưu cho khách hàng.
              </p>
            </div>
          </div>

          <!-- Company Details Grid -->
          <div
            v-motion-slide-visible-once-bottom
            class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10"
          >
            <!-- Company Name -->
            <div class="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
              <div class="flex items-start space-x-4">
                <div class="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <svg class="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div class="flex-1">
                  <h3 class="font-semibold text-gray-500 text-sm mb-2">Tên công ty</h3>
                  <p class="text-lg font-bold text-gray-900">Công ty TNHH Năng lượng Thành Hưng Phát</p>
                  <p class="text-sm text-gray-600 mt-1">Thanh Hung Phat Energy Company Limited</p>
                </div>
              </div>
            </div>

            <!-- Tax Code -->
            <div class="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
              <div class="flex items-start space-x-4">
                <div class="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <svg class="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div class="flex-1">
                  <h3 class="font-semibold text-gray-500 text-sm mb-2">Mã số thuế</h3>
                  <p class="text-lg font-bold text-gray-900">0315184216</p>
                </div>
              </div>
            </div>

            <!-- Established Date -->
            <div class="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
              <div class="flex items-start space-x-4">
                <div class="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <svg class="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div class="flex-1">
                  <h3 class="font-semibold text-gray-500 text-sm mb-2">Ngày thành lập</h3>
                  <p class="text-lg font-bold text-gray-900">23 tháng 7 năm 2018</p>
                  <p class="text-sm text-gray-600 mt-1">Đang hoạt động</p>
                </div>
              </div>
            </div>

            <!-- Business Type -->
            <div class="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
              <div class="flex items-start space-x-4">
                <div class="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <svg class="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div class="flex-1">
                  <h3 class="font-semibold text-gray-500 text-sm mb-2">Loại hình pháp lý</h3>
                  <p class="text-lg font-bold text-gray-900">Công ty TNHH hai thành viên trở lên</p>
                </div>
              </div>
            </div>

            <!-- Address -->
            <div class="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow md:col-span-2">
              <div class="flex items-start space-x-4">
                <div class="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <svg class="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div class="flex-1">
                  <h3 class="font-semibold text-gray-500 text-sm mb-2">Địa chỉ</h3>
                  <p class="text-lg font-bold text-gray-900">256/22A đường Thạnh Xuân 25, Khu phố 2</p>
                  <p class="text-base text-gray-700">Phường Thạnh Xuân, Quận 12, Thành phố Hồ Chí Minh, Việt Nam</p>
                </div>
              </div>
            </div>

            <!-- Main Business -->
            <div class="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow md:col-span-2">
              <div class="flex items-start space-x-4">
                <div class="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <svg class="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div class="flex-1">
                  <h3 class="font-semibold text-gray-500 text-sm mb-2">Ngành nghề chính</h3>
                  <p class="text-lg font-bold text-gray-900">Bán buôn nhiên liệu rắn, lỏng, khí và các sản phẩm liên quan</p>
                  <p class="text-sm text-gray-600 mt-2">Chuyên cung cấp than đá, than bùn chất lượng cao cho các hệ thống lò hơi công nghiệp và sản xuất</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Legal Representative Section -->
    <section class="py-12 md:py-16 bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div class="container mx-auto px-4 max-w-7xl">
        <div class="max-w-5xl mx-auto">
          <div
            v-motion-slide-visible-once-bottom
            class="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 overflow-hidden"
          >
            <div class="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-6">
              Đại diện pháp luật
            </div>
            <div class="flex flex-col md:flex-row gap-8 items-center">
              <div class="flex-shrink-0">
                <div class="relative w-48 h-48 md:w-56 md:h-56 rounded-2xl overflow-hidden shadow-lg ring-4 ring-primary/20">
                  <NuxtImg
                    src="/hotheanh.jpg"
                    alt="Ông Hồ Thế Anh - Đại diện pháp luật"
                    class="w-full h-full object-cover"
                    sizes="sm:200px md:224px"
                    loading="lazy"
                  />
                  <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
              </div>
              <div class="flex-1 text-center md:text-left">
                <h2 class="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                  Ông Hồ Thế Anh
                </h2>
                <p class="text-xl text-primary font-semibold mb-6">Đại diện pháp luật</p>
                <p class="text-lg text-gray-700 leading-relaxed">
                  Với vai trò là đại diện pháp luật của Công ty TNHH Năng lượng Thành Hưng Phát, ông Hồ Thế Anh đã dẫn dắt công ty phát triển vững mạnh từ khi thành lập vào năm 2018. Với tầm nhìn chiến lược và cam kết về chất lượng, ông đã xây dựng Thành Hưng Phát trở thành một trong những đơn vị uy tín trong lĩnh vực cung cấp nhiên liệu tại Việt Nam.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Vision & Mission Section -->
    <section class="py-12 md:py-16 bg-white">
      <div class="container mx-auto px-4 max-w-7xl">
        <div class="max-w-5xl mx-auto">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- Vision -->
            <div
              v-motion-slide-visible-once-bottom
              class="bg-gradient-to-br from-primary/5 to-white rounded-2xl p-8 shadow-lg border border-gray-200"
            >
              <div class="flex items-start space-x-4 mb-6">
                <div class="flex-shrink-0 w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                  <svg class="h-7 w-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <div class="flex-1">
                  <h2 class="text-3xl font-bold mb-4 text-gray-900">Tầm nhìn</h2>
                  <p class="text-lg text-gray-700 leading-relaxed">
                    Trở thành công ty hàng đầu trong lĩnh vực cung cấp than đá và nhiên liệu tại Việt Nam, mang đến giá trị bền vững cho khách hàng, đối tác và cộng đồng thông qua các giải pháp năng lượng hiệu quả và thân thiện với môi trường.
                  </p>
                </div>
              </div>
            </div>

            <!-- Mission -->
            <div
              v-motion-slide-visible-once-bottom
              class="bg-gradient-to-br from-primary/5 to-white rounded-2xl p-8 shadow-lg border border-gray-200"
            >
              <div class="flex items-start space-x-4 mb-6">
                <div class="flex-shrink-0 w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                  <svg class="h-7 w-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div class="flex-1">
                  <h2 class="text-3xl font-bold mb-4 text-gray-900">Sứ mệnh</h2>
                  <p class="text-lg text-gray-700 leading-relaxed">
                    Cung cấp sản phẩm than đá, than bùn chất lượng cao với giá cả hợp lý, dịch vụ chuyên nghiệp và cam kết đáp ứng mọi nhu cầu của khách hàng. Chúng tôi luôn đặt chất lượng và uy tín lên hàng đầu.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Core Values Section -->
    <section class="py-12 md:py-16 bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div class="container mx-auto px-4 max-w-7xl">
        <div class="max-w-5xl mx-auto">
          <div
            v-motion-slide-visible-once-bottom
            class="text-center mb-12"
          >
            <div class="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
              Giá trị cốt lõi
            </div>
            <h2 class="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Những giá trị chúng tôi theo đuổi
            </h2>
            <p class="text-lg text-gray-600 max-w-2xl mx-auto">
              Những nguyên tắc và giá trị này định hướng mọi hoạt động của chúng tôi
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              v-for="(value, index) in coreValues"
              :key="index"
              class="group bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl hover:border-primary/30 transition-all duration-300"
            >
              <div class="flex items-start space-x-4">
                <div class="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <span class="text-primary font-bold text-xl">{{ index + 1 }}</span>
                </div>
                <div class="flex-1">
                  <h3 class="text-xl font-bold text-gray-900 mb-2">{{ value.title }}</h3>
                  <p class="text-gray-600 leading-relaxed">{{ value.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Why Choose Us Section -->
    <section class="py-12 md:py-16 bg-white">
      <div class="container mx-auto px-4 max-w-7xl">
        <div class="max-w-5xl mx-auto">
          <div
            v-motion-slide-visible-once-bottom
            class="text-center mb-12"
          >
            <h2 class="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Tại sao chọn Thành Hưng Phát?
            </h2>
            <p class="text-lg text-gray-600 max-w-2xl mx-auto">
              Những lý do khiến chúng tôi trở thành đối tác tin cậy của bạn
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div
              v-for="(reason, index) in whyChooseUs"
              :key="index"
              class="bg-gradient-to-br from-primary/5 to-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 text-center"
            >
              <div class="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <svg v-if="reason.icon === 'chart'" class="h-8 w-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <svg v-else-if="reason.icon === 'currency'" class="h-8 w-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <svg v-else-if="reason.icon === 'truck'" class="h-8 w-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-3">{{ reason.title }}</h3>
              <p class="text-gray-600 leading-relaxed">{{ reason.description }}</p>
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
    { 
      name: "description", 
      content: "Giới thiệu về Công ty TNHH Năng lượng Thành Hưng Phát - Chuyên cung cấp than đá, than bùn chất lượng cao. MST: 0315184216" 
    },
  ],
});

const coreValues = [
  {
    title: "Chất lượng",
    description: "Đảm bảo sản phẩm đạt tiêu chuẩn cao nhất, được kiểm định kỹ lưỡng trước khi giao đến khách hàng.",
  },
  {
    title: "Uy tín",
    description: "Xây dựng niềm tin với khách hàng qua từng giao dịch, cam kết thực hiện đúng những gì đã hứa.",
  },
  {
    title: "Chuyên nghiệp",
    description: "Dịch vụ tận tâm, hỗ trợ 24/7, đội ngũ nhân viên giàu kinh nghiệm và nhiệt huyết.",
  },
  {
    title: "Bền vững",
    description: "Cam kết phát triển bền vững, thân thiện với môi trường và đóng góp tích cực cho cộng đồng.",
  },
];

const whyChooseUs = [
  {
    title: "Kinh nghiệm",
    description: "Hơn 7 năm hoạt động trong ngành với nhiều dự án thành công",
    icon: "chart",
  },
  {
    title: "Giá cả hợp lý",
    description: "Cạnh tranh, minh bạch, không phát sinh chi phí ẩn",
    icon: "currency",
  },
  {
    title: "Giao hàng nhanh",
    description: "Hệ thống vận chuyển hiện đại, đảm bảo giao hàng đúng hẹn",
    icon: "truck",
  },
];
</script>

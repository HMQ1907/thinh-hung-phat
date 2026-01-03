<template>
  <footer
    class="border-t border-gray-200 bg-gradient-to-br from-gray-50 via-white to-gray-50"
  >
    <div class="container mx-auto px-4 py-16 md:py-20">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-12">
        <!-- Company Info -->
        <div class="space-y-4">
          <div class="flex items-center space-x-3">
            <img
              src="/logo-thp-removebg.png"
              alt="Thành Hưng Phát"
              class="h-36 w-auto object-contain transition-all duration-300 group-hover:scale-105"
            />
          </div>
          <p class="text-sm text-gray-600 leading-relaxed">
            Chuyên cung cấp than đá chất lượng cao, uy tín, giá cả hợp lý. Cam
            kết mang đến sản phẩm tốt nhất cho khách hàng.
          </p>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="font-bold text-gray-900 mb-6 text-lg">Liên kết nhanh</h3>
          <ul class="space-y-3 text-sm">
            <li>
              <NuxtLink
                to="/about"
                class="text-gray-600 hover:text-primary font-medium transition-colors inline-flex items-center gap-2 group"
              >
                <svg
                  class="h-4 w-4 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
                Giới thiệu
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/products"
                class="text-gray-600 hover:text-primary font-medium transition-colors inline-flex items-center gap-2 group"
              >
                <svg
                  class="h-4 w-4 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
                Sản phẩm
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/projects"
                class="text-gray-600 hover:text-primary font-medium transition-colors inline-flex items-center gap-2 group"
              >
                <svg
                  class="h-4 w-4 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
                Dự án
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/blog"
                class="text-gray-600 hover:text-primary font-medium transition-colors inline-flex items-center gap-2 group"
              >
                <svg
                  class="h-4 w-4 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
                Tin tức
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/contact"
                class="text-gray-600 hover:text-primary font-medium transition-colors inline-flex items-center gap-2 group"
              >
                <svg
                  class="h-4 w-4 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
                Liên hệ
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Contact Info -->
        <div>
          <h3 class="font-bold text-gray-900 mb-6 text-lg">
            Thông tin liên hệ
          </h3>
          <ul class="space-y-4 text-sm">
            <li class="flex items-start space-x-3 group">
              <div
                class="flex-shrink-0 w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors"
              >
                <svg
                  class="h-5 w-5 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  stroke-width="2.5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                  />
                </svg>
              </div>
              <div>
                <p class="text-gray-500 text-xs mb-1">Email</p>
                <a
                  href="mailto:info@thinhungphat.com"
                  class="text-gray-700 hover:text-primary font-medium transition-colors"
                  >info@thinhungphat.com</a
                >
              </div>
            </li>
            <li class="flex items-start space-x-3 group">
              <div
                class="flex-shrink-0 w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors"
              >
                <svg
                  class="h-5 w-5 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  stroke-width="2.5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                  />
                </svg>
              </div>
              <div>
                <p class="text-gray-500 text-xs mb-1">Điện thoại</p>
                <a
                  href="tel:0123456789"
                  class="text-gray-700 hover:text-primary font-medium transition-colors"
                  >0933 888 575</a
                >
              </div>
            </li>
          </ul>
        </div>

        <!-- Social Media -->
        <div>
          <h3 class="font-bold text-gray-900 mb-6 text-lg">
            Theo dõi chúng tôi
          </h3>
          <div class="flex gap-3">
            <a
              href="#"
              class="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center hover:bg-blue-200 hover:scale-110 transition-all duration-300 shadow-md hover:shadow-lg"
              aria-label="Facebook"
            >
              <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                />
              </svg>
            </a>
            <a
              href="#"
              class="w-12 h-12 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center hover:bg-sky-200 hover:scale-110 transition-all duration-300 shadow-md hover:shadow-lg"
              aria-label="Twitter"
            >
              <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div class="mt-12 pt-8 border-t border-gray-200 text-center">
        <p class="text-sm text-gray-500">
          &copy; {{ new Date().getFullYear() }}
          <span class="font-semibold text-gray-700">Thành Hưng Phát</span>. Tất
          cả quyền được bảo lưu.
        </p>
      </div>
    </div>
  </footer>
</template>

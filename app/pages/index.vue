<template>
  <div>
    <!-- Hero Section -->
    <section class="relative h-[600px] md:h-[700px] flex items-center justify-center text-white overflow-hidden">
      <!-- Background Image -->
      <div class="absolute inset-0 z-0">
        <NuxtImg
          src="https://media.vneconomy.vn/images/upload/2025/03/05/nang-luong-xanh4.png?w=600"
          alt="Năng lượng xanh"
          class="w-full h-full object-cover"
          loading="eager"
          format="webp"
        />
      </div>
      <!-- Overlay -->
      <div class="absolute inset-0 bg-black/50 z-0"></div>
      <div class="container mx-auto px-4 relative z-10 text-center">
        <h1
          v-motion-fade
          class="text-4xl md:text-6xl font-bold mb-6"
        >
          Thành Hưng Phát
        </h1>
        <p
          v-motion-fade
          :delay="100"
          class="text-xl md:text-2xl mb-8 text-gray-200"
        >
          Chuyên cung cấp than đá chất lượng cao
        </p>
        <div
          v-motion-fade
          :delay="200"
          class="flex flex-col sm:flex-row gap-4 justify-center relative z-20"
        >
          <UiButton
            to="/products"
            variant="primary"
            size="lg"
          >
            <template #icon>
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
              </svg>
            </template>
            Xem sản phẩm
          </UiButton>
          <UiButton
            to="/contact"
            variant="outline"
            size="lg"
            class="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur"
          >
            <template #icon>
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
            </template>
            Liên hệ ngay
          </UiButton>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section class="py-12 md:py-16 bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div v-motion-slide-visible-once-left>
            <div class="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-6">
              Về chúng tôi
            </div>
            <h2 class="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Thành Hưng Phát
            </h2>
            <p class="text-gray-600 mb-6 text-lg leading-relaxed">
              Thành Hưng Phát là công ty chuyên cung cấp than đá chất lượng cao với nhiều năm kinh nghiệm trong ngành năng lượng.
            </p>
            <p class="text-gray-600 mb-8 text-lg leading-relaxed">
              Chúng tôi cam kết mang đến cho khách hàng sản phẩm than đá tốt nhất với giá cả hợp lý và dịch vụ chuyên nghiệp, đáp ứng mọi nhu cầu của khách hàng.
            </p>
            <UiButton
              to="/about"
              variant="primary"
              size="lg"
            >
              <template #icon>
                <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </template>
              Tìm hiểu thêm
            </UiButton>
          </div>
          <div
            v-motion-slide-visible-once-right
            class="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl group"
          >
            <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"></div>
            <NuxtImg
              src="/thandep.jpg"
              alt="About us"
              class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Products Preview -->
    <section class="py-12 md:py-16 bg-white">
      <div class="container mx-auto px-4">
        <div
          v-motion-fade
          class="text-center mb-10"
        >
          <h2 class="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Sản phẩm nổi bật
          </h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            Khám phá các loại than đá chất lượng cao của chúng tôi
          </p>
        </div>
        <div v-if="pending" class="text-center py-20">
          <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p class="mt-4 text-gray-600">Đang tải sản phẩm...</p>
        </div>
        <div v-else-if="products && products.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <NuxtLink
            v-for="(product, index) in products"
            :key="product.id"
            :to="`/products/${product.slug}`"
            v-motion-slide-visible-once-bottom
            :delay="index * 50"
            class="group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-primary/50 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
          >
            <div class="relative h-64 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
              <NuxtImg
                v-if="product.image_url"
                :src="product.image_url"
                :alt="product.name"
                class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
              <div v-else class="w-full h-full flex items-center justify-center text-gray-400">
                <svg class="h-20 w-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-bold mb-2 text-gray-900 group-hover:text-primary transition-colors">{{ product.name }}</h3>
              <p class="text-gray-600 mb-4 line-clamp-2 leading-relaxed">{{ product.description }}</p>
              <div class="flex items-center text-primary font-semibold group-hover:gap-2 transition-all">
                <span>Xem chi tiết</span>
                <svg class="h-5 w-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </NuxtLink>
        </div>
        <div v-else class="text-center py-20">
          <p class="text-gray-600">Chưa có sản phẩm nào</p>
        </div>
        <div class="text-center mt-8">
          <NuxtLink
            to="/products"
            class="inline-flex items-center space-x-2 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl"
          >
            <span>Xem tất cả sản phẩm</span>
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Why Choose Us Section -->
    <section class="py-12 md:py-20 bg-white relative overflow-hidden">
      <!-- Background Pattern -->
      <div class="absolute inset-0 opacity-[0.02]">
        <div class="absolute inset-0" style="background-image: radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0); background-size: 40px 40px;"></div>
      </div>
      
      <div class="container mx-auto px-4 relative z-10">
        <!-- Header -->
        <div
          v-motion-fade
          class="text-center mb-12"
        >
          <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900">
            Thành Hưng Phát - Đối tác tin cậy của bạn
          </h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Với hơn 7 năm kinh nghiệm, chúng tôi tự hào là nhà cung cấp than đá hàng đầu với chất lượng vượt trội và dịch vụ chuyên nghiệp
          </p>
        </div>

        <!-- Stats Grid -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-12">
          <div
            v-for="(stat, index) in stats"
            :key="index"
            v-motion-slide-visible-once-bottom
            :delay="index * 100"
            class="text-center group"
          >
            <div class="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-6 md:p-8 border border-primary/20 hover:border-primary/40 hover:shadow-xl transition-all duration-300">
              <div class="text-4xl md:text-5xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform duration-300">
                {{ stat.value }}
              </div>
              <div class="text-sm md:text-base text-gray-600 font-medium">
                {{ stat.label }}
              </div>
            </div>
          </div>
        </div>

        <!-- Benefits Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          <div
            v-for="(benefit, index) in benefits"
            :key="index"
            v-motion-slide-visible-once-left
            :delay="index * 150"
            class="group"
          >
            <div class="flex gap-6 p-6 rounded-2xl hover:bg-gray-50 transition-all duration-300">
              <!-- Icon -->
              <div class="flex-shrink-0">
                <div class="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <div class="text-3xl">{{ benefit.icon }}</div>
                </div>
              </div>
              
              <!-- Content -->
              <div class="flex-1">
                <h3 class="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                  {{ benefit.title }}
                </h3>
                <p class="text-gray-600 leading-relaxed text-lg">
                  {{ benefit.description }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Trust Indicators -->
        <div
          v-motion-fade
          class="mt-12 pt-8 border-t border-gray-200"
        >
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div class="p-6">
              <div class="text-3xl font-bold text-primary mb-2">100%</div>
              <div class="text-gray-600">Khách hàng hài lòng</div>
            </div>
            <div class="p-6 border-x border-gray-200">
              <div class="text-3xl font-bold text-primary mb-2">24/7</div>
              <div class="text-gray-600">Hỗ trợ khách hàng</div>
            </div>
            <div class="p-6">
              <div class="text-3xl font-bold text-primary mb-2">500+</div>
              <div class="text-gray-600">Dự án thành công</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Blog Preview -->
    <section class="py-12 md:py-16 bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div class="container mx-auto px-4">
        <div
          v-motion-fade
          class="text-center mb-10"
        >
          <h2 class="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Tin tức mới nhất
          </h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            Cập nhật thông tin mới nhất về ngành than đá và năng lượng
          </p>
        </div>
        <div v-if="postsPending" class="text-center py-20">
          <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p class="mt-4 text-gray-600">Đang tải bài viết...</p>
        </div>
        <div v-else-if="posts && posts.length > 0" class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <NuxtLink
            v-for="(post, index) in posts"
            :key="post.id"
            :to="`/blog/${post.slug}`"
            v-motion-slide-visible-once-bottom
            :delay="index * 100"
            class="group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-primary/50 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
          >
            <div class="relative h-64 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
              <NuxtImg
                v-if="post.thumbnail"
                :src="post.thumbnail"
                :alt="post.title"
                class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
              <div v-else class="w-full h-full flex items-center justify-center text-gray-400">
                <svg class="h-20 w-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div v-if="post.category" class="absolute top-4 left-4">
                <span class="px-3 py-1 bg-primary text-primary-foreground rounded-full text-xs font-semibold">
                  {{ post.category.name }}
                </span>
              </div>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-bold mb-3 text-gray-900 line-clamp-2 group-hover:text-primary transition-colors">{{ post.title }}</h3>
              <p class="text-gray-600 mb-4 line-clamp-2 leading-relaxed">{{ post.excerpt || post.content }}</p>
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-500">{{ formatDate(post.created_at) }}</span>
                <div class="flex items-center text-primary font-semibold group-hover:gap-2 transition-all">
                  <span class="text-sm">Đọc thêm</span>
                  <svg class="h-4 w-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </NuxtLink>
        </div>
        <div v-else class="text-center py-20">
          <p class="text-gray-600">Chưa có bài viết nào</p>
        </div>
        <div class="text-center mt-8">
          <NuxtLink
            to="/blog"
            class="inline-flex items-center space-x-2 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl"
          >
            <span>Xem tất cả tin tức</span>
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-12 md:py-20 bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground relative overflow-hidden">
      <div
        class="absolute inset-0 opacity-20 bg-gradient-to-br from-white/10 to-transparent"
      ></div>
      <div class="container mx-auto px-4 text-center relative z-10">
        <div
          v-motion-fade
          class="max-w-3xl mx-auto"
        >
          <h2 class="text-4xl md:text-5xl font-bold mb-6">
            Cần tư vấn về sản phẩm?
          </h2>
          <p class="text-xl mb-10 opacity-95 leading-relaxed">
            Liên hệ với chúng tôi ngay hôm nay để nhận được tư vấn miễn phí và báo giá tốt nhất
          </p>
          <NuxtLink
            to="/contact"
            class="inline-flex items-center space-x-2 px-10 py-4 bg-white text-primary rounded-xl font-semibold hover:bg-gray-50 transition-all shadow-2xl hover:shadow-3xl transform hover:scale-105"
          >
            <span>Liên hệ ngay</span>
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { Product, Post, APIResponse } from "~/types";

useHead({
  title: "Trang chủ - Thành Hưng Phát",
  meta: [
    { name: "description", content: "Thành Hưng Phát - Chuyên cung cấp than đá chất lượng cao" },
  ],
});

const stats = [
  {
    value: "7+",
    label: "Năm kinh nghiệm",
  },
  {
    value: "100+",
    label: "Dự án thành công",
  },
  {
    value: "300+",
    label: "Khách hàng tin tưởng",
  },
  {
    value: "24/7",
    label: "Hỗ trợ khách hàng",
  },
];

const benefits = [
  {
    icon: "🔥",
    title: "Chất lượng vượt trội",
    description: "Than đá được tuyển chọn kỹ lưỡng từ các mỏ uy tín, đảm bảo nhiệt lượng cao và độ ẩm thấp, phù hợp cho mọi loại lò hơi công nghiệp.",
  },
  {
    icon: "💰",
    title: "Giá cả cạnh tranh",
    description: "Cam kết giá tốt nhất thị trường với chính sách báo giá minh bạch, không phát sinh chi phí ẩn, giúp doanh nghiệp tối ưu chi phí sản xuất.",
  },
  {
    icon: "🚚",
    title: "Giao hàng nhanh chóng",
    description: "Hệ thống vận chuyển hiện đại với đội xe lớn, đảm bảo giao hàng đúng hẹn đến mọi địa điểm trên toàn quốc, hỗ trợ 24/7.",
  },
  {
    icon: "✅",
    title: "Dịch vụ chuyên nghiệp",
    description: "Đội ngũ tư vấn giàu kinh nghiệm, hỗ trợ kỹ thuật tận tâm, đảm bảo khách hàng nhận được giải pháp tối ưu cho nhu cầu của mình.",
  },
  {
    icon: "🛡️",
    title: "Uy tín đã được chứng minh",
    description: "Được tin tưởng bởi hàng trăm doanh nghiệp lớn nhỏ, với tỷ lệ khách hàng quay lại lên đến 95%, minh chứng cho chất lượng dịch vụ.",
  },
  {
    icon: "🌱",
    title: "Cam kết bền vững",
    description: "Tuân thủ nghiêm ngặt các tiêu chuẩn môi trường, cung cấp than sạch, hỗ trợ khách hàng trong việc giảm thiểu tác động môi trường.",
  },
];

// Fetch products
const { data: productsResponse, pending } = await useFetch<APIResponse<Product[]>>("/api/products", {
  default: () => ({ data: [], status: 200, success: true }),
});

const products = computed(() => productsResponse.value?.data || []);

// Fetch posts - request more to ensure we have 3 valid posts after filtering
const { data: postsResponse, pending: postsPending } = await useFetch<APIResponse<Post[]>>("/api/posts", {
  query: { limit: 6 },
  default: () => ({ data: [], status: 200, success: true }),
});

const posts = computed(() => {
  const data = postsResponse.value?.data || [];
  // Take only first 3 posts to display on homepage
  const limitedPosts = data.slice(0, 3);
  console.log("[Home] Posts loaded:", data.length, "total, showing:", limitedPosts.length, "posts");
  return limitedPosts;
});

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
</script>


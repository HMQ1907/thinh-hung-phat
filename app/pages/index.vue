<template>
  <div>
    <!-- Hero Section -->
    <section class="relative h-[600px] md:h-[700px] flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div class="absolute inset-0 bg-black/40"></div>
      <div class="container mx-auto px-4 relative z-10 text-center">
        <h1
          v-motion-fade
          class="text-4xl md:text-6xl font-bold mb-6"
        >
          Thịnh Hưng Phát
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
          class="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <NuxtLink
            to="/products"
            class="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            Xem sản phẩm
          </NuxtLink>
          <NuxtLink
            to="/contact"
            class="px-8 py-3 bg-white/10 text-white rounded-lg font-semibold hover:bg-white/20 transition-colors backdrop-blur"
          >
            Liên hệ ngay
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-20 md:py-28 bg-white">
      <div class="container mx-auto px-4">
        <div
          v-motion-fade
          class="text-center mb-16"
        >
          <h2 class="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Tại sao chọn Thịnh Hưng Phát?
          </h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            Chúng tôi cam kết mang đến dịch vụ tốt nhất với giá cả hợp lý
          </p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            v-for="(feature, index) in features"
            :key="index"
            v-motion-slide-visible-once-bottom
            :delay="index * 100"
            class="group relative bg-white rounded-2xl p-8 border border-gray-200 hover:border-primary/50 hover:shadow-xl transition-all duration-300"
          >
            <div class="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div class="relative">
              <div class="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300">{{ feature.icon }}</div>
              <h3 class="text-xl font-bold mb-3 text-gray-900">{{ feature.title }}</h3>
              <p class="text-gray-600 leading-relaxed">{{ feature.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section class="py-20 md:py-28 bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div v-motion-slide-visible-once-left>
            <div class="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-6">
              Về chúng tôi
            </div>
            <h2 class="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Thịnh Hưng Phát
            </h2>
            <p class="text-gray-600 mb-6 text-lg leading-relaxed">
              Thịnh Hưng Phát là công ty chuyên cung cấp than đá chất lượng cao với nhiều năm kinh nghiệm trong ngành năng lượng.
            </p>
            <p class="text-gray-600 mb-8 text-lg leading-relaxed">
              Chúng tôi cam kết mang đến cho khách hàng sản phẩm than đá tốt nhất với giá cả hợp lý và dịch vụ chuyên nghiệp, đáp ứng mọi nhu cầu của khách hàng.
            </p>
            <NuxtLink
              to="/about"
              class="inline-flex items-center space-x-2 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl"
            >
              <span>Tìm hiểu thêm</span>
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </NuxtLink>
          </div>
          <div
            v-motion-slide-visible-once-right
            class="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl group"
          >
            <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"></div>
            <img
              src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800"
              alt="About us"
              class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Products Preview -->
    <section class="py-20 md:py-28 bg-white">
      <div class="container mx-auto px-4">
        <div
          v-motion-fade
          class="text-center mb-16"
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
        <div v-else-if="products && products.length > 0" class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <NuxtLink
            v-for="(product, index) in products.slice(0, 3)"
            :key="product.id"
            :to="`/products/${product.slug}`"
            v-motion-slide-visible-once-bottom
            :delay="index * 100"
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
        <div class="text-center mt-12">
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

    <!-- Blog Preview -->
    <section class="py-20 md:py-28 bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div class="container mx-auto px-4">
        <div
          v-motion-fade
          class="text-center mb-16"
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
            v-for="(post, index) in posts.slice(0, 3)"
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
        <div class="text-center mt-12">
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
    <section class="py-20 md:py-28 bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground relative overflow-hidden">
      <div
        class="absolute inset-0 opacity-20"
        style="background-image: url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%23ffffff&quot; fill-opacity=&quot;0.05&quot;%3E%3Cpath d=&quot;M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"
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
  title: "Trang chủ - Thịnh Hưng Phát",
  meta: [
    { name: "description", content: "Thịnh Hưng Phát - Chuyên cung cấp than đá chất lượng cao" },
  ],
});

const features = [
  {
    icon: "🔥",
    title: "Chất lượng cao",
    description: "Than đá được chọn lọc kỹ càng, đảm bảo chất lượng tốt nhất",
  },
  {
    icon: "💰",
    title: "Giá cả hợp lý",
    description: "Giá cả cạnh tranh, phù hợp với mọi đối tượng khách hàng",
  },
  {
    icon: "🚚",
    title: "Giao hàng nhanh",
    description: "Dịch vụ giao hàng tận nơi, nhanh chóng và tiện lợi",
  },
];

// Fetch products
const { data: productsResponse, pending } = await useFetch<APIResponse<Product[]>>("/api/products", {
  query: { limit: 3, status: "active" },
});

const products = computed(() => productsResponse.value?.data || []);

// Fetch posts
const { data: postsResponse, pending: postsPending } = await useFetch<APIResponse<Post[]>>("/api/posts", {
  query: { limit: 3, status: "published" },
});

const posts = computed(() => postsResponse.value?.data || []);

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
</script>


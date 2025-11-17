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
          Sản phẩm
        </h1>
        <p
          v-motion-fade
          :delay="100"
          class="text-xl md:text-2xl text-gray-200"
        >
          Than đá chất lượng cao
        </p>
      </div>
    </section>

    <!-- Products Grid -->
    <section class="py-20 md:py-28 bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div class="container mx-auto px-4">
        <div v-if="pending" class="text-center py-20">
          <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p class="mt-4 text-gray-600">Đang tải sản phẩm...</p>
        </div>
        <div v-else-if="error" class="text-center py-20">
          <div class="inline-block p-4 bg-red-50 border border-red-200 rounded-xl">
            <p class="text-red-600 font-semibold">Có lỗi xảy ra: {{ error.message }}</p>
          </div>
        </div>
        <div v-else-if="products && products.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <NuxtLink
            v-for="(product, index) in products"
            :key="product.id"
            :to="`/products/${product.slug}`"
            v-motion-slide-visible-once-bottom
            :delay="index * 50"
            class="group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-primary/50 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
          >
            <div class="relative h-72 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
              <NuxtImg
                v-if="product.image_url"
                :src="product.image_url"
                :alt="product.name"
                class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
              <div v-else class="w-full h-full flex items-center justify-center text-gray-400">
                <svg class="h-24 w-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <div class="p-6">
              <h3 class="text-2xl font-bold mb-3 text-gray-900 group-hover:text-primary transition-colors">{{ product.name }}</h3>
              <p class="text-gray-600 mb-4 line-clamp-3 leading-relaxed">{{ product.description }}</p>
              <div v-if="product.price" class="mb-6">
                <span class="text-3xl font-bold text-primary">{{ formatPrice(product.price) }}</span>
              </div>
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
          <div class="inline-block p-8 bg-gray-50 rounded-2xl border border-gray-200">
            <svg class="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <p class="text-gray-600 font-medium">Chưa có sản phẩm nào</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { Product, APIResponse } from "~/types";

useHead({
  title: "Sản phẩm - Thịnh Hưng Phát",
  meta: [
    { name: "description", content: "Danh sách sản phẩm than đá chất lượng cao của Thịnh Hưng Phát" },
  ],
});

const { data: response, pending, error } = await useFetch<APIResponse<Product[]>>("/api/products", {
  query: { status: "active" },
});

const products = computed(() => response.value?.data || []);

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};
</script>


<template>
  <div>
    <div v-if="pending" class="text-center py-12">
      <p class="text-muted-foreground">Đang tải...</p>
    </div>
    <div v-else-if="error" class="text-center py-12">
      <p class="text-red-500">Không tìm thấy sản phẩm</p>
    </div>
    <div v-else-if="product">
      <!-- Hero Section -->
      <section class="relative h-[400px] flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div class="absolute inset-0 bg-black/40"></div>
        <div class="container mx-auto px-4 relative z-10 text-center">
          <h1 class="text-4xl md:text-5xl font-bold mb-4">{{ product.name }}</h1>
        </div>
      </section>

      <!-- Product Details -->
      <section class="py-16 md:py-24">
        <div class="container mx-auto px-4 max-w-6xl">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
            <!-- Image -->
            <div class="relative h-[500px] rounded-lg overflow-hidden bg-gray-200">
              <NuxtImg
                v-if="product.image_url"
                :src="product.image_url"
                :alt="product.name"
                class="w-full h-full object-cover"
              />
              <div v-else class="w-full h-full flex items-center justify-center text-gray-400">
                <svg class="h-32 w-32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>

            <!-- Details -->
            <div>
              <h2 class="text-3xl font-bold mb-4">{{ product.name }}</h2>
              <div v-if="product.price" class="mb-6">
                <span class="text-4xl font-bold text-primary">{{ formatPrice(product.price) }}</span>
              </div>
              <div class="prose max-w-none mb-8">
                <p class="text-lg text-muted-foreground">{{ product.description }}</p>
              </div>

              <!-- Specifications -->
              <div v-if="product.specifications" class="mb-8">
                <h3 class="text-xl font-semibold mb-4">Thông số kỹ thuật</h3>
                <dl class="space-y-2">
                  <div v-for="(value, key) in product.specifications" :key="key" class="flex border-b pb-2">
                    <dt class="font-semibold w-1/3">{{ key }}:</dt>
                    <dd class="text-muted-foreground">{{ value }}</dd>
                  </div>
                </dl>
              </div>

              <!-- Contact CTA -->
              <div class="border-t pt-6">
                <NuxtLink
                  to="/contact"
                  class="inline-block w-full text-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                >
                  Liên hệ đặt hàng
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product, APIResponse } from "~/types";

const route = useRoute();
const slug = route.params.slug as string;

const { data: response, pending, error } = await useFetch<APIResponse<Product>>(`/api/products/${slug}`);

const product = computed(() => response.value?.data);

useHead({
  title: product.value ? `${product.value.name} - Thành Hưng Phát` : "Sản phẩm",
  meta: [
    {
      name: "description",
      content: product.value?.description || "Chi tiết sản phẩm",
    },
  ],
});

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};
</script>


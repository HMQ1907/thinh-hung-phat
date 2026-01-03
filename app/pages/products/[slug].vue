<template>
  <div>
    <div v-if="pending" class="text-center py-12">
      <p class="text-muted-foreground">Đang tải...</p>
    </div>
    <div v-else-if="error" class="text-center py-12">
      <p class="text-red-500">Không tìm thấy sản phẩm</p>
    </div>
    <div v-else-if="product">
      <!-- Hero Section with Product Image -->
      <section class="relative h-[500px] md:h-[600px] flex items-center justify-center overflow-hidden">
        <!-- Background Image -->
        <div v-if="product.image_url" class="absolute inset-0">
          <NuxtImg
            :src="product.image_url"
            :alt="product.name"
            class="w-full h-full object-cover"
          />
        </div>
        <div v-else class="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"></div>
        
        <!-- Overlay -->
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-black/40"></div>
        
        <!-- Content -->
        <div class="container mx-auto px-4 relative z-10 text-center">
          <h1 class="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 text-white drop-shadow-2xl">
            {{ product.name }}
          </h1>
          <p v-if="product.description" class="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto line-clamp-2 drop-shadow-lg">
            {{ product.description.split('\n')[0] }}
          </p>
        </div>
      </section>

      <!-- Product Details -->
      <section class="py-16 md:py-24 bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div class="container mx-auto px-4 max-w-6xl">
          <div class="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-0">
              <!-- Image -->
              <div class="relative h-[400px] md:h-[500px] lg:h-full min-h-[400px] bg-gray-100">
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
              <div class="p-8 md:p-12 flex flex-col justify-between">
                <div>
                  <h2 class="text-3xl md:text-4xl font-bold mb-6 text-gray-900">{{ product.name }}</h2>
                  
                  <!-- Description -->
                  <div v-if="product.description" class="mb-8">
                    <h3 class="text-xl font-semibold mb-4 text-gray-900">Mô tả</h3>
                    <div class="prose max-w-none">
                      <p class="text-gray-700 leading-relaxed whitespace-pre-line">{{ product.description }}</p>
                    </div>
                  </div>

                  <!-- Specifications -->
                  <div v-if="product.specifications" class="mb-8">
                    <h3 class="text-xl font-semibold mb-4 text-gray-900">Thông số kỹ thuật</h3>
                    <dl class="space-y-3">
                      <div v-for="(value, key) in product.specifications" :key="key" class="flex border-b border-gray-200 pb-3">
                        <dt class="font-semibold w-1/3 text-gray-900">{{ key }}:</dt>
                        <dd class="text-gray-700 flex-1">{{ value }}</dd>
                      </div>
                    </dl>
                  </div>
                </div>

                <!-- Contact CTA -->
                <div class="border-t border-gray-200 pt-6 mt-6">
                  <NuxtLink
                    to="/contact"
                    class="inline-flex items-center justify-center w-full px-6 py-4 bg-primary text-black rounded-xl font-semibold hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    <span>Liên hệ đặt hàng</span>
                    <svg class="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </NuxtLink>
                </div>
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
</script>


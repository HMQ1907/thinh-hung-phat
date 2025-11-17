// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  // Modules
  modules: ["@nuxt/image", "@vueuse/motion/nuxt", "shadcn-nuxt"],

  // shadcn-nuxt configuration
  // @ts-ignore - shadcn-nuxt types
  shadcn: {
    prefix: "",
    componentDir: "./app/components/ui",
  },

  // CSS
  css: ["~/assets/css/main.css"],

  postcss: {
    plugins: {
      '@tailwindcss/postcss': {},
      autoprefixer: {},
    },
  },

  runtimeConfig: {
    supabaseSecretKey: process.env.SUPABASE_SECRET_KEY,
    public: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_KEY,
    },
  },
  app: {
    head: {
      title: "Thịnh Hưng Phát - Chuyên cung cấp than đá chất lượng cao",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "description", content: "Thịnh Hưng Phát - Chuyên cung cấp than đá chất lượng cao, uy tín, giá cả hợp lý" },
      ],
    },
  },

  nitro: {
    storage: {
      // Option 1: Filesystem cache (lưu trên đĩa, tồn tại sau khi restart)
      // cache: {
      //   driver: "fs",
      //   base: "./.cache", // Thư mục lưu cache
      // },
      // Option 2: Redis cache (cho production, multi-server)
      // cache: {
      //   driver: "redis",
      //   host: process.env.REDIS_HOST || "localhost",
      //   port: process.env.REDIS_PORT || 6379,
      //   password: process.env.REDIS_PASSWORD,
      //   db: process.env.REDIS_DB || 0,
      // },
      // Option 3: Memory cache (mặc định - không cần config)
      // cache: {
      //   driver: "memory",
      // },
    },

    routeRules: {
      // Cache API posts với stale-while-revalidate
      "/api/posts": {
        cache: {
          maxAge: 60 * 60, // Cache 1 giờ
          swr: true,
        },
        headers: {
          "Cache-Control": "s-maxage=3600, stale-while-revalidate=300",
        },
      },
    },
  },
});

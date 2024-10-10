// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import tailwindcssForms from "@tailwindcss/forms";

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["shadcn-nuxt"],
  pages: true,
  build: {
    transpile: ["@heroicons/vue"],
  },
  // 使用 runtimeConfig 将环境变量导入到 Nuxt 内
  runtimeConfig: {
    jwtAccessSecret: process.env.JWT_ACCESS_TOKEN_SECRET,
    jwtRefreshSecret: process.env.JWT_REFRESH_TOKEN_SECRET,
    tokenRefreshTime: process.env.Token_Refresh_Time,

    // Cloudinary
    cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
    cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
    cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET,
  },
  alias: {
    // add types
    "#": fileURLToPath(new URL("./types", import.meta.url)),
  },
  css:["~/assets/css/tailwind.css"],
  vite: {
    css: {
      transformer: "lightningcss",
    },
    plugins: [tailwindcss()],
  },
  compatibilityDate: "2024-10-10",
});

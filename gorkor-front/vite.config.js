import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // 自动导入scss文件
        additionalData: `
        @use "@/styles/base/_mixin.scss" as *;
          @use "@/styles/base/_varcolor.scss" as *;
        `,
      },
    },
  },
});
// @use "@/styles/element/index.scss" as *;

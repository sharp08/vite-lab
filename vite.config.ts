import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx({}) //  用于支持 jsx tsx
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src")
    },
    extensions: [".js", ".json", ".ts", ".tsx"]
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          hack: `true; @import (reference) "${path.resolve(
            "src/style/global.less"
          )}";`
        },
        javascriptEnabled: true
      }
    }
  },
  server: {
    host: true,
    port: 3333
  },
  build: {
    cssCodeSplit: false, // 禁用 css 拆分
    // 多页面配置
    rollupOptions: {
      input: {
        default: path.resolve(__dirname, "index.html"),
        welcome: path.resolve(__dirname, "welcome.html")
      },
      output: {
        chunkFileNames: "[name]/js/[name]-[hash].js",
        entryFileNames: "[name]/js/[name]-[hash].js",
        assetFileNames: "[name]/[ext]/[name]-[hash].[ext]"
      }
    }
  }
});

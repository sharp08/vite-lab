import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import path from "path";
// import viteCompression from 'vite-plugin-compression'; //  gzip 压缩

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx({}), //  用于支持 jsx tsx
    // viteCompression() //  开启 gzip，会额外生成一部分 .gz 文件，但需要 nginx 开启什么配置才能真正应用 gzip 文件
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
      // output: {
      //   chunkFileNames: "[name]/js/[name]-[hash].js",
      //   entryFileNames: "[name]/js/[name]-[hash].js",
      //   assetFileNames: "[name]/[ext]/[name]-[hash].[ext]"
      // }
    }
  }
});

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
  }
});

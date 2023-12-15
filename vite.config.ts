import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import viteEslint from "vite-plugin-eslint";

const envDir = path.resolve(process.cwd(), "./env");
// https://vitejs.dev/config/
export default defineConfig({
  envDir,
  envPrefix: "VITE_",
  resolve: {
    extensions: [".js", ".ts", ".tsx", ".scss", ".css"],
    alias: {
      "@": path.resolve(__dirname, "src"), // 源文件根目录
    },
  },
  plugins: [
    react(),
    viteEslint({
      failOnError: false,
    }),
  ],
  server: {
    open: true, // 自动打开浏览器
    port: 3000, // 服务端口
    proxy: {
      "/api": "", // api代理路径
      "/mock": "", // mock代理路径
    },
  },
});

/// <reference types="vitest" />
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import viteEslint from 'vite-plugin-eslint';
import viteCompression from 'vite-plugin-compression';
import legacyPlugin from '@vitejs/plugin-legacy';
import autoprefixer from 'autoprefixer';

const envDir = path.resolve(process.cwd(), './env');
// https://vitejs.dev/config/
export default defineConfig(conditionalConfig => {
  const { mode } = conditionalConfig;
  const isPro = mode === 'production';
  const env = loadEnv(mode, envDir); // 环境变量

  return {
    envDir,
    envPrefix: 'VITE_',
    base: '/react-template',
    resolve: {
      extensions: ['.js', '.ts', '.tsx', '.scss', '.css'],
      alias: {
        '@': path.resolve(__dirname, 'src') // 源文件根目录
      }
    },
    css: {
      // 预处理器配置项
      preprocessorOptions: {
        less: {
          math: 'always',
          globalVars: {
            //配置全局变量
            test: '#1CC0FF'
          }
        }
      }
    },
    postcss: {
      plugins: [
        // css3兼容前缀
        autoprefixer({
          overrideBrowserslist: ['Android 4.1', 'iOS 7.1', 'Chrome > 31', 'ff > 31', 'ie >= 8']
        })
      ]
    },
    plugins: [
      react(),
      viteEslint({
        failOnError: false
      }),
      // Gzip压缩,上线时需要nginx也开启gzip压缩
      viteCompression({
        filter: /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i, // 需要压缩的文件
        threshold: 1024, // 文件容量大于这个值进行压缩
        algorithm: 'gzip', // 压缩方式
        ext: 'gz', // 后缀名
        deleteOriginFile: false // 压缩后是否删除压缩源文件
      }),
      // 兼容
      legacyPlugin({
        targets: ['chrome 52'], // 需要兼容的目标列表，可以设置多个
        additionalLegacyPolyfills: ['regenerator-runtime/runtime'] // 面向IE11时需要此插件
      })
    ],
    test: {
      globals: true,
      environment: 'jsdom', //提供浏览器API以模拟浏览器环境
      coverage: {
        provider: 'v8',
        reporter: ['text', 'json', 'html']
      }
    },
    build: {
      rollupOptions: {
        output: {
          chunkFileNames: 'js/[name]-[hash:10].js', // 引入文件名的名称
          entryFileNames: 'js/[name]-[hash:10].js', // 包的入口文件名称
          assetFileNames: '[ext]/[name]-[hash:10].[ext]', // 资源文件像 字体，图片等
          manualChunks(id: string) {
            const isNodeModule = id.includes('node_modules');
            const isVue = /[\\/]node_modules[\\/]vue[\\/]/.test(id);
            const isElePlus = /[\\/]node_modules[\\/]element-plus[\\/]/.test(id);
            const isPinia = /[\\/]node_modules[\\/]pinia[\\/]/.test(id);
            const isVueRouter = /[\\/]node_modules[\\/]vue-router[\\/]/.test(id);

            if (isVue || isElePlus || isPinia || isVueRouter) {
              return 'common';
            }

            if (isNodeModule) {
              return 'vendor';
            }
          }
        }
      }
    },
    server: {
      open: true, // 自动打开浏览器
      port: 3000, // 服务端口
      hmr: true,
      proxy: {
        '/api': {
          target: '',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, '')
        }, // api代理路径
        '/mock': '' // mock代理路径,
      }
    }
  };
});

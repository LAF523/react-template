/// <reference types="vitest" />
import { fileURLToPath, URL } from 'node:url';
import autoprefixer from 'autoprefixer';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

const envDir = fileURLToPath(new URL('./env', import.meta.url));

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, envDir, 'VITE_');

  return {
    envDir,
    envPrefix: 'VITE_',
    // GitHub Pages 项目站点可通过 VITE_BASE_PATH 覆盖此默认值。
    base: env.VITE_BASE_PATH ?? '/react-template/',
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    css: {
      preprocessorOptions: {
        less: {
          math: 'always',
          globalVars: {
            test: '#1CC0FF'
          }
        }
      },
      postcss: {
        plugins: [autoprefixer()]
      }
    },
    plugins: [react()],
    test: {
      globals: true,
      environment: 'jsdom',
      coverage: {
        provider: 'v8',
        reporter: ['text', 'json', 'html']
      }
    },
    build: {
      rollupOptions: {
        output: {
          chunkFileNames: 'js/[name]-[hash:10].js',
          entryFileNames: 'js/[name]-[hash:10].js',
          assetFileNames: '[ext]/[name]-[hash:10].[ext]',
          manualChunks(id: string) {
            const normalizedId = id.replace(/\\/g, '/');
            const commonPackages = [
              'react',
              'react-dom',
              'scheduler',
              'react-router',
              'react-router-dom',
              '@reduxjs',
              'redux',
              'react-redux',
              'immer',
              'reselect',
              'antd',
              '@ant-design',
              '@rc-component'
            ];

            if (!normalizedId.includes('/node_modules/')) {
              return;
            }

            const isCommonPackage = commonPackages.some(packageName =>
              normalizedId.includes(`/node_modules/${packageName}/`)
            );
            const isRcPackage = normalizedId.includes('/node_modules/rc-');

            if (isCommonPackage || isRcPackage) {
              return 'common';
            }

            return 'vendor';
          }
        }
      }
    },
    server: {
      open: true,
      port: 3000,
      hmr: true,
      proxy: {
        '/api': {
          target: '',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, '')
        },
        '/mock': ''
      }
    }
  };
});

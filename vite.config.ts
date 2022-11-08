import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'


export default defineConfig(({ mode }) => {
  let isDev = mode === 'development'
  return {
    base: isDev ? '' : 'https://s2.tokeninsight.com/widgets',
    plugins: [
      vue(),
      vueJsx()
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    build: {
      assetsDir: 'widget-coin',
      rollupOptions: {
        output: {
          entryFileNames: `widget-coin/[name].js`, // 入口文件
          assetFileNames: `widget-coin/[name].[ext]`,
        },
      },
    },
  }
})

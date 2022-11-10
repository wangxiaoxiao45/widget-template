import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

export default defineConfig(({ mode }) => {
  let isDev = mode === 'development'
  return {
    base: isDev ? '' : 'https://s2.tokeninsight.com/widgets',
    plugins: [vue(), vueJsx()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    build: {
      assetsDir: 'simple-rating-widget',
      rollupOptions: {
        output: {
          entryFileNames: `simple-rating-widget/[name].js`, // 入口文件
          assetFileNames: `simple-rating-widget/[name].[ext]`,
        },
      },
    },
  }
})

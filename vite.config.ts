/** @format */

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/

export default defineConfig(({ mode }) => {
  let isDev = mode === 'development'
  return {
    base: isDev ? '' : 'https://s2.tokeninsight.com/widgets',
    plugins: [vue()],
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

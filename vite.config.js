import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from 'path'

export default defineConfig({
  plugins: [
    vue(),
    // Enable JSX in both .jsx and legacy .js component files
    vueJsx({ include: [/\.jsx?$/i, /\.tsx?$/i] })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  server: {
    port: 8080,
    open: true
  },
  base: './'
})

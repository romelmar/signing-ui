import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  // define: {
  //   // ✅ Required Vue feature flags for ESM bundler
  //   __VUE_OPTIONS_API__: true,
  //   __VUE_PROD_DEVTOOLS__: false,
  //   __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false, // ✅ <== This is the one causing your warning
  // },
  build: {
    target: 'modules', // ✅ Or 'modules'
    lib: {
      entry: 'src/index.js',
      name: 'SigningUI',
      fileName: (format) => `signing-ui.${format}.js`
    },
    rollupOptions: {
      external: ['vue', 'pdfjs-dist'], // ✅ Do not bundle these
      output: {
        globals: {
          vue: 'Vue',
          'pdfjs-dist': 'pdfjsLib' // Optional: only used if consuming via script tag
        }
      }
    }
  },
  resolve: {
    dedupe: ['vue', 'pdfjs-dist'] // ✅ Prevent multiple instances in dev
  },
  optimizeDeps: {
    include: ['pdfjs-dist'], // ✅ Pre-bundle this in dev
  }
})

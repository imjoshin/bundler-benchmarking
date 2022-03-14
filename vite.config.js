var resolve = require('path').resolve
var defineConfig = require('vite').defineConfig

module.exports = defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src', 'index.vite.html'),
      }
    },
    outDir: 'dist',
    assetsDir: '',
  },
  define: {
    'process.env.BUNDLER_NAME': JSON.stringify('vite')
  }
})
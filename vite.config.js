import { defineConfig } from 'vite';
import { resolve } from 'path';
import { copyFileSync, mkdirSync, readdirSync, statSync, existsSync } from 'fs';
import { join } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  // Base public path
  base: './',

  // Build configuration
  build: {
    outDir: 'dist',
    assetsDir: 'assets',

    // Code splitting
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        quote: resolve(__dirname, 'quote.html'),
        assessment: resolve(__dirname, 'assessment.html'),
        'physical-condition': resolve(__dirname, 'physical-condition.html'),
        'functional-issues': resolve(__dirname, 'functional-issues.html'),
        accessories: resolve(__dirname, 'accessories.html'),
        warranty: resolve(__dirname, 'warranty.html'),
        summary: resolve(__dirname, 'summary.html'),
        account: resolve(__dirname, 'account.html'),
        login: resolve(__dirname, 'login.html'),
        admin: resolve(__dirname, 'admin.html'),
        'admin-login': resolve(__dirname, 'admin-login.html'),
        'privacy-policy': resolve(__dirname, 'privacy-policy.html'),
        'terms-conditions': resolve(__dirname, 'terms-conditions.html')
      },
      output: {
        // Manual chunks for better caching
        manualChunks: (id) => {
          // Don't bundle Firebase (loaded via CDN)
          if (id.includes('firebase')) {
            return null;
          }

          // Large product data - lazy loadable
          if (id.includes('product-data.js')) {
            return 'product-data';
          }

          // Common utilities including loading skeletons
          if (id.includes('logger.js') || id.includes('ui.js') || id.includes('state-helper.js') || id.includes('config.js') || id.includes('loading-skeletons.js')) {
            return 'utils';
          }

          // Accessibility
          if (id.includes('accessibility.js')) {
            return 'accessibility';
          }

          // Analytics & monitoring
          if (id.includes('analytics.js') || id.includes('error-tracking.js') || id.includes('performance.js')) {
            return 'monitoring';
          }

          // Admin features
          if (id.includes('admin-') || id.includes('rbac.js') || id.includes('user-management.js')) {
            return 'admin';
          }

          // Default chunking
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
        // Asset file naming
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
      }
    },

    // Minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug'],
        passes: 2, // Multiple passes for better compression
        unsafe: true,
        unsafe_comps: true,
        unsafe_math: true,
        unsafe_methods: true
      },
      format: {
        comments: false
      },
      mangle: {
        safari10: true
      }
    },

    // Source maps (disable for production)
    sourcemap: false,

    // CSS code splitting
    cssCodeSplit: true,

    // Asset inlining threshold (4kb)
    assetsInlineLimit: 4096,

    // Report bundle size
    reportCompressedSize: true,

    // Chunk size warning limit
    chunkSizeWarningLimit: 500
  },

  // Server configuration (for development)
  server: {
    port: 3000,
    open: true,
    cors: true,
    hmr: {
      overlay: true
    }
  },

  // Preview server (for production build preview)
  preview: {
    port: 4173,
    open: true
  },

  // Optimizations
  optimizeDeps: {
    exclude: ['firebase'],
    include: []
  },

  // CSS preprocessing
  css: {
    devSourcemap: true,
    postcss: './postcss.config.cjs',
    preprocessorOptions: {
      // Add any preprocessor options here
    }
  },

  // Plugin configuration
  plugins: [
    // Plugin to copy js folder
    {
      name: 'copy-js-files',
      writeBundle() {
        const jsDir = resolve(__dirname, 'js');
        const distJsDir = resolve(__dirname, 'dist', 'js');

        if (!existsSync(distJsDir)) {
          mkdirSync(distJsDir, { recursive: true });
        }

        function copyRecursive(src, dest) {
          const entries = readdirSync(src, { withFileTypes: true });

          for (const entry of entries) {
            const srcPath = join(src, entry.name);
            const destPath = join(dest, entry.name);

            if (entry.isDirectory()) {
              if (!existsSync(destPath)) {
                mkdirSync(destPath, { recursive: true });
              }
              copyRecursive(srcPath, destPath);
            } else if (entry.name.endsWith('.js')) {
              copyFileSync(srcPath, destPath);
            }
          }
        }

        if (existsSync(jsDir)) {
          copyRecursive(jsDir, distJsDir);
          console.log('✅ Copied js folder to dist');
        }

        // Copy images folder
        const imagesDir = resolve(__dirname, 'images');
        const distImagesDir = resolve(__dirname, 'dist', 'images');
        if (existsSync(imagesDir)) {
          if (!existsSync(distImagesDir)) {
            mkdirSync(distImagesDir, { recursive: true });
          }
          copyRecursive(imagesDir, distImagesDir);
          console.log('✅ Copied images folder to dist');
        }

        // Copy other static files
        const staticFiles = ['manifest.json', 'robots.txt', 'sitemap.xml', 'sw.js'];
        staticFiles.forEach(file => {
          const srcFile = resolve(__dirname, file);
          const destFile = resolve(__dirname, 'dist', file);
          if (existsSync(srcFile)) {
            copyFileSync(srcFile, destFile);
            console.log(`✅ Copied ${file} to dist`);
          }
        });
      }
    }
  ],

  // Environment variables
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version || '1.0.0')
  }
});


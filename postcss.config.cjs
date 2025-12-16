/**
 * PostCSS Configuration
 * Removes unused CSS for production builds ONLY
 */

// Only enable PurgeCSS in production mode
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  plugins: isProduction ? [
    require('@fullhuman/postcss-purgecss')({
      // Content files to scan for used classes
      content: [
        './**/*.html',
        './js/**/*.js',
        './index.html',
        './quote.html',
        './assessment.html',
        './physical-condition.html',
        './functional-issues.html',
        './accessories.html',
        './warranty.html',
        './summary.html',
        './account.html',
        './login.html',
        './admin.html'
      ],

      // CSS files to purge
      css: [
        './css/**/*.css'
      ],

      // Extract class names using this pattern
      defaultExtractor: content => {
        // Match class names, IDs, and data attributes
        const matches = content.match(/[\w-/:]+(?<!:)/g) || [];
        return matches;
      },

      // Safelist - classes that should never be removed
      safelist: {
        standard: [
          // Dynamic classes
          'active',
          'hidden',
          'show',
          'hide',
          'fade',
          'visible',
          'selected',
          'disabled',
          'loading',
          'error',
          'success',
          'warning',

          // Animation classes
          'slide-in',
          'slide-out',
          'fade-in',
          'fade-out',

          // State classes
          'open',
          'closed',
          'expanded',
          'collapsed',

          // ARIA classes
          'sr-only',
          'skip-link',

          // Toast notification classes
          'toast',
          'toast-success',
          'toast-error',
          'toast-warning',
          'toast-info',

          // Loading skeleton classes
          'skeleton-card',
          'skeleton-image',
          'skeleton-text',
          'skeleton-pulse',
          'loading-spinner',
          'loading-overlay',
          'spinner-ring',
          'fade-in',

          // Progress indicator classes
          'progress-bar',
          'progress-step',
          'step-number',
          'step-label',
          'step-connector'
        ],

        // Safelist patterns (regex)
        deep: [
          /^fa-/,      // Font Awesome icons
          /^step-/,    // Step indicators
          /^grid-/,    // Grid classes
          /^card-/,    // Card variants
          /^btn-/,     // Button variants
          /^modal-/,   // Modal classes
          /^sidebar-/, // Sidebar classes
          /^nav-/,     // Navigation
          /^form-/,    // Form elements
          /^price-/,   // Price displays
          /^product-/, // Product cards
          /^pickup-/,  // Pickup related
          /^admin-/,   // Admin panel
          /^how-works/, // How It Works section
          /^hw-/,       // How It Works stats
          /^steps-/,    // Steps grid
          /^section-/,  // Section tags
          /^feature-/,  // Feature tags
          /^review-/,   // Reviews section
          /^faq-/,      // FAQ section
          /^skeleton-/, // Skeleton loaders
          /^loading-/,  // Loading states
          /^progress-/, // Progress indicators
          /^theme-/,    // Theme toggle
          /^ripple/,    // Ripple effects
          /^slide-/,    // Slide animations
          /^fade-/,     // Fade animations
          /^shake/,     // Shake animation
          /^tooltip/,   // Tooltips
          /^pwa-/,      // PWA install
          /^mobile-/,   // Mobile nav
          /^swipe-/,    // Swipe gestures
          /^pull-/,     // Pull refresh
          /^whatsapp-/, // WhatsApp widget
          /^price-lock/,// Price lock
          /^lock-/,     // Lock status
          /^share-/     // Share buttons
        ],

        // Greedy safelist (keep entire rules)
        greedy: [
          /data-step/,
          /:focus/,
          /:hover/,
          /:active/,
          /:disabled/,
          /:checked/
        ]
      },

      // Variables to keep
      variables: true,

      // Keyframes to keep
      keyframes: true,

      // Font faces to keep
      fontFace: true,

      // Reject specific patterns
      rejected: false // Set to true to see what's being removed
    })
  ] : []
};


/**
 * PostCSS Configuration
 * Removes unused CSS for production builds
 */

module.exports = {
  plugins: [
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
          'toast-info'
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
          /^admin-/    // Admin panel
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
  ]
};


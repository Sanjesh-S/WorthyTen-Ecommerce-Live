/**
 * Lazy Loading Enhancement
 * Adds lazy loading to images and iframes for better performance
 * @file js/lazy-loading.js
 */

(function () {
  'use strict';

  /**
   * Initialize lazy loading
   */
  function init() {
    // Check for native lazy loading support
    if ('loading' in HTMLImageElement.prototype) {
      // Browser supports native lazy loading
      addNativeLazyLoading();
    } else {
      // Fallback to Intersection Observer
      initIntersectionObserver();
    }

    // Add loading="lazy" to iframes
    addLazyLoadingToIframes();

    if (window.Logger) {
      window.Logger.log('✅ Lazy loading initialized');
    }
  }

  /**
   * Add native lazy loading to images
   */
  function addNativeLazyLoading() {
    const images = document.querySelectorAll('img:not([loading])');

    images.forEach(img => {
      // Skip images that should load immediately (above fold)
      if (isAboveFold(img)) {
        img.loading = 'eager';
      } else {
        img.loading = 'lazy';
      }
    });

    if (window.Logger) {
      window.Logger.log(`Added native lazy loading to ${images.length} images`);
    }
  }

  /**
   * Check if element is above the fold
   */
  function isAboveFold(element) {
    if (!element || typeof element.getBoundingClientRect !== 'function') {
      return false;
    }
    const rect = element.getBoundingClientRect();
    if (!rect) {
      return false;
    }

    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    return rect.top >= 0 && rect.top <= viewportHeight;
  }

  /**
   * Initialize Intersection Observer for older browsers
   */
  function initIntersectionObserver() {
    if (!('IntersectionObserver' in window)) {
      // Very old browser, load all images immediately
      loadAllImages();
      return;
    }

    const imageObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            loadImage(img);
            observer.unobserve(img);
          }
        });
      },
      {
        rootMargin: '50px' // Start loading 50px before image enters viewport
      }
    );

    // Observe all images with data-src attribute
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => {
      imageObserver.observe(img);
    });

    if (window.Logger) {
      window.Logger.log(`Observing ${lazyImages.length} images with Intersection Observer`);
    }
  }

  /**
   * Load a single image
   */
  function loadImage(img) {
    const src = img.dataset.src;
    const srcset = img.dataset.srcset;

    if (!src) {
      return;
    }

    // Create a new image to preload
    const tempImg = new Image();

    tempImg.onload = () => {
      img.src = src;
      if (srcset) {
        img.srcset = srcset;
      }
      img.classList.add('loaded');
      img.classList.remove('lazy');

      // Remove data attributes
      delete img.dataset.src;
      delete img.dataset.srcset;
    };

    tempImg.onerror = () => {
      if (window.Logger) {
        window.Logger.warn(`Failed to load image: ${src}`);
      }
      img.classList.add('error');
    };

    // Start loading
    tempImg.src = src;
  }

  /**
   * Load all images (fallback for very old browsers)
   */
  function loadAllImages() {
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(loadImage);
  }

  /**
   * Add lazy loading to iframes
   */
  function addLazyLoadingToIframes() {
    const iframes = document.querySelectorAll('iframe:not([loading])');

    iframes.forEach(iframe => {
      iframe.loading = 'lazy';
    });

    if (iframes.length > 0 && window.Logger) {
      window.Logger.log(`Added lazy loading to ${iframes.length} iframes`);
    }
  }

  /**
   * Add responsive image loading
   * Converts regular images to use srcset for different screen sizes
   */
  function enableResponsiveImages() {
    const images = document.querySelectorAll('img[data-responsive="true"]');

    images.forEach(img => {
      const baseSrc = img.dataset.src || img.src;
      if (!baseSrc) {
        return;
      }

      // Generate srcset for different sizes
      // Assumes images follow naming convention: image-300w.jpg, image-600w.jpg, etc.
      const srcset = generateSrcset(baseSrc);

      if (srcset) {
        img.srcset = srcset;
        img.sizes = '(max-width: 600px) 300px, (max-width: 1200px) 600px, 1200px';
      }
    });
  }

  /**
   * Generate srcset from base image URL
   */
  function generateSrcset(baseSrc) {
    // Extract filename and extension
    const match = baseSrc.match(/^(.+?)(\.[^.]+)$/);
    if (!match) {
      return null;
    }

    const [, base, ext] = match;

    // Generate URLs for different sizes
    const sizes = [300, 600, 900, 1200];
    const srcset = sizes.map(size => `${base}-${size}w${ext} ${size}w`).join(', ');

    return srcset;
  }

  /**
   * Preload critical images
   */
  function preloadCriticalImages() {
    const criticalImages = document.querySelectorAll('img[data-critical="true"]');

    criticalImages.forEach(img => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = img.dataset.src || img.src;

      document.head.appendChild(link);
    });

    if (criticalImages.length > 0 && window.Logger) {
      window.Logger.log(`Preloading ${criticalImages.length} critical images`);
    }
  }

  /**
   * Update all product images to use lazy loading
   */
  function updateProductImages() {
    // This function can be called dynamically when new products are loaded
    const productImages = document.querySelectorAll(
      '.product-image, .product-image-sidebar, .evaluating-image'
    );

    productImages.forEach(img => {
      if (!img.loading) {
        img.loading = 'lazy';
      }

      // Add decode="async" for better performance
      img.decode = 'async';
    });
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Re-run when new content is added (for SPAs or dynamic content)
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      mutation.addedNodes.forEach(node => {
        if (node.nodeName === 'IMG' && !node.loading) {
          if (isAboveFold(node)) {
            node.loading = 'eager';
          } else {
            node.loading = 'lazy';
          }
        }
      });
    });
  });

  // Observe body for new images
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  // Expose API
  window.LazyLoading = {
    init,
    updateProductImages,
    preloadCriticalImages,
    enableResponsiveImages
  };
})();

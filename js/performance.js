/**
 * Performance Monitoring and Optimization
 * Tracks Core Web Vitals and implements performance optimizations
 * @file js/performance.js
 */

(function() {
  'use strict';

  /**
   * Initialize lazy loading for images
   */
  function initLazyLoading() {
    // Use native lazy loading if supported
    if ('loading' in HTMLImageElement.prototype) {
      const images = document.querySelectorAll('img[data-src]');
      images.forEach(img => {
        img.src = img.dataset.src;
        img.loading = 'lazy';
        img.removeAttribute('data-src');
      });
    } else {
      // Fallback: Intersection Observer
      if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const img = entry.target;
              if (img.dataset.src) {
                img.src = img.dataset.src;
                img.classList.add('loaded');
                img.removeAttribute('data-src');
                observer.unobserve(img);
              }
            }
          });
        }, {
          rootMargin: '50px'
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
          imageObserver.observe(img);
        });
      }
    }
  }

  /**
   * Track Core Web Vitals
   */
  function trackWebVitals() {
    if (!('PerformanceObserver' in window)) return;

    const metrics = {};

    // Largest Contentful Paint (LCP)
    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        const lcp = lastEntry.renderTime || lastEntry.loadTime;
        
        metrics.lcp = lcp;
        
        if (window.Analytics) {
          window.Analytics.trackPerformance('LCP', lcp);
        }
        
        // Log to console in development
        if (window.Logger) {
          window.Logger.log(`LCP: ${lcp.toFixed(2)}ms`);
        }
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (e) {
      if (window.Logger) {
        window.Logger.warn('LCP observer error:', e);
      }
    }

    // First Input Delay (FID)
    try {
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach(entry => {
          const fid = entry.processingStart - entry.startTime;
          metrics.fid = fid;
          
          if (window.Analytics) {
            window.Analytics.trackPerformance('FID', fid);
          }
          
          if (window.Logger) {
            window.Logger.log(`FID: ${fid.toFixed(2)}ms`);
          }
        });
      });
      fidObserver.observe({ entryTypes: ['first-input'] });
    } catch (e) {
      if (window.Logger) {
        window.Logger.warn('FID observer error:', e);
      }
    }

    // Cumulative Layout Shift (CLS)
    try {
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach(entry => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
            metrics.cls = clsValue;
            
            if (window.Analytics) {
              window.Analytics.trackPerformance('CLS', clsValue);
            }
          }
        });
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
      
      // Report final CLS on page unload
      window.addEventListener('beforeunload', () => {
        if (window.Analytics && metrics.cls !== undefined) {
          window.Analytics.trackPerformance('CLS_Final', metrics.cls);
        }
      });
    } catch (e) {
      if (window.Logger) {
        window.Logger.warn('CLS observer error:', e);
      }
    }

    // First Contentful Paint (FCP)
    try {
      const fcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach(entry => {
          if (entry.name === 'first-contentful-paint') {
            const fcp = entry.startTime;
            metrics.fcp = fcp;
            
            if (window.Analytics) {
              window.Analytics.trackPerformance('FCP', fcp);
            }
            
            if (window.Logger) {
              window.Logger.log(`FCP: ${fcp.toFixed(2)}ms`);
            }
          }
        });
      });
      fcpObserver.observe({ entryTypes: ['paint'] });
    } catch (e) {
      if (window.Logger) {
        window.Logger.warn('FCP observer error:', e);
      }
    }

    // Time to Interactive (TTI) - approximate
    window.addEventListener('load', () => {
      setTimeout(() => {
        const perfData = window.performance.timing;
        const tti = perfData.domInteractive - perfData.navigationStart;
        
        if (window.Analytics) {
          window.Analytics.trackPerformance('TTI', tti);
        }
        
        if (window.Logger) {
          window.Logger.log(`TTI: ${tti}ms`);
        }
      }, 0);
    });
  }

  /**
   * Track page load performance
   */
  function trackPageLoad() {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const perfData = window.performance.timing;
        const metrics = {
          dns: perfData.domainLookupEnd - perfData.domainLookupStart,
          connect: perfData.connectEnd - perfData.connectStart,
          ttfb: perfData.responseStart - perfData.requestStart,
          download: perfData.responseEnd - perfData.responseStart,
          domProcessing: perfData.domComplete - perfData.domInteractive,
          load: perfData.loadEventEnd - perfData.navigationStart
        };

        if (window.Analytics) {
          Object.keys(metrics).forEach(key => {
            window.Analytics.trackPerformance(key, metrics[key]);
          });
        }

        if (window.Logger) {
          window.Logger.log('Page Load Metrics:', metrics);
        }
      }, 0);
    });
  }

  /**
   * Preload critical resources
   */
  function preloadCriticalResources() {
    // Preload critical fonts
    const criticalFonts = [
      'https://fonts.googleapis.com/css2?family=Urbanist:wght@400;500;600;700&display=swap'
    ];

    criticalFonts.forEach(href => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'style';
      link.href = href;
      document.head.appendChild(link);
    });
  }

  /**
   * Defer non-critical scripts
   */
  function deferNonCriticalScripts() {
    // Scripts that can be deferred are already marked with defer attribute
    // This function can be used to dynamically load scripts
  }

  /**
   * Optimize images
   */
  function optimizeImages() {
    // Add loading="lazy" to images that don't have it
    document.querySelectorAll('img:not([loading])').forEach(img => {
      // Don't lazy load images above the fold
      const rect = img.getBoundingClientRect();
      if (rect.top > window.innerHeight) {
        img.loading = 'lazy';
      }
    });
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initLazyLoading();
      optimizeImages();
      trackWebVitals();
      trackPageLoad();
    });
  } else {
    initLazyLoading();
    optimizeImages();
    trackWebVitals();
    trackPageLoad();
  }

  // Preload on page load
  window.addEventListener('load', preloadCriticalResources);

  // Expose globally
  window.Performance = {
    initLazyLoading,
    trackWebVitals,
    trackPageLoad,
    optimizeImages
  };

})();


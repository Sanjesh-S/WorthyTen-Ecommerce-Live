// js/analytics.js
// Analytics and error tracking utilities

(function () {
  'use strict';

  /**
   * Track page view
   * @param {string} pageName - Name of the page
   * @param {string} pagePath - Path of the page
   */
  function trackPageView(pageName, pagePath) {
    // Firebase Analytics
    if (window.firebaseAnalytics) {
      try {
        window.firebaseAnalytics.logEvent('page_view', {
          page_title: pageName,
          page_location: window.location.href,
          page_path: pagePath
        });
      } catch (e) {
        if (window.Logger) {
          window.Logger.warn('Analytics error:', e);
        }
      }
    }

    // Sentry (if configured)
    if (window.Sentry) {
      window.Sentry.setContext('page', {
        name: pageName,
        path: pagePath
      });
    }
  }

  /**
   * Track custom event
   * @param {string} eventName - Name of the event
   * @param {Object} eventParams - Event parameters
   */
  function trackEvent(eventName, eventParams = {}) {
    // Firebase Analytics
    if (window.firebaseAnalytics) {
      try {
        window.firebaseAnalytics.logEvent(eventName, eventParams);
      } catch (e) {
        if (window.Logger) {
          window.Logger.warn('Analytics error:', e);
        }
      }
    }

    // Sentry (if configured)
    if (window.Sentry && eventParams.error) {
      window.Sentry.captureException(new Error(eventParams.error));
    }
  }

  /**
   * Track user action
   * @param {string} action - Action name (e.g., 'button_click', 'form_submit')
   * @param {string} element - Element identifier
   * @param {Object} additionalData - Additional data
   */
  function trackUserAction(action, element, additionalData = {}) {
    trackEvent(action, {
      element: element,
      ...additionalData
    });
  }

  /**
   * Track error
   * @param {Error|string} error - Error object or message
   * @param {Object} context - Additional context
   */
  function trackError(error, context = {}) {
    const errorMessage = error instanceof Error ? error.message : error;
    const errorStack = error instanceof Error ? error.stack : undefined;

    // Log to console in development
    if (window.Logger) {
      window.Logger.error('Error tracked:', errorMessage, context);
    }

    // Firebase Analytics
    if (window.firebaseAnalytics) {
      try {
        window.firebaseAnalytics.logEvent('exception', {
          description: errorMessage,
          fatal: false,
          ...context
        });
      } catch (e) {
        if (window.Logger) {
          window.Logger.warn('Analytics error tracking failed:', e);
        }
      }
    }

    // Sentry (if configured)
    if (window.Sentry) {
      if (error instanceof Error) {
        window.Sentry.captureException(error, { contexts: { custom: context } });
      } else {
        window.Sentry.captureMessage(errorMessage, {
          level: 'error',
          contexts: { custom: context }
        });
      }
    }
  }

  /**
   * Track performance metric
   * @param {string} metricName - Name of the metric
   * @param {number} value - Metric value
   * @param {string} unit - Unit of measurement
   */
  function trackPerformance(metricName, value, unit = 'ms') {
    if (window.firebaseAnalytics) {
      try {
        window.firebaseAnalytics.logEvent('timing_complete', {
          name: metricName,
          value: Math.round(value),
          event_category: 'Performance'
        });
      } catch (e) {
        if (window.Logger) {
          window.Logger.warn('Performance tracking error:', e);
        }
      }
    }
  }

  // Expose globally
  window.Analytics = {
    trackPageView,
    trackEvent,
    trackUserAction,
    trackError,
    trackPerformance
  };

  // Auto-track page views
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      const pageName = document.title || 'Unknown Page';
      const pagePath = window.location.pathname;
      trackPageView(pageName, pagePath);
    });
  } else {
    const pageName = document.title || 'Unknown Page';
    const pagePath = window.location.pathname;
    trackPageView(pageName, pagePath);
  }

  // Track Core Web Vitals
  if ('PerformanceObserver' in window) {
    try {
      // Largest Contentful Paint (LCP)
      const lcpObserver = new PerformanceObserver(list => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        trackPerformance('LCP', lastEntry.renderTime || lastEntry.loadTime);
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

      // First Input Delay (FID)
      const fidObserver = new PerformanceObserver(list => {
        const entries = list.getEntries();
        entries.forEach(entry => {
          trackPerformance('FID', entry.processingStart - entry.startTime);
        });
      });
      fidObserver.observe({ entryTypes: ['first-input'] });

      // Cumulative Layout Shift (CLS)
      let clsValue = 0;
      const clsObserver = new PerformanceObserver(list => {
        const entries = list.getEntries();
        entries.forEach(entry => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });
        trackPerformance('CLS', clsValue);
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    } catch (e) {
      if (window.Logger) {
        window.Logger.warn('Performance observer error:', e);
      }
    }
  }

  // Global error handler
  window.addEventListener('error', event => {
    trackError(event.error || event.message, {
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno
    });
  });

  // Unhandled promise rejection handler
  window.addEventListener('unhandledrejection', event => {
    trackError(event.reason, {
      type: 'unhandled_promise_rejection'
    });
  });
})();

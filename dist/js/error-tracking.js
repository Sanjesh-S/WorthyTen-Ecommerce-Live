/**
 * Error Tracking with Sentry
 * Comprehensive error tracking and monitoring
 * @file js/error-tracking.js
 */

(function() {
  'use strict';

  // Sentry DSN - Replace with your actual DSN from Sentry dashboard
  // Get it from: https://sentry.io/settings/YOUR_ORG/projects/YOUR_PROJECT/keys/
  const SENTRY_DSN = window.Config?.sentry?.dsn || '';
  const SENTRY_ENABLED = SENTRY_DSN && window.location.hostname !== 'localhost' && !window.location.hostname.includes('127.0.0.1');

  /**
   * Initialize Sentry
   */
  function initSentry() {
    if (!SENTRY_ENABLED) {
      if (window.Logger) {
        window.Logger.log('Sentry disabled (development mode or no DSN)');
      }
      return;
    }

    // Load Sentry SDK dynamically
    const script = document.createElement('script');
    script.src = 'https://browser.sentry-cdn.com/7.81.1/bundle.min.js';
    script.integrity = 'sha384-+0nLgUXzKdrQS02A8e8v5ZRb3i4oJgFLTvq7YlB7gYqF6Q6RlczFhDB0E1nRocD';
    script.crossOrigin = 'anonymous';
    
    script.onload = () => {
      if (window.Sentry) {
        window.Sentry.init({
          dsn: SENTRY_DSN,
          environment: getEnvironment(),
          release: getRelease(),
          tracesSampleRate: 0.1, // 10% of transactions for performance monitoring
          replaysSessionSampleRate: 0.1, // 10% of sessions for session replay
          replaysOnErrorSampleRate: 1.0, // 100% of sessions with errors
          
          // Filter out known non-critical errors
          ignoreErrors: [
            'ResizeObserver loop limit exceeded',
            'Non-Error promise rejection captured',
            'NetworkError',
            'Failed to fetch'
          ],
          
          // Filter out browser extensions
          beforeSend(event, hint) {
            // Don't send errors from browser extensions
            if (event.exception) {
              const error = hint.originalException || hint.syntheticException;
              if (error && error.message) {
                const message = error.message.toLowerCase();
                if (message.includes('extension') || 
                    message.includes('moz-extension') || 
                    message.includes('chrome-extension') ||
                    message.includes('safari-extension')) {
                  return null;
                }
              }
            }
            return event;
          },
          
          // Add user context
          initialScope: {
            tags: {
              component: 'frontend',
              platform: 'web'
            }
          }
        });

        // Set user context when available
        if (window.firebase && window.firebase.auth) {
          window.firebase.auth().onAuthStateChanged((user) => {
            if (user) {
              window.Sentry.setUser({
                id: user.uid,
                email: user.email,
                phone: user.phoneNumber
              });
            } else {
              window.Sentry.setUser(null);
            }
          });
        }

        // Add breadcrumbs for user actions
        addBreadcrumbs();

        if (window.Logger) {
          window.Logger.log('✅ Sentry initialized');
        }
      }
    };
    
    script.onerror = () => {
      if (window.Logger) {
        window.Logger.warn('Failed to load Sentry SDK');
      }
    };
    
    document.head.appendChild(script);
  }

  /**
   * Get current environment
   */
  function getEnvironment() {
    const hostname = window.location.hostname;
    if (hostname === 'localhost' || hostname.includes('127.0.0.1')) {
      return 'development';
    }
    if (hostname.includes('dev') || hostname.includes('staging')) {
      return 'staging';
    }
    return 'production';
  }

  /**
   * Get release version
   */
  function getRelease() {
    // Can be set via meta tag or config
    const metaRelease = document.querySelector('meta[name="app-version"]');
    if (metaRelease) {
      return metaRelease.content;
    }
    return window.Config?.version || 'unknown';
  }

  /**
   * Add breadcrumbs for user actions
   */
  function addBreadcrumbs() {
    if (!window.Sentry) return;

    // Track clicks
    document.addEventListener('click', (e) => {
      const target = e.target;
      if (target.tagName === 'BUTTON' || target.tagName === 'A' || target.closest('button, a')) {
        const text = target.textContent?.trim() || target.getAttribute('aria-label') || 'Unknown';
        window.Sentry.addBreadcrumb({
          category: 'ui.click',
          message: `Clicked: ${text}`,
          level: 'info',
          data: {
            tag: target.tagName,
            id: target.id,
            className: target.className
          }
        });
      }
    }, true);

    // Track form submissions
    document.addEventListener('submit', (e) => {
      window.Sentry.addBreadcrumb({
        category: 'ui.form',
        message: 'Form submitted',
        level: 'info',
        data: {
          formId: e.target.id,
          formAction: e.target.action
        }
      });
    }, true);

    // Track navigation
    let lastUrl = window.location.href;
    new MutationObserver(() => {
      const url = window.location.href;
      if (url !== lastUrl) {
        window.Sentry.addBreadcrumb({
          category: 'navigation',
          message: `Navigated to ${url}`,
          level: 'info',
          data: {
            from: lastUrl,
            to: url
          }
        });
        lastUrl = url;
      }
    }).observe(document, { subtree: true, childList: true });
  }

  /**
   * Capture exception manually
   */
  function captureException(error, context = {}) {
    if (window.Sentry) {
      window.Sentry.captureException(error, {
        contexts: {
          custom: context
        }
      });
    }
    
    // Also log to Analytics
    if (window.Analytics) {
      window.Analytics.trackError(error, context);
    }
  }

  /**
   * Capture message manually
   */
  function captureMessage(message, level = 'info', context = {}) {
    if (window.Sentry) {
      window.Sentry.captureMessage(message, {
        level: level,
        contexts: {
          custom: context
        }
      });
    }
  }

  /**
   * Set user context
   */
  function setUser(user) {
    if (window.Sentry) {
      window.Sentry.setUser(user);
    }
  }

  /**
   * Set context/tags
   */
  function setContext(name, context) {
    if (window.Sentry) {
      window.Sentry.setContext(name, context);
    }
  }

  /**
   * Add breadcrumb manually
   */
  function addBreadcrumb(breadcrumb) {
    if (window.Sentry) {
      window.Sentry.addBreadcrumb(breadcrumb);
    }
  }

  // Initialize on load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSentry);
  } else {
    initSentry();
  }

  // Expose globally
  window.ErrorTracking = {
    captureException,
    captureMessage,
    setUser,
    setContext,
    addBreadcrumb
  };

})();


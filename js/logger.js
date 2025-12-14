// js/logger.js
// Centralized logging utility - only logs in development mode

(function () {
  'use strict';

  // Check if we're in development mode
  // In production, set this to false or remove the script
  const isDevelopment =
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1' ||
    window.location.hostname.includes('dev') ||
    window.location.search.includes('debug=true');

  const Logger = {
    log: function (...args) {
      if (isDevelopment) {
        console.log(...args);
      }
    },

    error: function (...args) {
      // Always log errors, but could send to error tracking service
      if (isDevelopment) {
        console.error(...args);
      }
      // In production, send to error tracking service (Sentry, etc.)
      // if (window.Sentry) window.Sentry.captureException(new Error(args.join(' ')));
    },

    warn: function (...args) {
      if (isDevelopment) {
        console.warn(...args);
      }
    },

    info: function (...args) {
      if (isDevelopment) {
        console.info(...args);
      }
    },

    debug: function (...args) {
      if (isDevelopment) {
        console.debug(...args);
      }
    }
  };

  // Expose globally
  window.Logger = Logger;
})();

/**
 * Rate Limiter
 * Client-side rate limiting to prevent API abuse
 * @file js/rate-limiter.js
 */

(function () {
    'use strict';

    // Rate limit configuration
    const CONFIG = {
        // Default: 10 requests per minute
        default: { maxRequests: 10, windowMs: 60000 },
        // Quote requests: 5 per minute (prevent price scraping)
        quote: { maxRequests: 5, windowMs: 60000 },
        // Auth attempts: 5 per 5 minutes
        auth: { maxRequests: 5, windowMs: 300000 },
        // Search: 20 per minute
        search: { maxRequests: 20, windowMs: 60000 }
    };

    // Request history storage
    const requestHistory = new Map();

    /**
     * Check if request is allowed
     * @param {string} key - Unique identifier for the rate limit
     * @param {string} type - Type of rate limit (default, quote, auth, search)
     * @returns {Object} { allowed: boolean, remaining: number, resetIn: number }
     */
    function checkLimit(key, type = 'default') {
        const config = CONFIG[type] || CONFIG.default;
        const now = Date.now();
        const windowStart = now - config.windowMs;

        // Get or initialize history for this key
        let history = requestHistory.get(key) || [];

        // Filter out old requests
        history = history.filter(timestamp => timestamp > windowStart);

        // Check if limit exceeded
        const allowed = history.length < config.maxRequests;
        const remaining = Math.max(0, config.maxRequests - history.length);
        const resetIn = history.length > 0
            ? Math.max(0, history[0] + config.windowMs - now)
            : 0;

        if (allowed) {
            // Add new request timestamp
            history.push(now);
            requestHistory.set(key, history);
        }

        return { allowed, remaining, resetIn };
    }

    /**
     * Throttle a function with rate limiting
     * @param {Function} fn - Function to throttle
     * @param {string} key - Rate limit key
     * @param {string} type - Rate limit type
     * @returns {Function} Throttled function
     */
    function throttle(fn, key, type = 'default') {
        return async function (...args) {
            const result = checkLimit(key, type);

            if (!result.allowed) {
                const error = new Error('Rate limit exceeded');
                error.code = 'RATE_LIMITED';
                error.resetIn = result.resetIn;
                throw error;
            }

            return fn.apply(this, args);
        };
    }

    /**
     * Create a debounced version with rate limiting
     * @param {Function} fn - Function to debounce
     * @param {number} delay - Debounce delay in ms
     * @param {string} key - Rate limit key
     * @param {string} type - Rate limit type
     * @returns {Function} Debounced and rate-limited function
     */
    function debounceWithLimit(fn, delay = 300, key, type = 'default') {
        let timeoutId = null;

        return function (...args) {
            clearTimeout(timeoutId);

            timeoutId = setTimeout(() => {
                const result = checkLimit(key, type);
                if (result.allowed) {
                    fn.apply(this, args);
                } else {
                    console.warn(`[RateLimiter] Request blocked. Reset in ${Math.ceil(result.resetIn / 1000)}s`);
                }
            }, delay);
        };
    }

    /**
     * Clear rate limit history for a key
     * @param {string} key - Rate limit key to clear
     */
    function clearLimit(key) {
        requestHistory.delete(key);
    }

    /**
     * Clear all rate limit history
     */
    function clearAll() {
        requestHistory.clear();
    }

    /**
     * Get current usage for a key
     * @param {string} key - Rate limit key
     * @param {string} type - Rate limit type
     * @returns {Object} Usage stats
     */
    function getUsage(key, type = 'default') {
        const config = CONFIG[type] || CONFIG.default;
        const now = Date.now();
        const windowStart = now - config.windowMs;

        let history = requestHistory.get(key) || [];
        history = history.filter(timestamp => timestamp > windowStart);

        return {
            used: history.length,
            limit: config.maxRequests,
            remaining: config.maxRequests - history.length,
            windowMs: config.windowMs
        };
    }

    // Export for use
    window.RateLimiter = {
        check: checkLimit,
        throttle,
        debounceWithLimit,
        clear: clearLimit,
        clearAll,
        getUsage,
        CONFIG
    };
})();

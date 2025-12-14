/**
 * Security Utilities for WorthyTen
 * Provides rate limiting, input sanitization, and security helpers
 * @file js/security.js
 */

// ===== RATE LIMITING =====

/**
 * Rate limiter to prevent abuse of API calls
 * Uses a sliding window approach
 */
class RateLimiter {
    constructor(maxRequests = 10, windowMs = 60000) {
        this.maxRequests = maxRequests;
        this.windowMs = windowMs;
        this.requests = {};
    }

    /**
     * Check if a request is allowed for the given key
     * @param {string} key - Unique identifier (e.g., 'login', 'quote', 'pickup')
     * @returns {boolean} - Whether the request is allowed
     */
    isAllowed(key) {
        const now = Date.now();
        const windowStart = now - this.windowMs;

        // Initialize or clean up old requests
        if (!this.requests[key]) {
            this.requests[key] = [];
        }

        // Remove requests outside the current window
        this.requests[key] = this.requests[key].filter(time => time > windowStart);

        // Check if under limit
        if (this.requests[key].length < this.maxRequests) {
            this.requests[key].push(now);
            return true;
        }

        return false;
    }

    /**
     * Get remaining attempts for a key
     * @param {string} key - Unique identifier
     * @returns {number} - Remaining allowed requests
     */
    getRemainingAttempts(key) {
        if (!this.requests[key]) return this.maxRequests;

        const now = Date.now();
        const windowStart = now - this.windowMs;
        const validRequests = this.requests[key].filter(time => time > windowStart);

        return Math.max(0, this.maxRequests - validRequests.length);
    }

    /**
     * Get time until rate limit resets
     * @param {string} key - Unique identifier
     * @returns {number} - Milliseconds until reset
     */
    getResetTime(key) {
        if (!this.requests[key] || this.requests[key].length === 0) return 0;

        const oldestRequest = Math.min(...this.requests[key]);
        const resetTime = oldestRequest + this.windowMs - Date.now();

        return Math.max(0, resetTime);
    }

    /**
     * Reset rate limit for a key
     * @param {string} key - Unique identifier
     */
    reset(key) {
        delete this.requests[key];
    }
}

// Create global rate limiters for different actions
window.rateLimiters = {
    login: new RateLimiter(5, 60000),      // 5 login attempts per minute
    otp: new RateLimiter(3, 120000),       // 3 OTP requests per 2 minutes
    quote: new RateLimiter(30, 60000),     // 30 quote requests per minute
    pickup: new RateLimiter(5, 300000),    // 5 pickup requests per 5 minutes
    search: new RateLimiter(20, 60000),    // 20 searches per minute
};

// ===== INPUT SANITIZATION =====

/**
 * Comprehensive input sanitization utilities
 */
const Sanitizer = {
    /**
     * Escape HTML special characters to prevent XSS
     * @param {string} str - Input string
     * @returns {string} - Escaped string
     */
    escapeHtml(str) {
        if (typeof str !== 'string') return '';

        const htmlEntities = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;',
            '/': '&#x2F;',
            '`': '&#x60;',
            '=': '&#x3D;'
        };

        return str.replace(/[&<>"'`=\/]/g, char => htmlEntities[char]);
    },

    /**
     * Sanitize phone number input
     * @param {string} phone - Phone number string
     * @returns {string} - Cleaned phone number (digits only)
     */
    sanitizePhone(phone) {
        if (typeof phone !== 'string') return '';
        return phone.replace(/[^\d+]/g, '').slice(0, 15);
    },

    /**
     * Sanitize email input
     * @param {string} email - Email string
     * @returns {string} - Trimmed and lowercased email
     */
    sanitizeEmail(email) {
        if (typeof email !== 'string') return '';
        return email.trim().toLowerCase().slice(0, 254);
    },

    /**
     * Sanitize name input (allow letters, spaces, hyphens)
     * @param {string} name - Name string
     * @returns {string} - Cleaned name
     */
    sanitizeName(name) {
        if (typeof name !== 'string') return '';
        return name.replace(/[^a-zA-Z\s\-'\.]/g, '').trim().slice(0, 100);
    },

    /**
     * Sanitize address input
     * @param {string} address - Address string
     * @returns {string} - Cleaned address
     */
    sanitizeAddress(address) {
        if (typeof address !== 'string') return '';
        // Allow alphanumeric, common punctuation, and whitespace
        return address.replace(/[^\w\s,.\-#\/]/g, '').trim().slice(0, 500);
    },

    /**
     * Validate and sanitize URL
     * @param {string} url - URL string
     * @returns {string|null} - Valid URL or null
     */
    sanitizeUrl(url) {
        if (typeof url !== 'string') return null;

        try {
            const parsed = new URL(url);
            // Only allow http and https protocols
            if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
                return null;
            }
            return parsed.href;
        } catch {
            return null;
        }
    },

    /**
     * Remove potential script injection attempts
     * @param {string} str - Input string
     * @returns {string} - Cleaned string
     */
    stripScripts(str) {
        if (typeof str !== 'string') return '';

        return str
            .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
            .replace(/on\w+\s*=/gi, '')
            .replace(/javascript:/gi, '')
            .replace(/data:/gi, '');
    }
};

// Make Sanitizer available globally
window.Sanitizer = Sanitizer;

// ===== SECURITY VALIDATION =====

/**
 * Security validation helpers
 */
const SecurityValidator = {
    /**
     * Validate phone number format (Indian mobile)
     * @param {string} phone - Phone number
     * @returns {boolean} - Whether valid
     */
    isValidIndianPhone(phone) {
        const cleaned = Sanitizer.sanitizePhone(phone);
        // Indian mobile: 10 digits starting with 6-9, or +91 prefix
        return /^(\+91)?[6-9]\d{9}$/.test(cleaned);
    },

    /**
     * Validate email format
     * @param {string} email - Email address
     * @returns {boolean} - Whether valid
     */
    isValidEmail(email) {
        const cleaned = Sanitizer.sanitizeEmail(email);
        // Basic email regex
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleaned);
    },

    /**
     * Validate OTP format (6 digits)
     * @param {string} otp - OTP code
     * @returns {boolean} - Whether valid
     */
    isValidOtp(otp) {
        return /^\d{6}$/.test(otp);
    },

    /**
     * Check if input length is within bounds
     * @param {string} input - Input string
     * @param {number} min - Minimum length
     * @param {number} max - Maximum length
     * @returns {boolean} - Whether valid
     */
    isValidLength(input, min, max) {
        if (typeof input !== 'string') return false;
        return input.length >= min && input.length <= max;
    },

    /**
     * Detect potential injection attempts
     * @param {string} input - Input string
     * @returns {boolean} - Whether suspicious
     */
    hasSuspiciousPatterns(input) {
        if (typeof input !== 'string') return false;

        const suspiciousPatterns = [
            /<script/i,
            /javascript:/i,
            /on\w+=/i,
            /data:text\/html/i,
            /eval\s*\(/i,
            /document\.(cookie|location|write)/i,
            /window\.(location|open)/i,
            /__proto__/i,
            /constructor\s*\[/i
        ];

        return suspiciousPatterns.some(pattern => pattern.test(input));
    }
};

// Make SecurityValidator available globally
window.SecurityValidator = SecurityValidator;

// ===== CSRF PROTECTION =====

/**
 * Simple CSRF token management for form submissions
 */
const CSRFProtection = {
    tokenKey: 'worthyten_csrf_token',

    /**
     * Generate a new CSRF token
     * @returns {string} - New token
     */
    generateToken() {
        const array = new Uint8Array(32);
        crypto.getRandomValues(array);
        const token = Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
        sessionStorage.setItem(this.tokenKey, token);
        return token;
    },

    /**
     * Get current token or generate new one
     * @returns {string} - Current token
     */
    getToken() {
        let token = sessionStorage.getItem(this.tokenKey);
        if (!token) {
            token = this.generateToken();
        }
        return token;
    },

    /**
     * Validate a token
     * @param {string} token - Token to validate
     * @returns {boolean} - Whether valid
     */
    validateToken(token) {
        const storedToken = sessionStorage.getItem(this.tokenKey);
        return storedToken && token === storedToken;
    },

    /**
     * Refresh the token (call after successful form submission)
     */
    refreshToken() {
        this.generateToken();
    }
};

// Make CSRFProtection available globally
window.CSRFProtection = CSRFProtection;

// ===== LOGGING FOR SECURITY EVENTS =====

/**
 * Log security-related events
 */
const SecurityLogger = {
    /**
     * Log a security event
     * @param {string} type - Event type
     * @param {object} details - Event details
     */
    log(type, details = {}) {
        const event = {
            type,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            url: window.location.href,
            ...details
        };

        // Log to console in development
        if (window.location.hostname === 'localhost') {
            console.warn('[Security]', type, event);
        }

        // Could send to analytics or security monitoring service
        if (window.Logger && typeof window.Logger.warn === 'function') {
            window.Logger.warn(`Security Event: ${type}`, event);
        }
    },

    /**
     * Log rate limit violation
     * @param {string} action - The rate-limited action
     */
    logRateLimitViolation(action) {
        this.log('RATE_LIMIT_EXCEEDED', { action });
    },

    /**
     * Log suspicious input
     * @param {string} field - Field name
     * @param {string} input - The suspicious input
     */
    logSuspiciousInput(field, input) {
        this.log('SUSPICIOUS_INPUT', {
            field,
            inputLength: input?.length,
            // Don't log actual malicious content
            preview: input?.substring(0, 50)
        });
    },

    /**
     * Log authentication failure
     * @param {string} reason - Failure reason
     */
    logAuthFailure(reason) {
        this.log('AUTH_FAILURE', { reason });
    }
};

// Make SecurityLogger available globally
window.SecurityLogger = SecurityLogger;

// ===== INITIALIZE =====

// Generate CSRF token on page load
document.addEventListener('DOMContentLoaded', () => {
    CSRFProtection.getToken();

    if (window.Logger) {
        window.Logger.log('Security utilities initialized');
    }
});

// Log when this module loads
console.log('🔒 WorthyTen Security utilities loaded');

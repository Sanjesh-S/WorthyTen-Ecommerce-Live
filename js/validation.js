/**
 * Input Validation Utilities
 * Comprehensive client-side validation for forms
 * @file js/validation.js
 */

(function () {
    'use strict';

    // Validation patterns
    const PATTERNS = {
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        phone: /^[6-9]\d{9}$/,  // Indian mobile numbers
        pincode: /^\d{6}$/,     // Indian pincodes
        name: /^[a-zA-Z\s]{2,50}$/,
        alphanumeric: /^[a-zA-Z0-9\s]+$/,
        url: /^https?:\/\/.+/,
        noHtml: /^[^<>]*$/
    };

    // Error messages
    const MESSAGES = {
        required: 'This field is required',
        email: 'Please enter a valid email address',
        phone: 'Please enter a valid 10-digit mobile number',
        pincode: 'Please enter a valid 6-digit pincode',
        name: 'Please enter a valid name (2-50 letters)',
        minLength: (min) => `Must be at least ${min} characters`,
        maxLength: (max) => `Must be no more than ${max} characters`,
        pattern: 'Invalid format',
        noHtml: 'HTML tags are not allowed',
        number: 'Please enter a valid number',
        min: (min) => `Value must be at least ${min}`,
        max: (max) => `Value must be no more than ${max}`
    };

    /**
     * Sanitize input to prevent XSS
     * @param {string} input - User input
     * @returns {string} Sanitized input
     */
    function sanitize(input) {
        if (typeof input !== 'string') return input;
        return input
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#x27;')
            .replace(/\//g, '&#x2F;')
            .trim();
    }

    /**
     * Validate a single field
     * @param {string} value - Field value
     * @param {Object} rules - Validation rules
     * @returns {Object} { valid: boolean, error: string|null }
     */
    function validateField(value, rules) {
        const trimmedValue = typeof value === 'string' ? value.trim() : value;

        // Required check
        if (rules.required && (!trimmedValue || trimmedValue === '')) {
            return { valid: false, error: MESSAGES.required };
        }

        // Skip other validations if empty and not required
        if (!trimmedValue && !rules.required) {
            return { valid: true, error: null };
        }

        // Type-specific validations
        if (rules.type === 'email' && !PATTERNS.email.test(trimmedValue)) {
            return { valid: false, error: MESSAGES.email };
        }

        if (rules.type === 'phone' && !PATTERNS.phone.test(trimmedValue)) {
            return { valid: false, error: MESSAGES.phone };
        }

        if (rules.type === 'pincode' && !PATTERNS.pincode.test(trimmedValue)) {
            return { valid: false, error: MESSAGES.pincode };
        }

        if (rules.type === 'name' && !PATTERNS.name.test(trimmedValue)) {
            return { valid: false, error: MESSAGES.name };
        }

        if (rules.type === 'number') {
            const num = parseFloat(trimmedValue);
            if (isNaN(num)) {
                return { valid: false, error: MESSAGES.number };
            }
            if (rules.min !== undefined && num < rules.min) {
                return { valid: false, error: MESSAGES.min(rules.min) };
            }
            if (rules.max !== undefined && num > rules.max) {
                return { valid: false, error: MESSAGES.max(rules.max) };
            }
        }

        // Length validations
        if (rules.minLength && trimmedValue.length < rules.minLength) {
            return { valid: false, error: MESSAGES.minLength(rules.minLength) };
        }

        if (rules.maxLength && trimmedValue.length > rules.maxLength) {
            return { valid: false, error: MESSAGES.maxLength(rules.maxLength) };
        }

        // Custom pattern
        if (rules.pattern && !rules.pattern.test(trimmedValue)) {
            return { valid: false, error: rules.message || MESSAGES.pattern };
        }

        // No HTML allowed by default
        if (rules.noHtml !== false && !PATTERNS.noHtml.test(trimmedValue)) {
            return { valid: false, error: MESSAGES.noHtml };
        }

        // Custom validator
        if (rules.custom && typeof rules.custom === 'function') {
            const customResult = rules.custom(trimmedValue);
            if (customResult !== true) {
                return { valid: false, error: customResult || 'Invalid value' };
            }
        }

        return { valid: true, error: null };
    }

    /**
     * Validate a form object
     * @param {Object} data - Form data object
     * @param {Object} schema - Validation schema
     * @returns {Object} { valid: boolean, errors: Object }
     */
    function validateForm(data, schema) {
        const errors = {};
        let valid = true;

        for (const [field, rules] of Object.entries(schema)) {
            const result = validateField(data[field], rules);
            if (!result.valid) {
                valid = false;
                errors[field] = result.error;
            }
        }

        return { valid, errors };
    }

    /**
     * Add real-time validation to a form
     * @param {HTMLFormElement} form - Form element
     * @param {Object} schema - Validation schema
     * @param {Object} options - Options
     */
    function attachValidation(form, schema, options = {}) {
        const { onError, onValid, validateOn = 'blur' } = options;

        for (const [fieldName, rules] of Object.entries(schema)) {
            const field = form.elements[fieldName];
            if (!field) continue;

            field.addEventListener(validateOn, () => {
                const result = validateField(field.value, rules);

                // Remove existing error
                const existingError = field.parentElement.querySelector('.validation-error');
                if (existingError) existingError.remove();
                field.classList.remove('invalid', 'valid');

                if (!result.valid) {
                    field.classList.add('invalid');
                    const errorEl = document.createElement('span');
                    errorEl.className = 'validation-error';
                    errorEl.textContent = result.error;
                    field.parentElement.appendChild(errorEl);
                    if (onError) onError(fieldName, result.error);
                } else {
                    field.classList.add('valid');
                    if (onValid) onValid(fieldName);
                }
            });
        }

        // Form submit validation
        form.addEventListener('submit', (e) => {
            const formData = Object.fromEntries(new FormData(form));
            const result = validateForm(formData, schema);

            if (!result.valid) {
                e.preventDefault();
                // Focus first invalid field
                const firstError = Object.keys(result.errors)[0];
                if (firstError && form.elements[firstError]) {
                    form.elements[firstError].focus();
                }
            }
        });
    }

    /**
     * Common schemas for reuse
     */
    const SCHEMAS = {
        contact: {
            name: { required: true, type: 'name' },
            email: { required: true, type: 'email' },
            phone: { required: true, type: 'phone' }
        },
        address: {
            street: { required: true, minLength: 5, maxLength: 200 },
            city: { required: true, minLength: 2, maxLength: 50 },
            state: { required: true, minLength: 2, maxLength: 50 },
            pincode: { required: true, type: 'pincode' }
        },
        login: {
            email: { required: true, type: 'email' },
            password: { required: true, minLength: 6 }
        }
    };

    // Export
    window.Validation = {
        validate: validateField,
        validateForm,
        attach: attachValidation,
        sanitize,
        PATTERNS,
        MESSAGES,
        SCHEMAS
    };
})();

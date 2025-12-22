/**
 * Theme Toggle Module
 * Dark mode disabled - always uses light theme
 * @file js/theme-toggle.js
 */

(function () {
    'use strict';

    const STORAGE_KEY = 'worthyten-theme';
    const LIGHT = 'light';

    // Apply light theme only
    function applyTheme() {
        document.documentElement.setAttribute('data-theme', LIGHT);
        localStorage.setItem(STORAGE_KEY, LIGHT);

        // Update meta theme-color
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor) {
            metaThemeColor.setAttribute('content', '#1b4c87');
        }
    }

    // Initialize - always apply light theme, no toggle button
    function init() {
        applyTheme();
        // Toggle button removed - light mode only
    }

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Export for external use (backward compatibility)
    window.ThemeToggle = {
        toggle: () => { }, // No-op, dark mode disabled
        setTheme: applyTheme,
        getTheme: () => LIGHT
    };
})();


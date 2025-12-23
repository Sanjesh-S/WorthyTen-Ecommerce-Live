/**
 * Theme Toggle Module
 * Dark mode disabled - always uses light theme
 * IMPORTANT: This script sets light theme immediately to prevent dark flash
 * @file js/theme-toggle.js
 */

// Set light theme IMMEDIATELY (before any other code runs)
document.documentElement.setAttribute('data-theme', 'light');
document.documentElement.style.backgroundColor = '#ffffff';
document.documentElement.style.colorScheme = 'light';

(function () {
    'use strict';

    const STORAGE_KEY = 'worthyten-theme';
    const LIGHT = 'light';

    // Apply light theme only
    function applyTheme() {
        document.documentElement.setAttribute('data-theme', LIGHT);
        document.documentElement.style.backgroundColor = '#ffffff';
        document.documentElement.style.colorScheme = 'light';
        localStorage.setItem(STORAGE_KEY, LIGHT);

        // Update meta theme-color
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor) {
            metaThemeColor.setAttribute('content', '#1b4c87');
        }
        
        // Also set body background
        if (document.body) {
            document.body.style.backgroundColor = '#ffffff';
        }
    }

    // Initialize - always apply light theme, no toggle button
    function init() {
        applyTheme();
    }

    // Run immediately and also on DOM ready
    applyTheme();
    
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

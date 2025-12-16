/**
 * Theme Toggle Module
 * Handles dark/light mode switching with localStorage persistence
 * @file js/theme-toggle.js
 */

(function () {
    'use strict';

    const STORAGE_KEY = 'worthyten-theme';
    const DARK = 'dark';
    const LIGHT = 'light';

    // Get initial theme from localStorage or system preference
    function getInitialTheme() {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) return stored;

        // Check system preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return DARK;
        }
        return LIGHT;
    }

    // Apply theme to document
    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem(STORAGE_KEY, theme);

        // Update meta theme-color
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor) {
            metaThemeColor.setAttribute('content', theme === DARK ? '#0a0a0a' : '#1b4c87');
        }
    }

    // Toggle between themes
    function toggleTheme() {
        const current = document.documentElement.getAttribute('data-theme') || LIGHT;
        const next = current === DARK ? LIGHT : DARK;
        applyTheme(next);
    }

    // Create toggle button
    function createToggleButton() {
        const button = document.createElement('button');
        button.className = 'theme-toggle';
        button.setAttribute('aria-label', 'Toggle dark mode');
        button.setAttribute('title', 'Toggle dark/light mode');
        button.innerHTML = `
      <i class="fa-solid fa-moon"></i>
      <i class="fa-solid fa-sun"></i>
    `;
        button.addEventListener('click', toggleTheme);
        document.body.appendChild(button);
    }

    // Listen for system preference changes
    function watchSystemPreference() {
        if (!window.matchMedia) return;

        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            // Only auto-switch if user hasn't manually set a preference
            if (!localStorage.getItem(STORAGE_KEY)) {
                applyTheme(e.matches ? DARK : LIGHT);
            }
        });
    }

    // Initialize
    function init() {
        applyTheme(getInitialTheme());
        createToggleButton();
        watchSystemPreference();
    }

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Export for external use
    window.ThemeToggle = {
        toggle: toggleTheme,
        setTheme: applyTheme,
        getTheme: () => document.documentElement.getAttribute('data-theme') || LIGHT
    };
})();

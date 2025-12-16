/**
 * PWA Install Prompt
 * Handles custom install prompt and app installation
 * @file js/pwa-install.js
 */

(function () {
    'use strict';

    let deferredPrompt = null;
    let installButton = null;

    // Check if app is already installed
    function isAppInstalled() {
        return window.matchMedia('(display-mode: standalone)').matches ||
            window.navigator.standalone === true;
    }

    // Create install button
    function createInstallButton() {
        if (installButton || isAppInstalled()) return;

        installButton = document.createElement('button');
        installButton.className = 'pwa-install-btn';
        installButton.setAttribute('aria-label', 'Install WorthyTen app');
        installButton.innerHTML = `
      <i class="fa-solid fa-download"></i>
      <span>Install App</span>
    `;
        installButton.style.display = 'none';
        installButton.addEventListener('click', handleInstallClick);
        document.body.appendChild(installButton);
    }

    // Show install button
    function showInstallButton() {
        if (installButton && deferredPrompt) {
            installButton.style.display = 'flex';
            installButton.classList.add('slide-up');
        }
    }

    // Hide install button
    function hideInstallButton() {
        if (installButton) {
            installButton.style.display = 'none';
        }
    }

    // Handle install click
    async function handleInstallClick() {
        if (!deferredPrompt) return;

        // Show the install prompt
        deferredPrompt.prompt();

        // Wait for user choice
        const result = await deferredPrompt.userChoice;
        console.log('[PWA] Install prompt result:', result.outcome);

        // Clear the prompt
        deferredPrompt = null;
        hideInstallButton();

        // Track installation
        if (result.outcome === 'accepted') {
            trackInstall('accepted');
        } else {
            trackInstall('dismissed');
        }
    }

    // Track install events
    function trackInstall(outcome) {
        if (window.gtag) {
            window.gtag('event', 'pwa_install', {
                event_category: 'PWA',
                event_label: outcome
            });
        }
        console.log('[PWA] Install tracked:', outcome);
    }

    // Show install banner after scroll
    function showBannerOnScroll() {
        let hasShown = false;

        window.addEventListener('scroll', () => {
            if (hasShown || !deferredPrompt) return;

            const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;

            if (scrollPercent > 30) {
                hasShown = true;
                showInstallBanner();
            }
        }, { passive: true });
    }

    // Show install banner
    function showInstallBanner() {
        if (isAppInstalled() || !deferredPrompt) return;
        if (sessionStorage.getItem('pwa-banner-dismissed')) return;

        const banner = document.createElement('div');
        banner.className = 'pwa-install-banner slide-up';
        banner.innerHTML = `
      <div class="pwa-banner-content">
        <div class="pwa-banner-icon">
          <img src="/images/logo-icon.png" alt="WorthyTen" width="48" height="48" 
               onerror="this.style.display='none'">
        </div>
        <div class="pwa-banner-text">
          <strong>Install WorthyTen</strong>
          <p>Get instant quotes even offline</p>
        </div>
        <button class="pwa-banner-install" aria-label="Install app">
          Install
        </button>
        <button class="pwa-banner-close" aria-label="Close">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
    `;

        document.body.appendChild(banner);

        // Install button click
        banner.querySelector('.pwa-banner-install').addEventListener('click', () => {
            handleInstallClick();
            banner.remove();
        });

        // Close button click
        banner.querySelector('.pwa-banner-close').addEventListener('click', () => {
            sessionStorage.setItem('pwa-banner-dismissed', 'true');
            banner.classList.add('fade-out');
            setTimeout(() => banner.remove(), 300);
        });
    }

    // Initialize
    function init() {
        createInstallButton();
        showBannerOnScroll();

        // Listen for beforeinstallprompt event
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            deferredPrompt = e;
            console.log('[PWA] Install prompt available');
            showInstallButton();
        });

        // Listen for app installed event
        window.addEventListener('appinstalled', () => {
            console.log('[PWA] App installed successfully');
            deferredPrompt = null;
            hideInstallButton();
            trackInstall('installed');
        });
    }

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Export for external use
    window.PWAInstall = {
        prompt: handleInstallClick,
        isInstalled: isAppInstalled
    };
})();

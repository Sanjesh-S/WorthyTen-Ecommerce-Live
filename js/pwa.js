// js/pwa.js
// Progressive Web App functionality

(function () {
  'use strict';

  /**
   * Register service worker
   */
  function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js')
          .then(registration => {
            if (window.Logger) {
              window.Logger.log('Service Worker registered:', registration.scope);
            }

            // Check for updates
            registration.addEventListener('updatefound', () => {
              const newWorker = registration.installing;
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  // New service worker available
                  if (window.Logger) {
                    window.Logger.log('New service worker available');
                  }
                  // Could show a notification to user to refresh
                }
              });
            });
          })
          .catch(error => {
            if (window.Logger) {
              window.Logger.error('Service Worker registration failed:', error);
            }
          });
      });
    }
  }

  /**
   * Handle install prompt
   */
  let deferredPrompt;

  window.addEventListener('beforeinstallprompt', e => {
    // Prevent the mini-infobar from appearing
    e.preventDefault();
    // Stash the event so it can be triggered later
    deferredPrompt = e;

    // Show custom install button/prompt
    showInstallPrompt();
  });

  /**
   * Show install prompt UI
   */
  function showInstallPrompt() {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      return; // Already installed
    }

    // Create install banner (you can customize this)
    const installBanner = document.createElement('div');
    installBanner.id = 'pwa-install-banner';
    installBanner.style.cssText = `
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: var(--brand, #1b4c87);
      color: white;
      padding: 16px 24px;
      border-radius: 12px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.2);
      z-index: 1000;
      display: flex;
      align-items: center;
      gap: 16px;
      max-width: 90%;
      font-family: system-ui, -apple-system, sans-serif;
    `;

    installBanner.innerHTML = `
      <div>
        <strong>Install WorthyTen</strong>
        <p style="margin: 4px 0 0 0; font-size: 14px; opacity: 0.9;">Get quick access and work offline</p>
      </div>
      <button id="pwa-install-btn" style="
        background: white;
        color: var(--brand, #1b4c87);
        border: none;
        padding: 8px 16px;
        border-radius: 8px;
        font-weight: 600;
        cursor: pointer;
      ">Install</button>
      <button id="pwa-dismiss-btn" style="
        background: transparent;
        color: white;
        border: none;
        padding: 8px;
        cursor: pointer;
        font-size: 20px;
      ">×</button>
    `;

    document.body.appendChild(installBanner);

    // Install button handler
    document.getElementById('pwa-install-btn').addEventListener('click', async () => {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;

        if (window.Logger) {
          window.Logger.log(`User ${outcome}ed the install prompt`);
        }

        if (window.Analytics) {
          window.Analytics.trackEvent('pwa_install', { outcome });
        }

        deferredPrompt = null;
        installBanner.remove();
      }
    });

    // Dismiss button handler
    document.getElementById('pwa-dismiss-btn').addEventListener('click', () => {
      installBanner.remove();
      // Store dismissal in localStorage
      localStorage.setItem('pwa-install-dismissed', Date.now());
    });

    // Check if user previously dismissed
    const dismissed = localStorage.getItem('pwa-install-dismissed');
    if (dismissed) {
      const dismissedTime = parseInt(dismissed, 10);
      const daysSinceDismissed = (Date.now() - dismissedTime) / (1000 * 60 * 60 * 24);
      if (daysSinceDismissed < 7) {
        // Don't show if dismissed within last 7 days
        installBanner.remove();
      }
    }
  }

  /**
   * Check if app is running in standalone mode
   */
  function isStandalone() {
    return (
      window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone ||
      document.referrer.includes('android-app://')
    );
  }

  // Initialize
  if (window.Config?.features?.pwa) {
    registerServiceWorker();

    // Track PWA usage
    if (isStandalone() && window.Analytics) {
      window.Analytics.trackEvent('pwa_launch', {
        display_mode: 'standalone'
      });
    }
  }

  // Expose globally
  window.PWA = {
    isStandalone,
    registerServiceWorker
  };
})();

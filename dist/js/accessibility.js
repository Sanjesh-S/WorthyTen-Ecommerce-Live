/**
 * Accessibility Enhancements
 * Handles keyboard navigation, focus management, and ARIA live regions
 * @file js/accessibility.js
 */

(function() {
  'use strict';

  // Aria live region for announcements
  let ariaLiveRegion = null;

  /**
   * Initialize accessibility features
   */
  function init() {
    createAriaLiveRegion();
    enhanceKeyboardNavigation();
    enhanceModals();
    enhanceForms();
    announcePageLoad();
  }

  /**
   * Create aria-live region if it doesn't exist
   */
  function createAriaLiveRegion() {
    ariaLiveRegion = document.getElementById('aria-live-region');
    if (!ariaLiveRegion) {
      ariaLiveRegion = document.createElement('div');
      ariaLiveRegion.id = 'aria-live-region';
      ariaLiveRegion.setAttribute('aria-live', 'polite');
      ariaLiveRegion.setAttribute('aria-atomic', 'true');
      ariaLiveRegion.className = 'sr-only';
      document.body.appendChild(ariaLiveRegion);
    }
  }

  /**
   * Announce message to screen readers
   */
  function announce(message, priority = 'polite') {
    if (!ariaLiveRegion) createAriaLiveRegion();
    
    ariaLiveRegion.setAttribute('aria-live', priority);
    ariaLiveRegion.textContent = message;
    
    // Clear after announcement
    setTimeout(() => {
      ariaLiveRegion.textContent = '';
    }, 1000);
  }

  /**
   * Enhance keyboard navigation
   */
  function enhanceKeyboardNavigation() {
    // Handle Escape key to close modals
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const openModal = document.querySelector('.pickup-modal-backdrop[style*="display: block"], .pickup-modal-backdrop:not([style*="display: none"])');
        if (openModal) {
          const closeBtn = openModal.querySelector('[aria-label*="Close"], .pickup-modal-close, .close-btn');
          if (closeBtn) {
            closeBtn.click();
            announce('Modal closed');
          }
        }
      }
    });

    // Handle Enter key on buttons and links
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && e.target.tagName === 'A' && e.target.getAttribute('role') !== 'button') {
        // Allow default behavior for links
        return;
      }
    });
  }

  /**
   * Enhance modal accessibility
   */
  function enhanceModals() {
    // Find all modals
    const modals = document.querySelectorAll('.pickup-modal-backdrop, .breakdown-overlay, .city-popup-overlay');
    
    modals.forEach(modal => {
      // Set role and aria attributes
      if (!modal.getAttribute('role')) {
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-modal', 'true');
      }

      // Find close button
      const closeBtn = modal.querySelector('[aria-label*="Close"], .pickup-modal-close, .close-btn, .city-popup-close');
      if (closeBtn) {
        closeBtn.setAttribute('aria-label', closeBtn.getAttribute('aria-label') || 'Close dialog');
      }

      // Trap focus in modal
      trapFocus(modal);
    });
  }

  /**
   * Trap focus within modal
   */
  function trapFocus(modal) {
    const focusableElements = modal.querySelectorAll(
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    
    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    // When modal opens, focus first element
    const observer = new MutationObserver(() => {
      if (modal.style.display !== 'none' && !modal.hasAttribute('hidden')) {
        firstElement.focus();
      }
    });

    observer.observe(modal, {
      attributes: true,
      attributeFilter: ['style', 'hidden']
    });

    // Handle Tab key
    modal.addEventListener('keydown', (e) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    });
  }

  /**
   * Enhance form accessibility
   */
  function enhanceForms() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
      // Add aria-label if missing
      if (!form.getAttribute('aria-label') && !form.querySelector('legend')) {
        const formTitle = form.querySelector('h2, h3, .form-title');
        if (formTitle) {
          form.setAttribute('aria-label', formTitle.textContent);
        }
      }

      // Enhance inputs
      const inputs = form.querySelectorAll('input, textarea, select');
      inputs.forEach(input => {
        // Ensure label association
        if (input.id && !input.getAttribute('aria-labelledby')) {
          const label = form.querySelector(`label[for="${input.id}"]`);
          if (label && !label.id) {
            label.id = `${input.id}-label`;
            input.setAttribute('aria-labelledby', label.id);
          }
        }

        // Add error message association
        if (input.hasAttribute('aria-describedby')) {
          const errorId = input.getAttribute('aria-describedby');
          let errorElement = document.getElementById(errorId);
          
          if (!errorElement) {
            errorElement = document.createElement('span');
            errorElement.id = errorId;
            errorElement.className = 'sr-only';
            errorElement.setAttribute('role', 'alert');
            input.parentNode.appendChild(errorElement);
          }
        }

        // Handle validation
        input.addEventListener('invalid', (e) => {
          const errorId = input.getAttribute('aria-describedby');
          if (errorId) {
            const errorElement = document.getElementById(errorId);
            if (errorElement) {
              errorElement.textContent = input.validationMessage;
              errorElement.className = 'error-message';
              announce(`Error: ${input.validationMessage}`, 'assertive');
            }
          }
        });

        input.addEventListener('input', (e) => {
          // Clear error on input
          const errorId = input.getAttribute('aria-describedby');
          if (errorId) {
            const errorElement = document.getElementById(errorId);
            if (errorElement && input.validity.valid) {
              errorElement.textContent = '';
              errorElement.className = 'sr-only';
            }
          }
        });
      });
    });
  }

  /**
   * Announce page load
   */
  function announcePageLoad() {
    const pageTitle = document.querySelector('h1, .page-title, .product-title');
    if (pageTitle) {
      setTimeout(() => {
        announce(`Page loaded: ${pageTitle.textContent}`);
      }, 500);
    }
  }

  /**
   * Update price announcement
   */
  function announcePrice(price) {
    announce(`Price updated to ${price}`);
  }

  /**
   * Announce step change
   */
  function announceStep(step, total) {
    announce(`Step ${step} of ${total}`);
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose globally
  window.Accessibility = {
    announce,
    announcePrice,
    announceStep,
    trapFocus
  };

})();


/**
 * WhatsApp Chat Widget
 * Floating chat button for customer support
 * @file js/whatsapp-chat.js
 */

(function () {
    'use strict';

    const CONFIG = {
        phoneNumber: '919843010746',
        defaultMessage: 'Hi! I need help with selling my device.',
        position: 'right', // 'left' or 'right'
        showAfterScroll: 200,
        pulseAnimation: true
    };

    let widget = null;
    let tooltip = null;

    /**
     * Create WhatsApp widget
     */
    function createWidget() {
        if (widget) return;

        // Main button
        widget = document.createElement('a');
        widget.className = 'whatsapp-widget';
        widget.setAttribute('aria-label', 'Chat on WhatsApp');
        widget.setAttribute('target', '_blank');
        widget.setAttribute('rel', 'noopener noreferrer');
        widget.innerHTML = `
      <i class="fa-brands fa-whatsapp"></i>
    `;

        // Tooltip
        tooltip = document.createElement('div');
        tooltip.className = 'whatsapp-tooltip';
        tooltip.textContent = 'Chat with us';
        widget.appendChild(tooltip);

        document.body.appendChild(widget);

        // Click handler
        widget.addEventListener('click', handleClick);

        // Show/hide based on scroll
        updateVisibility();
        window.addEventListener('scroll', updateVisibility, { passive: true });

        // Pulse animation
        if (CONFIG.pulseAnimation) {
            setTimeout(() => widget.classList.add('pulse'), 2000);
        }
    }

    /**
     * Handle click
     */
    function handleClick(e) {
        e.preventDefault();

        const message = getContextualMessage();
        const url = `https://wa.me/${CONFIG.phoneNumber}?text=${encodeURIComponent(message)}`;

        // Track click
        if (window.gtag) {
            window.gtag('event', 'whatsapp_click', {
                event_category: 'Engagement',
                event_label: 'Chat Button'
            });
        }

        window.open(url, '_blank');
    }

    /**
     * Get contextual message based on current page
     */
    function getContextualMessage() {
        const path = window.location.pathname;
        const productData = sessionStorage.getItem('selectedProduct');

        let message = CONFIG.defaultMessage;

        if (productData) {
            try {
                const product = JSON.parse(productData);
                message = `Hi! I have a question about selling my ${product.name || product.model || 'device'}.`;
            } catch (e) {
                // Use default
            }
        }

        if (path.includes('quote') || path.includes('summary')) {
            const price = document.getElementById('quotePrice')?.textContent ||
                document.getElementById('finalSellingPrice')?.textContent;
            if (price) {
                message = `Hi! I got a quote of ${price} for my device. Can you help me?`;
            }
        }

        return message;
    }

    /**
     * Update widget visibility
     */
    function updateVisibility() {
        if (!widget) return;

        if (window.scrollY > CONFIG.showAfterScroll) {
            widget.classList.add('visible');
        } else {
            widget.classList.remove('visible');
        }
    }

    /**
     * Open chat with custom message
     * @param {string} message - Custom message
     */
    function openChat(message = CONFIG.defaultMessage) {
        const url = `https://wa.me/${CONFIG.phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    }

    /**
     * Initialize
     */
    function init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', createWidget);
        } else {
            createWidget();
        }
    }

    init();

    // Export for external use
    window.WhatsAppChat = {
        open: openChat,
        CONFIG
    };
})();

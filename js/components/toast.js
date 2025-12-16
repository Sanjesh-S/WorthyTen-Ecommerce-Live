/**
 * Toast Notification Component
 * @file js/components/toast.js
 */

(function () {
    'use strict';

    const TOAST_DURATION = 4000;
    const TOAST_GAP = 12;

    let container = null;
    let toasts = [];

    /**
     * Create toast container
     */
    function ensureContainer() {
        if (container) return;

        container = document.createElement('div');
        container.className = 'toast-container';
        container.setAttribute('aria-live', 'polite');
        container.setAttribute('aria-label', 'Notifications');
        document.body.appendChild(container);
    }

    /**
     * Update toast positions
     */
    function updatePositions() {
        let offset = 0;
        toasts.forEach((toast, index) => {
            toast.element.style.transform = `translateY(${offset}px)`;
            offset += toast.element.offsetHeight + TOAST_GAP;
        });
    }

    /**
     * Show toast notification
     * @param {string} message - Toast message
     * @param {Object} options - Toast options
     */
    function show(message, options = {}) {
        ensureContainer();

        const type = options.type || 'info'; // success, error, warning, info
        const duration = options.duration || TOAST_DURATION;
        const action = options.action || null;
        const id = 'toast-' + Date.now();

        const toast = document.createElement('div');
        toast.id = id;
        toast.className = `toast toast-${type}`;
        toast.setAttribute('role', 'alert');

        const icons = {
            success: 'fa-circle-check',
            error: 'fa-circle-xmark',
            warning: 'fa-triangle-exclamation',
            info: 'fa-circle-info'
        };

        toast.innerHTML = `
      <i class="fa-solid ${icons[type]} toast-icon"></i>
      <span class="toast-message">${message}</span>
      ${action ? `<button class="toast-action">${action.text}</button>` : ''}
      <button class="toast-close" aria-label="Dismiss">
        <i class="fa-solid fa-xmark"></i>
      </button>
    `;

        // Event listeners
        if (action && action.onClick) {
            toast.querySelector('.toast-action').addEventListener('click', () => {
                action.onClick();
                removeToast(id);
            });
        }

        toast.querySelector('.toast-close').addEventListener('click', () => removeToast(id));

        // Add to container
        container.appendChild(toast);

        const toastObj = { id, element: toast };
        toasts.push(toastObj);

        // Animate in
        requestAnimationFrame(() => {
            toast.classList.add('toast-show');
            updatePositions();
        });

        // Auto-dismiss
        if (duration > 0) {
            setTimeout(() => removeToast(id), duration);
        }

        return id;
    }

    /**
     * Remove toast
     */
    function removeToast(id) {
        const index = toasts.findIndex(t => t.id === id);
        if (index === -1) return;

        const toast = toasts[index];
        toast.element.classList.remove('toast-show');
        toast.element.classList.add('toast-hide');

        setTimeout(() => {
            if (toast.element.parentNode) {
                toast.element.parentNode.removeChild(toast.element);
            }
            toasts.splice(index, 1);
            updatePositions();
        }, 300);
    }

    /**
     * Shortcut methods
     */
    function success(message, options = {}) {
        return show(message, { ...options, type: 'success' });
    }

    function error(message, options = {}) {
        return show(message, { ...options, type: 'error' });
    }

    function warning(message, options = {}) {
        return show(message, { ...options, type: 'warning' });
    }

    function info(message, options = {}) {
        return show(message, { ...options, type: 'info' });
    }

    /**
     * Clear all toasts
     */
    function clearAll() {
        toasts.forEach(t => removeToast(t.id));
    }

    // Export
    window.Toast = {
        show,
        success,
        error,
        warning,
        info,
        remove: removeToast,
        clearAll
    };
})();

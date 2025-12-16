/**
 * Loading Skeletons and Lazy Loading Module
 * Provides skeleton UI components while content loads
 * @file js/loading-skeletons.js
 */

// Create skeleton HTML for different card types
const SkeletonUI = {
    // Create a single skeleton card
    createCard(type = 'category') {
        const skeletonClass = `skeleton-card skeleton-${type}`;
        return `
      <div class="${skeletonClass}" aria-hidden="true">
        <div class="skeleton-image skeleton-pulse"></div>
        <div class="skeleton-text skeleton-pulse"></div>
      </div>
    `;
    },

    // Create multiple skeleton cards
    createGrid(count = 4, type = 'category') {
        return Array(count).fill(null).map(() => this.createCard(type)).join('');
    },

    // Show loading skeleton in a container
    showSkeleton(container, count = 4, type = 'category') {
        if (!container) return;
        container.innerHTML = this.createGrid(count, type);
        container.setAttribute('aria-busy', 'true');
        container.setAttribute('aria-label', 'Loading content');
    },

    // Clear skeleton and restore normal state
    clearSkeleton(container) {
        if (!container) return;
        container.removeAttribute('aria-busy');
        container.removeAttribute('aria-label');
    },

    // Create inline loading spinner
    createSpinner(size = 'medium', text = 'Loading...') {
        return `
      <div class="loading-spinner loading-spinner-${size}" role="status" aria-live="polite">
        <div class="spinner-ring"></div>
        <span class="loading-text">${text}</span>
      </div>
    `;
    },

    // Show loading overlay on a container
    showOverlay(container, text = 'Loading...') {
        if (!container) return;

        const overlay = document.createElement('div');
        overlay.className = 'loading-overlay';
        overlay.innerHTML = this.createSpinner('large', text);
        overlay.setAttribute('aria-live', 'assertive');

        container.style.position = 'relative';
        container.appendChild(overlay);

        return overlay;
    },

    // Remove loading overlay
    hideOverlay(container) {
        if (!container) return;
        const overlay = container.querySelector('.loading-overlay');
        if (overlay) {
            overlay.remove();
        }
    }
};

// Lazy Loading for heavy modules
const LazyLoader = {
    // Cache for loaded modules
    loadedModules: new Map(),

    // Load product data lazily by category
    async loadProductData(category) {
        const cacheKey = `products-${category || 'all'}`;

        if (this.loadedModules.has(cacheKey)) {
            return this.loadedModules.get(cacheKey);
        }

        // Product data is loaded from Firestore in script.js
        // This module helps with UI state during loading
        return null;
    },

    // Lazy load admin dashboard only when needed
    async loadAdminDashboard() {
        if (this.loadedModules.has('admin-dashboard')) {
            return this.loadedModules.get('admin-dashboard');
        }

        try {
            // Dynamic import for admin dashboard
            const module = await import('./admin-dashboard.js');
            this.loadedModules.set('admin-dashboard', module);
            return module;
        } catch (error) {
            console.error('Failed to load admin dashboard:', error);
            return null;
        }
    },

    // Preload images for smoother experience
    preloadImages(imageUrls = []) {
        return Promise.allSettled(
            imageUrls.map(url => {
                return new Promise((resolve, reject) => {
                    const img = new Image();
                    img.onload = () => resolve(url);
                    img.onerror = () => reject(url);
                    img.src = url;
                });
            })
        );
    },

    // Intersection Observer for lazy loading elements
    createObserver(callback, options = {}) {
        const defaultOptions = {
            root: null,
            rootMargin: '100px',
            threshold: 0.1,
            ...options
        };

        return new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    callback(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, defaultOptions);
    }
};

// Progress indicator for multi-step flows
const ProgressIndicator = {
    steps: ['select', 'quote', 'condition', 'summary'],
    currentStep: 0,

    // Create progress bar HTML
    create(containerId = 'progress-indicator') {
        const container = document.getElementById(containerId);
        if (!container) return;

        const stepsHTML = this.steps.map((step, index) => `
      <div class="progress-step ${index <= this.currentStep ? 'active' : ''}" 
           data-step="${index}"
           aria-current="${index === this.currentStep ? 'step' : 'false'}">
        <div class="step-number">${index + 1}</div>
        <div class="step-label">${this.getStepLabel(step)}</div>
      </div>
      ${index < this.steps.length - 1 ? '<div class="step-connector"></div>' : ''}
    `).join('');

        container.innerHTML = `
      <div class="progress-bar" role="progressbar" 
           aria-valuenow="${this.currentStep + 1}" 
           aria-valuemin="1" 
           aria-valuemax="${this.steps.length}"
           aria-label="Selling progress: Step ${this.currentStep + 1} of ${this.steps.length}">
        ${stepsHTML}
      </div>
    `;
    },

    getStepLabel(step) {
        const labels = {
            select: 'Select Device',
            quote: 'Get Quote',
            condition: 'Condition',
            summary: 'Summary'
        };
        return labels[step] || step;
    },

    // Update current step
    setStep(stepIndex) {
        this.currentStep = Math.max(0, Math.min(stepIndex, this.steps.length - 1));
        this.create();
    },

    // Detect current step from URL
    detectStep() {
        const path = window.location.pathname;
        if (path.includes('quote')) return 1;
        if (path.includes('condition') || path.includes('assessment')) return 2;
        if (path.includes('summary')) return 3;
        return 0;
    }
};

// Export for use in other modules
window.SkeletonUI = SkeletonUI;
window.LazyLoader = LazyLoader;
window.ProgressIndicator = ProgressIndicator;

// Auto-detect and set progress on page load
document.addEventListener('DOMContentLoaded', () => {
    ProgressIndicator.currentStep = ProgressIndicator.detectStep();
});

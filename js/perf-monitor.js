/**
 * Performance Monitoring
 * Track Core Web Vitals and custom metrics
 * @file js/perf-monitor.js
 */

(function () {
    'use strict';

    // Performance data storage
    const metrics = {
        LCP: null,  // Largest Contentful Paint
        FID: null,  // First Input Delay
        CLS: null,  // Cumulative Layout Shift
        FCP: null,  // First Contentful Paint
        TTFB: null, // Time to First Byte
        custom: {}
    };

    // Performance thresholds (in ms or score)
    const THRESHOLDS = {
        LCP: { good: 2500, poor: 4000 },
        FID: { good: 100, poor: 300 },
        CLS: { good: 0.1, poor: 0.25 },
        FCP: { good: 1800, poor: 3000 },
        TTFB: { good: 800, poor: 1800 }
    };

    /**
     * Get performance rating
     */
    function getRating(metric, value) {
        const threshold = THRESHOLDS[metric];
        if (!threshold) return 'unknown';
        if (value <= threshold.good) return 'good';
        if (value <= threshold.poor) return 'needs-improvement';
        return 'poor';
    }

    /**
     * Log metric to console and analytics
     */
    function logMetric(name, value) {
        const rating = getRating(name, value);
        metrics[name] = { value, rating, timestamp: Date.now() };

        if (window.Logger) {
            window.Logger.info(`[Perf] ${name}: ${value.toFixed(2)} (${rating})`);
        }

        if (window.gtag) {
            window.gtag('event', name, {
                event_category: 'Web Vitals',
                event_label: rating,
                value: Math.round(name === 'CLS' ? value * 1000 : value),
                non_interaction: true
            });
        }
    }

    /**
     * Observe Core Web Vitals
     */
    function observeWebVitals() {
        if (!('PerformanceObserver' in window)) return;

        // LCP
        try {
            new PerformanceObserver((list) => {
                const entries = list.getEntries();
                const lastEntry = entries[entries.length - 1];
                logMetric('LCP', lastEntry.startTime);
            }).observe({ type: 'largest-contentful-paint', buffered: true });
        } catch (e) { /* not supported */ }

        // FID
        try {
            new PerformanceObserver((list) => {
                list.getEntries().forEach((entry) => {
                    logMetric('FID', entry.processingStart - entry.startTime);
                });
            }).observe({ type: 'first-input', buffered: true });
        } catch (e) { /* not supported */ }

        // CLS
        let clsValue = 0;
        try {
            new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    if (!entry.hadRecentInput) {
                        clsValue += entry.value;
                        logMetric('CLS', clsValue);
                    }
                }
            }).observe({ type: 'layout-shift', buffered: true });
        } catch (e) { /* not supported */ }
    }

    /**
     * Get navigation timing metrics
     */
    function getNavigationMetrics() {
        if (!performance.getEntriesByType) return;

        const paint = performance.getEntriesByType('paint');
        const fcp = paint.find(p => p.name === 'first-contentful-paint');
        if (fcp) logMetric('FCP', fcp.startTime);

        const [nav] = performance.getEntriesByType('navigation');
        if (nav) logMetric('TTFB', nav.responseStart - nav.requestStart);
    }

    /**
     * Track custom timing
     */
    function startTiming(name) {
        const start = performance.now();
        return function endTiming() {
            const duration = performance.now() - start;
            metrics.custom[name] = duration;
            return duration;
        };
    }

    /**
     * Mark a performance milestone
     */
    function mark(name) {
        if (performance.mark) performance.mark(name);
        metrics.custom[`mark_${name}`] = performance.now();
    }

    /**
     * Initialize
     */
    function init() {
        observeWebVitals();
        window.addEventListener('load', () => setTimeout(getNavigationMetrics, 0));
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    window.PerfMonitor = {
        metrics: () => ({ ...metrics }),
        startTiming,
        mark,
        getRating,
        THRESHOLDS
    };
})();

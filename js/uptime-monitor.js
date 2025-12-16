/**
 * Uptime Monitoring
 * Client-side health checks and error reporting
 * @file js/uptime-monitor.js
 */

(function () {
    'use strict';

    const CONFIG = {
        healthCheckInterval: 300000, // 5 minutes
        endpoints: [
            { name: 'Firebase', url: 'https://firestore.googleapis.com' },
        ],
        reportErrors: true,
        maxRetries: 3
    };

    let isOnline = navigator.onLine;
    let lastHealthCheck = null;
    let healthStatus = { healthy: true, checks: {} };

    /**
     * Check if an endpoint is reachable
     */
    async function checkEndpoint(endpoint) {
        const start = performance.now();

        try {
            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), 5000);

            const response = await fetch(endpoint.url, {
                method: 'HEAD',
                mode: 'no-cors',
                signal: controller.signal
            });

            clearTimeout(timeout);

            return {
                name: endpoint.name,
                status: 'up',
                latency: Math.round(performance.now() - start)
            };
        } catch (error) {
            return {
                name: endpoint.name,
                status: 'down',
                error: error.message,
                latency: Math.round(performance.now() - start)
            };
        }
    }

    /**
     * Run health checks
     */
    async function runHealthCheck() {
        const results = await Promise.all(
            CONFIG.endpoints.map(checkEndpoint)
        );

        healthStatus = {
            healthy: results.every(r => r.status === 'up'),
            timestamp: new Date().toISOString(),
            online: navigator.onLine,
            checks: results.reduce((acc, r) => {
                acc[r.name] = r;
                return acc;
            }, {})
        };

        lastHealthCheck = Date.now();

        // Report if unhealthy
        if (!healthStatus.healthy && CONFIG.reportErrors) {
            reportHealthIssue(healthStatus);
        }

        return healthStatus;
    }

    /**
     * Report health issues
     */
    function reportHealthIssue(status) {
        // Log to console
        console.warn('[UptimeMonitor] Health check failed:', status);

        // Log to error tracking if available
        if (window.Logger) {
            window.Logger.error('Health check failed', { status });
        }

        // Track event
        if (window.gtag) {
            window.gtag('event', 'health_check_failed', {
                event_category: 'Monitoring',
                event_label: Object.entries(status.checks)
                    .filter(([, v]) => v.status === 'down')
                    .map(([k]) => k)
                    .join(', ')
            });
        }
    }

    /**
     * Handle online/offline events
     */
    function handleOnlineStatus() {
        const previousStatus = isOnline;
        isOnline = navigator.onLine;

        if (previousStatus !== isOnline) {
            const event = new CustomEvent('connectionchange', {
                detail: { online: isOnline }
            });
            window.dispatchEvent(event);

            // Show notification
            if (window.Toast) {
                if (isOnline) {
                    Toast.success('Connection restored');
                } else {
                    Toast.warning('You are offline');
                }
            }

            // Track event
            if (window.gtag) {
                window.gtag('event', isOnline ? 'connection_restored' : 'connection_lost', {
                    event_category: 'Monitoring'
                });
            }
        }
    }

    /**
     * Get current status
     */
    function getStatus() {
        return {
            online: navigator.onLine,
            lastCheck: lastHealthCheck,
            health: healthStatus
        };
    }

    /**
     * Start monitoring
     */
    function start() {
        // Initial check
        runHealthCheck();

        // Periodic checks
        setInterval(runHealthCheck, CONFIG.healthCheckInterval);

        // Online/offline listeners
        window.addEventListener('online', handleOnlineStatus);
        window.addEventListener('offline', handleOnlineStatus);

        // Page visibility changes
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden && Date.now() - lastHealthCheck > CONFIG.healthCheckInterval) {
                runHealthCheck();
            }
        });

        console.log('[UptimeMonitor] Started');
    }

    /**
     * Register custom endpoint
     */
    function addEndpoint(name, url) {
        CONFIG.endpoints.push({ name, url });
    }

    // Auto-start
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', start);
    } else {
        start();
    }

    // Export
    window.UptimeMonitor = {
        check: runHealthCheck,
        getStatus,
        addEndpoint,
        isOnline: () => navigator.onLine
    };
})();

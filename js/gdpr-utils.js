/**
 * GDPR Compliance Utilities
 * Data export and deletion for user privacy
 * @file js/gdpr-utils.js
 */

(function () {
    'use strict';

    /**
     * Export all user data
     * @returns {Promise<Object>} User data object
     */
    async function exportUserData() {
        const user = firebase.auth().currentUser;
        if (!user) {
            throw new Error('User must be logged in');
        }

        const db = firebase.firestore();
        const userData = {
            exportedAt: new Date().toISOString(),
            userId: user.uid,
            email: user.email,
            phone: user.phoneNumber,
            profile: null,
            pickupRequests: [],
            lockedQuotes: []
        };

        // Get user profile
        const profileDoc = await db.collection('users').doc(user.uid).get();
        if (profileDoc.exists) {
            userData.profile = profileDoc.data();
        }

        // Get pickup requests
        const pickupsSnapshot = await db.collection('pickupRequests')
            .where('userId', '==', user.uid)
            .get();

        pickupsSnapshot.forEach(doc => {
            userData.pickupRequests.push({
                id: doc.id,
                ...doc.data(),
                createdAt: doc.data().createdAt?.toDate?.().toISOString()
            });
        });

        // Get locked quotes
        const quotesSnapshot = await db.collection('lockedQuotes')
            .where('userId', '==', user.uid)
            .get();

        quotesSnapshot.forEach(doc => {
            userData.lockedQuotes.push({
                id: doc.id,
                ...doc.data(),
                lockedAt: doc.data().lockedAt?.toDate?.().toISOString(),
                expiresAt: doc.data().expiresAt?.toDate?.().toISOString()
            });
        });

        return userData;
    }

    /**
     * Download user data as JSON file
     */
    async function downloadUserData() {
        try {
            const data = await exportUserData();
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = url;
            a.download = `worthyten-data-export-${Date.now()}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

            // Track event
            if (window.gtag) {
                window.gtag('event', 'gdpr_data_export', {
                    event_category: 'Privacy'
                });
            }

            return true;
        } catch (error) {
            console.error('Failed to export data:', error);
            throw error;
        }
    }

    /**
     * Request account deletion
     * This creates a deletion request that admin will process
     */
    async function requestAccountDeletion(reason = '') {
        const user = firebase.auth().currentUser;
        if (!user) {
            throw new Error('User must be logged in');
        }

        const db = firebase.firestore();

        // Create deletion request
        await db.collection('deletionRequests').add({
            userId: user.uid,
            email: user.email,
            phone: user.phoneNumber,
            reason,
            status: 'pending',
            requestedAt: firebase.firestore.FieldValue.serverTimestamp()
        });

        // Track event
        if (window.gtag) {
            window.gtag('event', 'gdpr_deletion_request', {
                event_category: 'Privacy'
            });
        }

        return {
            success: true,
            message: 'Deletion request submitted. Your account will be deleted within 30 days.'
        };
    }

    /**
     * Delete local data (localStorage, sessionStorage)
     */
    function clearLocalData() {
        // Clear all WorthyTen-related localStorage
        Object.keys(localStorage).forEach(key => {
            if (key.startsWith('lockedQuote_') ||
                key.startsWith('worthyten_') ||
                key === 'theme' ||
                key === 'pwa_install_dismissed') {
                localStorage.removeItem(key);
            }
        });

        // Clear session storage
        sessionStorage.clear();

        // Clear cookies (set expiry to past)
        document.cookie.split(';').forEach(cookie => {
            const name = cookie.split('=')[0].trim();
            document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
        });

        return true;
    }

    /**
     * Show privacy settings modal
     */
    function showPrivacySettings() {
        if (!window.Modal) {
            console.error('Modal component not loaded');
            return;
        }

        const modal = new Modal({
            title: 'Privacy Settings',
            size: 'medium',
            content: `
        <div class="privacy-settings">
          <div class="privacy-option">
            <h4><i class="fa-solid fa-download"></i> Export My Data</h4>
            <p>Download all your personal data stored on WorthyTen.</p>
            <button class="cta-button" id="gdpr-export-btn">Download Data</button>
          </div>
          <hr>
          <div class="privacy-option">
            <h4><i class="fa-solid fa-broom"></i> Clear Local Data</h4>
            <p>Remove cached data from this browser.</p>
            <button class="nav-button" id="gdpr-clear-local">Clear Local Data</button>
          </div>
          <hr>
          <div class="privacy-option danger">
            <h4><i class="fa-solid fa-trash"></i> Delete My Account</h4>
            <p>Permanently delete your account and all associated data.</p>
            <button class="action-btn delete-btn" id="gdpr-delete-btn">Request Deletion</button>
          </div>
        </div>
      `
        }).open();

        // Bind events
        setTimeout(() => {
            document.getElementById('gdpr-export-btn')?.addEventListener('click', async () => {
                try {
                    await downloadUserData();
                    if (window.Toast) Toast.success('Data exported successfully!');
                } catch (e) {
                    if (window.Toast) Toast.error('Failed to export data');
                }
            });

            document.getElementById('gdpr-clear-local')?.addEventListener('click', () => {
                clearLocalData();
                if (window.Toast) Toast.success('Local data cleared');
            });

            document.getElementById('gdpr-delete-btn')?.addEventListener('click', () => {
                Modal.confirm('Are you sure you want to delete your account? This cannot be undone.', async () => {
                    try {
                        await requestAccountDeletion();
                        if (window.Toast) Toast.success('Deletion request submitted');
                        modal.close();
                    } catch (e) {
                        if (window.Toast) Toast.error('Failed to submit request');
                    }
                });
            });
        }, 100);
    }

    // Export
    window.GDPR = {
        exportData: exportUserData,
        downloadData: downloadUserData,
        requestDeletion: requestAccountDeletion,
        clearLocal: clearLocalData,
        showSettings: showPrivacySettings
    };
})();

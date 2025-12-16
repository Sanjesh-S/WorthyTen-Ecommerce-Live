/**
 * Price Lock Feature
 * Lock quotes for 7 days with Firebase storage
 * @file js/price-lock.js
 */

(function () {
    'use strict';

    const LOCK_DURATION_DAYS = 7;
    const LOCK_DURATION_MS = LOCK_DURATION_DAYS * 24 * 60 * 60 * 1000;

    /**
     * Lock a quote price
     * @param {Object} quoteData - Quote details
     * @returns {Promise<Object>} Locked quote with expiry
     */
    async function lockPrice(quoteData) {
        const user = firebase.auth().currentUser;
        if (!user) {
            throw new Error('User must be logged in to lock price');
        }

        const lockedQuote = {
            ...quoteData,
            userId: user.uid,
            lockedAt: firebase.firestore.FieldValue.serverTimestamp(),
            expiresAt: new Date(Date.now() + LOCK_DURATION_MS),
            status: 'locked',
            quoteId: generateQuoteId()
        };

        // Save to Firestore
        const db = firebase.firestore();
        const docRef = await db.collection('lockedQuotes').add(lockedQuote);

        // Also save locally for quick access
        const localData = {
            ...lockedQuote,
            docId: docRef.id,
            lockedAt: Date.now(),
            expiresAt: Date.now() + LOCK_DURATION_MS
        };
        localStorage.setItem(`lockedQuote_${lockedQuote.quoteId}`, JSON.stringify(localData));

        // Track event
        if (window.gtag) {
            window.gtag('event', 'price_lock', {
                event_category: 'Conversion',
                event_label: quoteData.model || 'Unknown',
                value: quoteData.price || 0
            });
        }

        return localData;
    }

    /**
     * Get locked quote by ID
     * @param {string} quoteId - Quote ID
     * @returns {Promise<Object|null>} Locked quote or null
     */
    async function getLockedQuote(quoteId) {
        // Try local first
        const local = localStorage.getItem(`lockedQuote_${quoteId}`);
        if (local) {
            const data = JSON.parse(local);
            if (Date.now() < data.expiresAt) {
                return data;
            }
            // Expired, clean up
            localStorage.removeItem(`lockedQuote_${quoteId}`);
        }

        // Try Firestore
        const user = firebase.auth().currentUser;
        if (!user) return null;

        const db = firebase.firestore();
        const snapshot = await db.collection('lockedQuotes')
            .where('quoteId', '==', quoteId)
            .where('userId', '==', user.uid)
            .limit(1)
            .get();

        if (snapshot.empty) return null;

        const doc = snapshot.docs[0];
        const data = doc.data();

        if (data.expiresAt.toDate() < new Date()) {
            // Expired
            await doc.ref.update({ status: 'expired' });
            return null;
        }

        return {
            ...data,
            docId: doc.id,
            expiresAt: data.expiresAt.toDate().getTime()
        };
    }

    /**
     * Get all locked quotes for current user
     * @returns {Promise<Array>} Array of locked quotes
     */
    async function getUserLockedQuotes() {
        const user = firebase.auth().currentUser;
        if (!user) return [];

        const db = firebase.firestore();
        const snapshot = await db.collection('lockedQuotes')
            .where('userId', '==', user.uid)
            .where('status', '==', 'locked')
            .orderBy('lockedAt', 'desc')
            .limit(10)
            .get();

        return snapshot.docs.map(doc => ({
            ...doc.data(),
            docId: doc.id,
            expiresAt: doc.data().expiresAt?.toDate?.().getTime() || 0
        })).filter(q => q.expiresAt > Date.now());
    }

    /**
     * Calculate time remaining
     * @param {number} expiresAt - Expiry timestamp
     * @returns {Object} Time remaining
     */
    function getTimeRemaining(expiresAt) {
        const diff = expiresAt - Date.now();
        if (diff <= 0) return { expired: true };

        const days = Math.floor(diff / (24 * 60 * 60 * 1000));
        const hours = Math.floor((diff % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
        const minutes = Math.floor((diff % (60 * 60 * 1000)) / (60 * 1000));

        return {
            expired: false,
            days,
            hours,
            minutes,
            formatted: days > 0 ? `${days}d ${hours}h` : `${hours}h ${minutes}m`
        };
    }

    /**
     * Generate unique quote ID
     */
    function generateQuoteId() {
        return 'WT' + Date.now().toString(36).toUpperCase() +
            Math.random().toString(36).substring(2, 6).toUpperCase();
    }

    /**
     * Create Lock Price button
     * @param {HTMLElement} container - Container element
     * @param {Object} quoteData - Quote data
     */
    function createLockButton(container, quoteData) {
        const btn = document.createElement('button');
        btn.className = 'price-lock-btn';
        btn.innerHTML = `
      <i class="fa-solid fa-lock"></i>
      <span>Lock Price for ${LOCK_DURATION_DAYS} Days</span>
    `;
        btn.setAttribute('aria-label', `Lock this price for ${LOCK_DURATION_DAYS} days`);

        btn.addEventListener('click', async () => {
            const user = firebase.auth().currentUser;
            if (!user) {
                alert('Please login to lock this price');
                return;
            }

            btn.disabled = true;
            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Locking...';

            try {
                const locked = await lockPrice(quoteData);
                showLockedStatus(container, locked);
                btn.remove();
            } catch (error) {
                console.error('Failed to lock price:', error);
                btn.disabled = false;
                btn.innerHTML = `<i class="fa-solid fa-lock"></i> Lock Price for ${LOCK_DURATION_DAYS} Days`;
                alert('Failed to lock price. Please try again.');
            }
        });

        container.appendChild(btn);
        return btn;
    }

    /**
     * Show locked status with countdown
     * @param {HTMLElement} container - Container element
     * @param {Object} lockedQuote - Locked quote data
     */
    function showLockedStatus(container, lockedQuote) {
        const status = document.createElement('div');
        status.className = 'price-locked-status';
        status.innerHTML = `
      <div class="lock-badge">
        <i class="fa-solid fa-lock"></i>
        <span>Price Locked</span>
      </div>
      <div class="lock-timer">
        <i class="fa-solid fa-clock"></i>
        <span class="timer-text">Loading...</span>
      </div>
      <div class="lock-id">ID: ${lockedQuote.quoteId}</div>
    `;

        container.appendChild(status);

        // Update timer
        const timerEl = status.querySelector('.timer-text');
        const updateTimer = () => {
            const remaining = getTimeRemaining(lockedQuote.expiresAt);
            if (remaining.expired) {
                timerEl.textContent = 'Expired';
                status.classList.add('expired');
            } else {
                timerEl.textContent = `Expires in ${remaining.formatted}`;
            }
        };

        updateTimer();
        const interval = setInterval(updateTimer, 60000); // Update every minute

        // Clean up on page unload
        window.addEventListener('beforeunload', () => clearInterval(interval));
    }

    // Export
    window.PriceLock = {
        lock: lockPrice,
        get: getLockedQuote,
        getUserQuotes: getUserLockedQuotes,
        getTimeRemaining,
        createButton: createLockButton,
        showStatus: showLockedStatus,
        LOCK_DURATION_DAYS
    };
})();

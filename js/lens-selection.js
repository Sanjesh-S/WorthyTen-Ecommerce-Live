/**
 * Lens Selection Page Logic
 * Clean dropdown UI for selecting additional lenses
 * @file js/lens-selection.js
 */

document.addEventListener('DOMContentLoaded', async () => {
    // Get valuation data from session
    const valuationDataString = sessionStorage.getItem('valuationData');
    if (!valuationDataString) {
        window.location.href = 'index.html';
        return;
    }

    const valuationData = JSON.parse(valuationDataString);

    // DOM Elements
    const loadingState = document.getElementById('loadingState');
    const lensDropdownWrapper = document.getElementById('lensDropdownWrapper');
    const lensSelect = document.getElementById('lensSelect');
    const selectedLensesList = document.getElementById('selectedLensesList');
    const addAnotherBtn = document.getElementById('addAnotherBtn');
    const continueBtn = document.getElementById('continueBtn');
    const backBtn = document.getElementById('backToAssessment');
    const searchInput = document.getElementById('lens-search-input');

    // Sidebar Elements
    const sidebarDeviceImage = document.getElementById('sidebarDeviceImage');
    const sidebarDeviceName = document.getElementById('sidebarDeviceName');
    const sidebarSelectedLenses = document.getElementById('sidebarSelectedLenses');

    // State
    let compatibleLenses = [];
    let filteredLenses = [];
    let selectedLenses = [];

    // Populate sidebar device info
    if (sidebarDeviceImage && valuationData.imageUrl) {
        sidebarDeviceImage.src = valuationData.imageUrl;
    }
    if (sidebarDeviceName) {
        const fullName = `${valuationData.brandName || ''} ${valuationData.modelName || ''}`.trim();
        sidebarDeviceName.textContent = fullName || 'Camera';
    }

    // Back button
    backBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        history.back();
    });

    // Wait for Firebase and lens compatibility module
    await waitForDependencies();

    // Load compatible lenses
    await loadCompatibleLenses();

    // Setup event handlers
    setupEventHandlers();

    /**
     * Wait for Firebase and lens compatibility to be ready
     */
    async function waitForDependencies() {
        return new Promise((resolve) => {
            let attempts = 0;
            const maxAttempts = 50;

            const check = () => {
                attempts++;
                if (typeof firebase !== 'undefined' &&
                    firebase.firestore &&
                    typeof window.getCompatibleLensesSmartly === 'function') {
                    resolve();
                } else if (attempts >= maxAttempts) {
                    console.error('Dependencies not loaded');
                    resolve();
                } else {
                    setTimeout(check, 100);
                }
            };
            check();
        });
    }

    /**
     * Load compatible lenses from Firebase
     */
    async function loadCompatibleLenses() {
        const brand = valuationData.brandName;
        const model = valuationData.modelName;

        if (!brand || !model) {
            showNoLenses();
            return;
        }

        try {
            // Use the smart lens compatibility function
            compatibleLenses = await window.getCompatibleLensesSmartly(brand, model);

            if (!compatibleLenses || compatibleLenses.length === 0) {
                // Try alternate query with category = 'Lens'
                compatibleLenses = await fetchLensesByCategory(brand);
            }

            if (compatibleLenses && compatibleLenses.length > 0) {
                renderDropdown();
            } else {
                showNoLenses();
            }
        } catch (error) {
            console.error('Error loading lenses:', error);
            showNoLenses();
        }
    }

    /**
     * Alternate lens fetch using category = 'Lens'
     */
    async function fetchLensesByCategory(brand) {
        if (!window.firebase || !firebase.firestore) return [];

        try {
            const db = firebase.firestore();
            const snapshot = await db.collection('products')
                .where('category', '==', 'Lens')
                .where('brand', '==', brand)
                .get();

            if (snapshot.empty) return [];

            const lenses = [];
            snapshot.forEach(doc => {
                const data = doc.data();
                lenses.push({
                    id: doc.id,
                    name: data.name,
                    price: data.price || 0,
                    image: data.image || ''
                });
            });

            return lenses.sort((a, b) => a.name.localeCompare(b.name));
        } catch (error) {
            console.error('Error fetching lenses by category:', error);
            return [];
        }
    }

    /**
     * Render dropdown with lenses
     */
    function renderDropdown() {
        loadingState.classList.add('hidden');
        lensDropdownWrapper.style.display = 'block';

        // Initialize filtered lenses with all lenses
        filteredLenses = [...compatibleLenses];
        updateDropdownOptions();

        if (window.Logger) {
            window.Logger.log(`Loaded ${compatibleLenses.length} compatible lenses`);
        }
    }

    /**
     * Update dropdown options based on filtered lenses
     */
    function updateDropdownOptions() {
        let optionsHtml = `<option value="">Select a lens... (${filteredLenses.length} available)</option>`;
        filteredLenses.forEach((lens, index) => {
            // Find original index in compatibleLenses for value
            const originalIndex = compatibleLenses.findIndex(l => l.id === lens.id);
            optionsHtml += `<option value="${originalIndex}">${escapeHtml(lens.name)}</option>`;
        });

        lensSelect.innerHTML = optionsHtml;
    }

    /**
     * Filter lenses based on search query
     */
    function filterLenses(query) {
        const searchTerm = query.toLowerCase().trim();

        if (!searchTerm) {
            filteredLenses = [...compatibleLenses];
        } else {
            filteredLenses = compatibleLenses.filter(lens =>
                lens.name.toLowerCase().includes(searchTerm)
            );
        }

        updateDropdownOptions();
    }

    /**
     * Show no lenses state
     */
    function showNoLenses() {
        loadingState.classList.add('hidden');
        lensDropdownWrapper.style.display = 'block';
        lensSelect.innerHTML = '<option value="">No compatible lenses found</option>';
        lensSelect.disabled = true;
    }

    /**
     * Add a lens to selected list
     */
    function addLensToList(lens) {
        // Check if already selected
        if (selectedLenses.find(l => l.id === lens.id)) {
            return;
        }

        selectedLenses.push(lens);
        renderSelectedLenses();

        // Reset dropdown
        lensSelect.value = '';

        // Show add another button
        addAnotherBtn.style.display = 'inline-flex';
    }

    /**
     * Remove a lens from selected list
     */
    function removeLensFromList(lensId) {
        selectedLenses = selectedLenses.filter(l => l.id !== lensId);
        renderSelectedLenses();

        if (selectedLenses.length === 0) {
            addAnotherBtn.style.display = 'none';
        }
    }

    /**
     * Render selected lenses list
     */
    function renderSelectedLenses() {
        if (selectedLenses.length === 0) {
            selectedLensesList.innerHTML = '';
            updateSidebarLenses(); // Update sidebar too
            return;
        }

        selectedLensesList.innerHTML = selectedLenses.map(lens => `
            <div class="selected-lens-item" data-lens-id="${lens.id}">
                <span class="selected-lens-name">${escapeHtml(lens.name)}</span>
                <button type="button" class="remove-lens-btn" data-lens-id="${lens.id}" aria-label="Remove lens">
                    <i class="fa-solid fa-times"></i>
                </button>
            </div>
        `).join('');

        // Add remove handlers
        selectedLensesList.querySelectorAll('.remove-lens-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                removeLensFromList(btn.dataset.lensId);
            });
        });

        // Update sidebar
        updateSidebarLenses();
    }

    /**
     * Update sidebar selected lenses list
     */
    function updateSidebarLenses() {
        if (!sidebarSelectedLenses) return;

        if (selectedLenses.length === 0) {
            sidebarSelectedLenses.innerHTML = '<p class="no-lenses-text">No lenses selected yet</p>';
        } else {
            sidebarSelectedLenses.innerHTML = selectedLenses.map(lens => `
                <div class="sidebar-lens-item">${escapeHtml(lens.name)}</div>
            `).join('');
        }
    }

    /**
     * Escape HTML
     */
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    /**
     * Setup event handlers
     */
    function setupEventHandlers() {
        // Lens dropdown change
        lensSelect?.addEventListener('change', () => {
            const index = lensSelect.value;
            if (index !== '' && compatibleLenses[index]) {
                addLensToList(compatibleLenses[index]);
            }
        });

        // Add another button (shows dropdown again)
        addAnotherBtn?.addEventListener('click', () => {
            lensSelect.focus();
        });

        // Search input - filter lenses as user types
        searchInput?.addEventListener('input', (e) => {
            filterLenses(e.target.value);
        });

        // Skip button - clear lens data and go to physical condition
        const skipBtn = document.getElementById('skipBtn');
        skipBtn?.addEventListener('click', (e) => {
            e.preventDefault();

            // Clear any lens selection data
            valuationData.selectedLenses = [];
            valuationData.lensBonus = 0;
            valuationData.hasAdditionalLens = false;

            sessionStorage.setItem('valuationData', JSON.stringify(valuationData));

            if (window.Logger) {
                window.Logger.log('Skipped lens selection');
            }

            // Navigate to physical condition
            window.location.href = 'physical-condition.html';
        });

        // Continue button
        continueBtn?.addEventListener('click', () => {
            // Store selected lenses (prices will be shown on final page)
            valuationData.selectedLenses = selectedLenses;
            valuationData.lensBonus = selectedLenses.reduce((sum, lens) => {
                // Calculate bonus (15% of price or default)
                const bonus = lens.price ? Math.round(lens.price * 0.15) : 5000;
                return sum + bonus;
            }, 0);

            sessionStorage.setItem('valuationData', JSON.stringify(valuationData));

            if (window.Logger) {
                window.Logger.log(`Selected ${selectedLenses.length} lenses`);
            }

            // Navigate to physical condition
            window.location.href = 'physical-condition.html';
        });
    }
});

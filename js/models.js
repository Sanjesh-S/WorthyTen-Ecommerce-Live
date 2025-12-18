/**
 * Models Page Script
 * Handles model selection for a specific category and brand
 * Reads category and brand from URL params and displays relevant models
 * @file js/models.js
 */

// ===== URL PARAMS & STATE =====
const urlParams = new URLSearchParams(window.location.search);
const currentCategory = urlParams.get('category');
const currentBrand = urlParams.get('brand');
let currentProductType = 'bodies'; // For DSLR: 'bodies' or 'lenses'

// ===== DOM ELEMENTS =====
const modelGrid = document.getElementById('model-grid');
const brandTitle = document.getElementById('selected-brand-title');
const typeTitle = document.getElementById('selected-type-title');
const searchInput = document.getElementById('search-input');
const noResults = document.getElementById('no-results');
const dividerText = document.getElementById('divider-text');
const backButton = document.getElementById('back-to-brands');
const productTypeTabs = document.getElementById('product-type-tabs');

// ===== GLOBAL DATA =====
let allProducts = [];

// ===== INITIALIZATION =====
function init() {
    // Validate params
    if (!currentCategory || !currentBrand) {
        window.location.href = 'index.html';
        return;
    }

    // Update back button
    backButton.href = `brands.html?category=${encodeURIComponent(currentCategory)}`;

    // Update UI
    brandTitle.textContent = currentBrand;
    dividerText.textContent = `Select ${currentBrand} Model`;
    document.title = `${currentBrand} Models - WorthyTen`;

    // Show product type tabs for DSLR (only if there are lenses)
    if (currentCategory === 'DSLR/Lens') {
        setupProductTypeTabs();
    }

    // Load products and display models
    loadProducts();

    // Setup search
    setupSearch();
}

// ===== PRODUCT TYPE TABS (DSLR) =====
function setupProductTypeTabs() {
    const tabs = productTypeTabs.querySelectorAll('.type-tab');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Update active state
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Update current type
            currentProductType = tab.dataset.type;

            // Update type title
            typeTitle.textContent = currentProductType === 'lenses' ? 'Lenses' : 'Cameras';

            // Re-display models
            displayModels();
        });
    });
}

// ===== LOAD PRODUCTS FROM FIREBASE =====
async function loadProducts() {
    // Show loading state
    modelGrid.innerHTML = `
    <div class="loading-state" style="grid-column: 1/-1; text-align: center; padding: 3rem;">
      <i class="fa-solid fa-spinner fa-spin" style="font-size: 2rem; color: var(--primary);"></i>
      <p style="margin-top: 1rem; color: var(--text-muted);">Loading models...</p>
    </div>
  `;

    try {
        // Wait for Firebase to be ready
        await waitForFirebase();

        const db = firebase.firestore();
        const snapshot = await db.collection('products')
            .where('category', '==', currentCategory)
            .where('brand', '==', currentBrand)
            .get();

        allProducts = [];
        snapshot.forEach(doc => {
            allProducts.push({ id: doc.id, ...doc.data() });
        });

        // Check if we have lenses - only show tabs if there are lenses
        if (currentCategory === 'DSLR/Lens') {
            const hasLenses = allProducts.some(p => p.subcategory === 'Lens');
            if (hasLenses) {
                productTypeTabs.style.display = 'flex';
            } else {
                productTypeTabs.style.display = 'none';
            }
        }

        // Display models
        displayModels();

        if (window.Logger) {
            window.Logger.log(`Loaded ${allProducts.length} models for ${currentBrand} in ${currentCategory}`);
        }
    } catch (error) {
        if (window.Logger) {
            window.Logger.error('Error loading products:', error);
        }
        modelGrid.innerHTML = `
      <div class="error-state" style="grid-column: 1/-1; text-align: center; padding: 3rem;">
        <i class="fa-solid fa-exclamation-triangle" style="font-size: 2rem; color: var(--danger);"></i>
        <p style="margin-top: 1rem;">Failed to load models. Please try again.</p>
        <button onclick="location.reload()" class="btn-primary" style="margin-top: 1rem;">Retry</button>
      </div>
    `;
    }
}

// ===== WAIT FOR FIREBASE =====
function waitForFirebase() {
    return new Promise((resolve, reject) => {
        let attempts = 0;
        const maxAttempts = 50;

        const check = () => {
            attempts++;
            if (typeof firebase !== 'undefined' && firebase.firestore) {
                resolve();
            } else if (attempts >= maxAttempts) {
                reject(new Error('Firebase not loaded'));
            } else {
                setTimeout(check, 100);
            }
        };
        check();
    });
}

// ===== DISPLAY MODELS =====
function displayModels(searchTerm = '') {
    let models = allProducts;

    // Note: After migration, DSLR and Lens are separate categories
    // No need for special filtering - each category contains only its own products

    // Filter by search term
    if (searchTerm) {
        const term = searchTerm.toLowerCase();
        models = models.filter(product =>
            product.name.toLowerCase().includes(term)
        );
    }

    // Skip products without valid price
    models = models.filter(product => {
        const price = Number(product.price);
        return price && price > 0 && !isNaN(price);
    });

    // Sort naturally
    const collator = new Intl.Collator('en', { numeric: true, sensitivity: 'base' });
    models.sort((a, b) => collator.compare(a.name, b.name));

    if (models.length === 0) {
        modelGrid.innerHTML = '';
        noResults.style.display = 'block';
        return;
    }

    noResults.style.display = 'none';

    // Check if category needs variant selection
    const needsVariants = window.supportsVariants && window.supportsVariants(currentCategory);

    if (needsVariants) {
        // Group by base model for Phone/Laptop/iPad
        displayGroupedModels(models);
    } else {
        // Display individual models for DSLR
        displayIndividualModels(models);
    }
}

// ===== DISPLAY INDIVIDUAL MODELS (DSLR) =====
function displayIndividualModels(models) {
    modelGrid.innerHTML = models.map(model => {
        const price = Number(model.price);
        const imageUrl = model.image || '';

        // Build URL for quote.html
        const href = `quote.html?model=${encodeURIComponent(model.name)}&brand=${encodeURIComponent(currentBrand)}&category=${encodeURIComponent(currentCategory)}&image=${encodeURIComponent(imageUrl)}&price=${encodeURIComponent(price)}`;

        return `
      <a href="${href}" class="model-card" title="${model.name}" aria-label="Get quote for ${model.name}">
        <div class="model-image-container">
          <img src="${imageUrl}" alt="${model.name}" class="model-image" loading="lazy"
               onerror="this.src='https://via.placeholder.com/200?text=${encodeURIComponent(model.name.split(' ').slice(0, 2).join(' '))}'" />
          <span class="quick-view-badge">Get Quote</span>
        </div>
        <div class="model-info">
          <p class="model-name">${model.name}</p>
        </div>
      </a>
    `;
    }).join('');
}

// ===== DISPLAY GROUPED MODELS (Phone/Laptop/iPad) =====
function displayGroupedModels(models) {
    // Group by base model (for variants)
    const modelGroups = {};

    models.forEach(product => {
        // Use baseModel if available, otherwise extract from name
        let baseModel = product.baseModel || extractBaseModel(product.name);

        if (!modelGroups[baseModel]) {
            modelGroups[baseModel] = {
                baseModel: baseModel,
                brand: product.brand,
                category: product.category,
                image: product.image,
                variants: []
            };
        }
        modelGroups[baseModel].variants.push({
            name: product.name,
            variant: product.variant || extractVariant(product.name),
            price: product.price,
            image: product.image
        });
    });

    // Sort base models naturally
    const collator = new Intl.Collator('en', { numeric: true, sensitivity: 'base' });
    const sortedBaseModels = Object.keys(modelGroups).sort((a, b) => collator.compare(a, b));

    modelGrid.innerHTML = sortedBaseModels.map(baseModel => {
        const group = modelGroups[baseModel];
        const minPrice = Math.min(...group.variants.map(v => Number(v.price) || 0));
        const imageUrl = group.image || '';
        const variantCount = group.variants.length;

        return `
      <div class="model-card" 
           data-basemodel="${baseModel}"
           data-group='${JSON.stringify(group).replace(/'/g, "&#39;")}'
           onclick="selectGroupedModel(this)"
           style="cursor: pointer;">
        <div class="model-image-container">
          <img src="${imageUrl}" alt="${baseModel}" class="model-image" loading="lazy"
               onerror="this.src='https://via.placeholder.com/200?text=${encodeURIComponent(baseModel.split(' ').slice(0, 2).join(' '))}'" />
          <span class="quick-view-badge">Select</span>
        </div>
        <div class="model-info">
          <p class="model-name">${baseModel}</p>
          ${variantCount > 1 ? `<span class="model-variants">${variantCount} variants</span>` : ''}
        </div>
      </div>
    `;
    }).join('');
}

// ===== HELPER: Extract base model from name =====
function extractBaseModel(productName) {
    if (!productName) return productName;
    return productName
        .replace(/\s*\(\d+\s*(GB|TB)\)\s*(WiFi(\+Cellular)?)?/gi, '')
        .replace(/\s*\(\d+\s*(GB|TB)\s*(RAM)?\s*\/\s*\d+\s*(GB|TB)\)\s*\d{4}?/gi, '')
        .trim();
}

// ===== HELPER: Extract variant from name =====
function extractVariant(productName) {
    if (!productName) return '';
    const match = productName.match(/\((\d+\s*(GB|TB)(\s*(RAM)?\s*\/\s*\d+\s*(GB|TB))?)\)/i);
    return match ? match[1] : '';
}

// ===== SELECT GROUPED MODEL (for Phone/Laptop/iPad) =====
function selectGroupedModel(element) {
    const group = JSON.parse(element.dataset.group.replace(/&#39;/g, "'"));
    const baseModel = element.dataset.basemodel;

    // Store in sessionStorage for variant-selection page
    sessionStorage.setItem('selectedProduct', JSON.stringify({
        baseModel: baseModel,
        brand: group.brand,
        category: group.category,
        image: group.image,
        variants: group.variants
    }));

    const minPrice = Math.min(...group.variants.map(v => Number(v.price) || 0));

    // Navigate to variant selection page
    window.location.href = `variant-selection.html?model=${encodeURIComponent(baseModel)}&brand=${encodeURIComponent(group.brand)}&category=${encodeURIComponent(group.category)}&image=${encodeURIComponent(group.image || '')}&price=${encodeURIComponent(minPrice)}`;
}

// Make function global
window.selectGroupedModel = selectGroupedModel;

// ===== SEARCH =====
function setupSearch() {
    let searchTimeout;

    searchInput.addEventListener('input', () => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            const term = searchInput.value.trim();
            displayModels(term);
        }, 300);
    });
}

// ===== START =====
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

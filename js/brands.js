/**
 * Brands Page Script
 * Handles brand selection for a specific category
 * Reads category from URL params and displays relevant brands
 * @file js/brands.js
 */

// ===== URL PARAMS & STATE =====
const urlParams = new URLSearchParams(window.location.search);
const currentCategory = urlParams.get('category');

// ===== DOM ELEMENTS =====
const brandGrid = document.getElementById('brand-grid');
const categoryTitle = document.getElementById('selected-category-title');
const searchInput = document.getElementById('search-input');
const noResults = document.getElementById('no-results');
const dividerText = document.getElementById('divider-text');

// ===== GLOBAL DATA =====
let allProducts = [];
let allBrands = [];

// ===== BRAND LOGOS (same as in original script.js) =====
const brandLogos = {
  // Camera brands
  Canon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Canon_wordmark.svg/150px-Canon_wordmark.svg.png',
  Nikon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Nikon_wordmark.svg/150px-Nikon_wordmark.svg.png',
  Sony: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Sony_logo.svg/150px-Sony_logo.svg.png',
  Fujifilm:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Fujifilm_logo.svg/150px-Fujifilm_logo.svg.png',
  Panasonic:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Panasonic_logo_%28Blue%29.svg/150px-Panasonic_logo_%28Blue%29.svg.png',
  Olympus:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Olympus_Corporation_logo.svg/150px-Olympus_Corporation_logo.svg.png',
  Leica:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Leica_Camera_AG_logo.svg/150px-Leica_Camera_AG_logo.svg.png',
  Pentax: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Pentax_logo.svg/150px-Pentax_logo.svg.png',
  Hasselblad:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Hasselblad_logo.svg/150px-Hasselblad_logo.svg.png',
  Sigma: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Sigma_Corporation_logo.svg/150px-Sigma_Corporation_logo.svg.png',
  Tamron: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Tamron_logo.svg/150px-Tamron_logo.svg.png',
  Tokina: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Tokina_Logo.svg/150px-Tokina_Logo.svg.png',
  Samyang: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Samyang_Optics_logo.svg/150px-Samyang_Optics_logo.svg.png',
  Zeiss: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Zeiss_logo.svg/150px-Zeiss_logo.svg.png',
  Viltrox: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Viltrox_Logo.png/150px-Viltrox_Logo.png',
  // Phone brands
  Apple: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/100px-Apple_logo_black.svg.png',
  Samsung:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Samsung_Logo.svg/150px-Samsung_Logo.svg.png',
  OnePlus:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/OnePlus_logo.svg/150px-OnePlus_logo.svg.png',
  Google: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/150px-Google_2015_logo.svg.png',
  Xiaomi: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Xiaomi_logo_%282021-%29.svg/150px-Xiaomi_logo_%282021-%29.svg.png',
  Vivo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Vivo_logo_2019.svg/150px-Vivo_logo_2019.svg.png',
  Oppo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/OPPO_LOGO_2019.svg/150px-OPPO_LOGO_2019.svg.png',
  Realme: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Realme_logo.svg/150px-Realme_logo.svg.png',
  Motorola: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Motorola-logo.svg/150px-Motorola-logo.svg.png',
  Nothing: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Nothing_wordmark.svg/150px-Nothing_wordmark.svg.png',
  // Laptop brands
  HP: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/HP_logo_2012.svg/100px-HP_logo_2012.svg.png',
  Dell: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Dell_Logo.svg/150px-Dell_Logo.svg.png',
  Lenovo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Lenovo_logo_2015.svg/150px-Lenovo_logo_2015.svg.png',
  Asus: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/ASUS_Logo.svg/150px-ASUS_Logo.svg.png',
  Acer: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Acer_2011.svg/150px-Acer_2011.svg.png',
  MSI: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/MSI_Logo.svg/150px-MSI_Logo.svg.png',
  Microsoft: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Microsoft_logo_%282012%29.svg/150px-Microsoft_logo_%282012%29.svg.png',
  Razer: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Razer_wordmark.svg/150px-Razer_wordmark.svg.png',
  LG: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/LG_symbol.svg/100px-LG_symbol.svg.png',
  Huawei: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Huawei_Logo.svg/150px-Huawei_Logo.svg.png'
};

// ===== INITIALIZATION =====
function init() {
  // Validate category
  if (!currentCategory) {
    window.location.href = 'index.html';
    return;
  }

  // Update UI
  categoryTitle.textContent = getCategoryDisplayName(currentCategory);
  dividerText.textContent = `Select ${getCategoryDisplayName(currentCategory)} Brand`;
  document.title = `Select ${getCategoryDisplayName(currentCategory)} Brand - WorthyTen`;

  // Load products and display brands
  loadProducts();

  // Setup search
  setupSearch();
}

// ===== CATEGORY DISPLAY NAME =====
function getCategoryDisplayName(category) {
  const names = {
    'DSLR/Lens': 'Camera',
    'Phone': 'Phone',
    'Laptop': 'Laptop',
    'iPad': 'iPad/Tablet'
  };
  return names[category] || category;
}

// ===== LOAD PRODUCTS FROM FIREBASE =====
async function loadProducts() {
  // Show loading state
  brandGrid.innerHTML = `
    <div class="loading-state" style="grid-column: 1/-1; text-align: center; padding: 3rem;">
      <i class="fa-solid fa-spinner fa-spin" style="font-size: 2rem; color: var(--primary);"></i>
      <p style="margin-top: 1rem; color: var(--text-muted);">Loading brands...</p>
    </div>
  `;

  try {
    // Wait for Firebase to be ready
    await waitForFirebase();

    const db = firebase.firestore();
    const snapshot = await db.collection('products').where('category', '==', currentCategory).get();

    allProducts = [];
    snapshot.forEach(doc => {
      allProducts.push({ id: doc.id, ...doc.data() });
    });

    // Extract unique brands
    const brandsSet = new Set();
    allProducts.forEach(product => {
      if (product.brand) {
        brandsSet.add(product.brand);
      }
    });

    allBrands = Array.from(brandsSet).sort();

    // Display brands
    displayBrands(allBrands);

    if (window.Logger) {
      window.Logger.log(`Loaded ${allProducts.length} products, ${allBrands.length} brands for ${currentCategory}`);
    }
  } catch (error) {
    if (window.Logger) {
      window.Logger.error('Error loading products:', error);
    }
    brandGrid.innerHTML = `
      <div class="error-state" style="grid-column: 1/-1; text-align: center; padding: 3rem;">
        <i class="fa-solid fa-exclamation-triangle" style="font-size: 2rem; color: var(--danger);"></i>
        <p style="margin-top: 1rem;">Failed to load brands. Please try again.</p>
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

// ===== DISPLAY BRANDS =====
function displayBrands(brands) {
  if (brands.length === 0) {
    brandGrid.innerHTML = '';
    noResults.style.display = 'block';
    return;
  }

  noResults.style.display = 'none';

  brandGrid.innerHTML = brands.map(brand => {
    const logoUrl = brandLogos[brand] || '';

    // Old style: just logo and brand name below
    return `
      <a href="models.html?category=${encodeURIComponent(currentCategory)}&brand=${encodeURIComponent(brand)}" 
         class="brand-card" role="listitem" aria-label="Select ${brand}">
        <div class="brand-card-content">
          ${logoUrl
        ? `<img src="${logoUrl}" alt="${brand} logo" class="brand-logo" loading="lazy" 
                   onerror="this.style.display='none'; this.nextElementSibling.style.display='block';" />
               <span class="brand-name-fallback" style="display:none;">${brand}</span>`
        : `<span class="brand-name-text">${brand}</span>`
      }
        </div>
        <span class="brand-name">${brand}</span>
      </a>
    `;
  }).join('');
}

// ===== SEARCH =====
function setupSearch() {
  let searchTimeout;

  searchInput.addEventListener('input', () => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      const term = searchInput.value.toLowerCase().trim();

      if (term === '') {
        displayBrands(allBrands);
      } else {
        const filtered = allBrands.filter(brand =>
          brand.toLowerCase().includes(term)
        );
        displayBrands(filtered);
      }
    }, 300);
  });
}

// ===== START =====
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

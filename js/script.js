/**
 * Homepage Script
 * Handles device selection flow: Categories → Brands → Models
 * Fetches products from Firestore and displays them dynamically
 * @file js/script.js
 */

// ===== DOM ELEMENTS =====
const searchInput = document.getElementById('search-input');
const dividerText = document.getElementById('divider-text');

const categorySelection = document.getElementById('category-selection');
const brandSelection = document.getElementById('brand-selection');
const productTypeSelection = document.getElementById('product-type-selection');
const modelSelection = document.getElementById('model-selection');

const categoryGrid = document.getElementById('category-grid');
const brandGrid = document.getElementById('brand-grid');
const productTypeGrid = document.getElementById('product-type-grid');
const modelGrid = document.getElementById('model-grid');

const selectedCategoryTitle = document.getElementById('selected-category-title');
const selectedBrandTitle = document.getElementById('selected-brand-title');
const selectedBrandForType = document.getElementById('selected-brand-for-type');
const selectedTypeTitle = document.getElementById('selected-type-title');

const backToCategoriesBtn = document.getElementById('back-to-categories');
const backToBrandsBtn = document.getElementById('back-to-brands');
const backToBrandsFromTypeBtn = document.getElementById('back-to-brands-from-type');
const backToTypesBtn = document.getElementById('back-to-types');

// ===== GLOBAL DATA STORE =====
// This will hold all our products fetched from Firestore
let allProducts = [];
let productsLoaded = false; // Track if products are fully loaded
let currentCategory = null;
let currentBrand = null;
let currentProductType = null; // 'bodies' or 'lenses'

// ===== NAVIGATION & DISPLAY LOGIC =====

// Show/Hide sections
function showSection(sectionToShow) {
  [categorySelection, brandSelection, productTypeSelection, modelSelection].forEach(section => {
    section.classList.add('hidden');
  });
  sectionToShow.classList.remove('hidden');
}

// 1. Populate Categories with images
function populateCategories() {
  categoryGrid.innerHTML = '';

  const categories = [
    ...new Set(
      allProducts.map(p => p.category).filter(c => c) // This filters out any falsy values (null, undefined, "")
    )
  ];
  categories.sort(); // Sort them alphabetically

  // Category images mapping - high quality professional images
  const categoryImages = {
    'DSLR/Lens':
      'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2',
    Lens: 'https://images.pexels.com/photos/5082579/pexels-photo-5082579.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2',
    Phone:
      'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2',
    Laptop:
      'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2',
    iPad: 'https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2'
  };

  categories.forEach(categoryName => {
    const imageUrl =
      categoryImages[categoryName] ||
      'https://via.placeholder.com/400x400/667eea/ffffff?text=' + categoryName;

    // All categories now use images (no icons)
    // Change display name for DSLR/Lens to "Sell DSLR"
    const displayName = categoryName === 'DSLR/Lens' ? 'Sell DSLR' : `Sell ${categoryName}`;

    let cardContent;
    cardContent = `
      <a href="#" class="category-card" data-category="${categoryName}" aria-label="Select ${categoryName} category">
        <div class="category-image-container">
          <img src="${imageUrl}" alt="${categoryName}" class="category-image" loading="lazy">
        </div>
        <span class="category-name">${displayName}</span>
      </a>
    `;

    categoryGrid.innerHTML += cardContent;
  });

  // Add click listeners to the new category cards
  categoryGrid.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', e => {
      e.preventDefault();
      currentCategory = card.getAttribute('data-category');
      selectedCategoryTitle.textContent = currentCategory;
      dividerText.textContent = 'Or choose a brand';

      populateBrands(currentCategory);
      showSection(brandSelection);
      searchInput.value = ''; // Clear search
      searchInput.placeholder = 'Search for a brand or model';
    });
  });
}

// 2. Populate Brands with logos
function populateBrands(categoryName) {
  brandGrid.innerHTML = '';

  // Brand logo mapping - using logo.dev for reliable CDN logos
  const brandLogos = {
    Canon: 'https://firebasestorage.googleapis.com/v0/b/worthyten-otp-a925d.firebasestorage.app/o/Logo%2Fcanon%20logo.jpg?alt=media&token=508660ea-5cb6-45cf-b50d-f852ccce3669',
    Nikon: 'https://firebasestorage.googleapis.com/v0/b/worthyten-otp-a925d.firebasestorage.app/o/Logo%2FNikon%20Logo.jpg?alt=media&token=364ab77d-c2bf-4eba-9919-e7d68a31e7f4',
    Sony: 'https://firebasestorage.googleapis.com/v0/b/worthyten-otp-a925d.firebasestorage.app/o/Logo%2FSony%20Logo.jpg?alt=media&token=568a7fc1-d120-4f6c-bc91-6cb162d05912',
    Fujifilm: 'https://firebasestorage.googleapis.com/v0/b/worthyten-otp-a925d.firebasestorage.app/o/Logo%2Ffujifilm%20logo.jpg?alt=media&token=a5adeb8a-2376-42e9-9bc7-e68841261cee',
    Apple: 'https://logo.clearbit.com/apple.com',
    Samsung: 'https://logo.clearbit.com/samsung.com',
    GoPro: 'https://firebasestorage.googleapis.com/v0/b/worthyten-otp-a925d.firebasestorage.app/o/Logo%2FGoPro%20Logo.jpg?alt=media&token=6a5df1ad-7f3b-40b0-9f3e-237a90cf24c0',
    DJI: 'https://logo.clearbit.com/dji.com',
    Panasonic: 'https://logo.clearbit.com/panasonic.com',
    Olympus: 'https://logo.clearbit.com/olympus.com',
    Pentax: 'https://logo.clearbit.com/pentax.com'
  };

  // Special handling for DSLR/Lens category - show cameras and lenses as separate brands
  if (categoryName === 'DSLR/Lens') {
    // Get brands that have cameras
    const cameraBrands = [
      ...new Set(
        allProducts
          .filter(p => p.category === categoryName && !p.subcategory)
          .map(p => p.brand)
          .filter(b => b)
      )
    ].sort();

    // Get brands that have lenses
    const lensBrands = [
      ...new Set(
        allProducts
          .filter(p => p.category === categoryName && p.subcategory === 'Lens')
          .map(p => p.brand)
          .filter(b => b)
      )
    ].sort();

    // Create brand list with cameras only (lenses hidden from initial selection)
    const brandList = [];

    // Add all camera brands only
    for (const brand of cameraBrands) {
      brandList.push({ name: brand, type: 'camera', displayName: brand });
    }

    // Lens brands are hidden from initial selection
    // Users can select lenses during the additional lens selection step

    console.log(
      `Total brand options: ${brandList.length} (${cameraBrands.length} camera brands, ${lensBrands.length} lens brands available in additional lens selection)`
    );

    // Render brand cards
    brandList.forEach(brandInfo => {
      const logoUrl = brandLogos[brandInfo.name] || '';
      const displayName = brandInfo.displayName;

      const cardHTML = `
        <a href="#" class="brand-card" data-brand="${brandInfo.name}" data-type="${brandInfo.type}" aria-label="Select ${displayName}">
          ${logoUrl ? `<img src="${logoUrl}" alt="${brandInfo.name} logo" class="brand-logo-img" loading="lazy" onerror="this.onerror=null; this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(brandInfo.name)}&size=80&background=667eea&color=fff&bold=true'">` : ''}
          <span class="brand-name">${displayName}</span>
        </a>
      `;
      brandGrid.innerHTML += cardHTML;
    });
  } else {
    // For other categories (Phone, Laptop), use original logic
    const brands = [
      ...new Set(
        allProducts
          .filter(p => p.category === categoryName)
          .map(p => p.brand)
          .filter(b => b)
      )
    ].sort();

    brands.forEach(brandName => {
      const logoUrl = brandLogos[brandName] || '';
      const displayName = brandName;

      const cardHTML = `
        <a href="#" class="brand-card" data-brand="${brandName}" data-type="product" aria-label="Select ${displayName}">
          ${logoUrl ? `<img src="${logoUrl}" alt="${brandName} logo" class="brand-logo-img" loading="lazy" onerror="this.onerror=null; this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(brandName)}&size=80&background=667eea&color=fff&bold=true'">` : ''}
          <span class="brand-name">${displayName}</span>
        </a>
      `;
      brandGrid.innerHTML += cardHTML;
    });
  }

  // Add click listeners to the new brand cards
  brandGrid.querySelectorAll('.brand-card').forEach(card => {
    card.addEventListener('click', e => {
      e.preventDefault();

      // Ensure products are loaded before proceeding
      if (!productsLoaded) {
        if (window.Logger) {
          window.Logger.warn('Products not loaded yet, please wait...');
        }
        alert('Products are still loading. Please wait a moment and try again.');
        return;
      }

      currentBrand = card.getAttribute('data-brand');
      const brandType = card.getAttribute('data-type');

      // For DSLR/Lens category
      if (currentCategory === 'DSLR/Lens') {
        if (brandType === 'lens') {
          selectedBrandTitle.textContent = `${currentBrand}-Lens`;
          dividerText.textContent = 'Or choose a lens model';

          // Filter for lenses only
          populateModelsForLens(currentBrand);
          showSection(modelSelection);
          searchInput.value = '';
          searchInput.placeholder = 'Search for a lens';
        } else {
          selectedBrandTitle.textContent = currentBrand;
          dividerText.textContent = 'Or choose a camera model';

          // Filter for cameras only
          populateModelsForCamera(currentBrand);
          showSection(modelSelection);
          searchInput.value = '';
          searchInput.placeholder = 'Search for a camera';
        }
      } else {
        // For other categories (Phone, Laptop)
        selectedBrandTitle.textContent = currentBrand;
        dividerText.textContent = 'Or choose a model';

        populateModels(currentCategory, currentBrand);
        showSection(modelSelection);
        searchInput.value = '';
        searchInput.placeholder = 'Search for a model';
      }
    });
  });
}

// 2.4 Populate Models for Cameras (DSLR/Lens category - cameras only)
function populateModelsForCamera(brandName) {
  modelGrid.innerHTML = '';

  // Get cameras only (products without subcategory='Lens')
  const models = allProducts.filter(
    p => p.category === 'DSLR/Lens' && p.brand === brandName && !p.subcategory
  );

  // Sort naturally
  const collator = new Intl.Collator('en', { numeric: true, sensitivity: 'base' });
  models.sort((a, b) => collator.compare(a.name, b.name));

  console.log(`📷 Showing ${models.length} camera models for brand: ${brandName}`);

  models.forEach(model => {
    // Skip models without price
    if (!model.price || model.price === 0 || isNaN(Number(model.price))) {
      if (window.Logger) {
        window.Logger.warn('Model missing or invalid price:', model.name, 'Data:', model);
      }
      return; // Skip this model
    }

    const price = Number(model.price);
    if (price <= 0) {
      if (window.Logger) {
        window.Logger.warn('Model has invalid price (<= 0):', model.name, 'Price:', price);
      }
      return; // Skip this model
    }

    const cardHTML = `
      <a href="quote.html?model=${encodeURIComponent(model.name)}&brand=${encodeURIComponent(brandName)}&category=DSLR/Lens&image=${encodeURIComponent(model.image || '')}&price=${encodeURIComponent(price)}" class="model-card" title="${model.name}" aria-label="Get quote for ${model.name}">
        <img src="${model.image || ''}" alt="${model.name}" class="model-image" loading="lazy">
        <span class="model-name">${model.name}</span>
      </a>
    `;
    modelGrid.innerHTML += cardHTML;
  });
}

// 2.5 Populate Models for Lenses (DSLR/Lens category - lenses only)
function populateModelsForLens(brandName) {
  modelGrid.innerHTML = '';

  // Get lenses only (products with subcategory='Lens')
  const models = allProducts.filter(
    p => p.category === 'DSLR/Lens' && p.brand === brandName && p.subcategory === 'Lens'
  );

  // Sort naturally
  const collator = new Intl.Collator('en', { numeric: true, sensitivity: 'base' });
  models.sort((a, b) => collator.compare(a.name, b.name));

  models.forEach(model => {
    // Skip models without price
    if (!model.price || model.price === 0 || isNaN(Number(model.price))) {
      if (window.Logger) {
        window.Logger.warn('Model missing or invalid price:', model.name);
      }
      return;
    }

    const price = Number(model.price);
    if (price <= 0) {
      if (window.Logger) {
        window.Logger.warn('Model has invalid price (<= 0):', model.name);
      }
      return;
    }

    const cardHTML = `
      <a href="quote.html?model=${encodeURIComponent(model.name)}&brand=${encodeURIComponent(brandName)}&category=Lens&image=${encodeURIComponent(model.image || '')}&price=${encodeURIComponent(price)}" class="model-card" title="${model.name}" aria-label="Get quote for ${model.name}">
        <img src="${model.image || ''}" alt="${model.name}" class="model-image" loading="lazy">
        <span class="model-name">${model.name}</span>
      </a>
    `;
    modelGrid.innerHTML += cardHTML;
  });
}

// 2.6 Populate Product Types (Bodies vs Lenses) - Only for DSLR Camera
function populateProductTypes(brandName) {
  productTypeGrid.innerHTML = '';

  // Count available products for each type
  const bodiesCount = allProducts.filter(
    p => p.category === 'DSLR Camera' && p.brand === brandName && p.type !== 'lens'
  ).length;

  const lensesCount = allProducts.filter(
    p => p.category === 'DSLR Camera' && p.brand === brandName && p.type === 'lens'
  ).length;

  // Camera Bodies card
  if (bodiesCount > 0) {
    const bodiesCard = `
      <a href="#" class="brand-card" data-type="bodies" aria-label="Select ${brandName} Camera Bodies">
        <div class="category-icon-container">
          <i class="fa-solid fa-camera category-icon"></i>
        </div>
        <span class="brand-name">${brandName} Camera Bodies</span>
        <span class="product-count">${bodiesCount} models</span>
      </a>
    `;
    productTypeGrid.innerHTML += bodiesCard;
  }

  // Lenses card
  if (lensesCount > 0) {
    const lensesCard = `
      <a href="#" class="brand-card" data-type="lenses" aria-label="Select ${brandName} Lenses">
        <div class="category-icon-container">
          <i class="fa-solid fa-circle-dot category-icon"></i>
        </div>
        <span class="brand-name">${brandName} Lenses</span>
        <span class="product-count">${lensesCount} models</span>
      </a>
    `;
    productTypeGrid.innerHTML += lensesCard;
  }

  // Add click listeners
  productTypeGrid.querySelectorAll('.brand-card').forEach(card => {
    card.addEventListener('click', e => {
      e.preventDefault();
      currentProductType = card.getAttribute('data-type');

      selectedBrandTitle.textContent = currentBrand;
      selectedTypeTitle.textContent = currentProductType === 'bodies' ? 'Camera Bodies' : 'Lenses';
      dividerText.textContent = 'Or choose a model';

      // Show appropriate back button
      document.getElementById('back-to-brands').classList.add('hidden');
      document.getElementById('back-to-types').classList.remove('hidden');

      populateModelsByType(currentCategory, currentBrand, currentProductType);
      showSection(modelSelection);
      searchInput.value = '';
      searchInput.placeholder = 'Search for a model';
    });
  });
}

// 3. Populate Models
function populateModels(categoryName, brandName) {
  modelGrid.innerHTML = '';

  // Get all models that match both category and brand, excluding lenses
  const allModelsForBrand = allProducts.filter(
    p => p.category === categoryName && p.brand === brandName && p.subcategory !== 'Lens'
  );

  // Check if category needs variant selection (Phone, Laptop, iPad)
  const needsVariants = window.supportsVariants && window.supportsVariants(categoryName);

  // Helper function to extract base model from product name
  // Removes variant info like (64GB), (128GB), (256GB), etc.
  function extractBaseModel(productName) {
    if (!productName) return productName;
    // Remove storage variants like (64GB), (128GB), (256GB), (512GB), (1TB), (2TB)
    // Also handles WiFi variants like (64GB) WiFi, (256GB) WiFi+Cellular
    return productName
      .replace(/\s*\(\d+\s*(GB|TB)\)\s*(WiFi(\+Cellular)?)?/gi, '')
      .replace(/\s*\(\d+\s*(GB|TB)\s*(RAM)?\s*\/\s*\d+\s*(GB|TB)\)\s*\d{4}?/gi, '') // MacBook format
      .trim();
  }

  // Helper function to extract variant from product name
  function extractVariant(productName) {
    if (!productName) return '';
    // Match patterns like (64GB), (128GB), etc.
    const match = productName.match(/\((\d+\s*(GB|TB)(\s*(RAM)?\s*\/\s*\d+\s*(GB|TB))?)\)/i);
    return match ? match[1] : '';
  }

  // For categories with variants, group by baseModel to show unique models only
  if (needsVariants) {
    // Group products by baseModel
    const modelGroups = {};
    allModelsForBrand.forEach(product => {
      // Use baseModel if available, otherwise extract from name
      const baseModel = product.baseModel || extractBaseModel(product.name);
      const variant = product.variant || extractVariant(product.name);

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
        variant: variant,
        price: product.price
      });
    });

    // Sort baseModels naturally
    const collator = new Intl.Collator('en', { numeric: true, sensitivity: 'base' });
    const sortedBaseModels = Object.keys(modelGroups).sort((a, b) => collator.compare(a, b));

    // Render unique base models
    sortedBaseModels.forEach(baseModel => {
      const group = modelGroups[baseModel];

      // Find minimum price from variants
      const minPrice = Math.min(...group.variants.map(v => Number(v.price) || 0));

      if (minPrice <= 0) {
        if (window.Logger) {
          window.Logger.warn('Model group has invalid price:', baseModel);
        }
        return;
      }

      const cardHTML = `
        <a href="#" class="model-card" data-basemodel="${baseModel}" title="${baseModel}" aria-label="Get quote for ${baseModel}">
          <img src="${group.image || ''}" alt="${baseModel}" class="model-image" loading="lazy">
          <span class="model-name">${baseModel}</span>
        </a>
      `;
      modelGrid.innerHTML += cardHTML;
    });

    // Add click listeners for variant-enabled models
    modelGrid.querySelectorAll('.model-card').forEach(card => {
      card.addEventListener('click', e => {
        e.preventDefault();
        const baseModel = card.getAttribute('data-basemodel');
        const group = modelGroups[baseModel];

        if (group) {
          // Store all variants in sessionStorage for variant-selection page
          sessionStorage.setItem('selectedProduct', JSON.stringify({
            baseModel: baseModel,
            brand: group.brand,
            category: group.category,
            image: group.image,
            variants: group.variants
          }));

          // Navigate to variant selection page
          const minPrice = Math.min(...group.variants.map(v => Number(v.price) || 0));
          window.location.href = `variant-selection.html?model=${encodeURIComponent(baseModel)}&brand=${encodeURIComponent(group.brand)}&category=${encodeURIComponent(group.category)}&image=${encodeURIComponent(group.image || '')}&price=${encodeURIComponent(minPrice)}`;
        }
      });
    });
  } else {
    // For non-variant categories (DSLR), filter and deduplicate

    // Filter: Only keep products that have the brand name as prefix
    // This removes duplicates like "EOS 5D Mark II" when "Canon EOS 5D Mark II" exists
    const filteredModels = allModelsForBrand.filter(model => {
      if (!model.name) return false;
      return model.name.toLowerCase().startsWith(brandName.toLowerCase());
    });

    const collator = new Intl.Collator('en', { numeric: true, sensitivity: 'base' });
    filteredModels.sort((a, b) => collator.compare(a.name, b.name));

    // Deduplicate by exact name (after filtering, duplicates should be minimal)
    const seenNames = new Set();

    filteredModels.forEach(model => {
      // Skip duplicates
      if (seenNames.has(model.name)) {
        return;
      }
      seenNames.add(model.name);

      if (!model.price || model.price === 0 || isNaN(Number(model.price))) {
        if (window.Logger) {
          window.Logger.warn('Model missing or invalid price:', model.name);
        }
        return;
      }

      const price = Number(model.price);
      if (price <= 0) {
        if (window.Logger) {
          window.Logger.warn('Model has invalid price (<= 0):', model.name);
        }
        return;
      }

      const cardHTML = `
        <a href="quote.html?model=${encodeURIComponent(model.name)}&brand=${encodeURIComponent(brandName)}&category=${encodeURIComponent(categoryName)}&image=${encodeURIComponent(model.image || '')}&price=${encodeURIComponent(price)}" class="model-card" title="${model.name}" aria-label="Get quote for ${model.name}">
          <img src="${model.image || ''}" alt="${model.name}" class="model-image" loading="lazy">
          <span class="model-name">${model.name}</span>
        </a>
      `;
      modelGrid.innerHTML += cardHTML;
    });
  }
}
// 3.5 Populate Models by Type (Bodies or Lenses)
function populateModelsByType(categoryName, brandName, productType) {
  modelGrid.innerHTML = '';

  // Filter by type
  let models;
  if (productType === 'bodies') {
    // Camera bodies (products without 'lens' type)
    models = allProducts.filter(
      p => p.category === categoryName && p.brand === brandName && p.type !== 'lens'
    );
  } else {
    // Lenses (products with 'lens' type)
    models = allProducts.filter(
      p => p.category === categoryName && p.brand === brandName && p.type === 'lens'
    );
  }

  // Filter: Only keep products that have the brand name as prefix
  // This removes duplicates like "EOS 5D Mark II" when "Canon EOS 5D Mark II" exists
  const filteredModels = models.filter(model => {
    if (!model.name) return false;
    return model.name.toLowerCase().startsWith(brandName.toLowerCase());
  });

  // Sort the models array naturally
  const collator = new Intl.Collator('en', { numeric: true, sensitivity: 'base' });
  filteredModels.sort((a, b) => collator.compare(a.name, b.name));

  // Deduplicate by exact name
  const seenNames = new Set();

  filteredModels.forEach(model => {
    // Skip duplicates
    if (seenNames.has(model.name)) {
      return;
    }
    seenNames.add(model.name);

    // Skip models without price
    if (!model.price || model.price === 0 || isNaN(Number(model.price))) {
      if (window.Logger) {
        window.Logger.warn('Model missing or invalid price:', model.name);
      }
      return;
    }

    const price = Number(model.price);
    if (price <= 0) {
      if (window.Logger) {
        window.Logger.warn('Model has invalid price (<= 0):', model.name);
      }
      return;
    }

    const cardHTML = `
      <a href="quote.html?model=${encodeURIComponent(model.name)}&brand=${encodeURIComponent(brandName)}&category=${encodeURIComponent(categoryName)}&image=${encodeURIComponent(model.image || '')}&price=${encodeURIComponent(price)}" class="model-card" title="${model.name}" aria-label="Get quote for ${model.name}">
        <img src="${model.image || ''}" alt="${model.name}" class="model-image" loading="lazy">
        <span class="model-name">${model.name}</span>
      </a>
    `;
    modelGrid.innerHTML += cardHTML;
  });
}

// ===== BACK BUTTONS =====
backToCategoriesBtn.addEventListener('click', e => {
  e.preventDefault();
  currentCategory = null;
  dividerText.textContent = 'Popular Categories';
  showSection(categorySelection);
  searchInput.value = '';
  searchInput.placeholder = 'Search for a brand or model';
  handleSearch(); // Re-show all categories
});

backToBrandsFromTypeBtn.addEventListener('click', e => {
  e.preventDefault();
  currentProductType = null;
  dividerText.textContent = 'Or choose a brand';
  showSection(brandSelection);
  searchInput.value = '';
  searchInput.placeholder = 'Search for a brand';
});

backToBrandsBtn.addEventListener('click', e => {
  e.preventDefault();
  currentBrand = null;
  dividerText.textContent = 'Or choose a brand';

  // Reset back button visibility
  document.getElementById('back-to-brands').classList.remove('hidden');
  document.getElementById('back-to-types').classList.add('hidden');

  showSection(brandSelection);
  searchInput.value = '';
  searchInput.placeholder = 'Search for a brand or model';
  handleSearch(); // Re-show all brands
});

backToTypesBtn.addEventListener('click', e => {
  e.preventDefault();
  currentProductType = null;
  dividerText.textContent = 'Choose product type';

  // Reset back button visibility
  document.getElementById('back-to-brands').classList.remove('hidden');
  document.getElementById('back-to-types').classList.add('hidden');

  showSection(productTypeSelection);
  searchInput.value = '';
  searchInput.placeholder = 'Search for camera or lens';
});

// ===== SEARCH LOGIC (Updated) =====

function handleSearch() {
  if (!searchInput) {
    return;
  }
  const searchTerm = searchInput.value.toLowerCase().trim();
  const suggestionsContainer = document.getElementById('search-suggestions');

  // If on homepage and search term exists, show product suggestions
  if (!categorySelection.classList.contains('hidden') && searchTerm.length >= 2 && productsLoaded) {
    showSearchSuggestions(searchTerm, suggestionsContainer);
    return;
  }

  // Hide suggestions if search is too short or products not loaded
  if (suggestionsContainer) {
    suggestionsContainer.classList.remove('show');
    suggestionsContainer.style.display = 'none';
    searchInput.setAttribute('aria-expanded', 'false');
  }

  // Figure out which grid is active
  if (!categorySelection.classList.contains('hidden')) {
    // Filtering Categories
    filterGrid(categoryGrid.querySelectorAll('.brand-card'), searchTerm, card => {
      return (card.getAttribute('data-category') || '').toLowerCase();
    });
  } else if (!brandSelection.classList.contains('hidden')) {
    // Filtering Brands
    filterGrid(brandGrid.querySelectorAll('.brand-card'), searchTerm, card => {
      return (card.getAttribute('data-brand') || '').toLowerCase();
    });
  } else if (!modelSelection.classList.contains('hidden')) {
    // Filtering Models
    filterGrid(modelGrid.querySelectorAll('.model-card'), searchTerm, card => {
      return (card.querySelector('.model-name').textContent || '').toLowerCase();
    });
  }
}

// Show search suggestions dropdown
function showSearchSuggestions(searchTerm, container) {
  if (!container || !allProducts || allProducts.length === 0) {
    return;
  }

  // Search through all products, excluding lenses
  const matches = allProducts
    .filter(product => {
      // Exclude lenses - only show cameras and other products
      if (product.subcategory === 'Lens') {
        return false;
      }
      if (!product.price || product.price <= 0 || isNaN(Number(product.price))) {
        return false;
      }
      const nameMatch = product.name && product.name.toLowerCase().includes(searchTerm);
      const brandMatch = product.brand && product.brand.toLowerCase().includes(searchTerm);
      const categoryMatch = product.category && product.category.toLowerCase().includes(searchTerm);
      return nameMatch || brandMatch || categoryMatch;
    })
    .slice(0, 8); // Limit to 8 results

  if (matches.length === 0) {
    container.innerHTML =
      '<div class="search-suggestion-no-results">No products found. Try a different search term.</div>';
    container.classList.add('show');
    container.style.display = 'block';
    searchInput.setAttribute('aria-expanded', 'true');
    return;
  }

  // Build suggestions HTML
  container.innerHTML = matches
    .map(product => {
      const price = Number(product.price);
      const needsVariants = window.supportsVariants && window.supportsVariants(product.category);
      const targetPage = needsVariants ? 'variant-selection.html' : 'quote.html';
      const href = `${targetPage}?model=${encodeURIComponent(product.name)}&brand=${encodeURIComponent(product.brand)}&category=${encodeURIComponent(product.category)}&image=${encodeURIComponent(product.image || '')}&price=${encodeURIComponent(price)}`;

      return `
      <a href="${href}" class="search-suggestion-item" role="option" aria-label="Search result: ${product.name}">
        <img src="${product.image || 'https://via.placeholder.com/40?text=' + encodeURIComponent(product.name)}" 
             alt="${product.name}" 
             class="search-suggestion-icon" 
             loading="lazy"
             onerror="this.src='https://via.placeholder.com/40?text=' + encodeURIComponent('${product.name}')">
        <div class="search-suggestion-content">
          <div class="search-suggestion-name">${highlightMatch(product.name, searchTerm)}</div>
          <div class="search-suggestion-meta">
            <span class="search-suggestion-brand">${product.brand || 'N/A'}</span>
            <span class="search-suggestion-category">• ${product.category || 'N/A'}</span>
          </div>
        </div>
        <div class="search-suggestion-price">₹${price.toLocaleString('en-IN')}</div>
      </a>
    `;
    })
    .join('');

  container.classList.add('show');
  container.style.display = 'block';
  searchInput.setAttribute('aria-expanded', 'true');
}

// Highlight matching text in search results
function highlightMatch(text, searchTerm) {
  if (!text || !searchTerm) {
    return text;
  }
  const regex = new RegExp(`(${searchTerm})`, 'gi');
  return text.replace(
    regex,
    '<mark style="background: #fff3cd; padding: 2px 0; border-radius: 2px;">$1</mark>'
  );
}

// Helper function to filter any grid
function filterGrid(cards, searchTerm, getName) {
  cards.forEach(card => {
    const name = getName(card);
    if (name.includes(searchTerm)) {
      card.classList.remove('hidden');
    } else {
      card.classList.add('hidden');
    }
  });
}

// Attach search listener with debounce
let searchTimeout;
if (searchInput) {
  searchInput.addEventListener('input', e => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      handleSearch();
    }, 300); // Debounce for 300ms
  });

  // Hide suggestions when clicking outside
  document.addEventListener('click', e => {
    const suggestionsContainer = document.getElementById('search-suggestions');
    if (
      suggestionsContainer &&
      !searchInput.contains(e.target) &&
      !suggestionsContainer.contains(e.target)
    ) {
      suggestionsContainer.classList.remove('show');
      suggestionsContainer.style.display = 'none';
      searchInput.setAttribute('aria-expanded', 'false');
    }
  });

  // Handle keyboard navigation
  searchInput.addEventListener('keydown', e => {
    const suggestionsContainer = document.getElementById('search-suggestions');
    const suggestions = suggestionsContainer?.querySelectorAll('.search-suggestion-item');

    if (!suggestions || suggestions.length === 0) {
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const active = suggestionsContainer.querySelector('.search-suggestion-item.active');
      if (active) {
        active.classList.remove('active');
        const next = active.nextElementSibling;
        if (next) {
          next.classList.add('active');
          next.focus();
        } else {
          suggestions[0].classList.add('active');
          suggestions[0].focus();
        }
      } else {
        suggestions[0].classList.add('active');
        suggestions[0].focus();
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const active = suggestionsContainer.querySelector('.search-suggestion-item.active');
      if (active) {
        active.classList.remove('active');
        const prev = active.previousElementSibling;
        if (prev) {
          prev.classList.add('active');
          prev.focus();
        } else {
          suggestions[suggestions.length - 1].classList.add('active');
          suggestions[suggestions.length - 1].focus();
        }
      } else {
        suggestions[suggestions.length - 1].classList.add('active');
        suggestions[suggestions.length - 1].focus();
      }
    } else if (e.key === 'Enter') {
      const active = suggestionsContainer.querySelector('.search-suggestion-item.active');
      if (active) {
        e.preventDefault();
        active.click();
      }
    } else if (e.key === 'Escape') {
      if (suggestionsContainer) {
        suggestionsContainer.classList.remove('show');
        suggestionsContainer.style.display = 'none';
        searchInput.setAttribute('aria-expanded', 'false');
        searchInput.focus();
      }
    }
  });
}

// ===== INITIAL PAGE LOAD =====

// Initialize function - works with both immediate and deferred loading
function initScript() {
  // Show a loading message
  if (categoryGrid) {
    categoryGrid.innerHTML = '<p>Loading products...</p>';
  }

  // Ensure Firebase is ready before trying to fetch
  function checkFirebase() {
    if (window.firebase && firebase.firestore && firebase.firestore().collection) {
      fetchProducts();
    } else {
      // Firebase isn't loaded yet, check again in 100ms
      setTimeout(checkFirebase, 100);
    }
  }

  async function fetchProducts() {
    try {
      const db = firebase.firestore();
      const snapshot = await db.collection('products').get();

      if (snapshot.empty) {
        categoryGrid.innerHTML =
          '<p>No products found. Please add some in the admin dashboard.</p>';
        return;
      }

      // Map Firestore documents to our allProducts array
      allProducts = snapshot.docs.map(doc => {
        const data = doc.data();
        const product = {
          id: doc.id,
          name: data.name,
          brand: data.brand,
          category: data.category,
          price: data.price,
          image: data.image,
          subcategory: data.subcategory // Important: for distinguishing cameras from lenses
        };

        // Debug: Log products with missing price
        if (!product.price) {
          console.warn('⚠️ Product missing price:', product.name, product);
        }

        return product;
      });

      // Log summary
      console.log('✅ Loaded', allProducts.length, 'products from Firestore');
      console.log('📊 Products with prices:', allProducts.filter(p => p.price).length);
      console.log('⚠️ Products without prices:', allProducts.filter(p => !p.price).length);

      // Mark products as loaded
      productsLoaded = true;

      // Now that we have data, populate the categories
      populateCategories();
    } catch (error) {
      if (window.Logger) {
        window.Logger.error('Error fetching products:', error);
      }
      categoryGrid.innerHTML = '<p>Error loading products. Please try again later.</p>';
    }
  }

  // Start the process
  checkFirebase();
}

// Run initialization - handle both immediate and deferred loading
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initScript);
} else {
  // DOM already loaded (deferred script)
  initScript();
}

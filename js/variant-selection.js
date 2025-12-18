// js/variant-selection.js
// Handles variant selection (storage, RAM) before assessment
// Supports combined variants like "8GB/128GB" from Firebase

document.addEventListener("DOMContentLoaded", async () => {
  // Get URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const modelName = urlParams.get('model');
  const brandName = urlParams.get('brand');
  const category = urlParams.get('category');
  const imageUrl = urlParams.get('image');
  const basePrice = parseFloat(urlParams.get('price')) || 0;

  // Validate required parameters
  if (!modelName || !brandName || !category) {
    if (window.Logger) {
      window.Logger.error('Variant selection: Missing required parameters');
    }
    window.location.href = 'index.html';
    return;
  }

  // Check if this category supports variants
  const needsVariants = window.supportsVariants ? window.supportsVariants(category) : false;

  if (!needsVariants) {
    // Skip variant selection for cameras, go directly to quote/assessment
    if (window.Logger) {
      window.Logger.log('Category does not need variants, redirecting to quote');
    }
    window.location.href = `quote.html?model=${encodeURIComponent(modelName)}&brand=${encodeURIComponent(brandName)}&category=${encodeURIComponent(category)}&image=${encodeURIComponent(imageUrl)}&price=${basePrice}`;
    return;
  }

  // Try to get product variants from sessionStorage (passed from homepage)
  let productData = null;
  try {
    const stored = sessionStorage.getItem('selectedProduct');
    if (stored) {
      productData = JSON.parse(stored);
    }
  } catch (e) {
    console.error('Error parsing stored product data:', e);
  }

  // DOM elements
  const deviceFullName = document.getElementById('deviceFullName');
  const deviceName = document.getElementById('deviceName');
  const deviceImage = document.getElementById('deviceImage');
  const basePriceElement = document.getElementById('basePrice'); // May not exist
  const storageButtons = document.getElementById('storageButtons');
  const ramButtons = document.getElementById('ramButtons');
  const ramGroup = document.getElementById('ramGroup');
  const pricePreview = document.getElementById('pricePreview'); // May not exist
  const estimatedPrice = document.getElementById('estimatedPrice'); // May not exist
  const continueBtn = document.getElementById('continueBtn');
  const backBtn = document.getElementById('backToModels');

  // Breadcrumb (optional - only update if exists)
  const categoryBreadcrumb = document.getElementById('categoryBreadcrumb');
  const brandBreadcrumb = document.getElementById('brandBreadcrumb');
  const modelBreadcrumb = document.getElementById('modelBreadcrumb');
  if (categoryBreadcrumb) categoryBreadcrumb.textContent = category;
  if (brandBreadcrumb) brandBreadcrumb.textContent = brandName;
  if (modelBreadcrumb) modelBreadcrumb.textContent = modelName;

  // Display device info
  const fullName = window.getFullModelName ?
    window.getFullModelName(brandName, modelName) :
    `${brandName} ${modelName}`;

  deviceFullName.textContent = fullName;
  deviceName.textContent = fullName;
  if (basePriceElement) basePriceElement.textContent = basePrice.toLocaleString('en-IN');

  if (imageUrl && imageUrl !== 'null') {
    deviceImage.src = imageUrl;
  }

  // Selection state
  let selectedVariant = null;
  let selectedCombinedVariant = null;
  let firebaseVariants = [];

  // Try to load variants from Firebase for this product
  async function loadFirebaseVariants() {
    if (typeof firebase === 'undefined' || !firebase.firestore) {
      console.log('Firebase not available');
      return [];
    }

    try {
      const db = firebase.firestore();
      // Search for product by name and brand
      const snapshot = await db.collection('products')
        .where('brand', '==', brandName)
        .where('name', '==', modelName)
        .limit(1)
        .get();

      if (!snapshot.empty) {
        const doc = snapshot.docs[0];
        const data = doc.data();
        if (data.variants && Array.isArray(data.variants) && data.variants.length > 0) {
          console.log('Found Firebase variants:', data.variants);
          return data.variants;
        }
      }

      // Also try searching by baseModel
      if (productData?.baseModel) {
        const baseSnapshot = await db.collection('products')
          .where('brand', '==', brandName)
          .where('baseModel', '==', productData.baseModel)
          .limit(1)
          .get();

        if (!baseSnapshot.empty) {
          const data = baseSnapshot.docs[0].data();
          if (data.variants && Array.isArray(data.variants) && data.variants.length > 0) {
            console.log('Found Firebase variants by baseModel:', data.variants);
            return data.variants;
          }
        }
      }
    } catch (error) {
      console.error('Error loading Firebase variants:', error);
    }

    return [];
  }

  // Render combined variants from Firebase (like "8GB/128GB")
  function renderCombinedVariants(variants) {
    storageButtons.innerHTML = '';

    // Change the label to just "Variant" instead of "Storage"
    const storageLabel = storageButtons.closest('.variant-group')?.querySelector('.variant-label');
    if (storageLabel) {
      storageLabel.innerHTML = '<i class="fa-solid fa-mobile-screen"></i> Choose a variant';
    }

    variants.forEach((variant, index) => {
      const button = document.createElement('button');
      button.className = 'variant-option-btn';
      button.setAttribute('data-variant', variant);
      button.innerHTML = `
        <span class="variant-option-text">${variant}</span>
      `;

      button.addEventListener('click', () => {
        selectCombinedVariant(variant);
      });

      storageButtons.appendChild(button);
    });

    // Hide RAM section since we're using combined variants
    ramGroup.style.display = 'none';
  }

  // Select combined variant
  function selectCombinedVariant(variant) {
    selectedCombinedVariant = variant;

    // Update UI
    document.querySelectorAll('#storageButtons .variant-option-btn').forEach(btn => {
      if (btn.getAttribute('data-variant') === variant) {
        btn.classList.add('selected');
      } else {
        btn.classList.remove('selected');
      }
    });

    // Show price preview (if exists)
    if (estimatedPrice) estimatedPrice.textContent = basePrice.toLocaleString('en-IN');
    if (pricePreview) pricePreview.style.display = 'block';

    validateSelection();
  }

  // Fallback: render from sessionStorage variants
  function renderSessionVariants() {
    const actualVariants = productData?.variants || [];

    if (actualVariants.length === 0) {
      renderFallbackConfig();
      return;
    }

    storageButtons.innerHTML = '';

    // Sort variants
    const sortedVariants = [...actualVariants].sort((a, b) => {
      const sizeA = parseStorageSize(a.variant);
      const sizeB = parseStorageSize(b.variant);
      return sizeA - sizeB;
    });

    sortedVariants.forEach(variant => {
      const button = document.createElement('button');
      button.className = 'variant-option-btn';
      button.setAttribute('data-variant', variant.variant);
      button.setAttribute('data-price', variant.price);
      button.setAttribute('data-name', variant.name);
      button.innerHTML = `
        <span class="variant-option-text">${variant.variant}</span>
      `;

      button.addEventListener('click', () => {
        selectStorageVariant(variant);
      });

      storageButtons.appendChild(button);
    });

    // Show RAM options from config
    renderRAMFromConfig();
  }

  // Render RAM from config
  function renderRAMFromConfig() {
    const ramOptions = window.getRAMVariants ? window.getRAMVariants(category, modelName) : [];

    if (ramOptions.length === 0 || ramOptions.length === 1) {
      // No RAM options or only one - hide RAM section
      ramGroup.style.display = 'none';

      // If there's exactly one RAM option, auto-select it
      if (ramOptions.length === 1) {
        selectedRAM = ramOptions[0].value;
      }
      return;
    }

    ramGroup.style.display = 'block';
    ramButtons.innerHTML = '';

    ramOptions.forEach(option => {
      const button = document.createElement('button');
      button.className = 'variant-option-btn';
      button.setAttribute('data-value', option.value);
      button.innerHTML = `
        <span class="variant-option-text">${option.label}</span>
      `;

      button.addEventListener('click', () => {
        selectRAM(option.value);
      });

      ramButtons.appendChild(button);
    });

    // Auto-select if only one RAM option
    if (ramOptions.length === 1) {
      selectRAM(ramOptions[0].value);
    }
  }

  let selectedRAM = null;
  let selectedStoragePrice = basePrice;

  function selectRAM(value) {
    selectedRAM = value;
    document.querySelectorAll('#ramButtons .variant-option-btn').forEach(btn => {
      btn.classList.toggle('selected', btn.getAttribute('data-value') === value);
    });
    validateSelection();
  }

  function selectStorageVariant(variant) {
    selectedVariant = variant;
    selectedStoragePrice = Number(variant.price) || basePrice;

    document.querySelectorAll('#storageButtons .variant-option-btn').forEach(btn => {
      btn.classList.toggle('selected', btn.getAttribute('data-variant') === variant.variant);
    });

    if (estimatedPrice) estimatedPrice.textContent = selectedStoragePrice.toLocaleString('en-IN');
    if (pricePreview) pricePreview.style.display = 'block';
    validateSelection();
  }

  // Fallback: render from variant-config.js
  function renderFallbackConfig() {
    const storageOptions = window.getStorageVariants ? window.getStorageVariants(category) : [];

    if (storageOptions.length === 0) {
      storageButtons.innerHTML = '<p class="variant-no-options">No storage options available</p>';
      return;
    }

    storageButtons.innerHTML = '';
    storageOptions.forEach(option => {
      const button = document.createElement('button');
      button.className = 'variant-option-btn';
      button.setAttribute('data-value', option.value);
      button.setAttribute('data-multiplier', option.priceMultiplier || 1);
      button.innerHTML = `
        <span class="variant-option-text">${option.label}</span>
      `;

      button.addEventListener('click', () => {
        selectConfigStorage(option);
      });

      storageButtons.appendChild(button);
    });

    renderRAMFromConfig();
  }

  function selectConfigStorage(option) {
    selectedStoragePrice = basePrice * (option.priceMultiplier || 1);

    document.querySelectorAll('#storageButtons .variant-option-btn').forEach(btn => {
      btn.classList.toggle('selected', btn.getAttribute('data-value') === option.value);
    });

    if (estimatedPrice) estimatedPrice.textContent = Math.round(selectedStoragePrice).toLocaleString('en-IN');
    if (pricePreview) pricePreview.style.display = 'block';
    validateSelection();
  }

  // Helper
  function parseStorageSize(variantStr) {
    if (!variantStr) return 0;
    const match = variantStr.match(/(\d+)\s*(GB|TB)/i);
    if (!match) return 0;
    const value = parseInt(match[1]);
    const unit = match[2].toUpperCase();
    return unit === 'TB' ? value * 1024 : value;
  }

  // Validation
  function validateSelection() {
    let isValid = false;

    if (selectedCombinedVariant) {
      isValid = true;
    } else if (selectedVariant) {
      const ramOptions = window.getRAMVariants ? window.getRAMVariants(category, modelName) : [];
      isValid = ramOptions.length <= 1 || selectedRAM !== null;
    } else {
      const storageSelected = document.querySelector('#storageButtons .variant-option-btn.selected');
      const ramOptions = window.getRAMVariants ? window.getRAMVariants(category, modelName) : [];
      isValid = storageSelected && (ramOptions.length <= 1 || selectedRAM);
    }

    continueBtn.disabled = !isValid;
  }

  // Continue button
  continueBtn.addEventListener('click', (e) => {
    e.preventDefault();

    let finalName = modelName;
    let finalPrice = basePrice;
    let variantInfo = {};

    if (selectedCombinedVariant) {
      // Using Firebase combined variant - keep modelName unchanged
      const parts = selectedCombinedVariant.split('/');
      if (parts.length === 2) {
        variantInfo.ram = parts[0].trim();
        variantInfo.storage = parts[1].trim();
      } else {
        variantInfo.storage = selectedCombinedVariant;
      }
      variantInfo.combined = selectedCombinedVariant;
      // Don't add variant to finalName - let quote page handle display
      finalName = modelName;
      finalPrice = basePrice;
    } else if (selectedVariant) {
      // Using sessionStorage variant
      finalName = modelName; // Keep base name
      finalPrice = selectedStoragePrice;
      variantInfo.storage = selectedVariant.variant;
      if (selectedRAM) {
        variantInfo.ram = selectedRAM;
      }
    } else {
      // Using config-based selection
      const storageBtn = document.querySelector('#storageButtons .variant-option-btn.selected');
      if (storageBtn) {
        variantInfo.storage = storageBtn.getAttribute('data-value');
      }
      if (selectedRAM) {
        variantInfo.ram = selectedRAM;
      }
      finalName = modelName; // Keep base name
      finalPrice = selectedStoragePrice || basePrice;
    }

    // Store variant info
    const valuationData = {
      modelName: finalName,
      brandName: brandName,
      category: category,
      imageUrl: imageUrl,
      basePrice: finalPrice,
      variants: variantInfo,
      adjustedPrice: finalPrice
    };

    sessionStorage.setItem('valuationData', JSON.stringify(valuationData));

    if (window.Logger) {
      window.Logger.log('Variant selected:', variantInfo, 'Final price:', finalPrice);
    }

    // Navigate to quote page - pass variant info separately
    window.location.href = `quote.html?model=${encodeURIComponent(finalName)}&brand=${encodeURIComponent(brandName)}&category=${encodeURIComponent(category)}&image=${encodeURIComponent(imageUrl)}&price=${encodeURIComponent(finalPrice)}`;
  });

  // Back button
  backBtn.addEventListener('click', (e) => {
    e.preventDefault();
    history.back();
  });

  // Initialize
  async function init() {
    // First try to load from Firebase
    firebaseVariants = await loadFirebaseVariants();

    if (firebaseVariants.length > 0) {
      // Use Firebase combined variants
      console.log('Using Firebase variants:', firebaseVariants);
      renderCombinedVariants(firebaseVariants);
    } else if (productData?.variants?.length > 0) {
      // Use sessionStorage variants
      console.log('Using sessionStorage variants');
      renderSessionVariants();
    } else {
      // Fallback to config
      console.log('Using config fallback');
      renderFallbackConfig();
    }

    validateSelection();
  }

  init();
});

// js/variant-selection.js
// Handles variant selection (storage, RAM) before assessment

document.addEventListener("DOMContentLoaded", () => {
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

  // Get actual variants from product data (if available)
  const actualVariants = productData?.variants || [];

  if (window.Logger) {
    window.Logger.log('Variant selection page loaded:', {
      modelName, brandName, category, basePrice,
      variantsCount: actualVariants.length
    });
  }

  // DOM elements
  const deviceFullName = document.getElementById('deviceFullName');
  const deviceName = document.getElementById('deviceName');
  const deviceImage = document.getElementById('deviceImage');
  const basePriceElement = document.getElementById('basePrice');
  const storageButtons = document.getElementById('storageButtons');
  const ramButtons = document.getElementById('ramButtons');
  const ramGroup = document.getElementById('ramGroup');
  const pricePreview = document.getElementById('pricePreview');
  const estimatedPrice = document.getElementById('estimatedPrice');
  const continueBtn = document.getElementById('continueBtn');
  const backBtn = document.getElementById('backToModels');

  // Breadcrumb
  document.getElementById('categoryBreadcrumb').textContent = category;
  document.getElementById('brandBreadcrumb').textContent = brandName;
  document.getElementById('modelBreadcrumb').textContent = modelName;

  // Display device info
  const fullName = window.getFullModelName ?
    window.getFullModelName(brandName, modelName) :
    `${brandName} ${modelName}`;

  deviceFullName.textContent = fullName;
  deviceName.textContent = fullName;

  // Calculate min price from variants
  const minPrice = actualVariants.length > 0
    ? Math.min(...actualVariants.map(v => Number(v.price) || 0))
    : basePrice;
  basePriceElement.textContent = minPrice.toLocaleString('en-IN');

  if (imageUrl && imageUrl !== 'null') {
    deviceImage.src = imageUrl;
  }

  // Selection state
  let selectedVariant = null;
  let selectedVariantPrice = 0;

  // Render storage/variant options from actual product data
  function renderVariants() {
    if (actualVariants.length === 0) {
      // Fallback: Use variant-config.js if no actual variants
      const storageOptions = window.getStorageVariants ? window.getStorageVariants(category) : [];
      if (storageOptions.length > 0) {
        renderStorageFromConfig(storageOptions);
      } else {
        storageButtons.innerHTML = '<p class="variant-no-options">No storage options available</p>';
      }
      return;
    }

    // Render variants from actual product data
    storageButtons.innerHTML = '';

    // Sort variants by storage size
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
        selectVariant(variant);
      });

      storageButtons.appendChild(button);
    });

    // Hide RAM group since we're using actual variants
    ramGroup.style.display = 'none';
  }

  // Helper to parse storage size for sorting
  function parseStorageSize(variantStr) {
    if (!variantStr) return 0;
    const match = variantStr.match(/(\d+)\s*(GB|TB)/i);
    if (!match) return 0;
    const value = parseInt(match[1]);
    const unit = match[2].toUpperCase();
    return unit === 'TB' ? value * 1024 : value;
  }

  // Fallback: Render from config if no actual variants
  function renderStorageFromConfig(storageOptions) {
    storageButtons.innerHTML = '';
    storageOptions.forEach(option => {
      const button = document.createElement('button');
      button.className = 'variant-option-btn';
      button.setAttribute('data-value', option.value);
      button.innerHTML = `
        <span class="variant-option-text">${option.label}</span>
      `;

      button.addEventListener('click', () => {
        selectStorageFromConfig(option);
      });

      storageButtons.appendChild(button);
    });

    // Also render RAM if available
    const ramOptions = window.getRAMVariants ? window.getRAMVariants(category, modelName) : [];
    if (ramOptions.length > 0) {
      renderRAMFromConfig(ramOptions);
    } else {
      ramGroup.style.display = 'none';
    }
  }

  function renderRAMFromConfig(ramOptions) {
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
        // Handle RAM selection
        document.querySelectorAll('#ramButtons .variant-option-btn').forEach(btn => {
          btn.classList.remove('selected');
        });
        button.classList.add('selected');
        validateSelection();
      });

      ramButtons.appendChild(button);
    });
  }

  function selectStorageFromConfig(option) {
    document.querySelectorAll('#storageButtons .variant-option-btn').forEach(btn => {
      btn.classList.remove('selected');
    });
    event.target.closest('.variant-option-btn').classList.add('selected');

    // Calculate price using config multiplier
    selectedVariantPrice = basePrice * (option.priceMultiplier || 1);
    estimatedPrice.textContent = Math.round(selectedVariantPrice).toLocaleString('en-IN');
    pricePreview.style.display = 'block';
    validateSelection();
  }

  // Select variant (from actual product data)
  function selectVariant(variant) {
    selectedVariant = variant;
    selectedVariantPrice = Number(variant.price) || 0;

    // Update UI
    document.querySelectorAll('#storageButtons .variant-option-btn').forEach(btn => {
      if (btn.getAttribute('data-variant') === variant.variant) {
        btn.classList.add('selected');
      } else {
        btn.classList.remove('selected');
      }
    });

    // Show price preview
    estimatedPrice.textContent = selectedVariantPrice.toLocaleString('en-IN');
    pricePreview.style.display = 'block';

    validateSelection();
  }

  // Validate selection
  function validateSelection() {
    const hasSelection = selectedVariant !== null ||
      document.querySelector('#storageButtons .variant-option-btn.selected') !== null;

    continueBtn.disabled = !hasSelection;
  }

  // Continue button
  continueBtn.addEventListener('click', (e) => {
    e.preventDefault();

    // Get selected variant info
    let finalName = modelName;
    let finalPrice = basePrice;
    let variantInfo = {};

    if (selectedVariant) {
      // Using actual product variant
      finalName = selectedVariant.name;
      finalPrice = selectedVariantPrice;
      variantInfo = {
        storage: selectedVariant.variant,
        displayName: selectedVariant.name
      };
    } else {
      // Using config-based selection
      const selectedStorageBtn = document.querySelector('#storageButtons .variant-option-btn.selected');
      const selectedRamBtn = document.querySelector('#ramButtons .variant-option-btn.selected');

      if (selectedStorageBtn) {
        variantInfo.storage = selectedStorageBtn.getAttribute('data-value');
      }
      if (selectedRamBtn) {
        variantInfo.ram = selectedRamBtn.getAttribute('data-value');
      }

      finalName = `${modelName} (${variantInfo.storage || ''})`;
      finalPrice = selectedVariantPrice || basePrice;
    }

    // Store variant info in valuation data
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

    // Navigate to quote page with selected variant
    window.location.href = `quote.html?model=${encodeURIComponent(finalName)}&brand=${encodeURIComponent(brandName)}&category=${encodeURIComponent(category)}&image=${encodeURIComponent(imageUrl)}&price=${encodeURIComponent(finalPrice)}`;
  });

  // Back button
  backBtn.addEventListener('click', (e) => {
    e.preventDefault();
    history.back();
  });

  // Initialize
  renderVariants();
  validateSelection();
});

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
  if (!modelName || !brandName || !category || !basePrice) {
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
  
  if (window.Logger) {
    window.Logger.log('Variant selection page loaded:', { modelName, brandName, category, basePrice });
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
  basePriceElement.textContent = basePrice.toLocaleString('en-IN');
  
  if (imageUrl && imageUrl !== 'null') {
    deviceImage.src = imageUrl;
  }
  
  // Selection state
  let selectedStorage = null;
  let selectedRAM = null;
  
  // Get available variants
  const storageOptions = window.getStorageVariants ? window.getStorageVariants(category) : [];
  const ramOptions = window.getRAMVariants ? window.getRAMVariants(category, modelName) : [];
  
  // Render storage options
  function renderStorage() {
    if (storageOptions.length === 0) {
      storageButtons.innerHTML = '<p class="variant-no-options">No storage options available</p>';
      return;
    }
    
    storageButtons.innerHTML = '';
    storageOptions.forEach(option => {
      const button = document.createElement('button');
      button.className = 'variant-option-btn';
      button.setAttribute('data-value', option.value);
      button.innerHTML = `
        <span class="variant-option-text">${option.label}</span>
      `;
      
      button.addEventListener('click', () => {
        selectStorage(option.value);
      });
      
      storageButtons.appendChild(button);
    });
  }
  
  // Render RAM options
  function renderRAM() {
    if (ramOptions.length === 0) {
      ramGroup.style.display = 'none';
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
    
    // Auto-select if only one option
    if (ramOptions.length === 1) {
      selectRAM(ramOptions[0].value);
    }
  }
  
  // Select storage
  function selectStorage(value) {
    selectedStorage = value;
    
    // Update UI
    document.querySelectorAll('#storageButtons .variant-option-btn').forEach(btn => {
      if (btn.getAttribute('data-value') === value) {
        btn.classList.add('selected');
      } else {
        btn.classList.remove('selected');
      }
    });
    
    updatePrice();
    validateSelection();
  }
  
  // Select RAM
  function selectRAM(value) {
    selectedRAM = value;
    
    // Update UI
    document.querySelectorAll('#ramButtons .variant-option-btn').forEach(btn => {
      if (btn.getAttribute('data-value') === value) {
        btn.classList.add('selected');
      } else {
        btn.classList.remove('selected');
      }
    });
    
    updatePrice();
    validateSelection();
  }
  
  // Update price preview
  function updatePrice() {
    if (!selectedStorage) {
      pricePreview.style.display = 'none';
      return;
    }
    
    const variants = {
      storage: selectedStorage,
      ram: selectedRAM
    };
    
    const adjustedPrice = window.calculateVariantPrice ? 
      window.calculateVariantPrice(basePrice, variants, category, modelName) : 
      basePrice;
    
    estimatedPrice.textContent = adjustedPrice.toLocaleString('en-IN');
    pricePreview.style.display = 'block';
  }
  
  // Validate selection
  function validateSelection() {
    // Storage is required, RAM is optional (auto-selected if only one option)
    const isValid = selectedStorage !== null && 
                    (ramOptions.length === 0 || selectedRAM !== null);
    
    continueBtn.disabled = !isValid;
  }
  
  // Continue button
  continueBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    if (!selectedStorage) {
      alert('Please select a storage option');
      return;
    }
    
    if (ramOptions.length > 0 && !selectedRAM) {
      alert('Please select a RAM option');
      return;
    }
    
    const variants = {
      storage: selectedStorage,
      ram: selectedRAM
    };
    
    const adjustedPrice = window.calculateVariantPrice ? 
      window.calculateVariantPrice(basePrice, variants, category, modelName) : 
      basePrice;
    
    // Store variant info in valuation data
    const valuationData = {
      modelName: modelName,
      brandName: brandName,
      category: category,
      imageUrl: imageUrl,
      basePrice: basePrice,
      variants: variants,
      adjustedPrice: adjustedPrice
    };
    
    sessionStorage.setItem('valuationData', JSON.stringify(valuationData));
    
    if (window.Logger) {
      window.Logger.log('Variant selected:', variants, 'Adjusted price:', adjustedPrice);
    }
    
    // Navigate to quote page
    window.location.href = 'quote.html';
  });
  
  // Back button
  backBtn.addEventListener('click', (e) => {
    e.preventDefault();
    history.back();
  });
  
  // Initialize
  renderStorage();
  renderRAM();
  validateSelection();
});


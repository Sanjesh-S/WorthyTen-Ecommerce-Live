// js/variant-config.js
// Variant configuration for devices (Storage, RAM, etc.)

const variantConfig = {
  Phone: {
    // Storage options for phones
    storage: [
      { value: '64GB', label: '64 GB', priceMultiplier: 0.85 },
      { value: '128GB', label: '128 GB', priceMultiplier: 1.0 },
      { value: '256GB', label: '256 GB', priceMultiplier: 1.15 },
      { value: '512GB', label: '512 GB', priceMultiplier: 1.30 },
      { value: '1TB', label: '1 TB', priceMultiplier: 1.50 },
      { value: '2TB', label: '2 TB', priceMultiplier: 1.70 }
    ],
    
    // RAM options for phones (model-specific defaults)
    ram: {
      // iPhone models
      'iPhone 16 Pro Max': [{ value: '8GB', label: '8 GB', priceMultiplier: 1.0 }],
      'iPhone 16 Pro': [{ value: '8GB', label: '8 GB', priceMultiplier: 1.0 }],
      'iPhone 16 Plus': [{ value: '8GB', label: '8 GB', priceMultiplier: 1.0 }],
      'iPhone 16': [{ value: '8GB', label: '8 GB', priceMultiplier: 1.0 }],
      'iPhone 15 Pro Max': [{ value: '8GB', label: '8 GB', priceMultiplier: 1.0 }],
      'iPhone 15 Pro': [{ value: '8GB', label: '8 GB', priceMultiplier: 1.0 }],
      'iPhone 15 Plus': [{ value: '6GB', label: '6 GB', priceMultiplier: 1.0 }],
      'iPhone 15': [{ value: '6GB', label: '6 GB', priceMultiplier: 1.0 }],
      'iPhone 14 Pro Max': [{ value: '6GB', label: '6 GB', priceMultiplier: 1.0 }],
      'iPhone 14 Pro': [{ value: '6GB', label: '6 GB', priceMultiplier: 1.0 }],
      'iPhone 14 Plus': [{ value: '6GB', label: '6 GB', priceMultiplier: 1.0 }],
      'iPhone 14': [{ value: '6GB', label: '6 GB', priceMultiplier: 1.0 }],
      'iPhone 13 Pro Max': [{ value: '6GB', label: '6 GB', priceMultiplier: 1.0 }],
      'iPhone 13 Pro': [{ value: '6GB', label: '6 GB', priceMultiplier: 1.0 }],
      'iPhone 13': [{ value: '4GB', label: '4 GB', priceMultiplier: 1.0 }],
      'iPhone 13 Mini': [{ value: '4GB', label: '4 GB', priceMultiplier: 1.0 }],
      'iPhone 12 Pro Max': [{ value: '6GB', label: '6 GB', priceMultiplier: 1.0 }],
      'iPhone 12 Pro': [{ value: '6GB', label: '6 GB', priceMultiplier: 1.0 }],
      'iPhone 12': [{ value: '4GB', label: '4 GB', priceMultiplier: 1.0 }],
      'iPhone 12 Mini': [{ value: '4GB', label: '4 GB', priceMultiplier: 1.0 }],
      'iPhone 11 Pro Max': [{ value: '4GB', label: '4 GB', priceMultiplier: 1.0 }],
      'iPhone 11 Pro': [{ value: '4GB', label: '4 GB', priceMultiplier: 1.0 }],
      'iPhone 11': [{ value: '4GB', label: '4 GB', priceMultiplier: 1.0 }],
      
      // Samsung models
      'Galaxy S24 Ultra': [
        { value: '12GB', label: '12 GB', priceMultiplier: 1.0 }
      ],
      'Galaxy S24+': [
        { value: '12GB', label: '12 GB', priceMultiplier: 1.0 }
      ],
      'Galaxy S24': [
        { value: '8GB', label: '8 GB', priceMultiplier: 1.0 }
      ],
      'Galaxy S23 Ultra': [
        { value: '8GB', label: '8 GB', priceMultiplier: 0.95 },
        { value: '12GB', label: '12 GB', priceMultiplier: 1.0 }
      ],
      
      // Default for phones
      default: [
        { value: '4GB', label: '4 GB', priceMultiplier: 0.90 },
        { value: '6GB', label: '6 GB', priceMultiplier: 0.95 },
        { value: '8GB', label: '8 GB', priceMultiplier: 1.0 },
        { value: '12GB', label: '12 GB', priceMultiplier: 1.10 },
        { value: '16GB', label: '16 GB', priceMultiplier: 1.20 }
      ]
    }
  },
  
  Laptop: {
    // Storage options for laptops
    storage: [
      { value: '128GB', label: '128 GB', priceMultiplier: 0.70 },
      { value: '256GB', label: '256 GB', priceMultiplier: 0.85 },
      { value: '512GB', label: '512 GB', priceMultiplier: 1.0 },
      { value: '1TB', label: '1 TB', priceMultiplier: 1.15 },
      { value: '2TB', label: '2 TB', priceMultiplier: 1.35 },
      { value: '4TB', label: '4 TB', priceMultiplier: 1.60 },
      { value: '8TB', label: '8 TB', priceMultiplier: 2.0 }
    ],
    
    // RAM options for laptops
    ram: {
      // MacBook models
      'MacBook Air M1': [
        { value: '8GB', label: '8 GB', priceMultiplier: 0.95 },
        { value: '16GB', label: '16 GB', priceMultiplier: 1.0 }
      ],
      'MacBook Air M2': [
        { value: '8GB', label: '8 GB', priceMultiplier: 0.95 },
        { value: '16GB', label: '16 GB', priceMultiplier: 1.0 },
        { value: '24GB', label: '24 GB', priceMultiplier: 1.10 }
      ],
      'MacBook Air M3': [
        { value: '8GB', label: '8 GB', priceMultiplier: 0.95 },
        { value: '16GB', label: '16 GB', priceMultiplier: 1.0 },
        { value: '24GB', label: '24 GB', priceMultiplier: 1.10 }
      ],
      'MacBook Pro 13': [
        { value: '8GB', label: '8 GB', priceMultiplier: 0.90 },
        { value: '16GB', label: '16 GB', priceMultiplier: 1.0 },
        { value: '32GB', label: '32 GB', priceMultiplier: 1.15 }
      ],
      'MacBook Pro 14': [
        { value: '16GB', label: '16 GB', priceMultiplier: 0.95 },
        { value: '32GB', label: '32 GB', priceMultiplier: 1.0 },
        { value: '64GB', label: '64 GB', priceMultiplier: 1.20 },
        { value: '96GB', label: '96 GB', priceMultiplier: 1.40 }
      ],
      'MacBook Pro 16': [
        { value: '16GB', label: '16 GB', priceMultiplier: 0.90 },
        { value: '32GB', label: '32 GB', priceMultiplier: 1.0 },
        { value: '64GB', label: '64 GB', priceMultiplier: 1.20 },
        { value: '96GB', label: '96 GB', priceMultiplier: 1.40 },
        { value: '128GB', label: '128 GB', priceMultiplier: 1.60 }
      ],
      
      // Default for laptops
      default: [
        { value: '4GB', label: '4 GB', priceMultiplier: 0.75 },
        { value: '8GB', label: '8 GB', priceMultiplier: 0.90 },
        { value: '16GB', label: '16 GB', priceMultiplier: 1.0 },
        { value: '32GB', label: '32 GB', priceMultiplier: 1.15 },
        { value: '64GB', label: '64 GB', priceMultiplier: 1.35 }
      ]
    }
  },
  
  iPad: {
    // Storage options for iPads
    storage: [
      { value: '64GB', label: '64 GB', priceMultiplier: 0.85 },
      { value: '128GB', label: '128 GB', priceMultiplier: 0.95 },
      { value: '256GB', label: '256 GB', priceMultiplier: 1.0 },
      { value: '512GB', label: '512 GB', priceMultiplier: 1.15 },
      { value: '1TB', label: '1 TB', priceMultiplier: 1.35 },
      { value: '2TB', label: '2 TB', priceMultiplier: 1.60 }
    ],
    
    // RAM for iPads (most don't advertise RAM, but Pro models do)
    ram: {
      'iPad Pro 12.9': [
        { value: '8GB', label: '8 GB', priceMultiplier: 0.95 },
        { value: '16GB', label: '16 GB', priceMultiplier: 1.0 }
      ],
      'iPad Pro 11': [
        { value: '8GB', label: '8 GB', priceMultiplier: 0.95 },
        { value: '16GB', label: '16 GB', priceMultiplier: 1.0 }
      ],
      
      // Default: no RAM selection for standard iPads
      default: []
    }
  }
};

/**
 * Get storage variants for a category
 * @param {string} category - Device category (Phone, Laptop, iPad)
 * @returns {Array} Array of storage variant objects
 */
function getStorageVariants(category) {
  const normalizedCategory = category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
  return variantConfig[normalizedCategory]?.storage || [];
}

/**
 * Get RAM variants for a device
 * @param {string} category - Device category
 * @param {string} modelName - Specific model name
 * @returns {Array} Array of RAM variant objects
 */
function getRAMVariants(category, modelName) {
  const normalizedCategory = category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
  const ramConfig = variantConfig[normalizedCategory]?.ram;
  
  if (!ramConfig) return [];
  
  // Check for model-specific RAM options
  for (const [modelPattern, ramOptions] of Object.entries(ramConfig)) {
    if (modelPattern === 'default') continue;
    
    if (modelName.includes(modelPattern)) {
      return ramOptions;
    }
  }
  
  // Return default RAM options
  return ramConfig.default || [];
}

/**
 * Check if category supports variants
 * @param {string} category - Device category
 * @returns {boolean} True if category supports variant selection
 */
function supportsVariants(category) {
  const normalizedCategory = category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
  return ['Phone', 'Laptop', 'Ipad'].includes(normalizedCategory);
}

/**
 * Calculate adjusted price based on variant selections
 * @param {number} basePrice - Base price of the device
 * @param {Object} variants - Object with storage and ram values
 * @param {string} category - Device category
 * @param {string} modelName - Model name
 * @returns {number} Adjusted price
 */
function calculateVariantPrice(basePrice, variants, category, modelName) {
  if (!basePrice || !variants) return basePrice;
  
  let finalPrice = basePrice;
  
  // Apply storage multiplier
  if (variants.storage) {
    const storageOptions = getStorageVariants(category);
    const storageVariant = storageOptions.find(s => s.value === variants.storage);
    if (storageVariant) {
      finalPrice *= storageVariant.priceMultiplier;
    }
  }
  
  // Apply RAM multiplier
  if (variants.ram) {
    const ramOptions = getRAMVariants(category, modelName);
    const ramVariant = ramOptions.find(r => r.value === variants.ram);
    if (ramVariant) {
      finalPrice *= ramVariant.priceMultiplier;
    }
  }
  
  return Math.round(finalPrice);
}

/**
 * Format variant display text
 * @param {Object} variants - Variant object with storage and ram
 * @returns {string} Formatted text like "(256GB / 8GB)" or "(512GB)"
 */
function formatVariantDisplay(variants) {
  if (!variants) return '';
  
  const parts = [];
  if (variants.storage) parts.push(variants.storage);
  if (variants.ram) parts.push(variants.ram);
  
  return parts.length > 0 ? `(${parts.join(' / ')})` : '';
}

// Export functions globally
window.variantConfig = variantConfig;
window.getStorageVariants = getStorageVariants;
window.getRAMVariants = getRAMVariants;
window.supportsVariants = supportsVariants;
window.calculateVariantPrice = calculateVariantPrice;
window.formatVariantDisplay = formatVariantDisplay;

console.log('✅ Variant configuration loaded for:', Object.keys(variantConfig).join(', '));


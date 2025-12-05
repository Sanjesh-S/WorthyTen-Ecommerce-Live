// js/display-helper.js
// Helper functions for displaying product information correctly

/**
 * Get properly formatted full model name
 * Handles cases where modelName might already include brand name
 * @param {string} brandName - Brand name (e.g., "Canon")
 * @param {string} modelName - Model name (e.g., "EOS 60D" or "Canon EOS 60D")
 * @returns {string} - Properly formatted full name (e.g., "Canon EOS 60D")
 */
function getFullModelName(brandName, modelName) {
  if (!modelName) return brandName || '';
  if (!brandName) return modelName || '';
  
  const brand = brandName.trim();
  const model = modelName.trim();
  
  // Check if model already starts with brand
  if (model.toLowerCase().startsWith(brand.toLowerCase())) {
    // Model already includes brand, return as is
    return model;
  }
  
  // Model doesn't include brand, add it
  return `${brand} ${model}`;
}

/**
 * Remove brand prefix from model name if present
 * @param {string} modelName - Full model name
 * @param {string} brandName - Brand name to remove
 * @returns {string} - Model name without brand prefix
 */
function removeBrandPrefix(modelName, brandName) {
  if (!modelName || !brandName) return modelName;
  
  const model = modelName.trim();
  const brand = brandName.trim();
  
  // Check if starts with brand
  if (model.toLowerCase().startsWith(brand.toLowerCase())) {
    // Remove brand prefix and trim
    return model.substring(brand.length).trim();
  }
  
  return model;
}

// Export globally
window.getFullModelName = getFullModelName;
window.removeBrandPrefix = removeBrandPrefix;

console.log('✅ Display helper functions loaded');


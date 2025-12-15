document.addEventListener('DOMContentLoaded', async () => {
  // Get URL parameters first (source of truth for fresh load/refresh)
  const params = new URLSearchParams(window.location.search);
  const urlModel = params.get('model');
  const urlBrand = params.get('brand');
  const urlCategory = params.get('category');
  const urlImage = params.get('image');
  const urlPrice = params.get('price');

  // Check sessionStorage (used when navigating back)
  const variantData = sessionStorage.getItem('valuationData');
  let modelName, brandName, category, imageUrl, basePrice, variants, adjustedPrice;

  // URL params take priority (fresh load, refresh, or direct link)
  if (urlModel && urlBrand && urlCategory) {
    modelName = urlModel;
    brandName = urlBrand;
    category = urlCategory;
    imageUrl = urlImage;

    // Handle price from URL
    if (urlPrice && urlPrice !== 'null' && urlPrice !== 'undefined' && urlPrice !== '') {
      basePrice = Number(urlPrice);
      if (isNaN(basePrice) || basePrice <= 0) {
        basePrice = null;
      }
    }

    // If price missing, try Firestore
    if (!basePrice && window.firebase && firebase.firestore) {
      try {
        const db = firebase.firestore();
        const snapshot = await db.collection('products')
          .where('name', '==', modelName)
          .where('brand', '==', brandName)
          .where('category', '==', category)
          .limit(1).get();

        if (!snapshot.empty) {
          const productData = snapshot.docs[0].data();
          if (productData.price && productData.price > 0) {
            basePrice = Number(productData.price);
            // Update URL with price
            const newUrl = new URL(window.location);
            newUrl.searchParams.set('price', basePrice);
            window.history.replaceState({}, '', newUrl);
          }
        }
      } catch (error) {
        console.error('Error fetching price:', error);
      }
    }

    // Check sessionStorage for variant info
    if (variantData) {
      const vd = JSON.parse(variantData);
      if (vd.modelName === modelName && vd.brandName === brandName) {
        variants = vd.variants;
        adjustedPrice = vd.adjustedPrice || basePrice;
      }
    }

    adjustedPrice = adjustedPrice || basePrice;

  } else if (variantData) {
    // No URL params, use sessionStorage (navigating back)
    const vd = JSON.parse(variantData);
    modelName = vd.modelName;
    brandName = vd.brandName;
    category = vd.category;
    imageUrl = vd.imageUrl;
    basePrice = vd.basePrice || vd.originalQuotePrice;
    variants = vd.variants;
    adjustedPrice = vd.adjustedPrice || basePrice;
  }

  // Validate required fields
  const isValidPrice = basePrice !== null && basePrice !== undefined && !isNaN(basePrice) && basePrice > 0;

  if (modelName && brandName && isValidPrice && category) {
    const fullName = window.getFullModelName
      ? window.getFullModelName(brandName, modelName)
      : `${brandName} ${modelName}`;

    const variantText = variants && window.formatVariantDisplay
      ? ` ${window.formatVariantDisplay(variants)}` : '';

    document.getElementById('productTitle').textContent = `Sell Old ${fullName}${variantText}`;
    document.getElementById('modelName').textContent = fullName + variantText;

    const modelImage = document.getElementById('productImage');
    if (imageUrl && imageUrl !== 'null' && imageUrl !== 'undefined') {
      modelImage.src = imageUrl;
    } else {
      modelImage.src = 'https://via.placeholder.com/350?text=' + encodeURIComponent(fullName);
    }

    // Display base price (always show base price, not adjusted)
    const displayPrice = adjustedPrice || basePrice;
    document.getElementById('quotePrice').textContent = `₹${Number(displayPrice).toLocaleString('en-IN')}`;

    // Get Exact Value button
    const getExactValueBtn = document.getElementById('getExactValueBtn');
    getExactValueBtn.addEventListener('click', e => {
      e.preventDefault();

      const valuationData = {
        category: category,
        modelName: modelName,
        brandName: brandName,
        imageUrl: imageUrl,
        basePrice: Number(basePrice),
        originalQuotePrice: Number(displayPrice),
        variants: variants,
        adjustedPrice: adjustedPrice
      };

      sessionStorage.setItem('valuationData', JSON.stringify(valuationData));
      window.location.href = 'assessment.html';
    });

  } else {
    // Error handling
    const missing = [];
    if (!modelName) missing.push('Model');
    if (!brandName) missing.push('Brand');
    if (!category) missing.push('Category');
    if (!isValidPrice) missing.push('Price');

    const errorMsg = `Missing required data: ${missing.join(', ')}. Please go back and try again.`;

    if (window.StateHelper && typeof window.StateHelper.showMissingStateMessage === 'function') {
      window.StateHelper.showMissingStateMessage(errorMsg);
    } else {
      alert(errorMsg);
      setTimeout(() => { window.location.href = 'index.html'; }, 100);
    }
  }
});

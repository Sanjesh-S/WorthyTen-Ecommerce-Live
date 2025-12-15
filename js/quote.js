document.addEventListener('DOMContentLoaded', async () => {
  // Check if we came from variant selection or navigating back (data in sessionStorage)
  const variantData = sessionStorage.getItem('valuationData');
  let modelName, brandName, category, imageUrl, basePrice, variants, adjustedPrice;

  if (variantData) {
    // Coming from variant selection or navigating back
    const vd = JSON.parse(variantData);
    modelName = vd.modelName;
    brandName = vd.brandName;
    category = vd.category;
    imageUrl = vd.imageUrl;
    // Use basePrice or originalQuotePrice (for backward compatibility)
    basePrice = vd.basePrice || vd.originalQuotePrice;
    variants = vd.variants;
    adjustedPrice = vd.adjustedPrice || basePrice;

    if (window.Logger) {
      window.Logger.log('Quote page - using data from sessionStorage', { basePrice, adjustedPrice });
    }
  } else {
    // Coming from model selection (backward compatible)
    const params = new URLSearchParams(window.location.search);
    modelName = params.get('model');
    brandName = params.get('brand');
    category = params.get('category');
    imageUrl = params.get('image');
    const priceParam = params.get('price');

    // Handle price - convert to number and validate
    if (priceParam && priceParam !== 'null' && priceParam !== 'undefined' && priceParam !== '') {
      basePrice = Number(priceParam);
      if (isNaN(basePrice) || basePrice <= 0) {
        basePrice = null;
      }
    } else {
      basePrice = null;
    }

    // If price is missing, try to fetch it from Firestore as fallback
    if (!basePrice && modelName && brandName && category) {
      if (window.Logger) {
        window.Logger.log('Price missing from URL, attempting to fetch from Firestore...');
      }

      // Try to fetch price from Firestore
      if (window.firebase && firebase.firestore) {
        try {
          const db = firebase.firestore();
          const snapshot = await db
            .collection('products')
            .where('name', '==', modelName)
            .where('brand', '==', brandName)
            .where('category', '==', category)
            .limit(1)
            .get();

          if (!snapshot.empty) {
            const productData = snapshot.docs[0].data();
            if (productData.price && productData.price > 0) {
              basePrice = Number(productData.price);

              // Update the URL with the price to prevent this issue on refresh
              const newUrl = new URL(window.location);
              newUrl.searchParams.set('price', basePrice);
              window.history.replaceState({}, '', newUrl);

              if (window.Logger) {
                window.Logger.log('Price fetched from Firestore:', basePrice);
              }
            }
          }
        } catch (error) {
          if (window.Logger) {
            window.Logger.error('Error fetching price from Firestore:', error);
          }
        }
      }
    }

    adjustedPrice = basePrice;

    if (window.Logger) {
      window.Logger.log('Quote page - using URL parameters', {
        modelName,
        brandName,
        category,
        basePrice,
        imageUrl
      });
    }
  }

  // Debug logging
  if (window.Logger) {
    window.Logger.log('Quote page data:', { modelName, brandName, category, basePrice, imageUrl });
  }

  // Validate all required fields - basePrice must be a valid number
  const isValidPrice =
    basePrice !== null && basePrice !== undefined && !isNaN(basePrice) && basePrice > 0;

  if (modelName && brandName && isValidPrice && category) {
    const fullName = window.getFullModelName
      ? window.getFullModelName(brandName, modelName)
      : `${brandName} ${modelName}`;

    const variantText =
      variants && window.formatVariantDisplay ? ` ${window.formatVariantDisplay(variants)}` : '';

    document.getElementById('productTitle').textContent = `Sell Old ${fullName}${variantText}`;
    document.getElementById('modelName').textContent = fullName + variantText;
    const modelImage = document.getElementById('productImage');

    if (imageUrl && imageUrl !== 'null' && imageUrl !== 'undefined') {
      modelImage.src = imageUrl;
    } else {
      // Fallback image if none provided
      modelImage.src = 'https://via.placeholder.com/350?text=' + encodeURIComponent(fullName);
    }

    // Use adjusted price if available, otherwise base price
    const displayPrice = adjustedPrice || basePrice;
    document.getElementById('quotePrice').textContent =
      `₹${Number(displayPrice).toLocaleString('en-IN')}`;

    const getExactValueBtn = document.getElementById('getExactValueBtn');
    getExactValueBtn.addEventListener('click', e => {
      e.preventDefault();

      const valuationData = {
        category: category,
        modelName: modelName,
        brandName: brandName,
        imageUrl: imageUrl,
        basePrice: Number(basePrice), // Store base price for navigation back
        originalQuotePrice: Number(displayPrice),
        variants: variants,
        adjustedPrice: adjustedPrice
      };

      sessionStorage.setItem('valuationData', JSON.stringify(valuationData));
      window.location.href = 'assessment.html';
    });
  } else {
    // Improved error message showing what's missing
    const missing = [];
    if (!modelName) {
      missing.push('Model');
    }
    if (!brandName) {
      missing.push('Brand');
    }
    if (!category) {
      missing.push('Category');
    }
    if (!isValidPrice) {
      missing.push('Price');
    }

    const errorMsg = `Missing required data: ${missing.join(', ')}. Please go back and try again.`;

    if (window.Logger) {
      window.Logger.error('Quote page error:', errorMsg, {
        modelName,
        brandName,
        category,
        basePrice,
        isValidPrice
      });
    }

    // Use a more user-friendly error handling
    if (window.StateHelper && typeof window.StateHelper.showMissingStateMessage === 'function') {
      window.StateHelper.showMissingStateMessage(errorMsg);
    } else {
      alert(errorMsg);
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 100);
    }
  }
});

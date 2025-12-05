document.addEventListener("DOMContentLoaded", () => {
    // Check if we came from variant selection (data in sessionStorage)
    const variantData = sessionStorage.getItem('valuationData');
    let modelName, brandName, category, imageUrl, basePrice, variants, adjustedPrice;
    
    if (variantData) {
        // Coming from variant selection
        const vd = JSON.parse(variantData);
        modelName = vd.modelName;
        brandName = vd.brandName;
        category = vd.category;
        imageUrl = vd.imageUrl;
        basePrice = vd.basePrice;
        variants = vd.variants;
        adjustedPrice = vd.adjustedPrice || basePrice;
        
        if (window.Logger) {
            window.Logger.log('Quote page - using variant data from sessionStorage');
        }
    } else {
        // Coming from model selection (backward compatible)
        const params = new URLSearchParams(window.location.search);
        modelName = params.get('model');
        brandName = params.get('brand');
        category = params.get('category');
        imageUrl = params.get('image');
        basePrice = params.get('price');
        adjustedPrice = basePrice;
        
        if (window.Logger) {
            window.Logger.log('Quote page - using URL parameters');
        }
    }

    // Debug logging
    if (window.Logger) {
        window.Logger.log('Quote page data:', { modelName, brandName, category, basePrice, imageUrl });
    }
    
    if (modelName && brandName && basePrice && category) {
        
        const fullName = window.getFullModelName ? 
            window.getFullModelName(brandName, modelName) : 
            `${brandName} ${modelName}`;
        
        const variantText = variants && window.formatVariantDisplay ? 
            ` ${window.formatVariantDisplay(variants)}` : '';
        
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
        document.getElementById('quotePrice').textContent = `₹${Number(displayPrice).toLocaleString('en-IN')}`;

        const getExactValueBtn = document.getElementById('getExactValueBtn');
        getExactValueBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            const valuationData = {
                category: category,
                modelName: modelName,
                brandName: brandName,
                imageUrl: imageUrl, 
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
        if (!modelName) missing.push('Model');
        if (!brandName) missing.push('Brand');
        if (!category) missing.push('Category');
        if (!basePrice) missing.push('Price');
        
        const errorMsg = `Missing required data: ${missing.join(', ')}. Please go back and try again.`;
        
        if (window.Logger) {
            window.Logger.error('Quote page error:', errorMsg, { modelName, brandName, category, basePrice });
        }
        
        alert(errorMsg);
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 100);
    }
});
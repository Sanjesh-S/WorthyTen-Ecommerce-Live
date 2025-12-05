/**
 * Advanced Search with Filters
 * Enhanced search functionality with filters and sorting
 * @file js/advanced-search.js
 */

(function() {
  'use strict';

  let allProducts = [];
  let currentFilters = {
    category: null,
    brand: null,
    minPrice: null,
    maxPrice: null,
    sortBy: 'name'
  };

  /**
   * Initialize advanced search
   */
  function init() {
    attachEventListeners();
    loadProducts();
  }

  /**
   * Load products from Firestore
   */
  async function loadProducts() {
    if (!window.firebase || !window.firebase.firestore) {
      setTimeout(loadProducts, 100);
      return;
    }

    try {
      const db = window.firebase.firestore();
      const snapshot = await db.collection('products').get();
      
      allProducts = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name,
          brand: data.brand,
          category: data.category,
          price: data.price,
          image: data.image
        };
      });

      renderFilters();
      applyFilters();
    } catch (error) {
      if (window.Logger) {
        window.Logger.error('Error loading products:', error);
      }
    }
  }

  /**
   * Render filter UI
   */
  function renderFilters() {
    const categories = [...new Set(allProducts.map(p => p.category).filter(Boolean))];
    const brands = [...new Set(allProducts.map(p => p.brand).filter(Boolean))];
    const prices = allProducts.map(p => p.price).filter(Boolean);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    // Render category filter
    const categoryFilter = document.getElementById('category-filter');
    if (categoryFilter) {
      categoryFilter.innerHTML = `
        <option value="">All Categories</option>
        ${categories.map(cat => `<option value="${cat}">${cat}</option>`).join('')}
      `;
    }

    // Render brand filter
    const brandFilter = document.getElementById('brand-filter');
    if (brandFilter) {
      brandFilter.innerHTML = `
        <option value="">All Brands</option>
        ${brands.map(brand => `<option value="${brand}">${brand}</option>`).join('')}
      `;
    }

    // Render price range
    const priceMin = document.getElementById('price-min');
    const priceMax = document.getElementById('price-max');
    if (priceMin) priceMin.placeholder = `Min: ₹${minPrice}`;
    if (priceMax) priceMax.placeholder = `Max: ₹${maxPrice}`;
  }

  /**
   * Attach event listeners
   */
  function attachEventListeners() {
    // Category filter
    const categoryFilter = document.getElementById('category-filter');
    if (categoryFilter) {
      categoryFilter.addEventListener('change', (e) => {
        currentFilters.category = e.target.value || null;
        applyFilters();
      });
    }

    // Brand filter
    const brandFilter = document.getElementById('brand-filter');
    if (brandFilter) {
      brandFilter.addEventListener('change', (e) => {
        currentFilters.brand = e.target.value || null;
        applyFilters();
      });
    }

    // Price filters
    const priceMin = document.getElementById('price-min');
    const priceMax = document.getElementById('price-max');
    if (priceMin) {
      priceMin.addEventListener('input', debounce((e) => {
        currentFilters.minPrice = e.target.value ? Number(e.target.value) : null;
        applyFilters();
      }, 300));
    }
    if (priceMax) {
      priceMax.addEventListener('input', debounce((e) => {
        currentFilters.maxPrice = e.target.value ? Number(e.target.value) : null;
        applyFilters();
      }, 300));
    }

    // Sort
    const sortBy = document.getElementById('sort-by');
    if (sortBy) {
      sortBy.addEventListener('change', (e) => {
        currentFilters.sortBy = e.target.value;
        applyFilters();
      });
    }

    // Clear filters
    const clearFilters = document.getElementById('clear-filters');
    if (clearFilters) {
      clearFilters.addEventListener('click', () => {
        currentFilters = {
          category: null,
          brand: null,
          minPrice: null,
          maxPrice: null,
          sortBy: 'name'
        };
        if (categoryFilter) categoryFilter.value = '';
        if (brandFilter) brandFilter.value = '';
        if (priceMin) priceMin.value = '';
        if (priceMax) priceMax.value = '';
        if (sortBy) sortBy.value = 'name';
        applyFilters();
      });
    }
  }

  /**
   * Apply filters and render results
   */
  function applyFilters() {
    let filtered = [...allProducts];

    // Category filter
    if (currentFilters.category) {
      filtered = filtered.filter(p => p.category === currentFilters.category);
    }

    // Brand filter
    if (currentFilters.brand) {
      filtered = filtered.filter(p => p.brand === currentFilters.brand);
    }

    // Price filters
    if (currentFilters.minPrice) {
      filtered = filtered.filter(p => p.price >= currentFilters.minPrice);
    }
    if (currentFilters.maxPrice) {
      filtered = filtered.filter(p => p.price <= currentFilters.maxPrice);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (currentFilters.sortBy) {
        case 'price-low':
          return (a.price || 0) - (b.price || 0);
        case 'price-high':
          return (b.price || 0) - (a.price || 0);
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    renderResults(filtered);
  }

  /**
   * Render search results
   */
  function renderResults(products) {
    const resultsContainer = document.getElementById('search-results');
    if (!resultsContainer) return;

    if (products.length === 0) {
      resultsContainer.innerHTML = '<p class="no-results">No products found matching your filters.</p>';
      return;
    }

    resultsContainer.innerHTML = products.map(product => `
      <div class="product-card" data-product-id="${product.id}">
        <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy">
        <div class="product-info">
          <h3>${product.name}</h3>
          <p class="product-brand">${product.brand}</p>
          <p class="product-price">₹${product.price.toLocaleString('en-IN')}</p>
          <a href="quote.html?model=${encodeURIComponent(product.name)}&brand=${encodeURIComponent(product.brand)}&category=${encodeURIComponent(product.category)}&image=${encodeURIComponent(product.image)}&price=${encodeURIComponent(product.price)}" 
             class="cta-button" aria-label="Get quote for ${product.name}">
            Get Quote
          </a>
        </div>
      </div>
    `).join('');
  }

  /**
   * Debounce function
   */
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose globally
  window.AdvancedSearch = {
    init,
    loadProducts,
    applyFilters,
    renderResults
  };

})();


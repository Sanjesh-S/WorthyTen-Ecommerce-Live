/**
 * Homepage Script (Simplified for Multi-Page Navigation)
 * Handles device category selection and search
 * Categories now link to brands.html for brand selection
 * @file js/script.js
 */

// ===== DOM ELEMENTS =====
const searchInput = document.getElementById('search-input');
const dividerText = document.getElementById('divider-text');
const categorySelection = document.getElementById('category-selection');
const categoryGrid = document.getElementById('category-grid');

// ===== GLOBAL DATA STORE =====
let allProducts = [];
let productsLoaded = false;

// ===== CATEGORY IMAGES =====
const categoryImages = {
  'DSLR/Lens':
    'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2',
  'DSLR':
    'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2',
  'Lens':
    'https://images.pexels.com/photos/5082579/pexels-photo-5082579.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2',
  Phone:
    'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2',
  Laptop:
    'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2',
  iPad: 'https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2'
};

// ===== POPULATE CATEGORIES =====
function populateCategories() {
  categoryGrid.innerHTML = '';

  const categories = [
    ...new Set(
      allProducts.map(p => p.category).filter(c => c && c !== 'Lens') // Hide Lens category
    )
  ];
  categories.sort();

  categories.forEach(categoryName => {
    const imageUrl =
      categoryImages[categoryName] ||
      'https://via.placeholder.com/400x400/667eea/ffffff?text=' + categoryName;

    // Display name formatting
    let displayName = `Sell ${categoryName}`;
    if (categoryName === 'DSLR/Lens') displayName = 'Sell DSLR';
    if (categoryName === 'DSLR') displayName = 'Sell DSLR';
    if (categoryName === 'Lens') displayName = 'Sell Lens';

    // Link to brands.html with category parameter
    const cardContent = `
      <a href="brands.html?category=${encodeURIComponent(categoryName)}" class="category-card" data-category="${categoryName}" aria-label="Select ${categoryName} category">
        <div class="category-image-container">
          <img src="${imageUrl}" alt="${categoryName}" class="category-image" loading="lazy">
        </div>
        <span class="category-name">${displayName}</span>
      </a>
    `;

    categoryGrid.innerHTML += cardContent;
  });
}

// ===== SEARCH LOGIC =====
function handleSearch() {
  if (!searchInput) return;

  const searchTerm = searchInput.value.toLowerCase().trim();
  const suggestionsContainer = document.getElementById('search-suggestions');

  // Show product suggestions if search term is long enough
  if (searchTerm.length >= 2 && productsLoaded) {
    showSearchSuggestions(searchTerm, suggestionsContainer);
    return;
  }

  // Hide suggestions
  if (suggestionsContainer) {
    suggestionsContainer.classList.remove('show');
    suggestionsContainer.style.display = 'none';
    searchInput.setAttribute('aria-expanded', 'false');
  }

  // Filter categories
  filterGrid(categoryGrid.querySelectorAll('.category-card'), searchTerm, card => {
    return (card.getAttribute('data-category') || '').toLowerCase();
  });
}

// ===== SHOW SEARCH SUGGESTIONS =====
function showSearchSuggestions(searchTerm, container) {
  if (!container || !allProducts || allProducts.length === 0) return;

  const searchWords = searchTerm.toLowerCase().split(/\s+/).filter(w => w.length > 0);

  const matches = allProducts
    .map(product => {
      // Exclude lenses from search
      if (product.subcategory === 'Lens') return null;
      if (!product.price || product.price <= 0 || isNaN(Number(product.price))) return null;

      const searchableText = [
        product.name || '',
        product.brand || '',
        product.category || ''
      ].join(' ').toLowerCase();

      let matchCount = 0;
      for (const word of searchWords) {
        if (searchableText.includes(word)) matchCount++;
      }

      const allWordsMatch = matchCount === searchWords.length;
      const anyWordMatch = matchCount > 0;

      if (searchWords.length > 1 ? allWordsMatch : anyWordMatch) {
        return { product, score: matchCount };
      }
      return null;
    })
    .filter(m => m !== null)
    .sort((a, b) => b.score - a.score)
    .map(m => m.product)
    .slice(0, 8);

  if (matches.length === 0) {
    container.innerHTML = '<div class="search-suggestion-no-results">No products found. Try a different search term.</div>';
    container.classList.add('show');
    container.style.display = 'block';
    searchInput.setAttribute('aria-expanded', 'true');
    return;
  }

  container.innerHTML = matches.map(product => {
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
  }).join('');

  container.classList.add('show');
  container.style.display = 'block';
  searchInput.setAttribute('aria-expanded', 'true');
}

// ===== HIGHLIGHT MATCH =====
function highlightMatch(text, searchTerm) {
  if (!text || !searchTerm) return text;
  const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  return text.replace(regex, '<strong>$1</strong>');
}

// ===== FILTER GRID =====
function filterGrid(cards, searchTerm, getName) {
  cards.forEach(card => {
    const name = getName(card);
    if (searchTerm === '' || name.includes(searchTerm)) {
      card.style.display = '';
    } else {
      card.style.display = 'none';
    }
  });
}

// ===== SEARCH EVENT LISTENERS =====
let searchTimeout;
if (searchInput) {
  searchInput.addEventListener('input', () => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => handleSearch(), 300);
  });

  // Hide suggestions when clicking outside
  document.addEventListener('click', e => {
    const suggestionsContainer = document.getElementById('search-suggestions');
    if (suggestionsContainer && !suggestionsContainer.contains(e.target) && e.target !== searchInput) {
      suggestionsContainer.classList.remove('show');
      suggestionsContainer.style.display = 'none';
      searchInput.setAttribute('aria-expanded', 'false');
    }
  });

  // Keyboard navigation for suggestions
  searchInput.addEventListener('keydown', e => {
    const suggestionsContainer = document.getElementById('search-suggestions');
    const suggestions = suggestionsContainer?.querySelectorAll('.search-suggestion-item');

    if (!suggestions || suggestions.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const active = suggestionsContainer.querySelector('.search-suggestion-item.active');
      if (active) {
        active.classList.remove('active');
        const next = active.nextElementSibling;
        if (next && next.classList.contains('search-suggestion-item')) {
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
        if (prev && prev.classList.contains('search-suggestion-item')) {
          prev.classList.add('active');
          prev.focus();
        } else {
          suggestions[suggestions.length - 1].classList.add('active');
          suggestions[suggestions.length - 1].focus();
        }
      }
    } else if (e.key === 'Enter') {
      const active = suggestionsContainer.querySelector('.search-suggestion-item.active');
      if (active) {
        e.preventDefault();
        active.click();
      }
    } else if (e.key === 'Escape') {
      suggestionsContainer.classList.remove('show');
      suggestionsContainer.style.display = 'none';
      searchInput.setAttribute('aria-expanded', 'false');
      searchInput.focus();
    }
  });
}

// ===== FETCH PRODUCTS FROM FIREBASE =====
async function fetchProducts() {
  try {
    // Wait for Firebase
    await waitForFirebase();

    const db = firebase.firestore();
    const snapshot = await db.collection('products').get();

    allProducts = [];
    snapshot.forEach(doc => {
      allProducts.push({ id: doc.id, ...doc.data() });
    });

    productsLoaded = true;

    if (window.Logger) {
      window.Logger.log(`✅ Loaded ${allProducts.length} products from Firestore`);
    }

    // Populate categories after products load
    populateCategories();

  } catch (error) {
    if (window.Logger) {
      window.Logger.error('Error fetching products:', error);
    }
    // Show error state
    categoryGrid.innerHTML = `
      <div class="error-state" style="grid-column: 1/-1; text-align: center; padding: 3rem;">
        <i class="fa-solid fa-exclamation-triangle" style="font-size: 2rem; color: var(--danger);"></i>
        <p style="margin-top: 1rem;">Failed to load categories. Please refresh the page.</p>
        <button onclick="location.reload()" class="btn-primary" style="margin-top: 1rem;">Retry</button>
      </div>
    `;
  }
}

// ===== WAIT FOR FIREBASE =====
function waitForFirebase() {
  return new Promise((resolve, reject) => {
    let attempts = 0;
    const maxAttempts = 50;

    const check = () => {
      attempts++;
      if (typeof firebase !== 'undefined' && firebase.firestore) {
        resolve();
      } else if (attempts >= maxAttempts) {
        reject(new Error('Firebase not loaded'));
      } else {
        setTimeout(check, 100);
      }
    };
    check();
  });
}

// ===== INITIALIZE =====
function initScript() {
  // Show loading state
  categoryGrid.innerHTML = `
    <div class="loading-state" style="grid-column: 1/-1; text-align: center; padding: 3rem;">
      <i class="fa-solid fa-spinner fa-spin" style="font-size: 2rem; color: var(--primary);"></i>
      <p style="margin-top: 1rem; color: var(--text-muted);">Loading categories...</p>
    </div>
  `;

  // Fetch products from Firebase
  fetchProducts();
}

// ===== START =====
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initScript);
} else {
  initScript();
}

/**
 * Multi-Device Selling Support
 * Allows users to sell multiple devices in a single session
 * @file js/multi-device.js
 */

(function() {
  'use strict';

  const CART_KEY = 'deviceCart';

  /**
   * Initialize multi-device cart
   */
  function initCart() {
    const cart = getCart();
    updateCartUI(cart);
    attachEventListeners();
  }

  /**
   * Get cart from sessionStorage
   */
  function getCart() {
    try {
      const cartData = sessionStorage.getItem(CART_KEY);
      return cartData ? JSON.parse(cartData) : [];
    } catch (e) {
      if (window.Logger) {
        window.Logger.error('Error getting cart:', e);
      }
      return [];
    }
  }

  /**
   * Save cart to sessionStorage
   */
  function saveCart(cart) {
    try {
      sessionStorage.setItem(CART_KEY, JSON.stringify(cart));
      updateCartUI(cart);
    } catch (e) {
      if (window.Logger) {
        window.Logger.error('Error saving cart:', e);
      }
    }
  }

  /**
   * Add device to cart
   */
  function addToCart(deviceData) {
    const cart = getCart();
    const device = {
      id: Date.now().toString(),
      ...deviceData,
      addedAt: new Date().toISOString()
    };
    cart.push(device);
    saveCart(cart);
    
    if (window.Analytics) {
      window.Analytics.trackEvent('device_added_to_cart', {
        deviceId: device.id,
        deviceName: device.name
      });
    }

    return device.id;
  }

  /**
   * Remove device from cart
   */
  function removeFromCart(deviceId) {
    const cart = getCart();
    const filtered = cart.filter(device => device.id !== deviceId);
    saveCart(filtered);
    
    if (window.Analytics) {
      window.Analytics.trackEvent('device_removed_from_cart', {
        deviceId: deviceId
      });
    }
  }

  /**
   * Get total cart value
   */
  function getCartTotal() {
    const cart = getCart();
    return cart.reduce((total, device) => {
      return total + (device.finalPrice || device.price || 0);
    }, 0);
  }

  /**
   * Update cart UI
   */
  function updateCartUI(cart) {
    const cartBadge = document.getElementById('cart-badge');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');
    
    const count = cart.length;
    
    if (cartBadge) {
      cartBadge.textContent = count;
      cartBadge.style.display = count > 0 ? 'block' : 'none';
    }
    
    if (cartCount) {
      cartCount.textContent = count;
    }
    
    if (cartTotal) {
      const total = getCartTotal();
      cartTotal.textContent = `₹${total.toLocaleString('en-IN')}`;
    }

    // Update cart dropdown/list if exists
    const cartList = document.getElementById('cart-list');
    if (cartList) {
      renderCartList(cart, cartList);
    }
  }

  /**
   * Render cart list
   */
  function renderCartList(cart, container) {
    if (cart.length === 0) {
      container.innerHTML = '<p class="empty-cart">No devices in cart</p>';
      return;
    }

    container.innerHTML = cart.map(device => `
      <div class="cart-item" data-device-id="${device.id}">
        <img src="${device.imageUrl || device.image}" alt="${device.name}" class="cart-item-image">
        <div class="cart-item-details">
          <h4>${device.name}</h4>
          <p>₹${(device.finalPrice || device.price || 0).toLocaleString('en-IN')}</p>
        </div>
        <button class="remove-from-cart-btn" aria-label="Remove ${device.name} from cart" data-device-id="${device.id}">
          <i class="fa-solid fa-trash" aria-hidden="true"></i>
        </button>
      </div>
    `).join('');

    // Attach remove listeners
    container.querySelectorAll('.remove-from-cart-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const deviceId = e.currentTarget.dataset.deviceId;
        removeFromCart(deviceId);
      });
    });
  }

  /**
   * Attach event listeners
   */
  function attachEventListeners() {
    // Cart toggle button
    const cartToggle = document.getElementById('cart-toggle');
    if (cartToggle) {
      cartToggle.addEventListener('click', () => {
        const cartDropdown = document.getElementById('cart-dropdown');
        if (cartDropdown) {
          cartDropdown.classList.toggle('show');
        }
      });
    }

    // Clear cart button
    const clearCartBtn = document.getElementById('clear-cart');
    if (clearCartBtn) {
      clearCartBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to clear all devices from cart?')) {
          saveCart([]);
        }
      });
    }
  }

  /**
   * Checkout - proceed to summary for all devices
   */
  function checkout() {
    const cart = getCart();
    if (cart.length === 0) {
      showError('Cart is empty');
      return;
    }

    // Store cart in sessionStorage for summary page
    sessionStorage.setItem('checkoutCart', JSON.stringify(cart));
    
    // Redirect to multi-device summary page
    window.location.href = 'summary.html?multi=true';
  }

  /**
   * Show error
   */
  function showError(message) {
    if (window.UI && window.UI.showToast) {
      window.UI.showToast(message, 'error');
    } else {
      alert(message);
    }
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCart);
  } else {
    initCart();
  }

  // Expose globally
  window.MultiDevice = {
    getCart,
    addToCart,
    removeFromCart,
    getCartTotal,
    checkout,
    updateCartUI
  };

})();


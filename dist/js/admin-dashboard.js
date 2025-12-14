// js/admin-dashboard.js (v3 - Full Product Management)

document.addEventListener('DOMContentLoaded', () => {
  // Global Elements
  const logoutButton = document.getElementById('logout-button');
  let db; // Firestore database instance

  // Tab Elements
  const showPickupsBtn = document.getElementById('showPickupsBtn');
  const showProductsBtn = document.getElementById('showProductsBtn');
  const showUsersBtn = document.getElementById('showUsersBtn');
  const pickupsPanel = document.getElementById('pickupsPanel');
  const productsPanel = document.getElementById('productsPanel');
  const usersPanel = document.getElementById('usersPanel');
  const userRoleBadge = document.getElementById('user-role-badge');

  // Pickups Panel Elements
  const pickupListBody = document.getElementById('pickup-list-body');

  // Products Panel Elements
  const productForm = document.getElementById('product-form');
  const productFormStatus = document.getElementById('product-form-status');
  const productListBody = document.getElementById('product-list-body');
  const saveProductBtn = document.getElementById('save-product-btn');

  // Input Fields
  const productCategory = document.getElementById('product-category');
  const productBrand = document.getElementById('product-brand');
  const productName = document.getElementById('product-name');
  const productPrice = document.getElementById('product-price');
  const productImage = document.getElementById('product-image');

  // 1. Auth Gatekeeper
  if (!firebase || !firebase.auth) {
    if (window.Logger) {
      window.Logger.error('Firebase not loaded. Redirecting to login.');
    }
    window.location.href = 'admin-login.html';
    return;
  }

  firebase.auth().onAuthStateChanged(async user => {
    if (user) {
      // User is signed in.
      if (window.Logger) {
        window.Logger.log('Admin user signed in. Initializing RBAC...');
      }
      db = firebase.firestore(); // Initialize db instance

      // Initialize RBAC - this will check if user exists in staffUsers collection
      try {
        if (!window.RBAC) {
          throw new Error('RBAC module not loaded');
        }

        const userData = await window.RBAC.initialize(user);

        if (!userData) {
          throw new Error('User not authorized');
        }

        // Show role badge
        if (userRoleBadge) {
          userRoleBadge.innerHTML = window.RBAC.getRoleBadgeHTML(userData.role);
        }

        // Apply permission-based UI
        applyPermissions();

        // Load initial tab
        loadPickupRequests();

        // Setup listeners
        setupTabListeners();
        setupPickupListeners();
        setupProductFormListener();
        setupProductListListeners();
        setupDropdownListeners();

        // Populate dropdowns when products panel is shown
        populateCategoryDropdown();
        populateBrandDropdown();

        // Initialize user management if permitted
        if (window.RBAC.canManageUsers() && window.UserManagement) {
          window.UserManagement.init();
        }
      } catch (error) {
        if (window.Logger) {
          window.Logger.error('RBAC initialization failed:', error);
        }
        alert('Access denied: ' + error.message);
        firebase.auth().signOut();
        window.location.href = 'admin-login.html';
      }
    } else {
      // No user is signed in. Redirect to login.
      if (window.Logger) {
        window.Logger.log('No user signed in. Redirecting to login.');
      }
      window.location.href = 'admin-login.html';
    }
  });

  // 2. Logout Function
  logoutButton.addEventListener('click', () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        if (window.Logger) {
          window.Logger.log('Admin signed out.');
        }
        // Clear RBAC data
        if (window.RBAC) {
          window.RBAC.clear();
        }
        // Cleanup user management listeners
        if (window.UserManagement) {
          window.UserManagement.cleanup();
        }
        window.location.href = 'admin-login.html';
      })
      .catch(error => {
        if (window.Logger) {
          window.Logger.error('Sign out error:', error);
        }
      });
  });

  // 3. Tab Switching Logic
  function setupTabListeners() {
    showPickupsBtn.addEventListener('click', () => {
      pickupsPanel.classList.add('active');
      productsPanel.classList.remove('active');
      if (usersPanel) {
        usersPanel.classList.remove('active');
      }
      showPickupsBtn.classList.add('active');
      showProductsBtn.classList.remove('active');
      if (showUsersBtn) {
        showUsersBtn.classList.remove('active');
      }
      loadPickupRequests(); // Refresh data
    });

    showProductsBtn.addEventListener('click', () => {
      pickupsPanel.classList.remove('active');
      productsPanel.classList.add('active');
      if (usersPanel) {
        usersPanel.classList.remove('active');
      }
      showPickupsBtn.classList.remove('active');
      showProductsBtn.classList.add('active');
      if (showUsersBtn) {
        showUsersBtn.classList.remove('active');
      }
      loadProducts(); // Load product data
      populateCategoryDropdown(); // Refresh dropdowns
      populateBrandDropdown();
    });

    // User Management Tab (only if available)
    if (showUsersBtn) {
      showUsersBtn.addEventListener('click', () => {
        pickupsPanel.classList.remove('active');
        productsPanel.classList.remove('active');
        if (usersPanel) {
          usersPanel.classList.add('active');
        }
        showPickupsBtn.classList.remove('active');
        showProductsBtn.classList.remove('active');
        showUsersBtn.classList.add('active');

        // Load users if UserManagement is available
        if (window.UserManagement) {
          window.UserManagement.loadUsers();
        }
      });
    }
  }

  // Apply permission-based UI restrictions
  function applyPermissions() {
    if (!window.RBAC) {
      return;
    }

    // Show/hide User Management tab
    if (showUsersBtn) {
      showUsersBtn.style.display = window.RBAC.canManageUsers() ? '' : 'none';
    }

    // Note: Product form and actions are handled in the specific functions
    // based on permissions at runtime
  }

  // ===========================================
  // PICKUP REQUESTS LOGIC (Section 4)
  // ===========================================

  async function loadPickupRequests() {
    if (!db) {
      pickupListBody.innerHTML = '<tr><td colspan="7">Error: Firestore not loaded.</td></tr>';
      return;
    }

    try {
      const snap = await db.collection('pickupRequests').orderBy('createdAt', 'desc').get();
      if (snap.empty) {
        pickupListBody.innerHTML =
          '<tr><td colspan="7" style="text-align: center;">No pickup requests found.</td></tr>';
        return;
      }

      pickupListBody.innerHTML = ''; // Clear "Loading..."

      snap.forEach(doc => {
        const d = doc.data();
        const docId = doc.id;
        const customer = d.customer || {};
        const device = d.device || {};
        const schedule = d.schedule || {};

        const row = document.createElement('tr');

        // Action buttons based on status
        let actionCell = '';
        const status = d.status || 'New';

        if (status === 'New') {
          if (d.userId) {
            actionCell = `<td>
                            <div class="action-buttons">
                                <button class="action-btn-sm btn-complete complete-btn" 
                                        data-doc-id="${docId}" 
                                        data-user-id="${d.userId}"
                                        data-price="${d.finalPrice || 0}"
                                        title="Mark as completed and award coins">
                                    ✓ Complete
                                </button>
                                <button class="action-btn-sm btn-hold hold-btn" 
                                        data-doc-id="${docId}"
                                        title="Put on hold for review">
                                    ⏸ Hold
                                </button>
                                <button class="action-btn-sm btn-suspect suspect-btn" 
                                        data-doc-id="${docId}"
                                        title="Mark as suspicious">
                                    ⚠ Suspect
                                </button>
                                <button class="action-btn-sm btn-reject reject-btn" 
                                        data-doc-id="${docId}"
                                        title="Reject this request">
                                    ✕ Reject
                                </button>
                            </div>
                         </td>`;
          } else {
            actionCell = '<td><small>No User ID</small></td>';
          }
        } else if (status === 'Hold' || status === 'Suspect') {
          // For Hold/Suspect, allow completing or rejecting
          actionCell = `<td>
                        <div class="action-buttons">
                            <button class="action-btn-sm btn-complete complete-btn" 
                                    data-doc-id="${docId}" 
                                    data-user-id="${d.userId}"
                                    data-price="${d.finalPrice || 0}">
                                ✓ Complete
                            </button>
                            <button class="action-btn-sm btn-reject reject-btn" 
                                    data-doc-id="${docId}">
                                ✕ Reject
                            </button>
                            <button class="action-btn-sm btn-reopen reopen-btn" 
                                    data-doc-id="${docId}">
                                ↻ Reopen
                            </button>
                        </div>
                    </td>`;
        } else if (status === 'Rejected') {
          // For Rejected, allow reopening
          actionCell = `<td>
                        <button class="action-btn-sm btn-reopen reopen-btn" 
                                data-doc-id="${docId}">
                            ↻ Reopen
                        </button>
                    </td>`;
        } else {
          // Completed - no actions
          actionCell = '<td>-</td>';
        }

        // Status badge with different colors
        let statusBadge = '';
        switch (status) {
          case 'New':
            statusBadge = '<span class="status-badge status-new">New</span>';
            break;
          case 'Completed':
            statusBadge = '<span class="status-badge status-completed">Completed</span>';
            break;
          case 'Hold':
            statusBadge = '<span class="status-badge status-hold">On Hold</span>';
            break;
          case 'Suspect':
            statusBadge = '<span class="status-badge status-suspect">Suspicious</span>';
            break;
          case 'Rejected':
            statusBadge = '<span class="status-badge status-rejected">Rejected</span>';
            break;
          default:
            statusBadge = `<span class="status-badge">${status}</span>`;
        }

        const statusCell = `<td>${statusBadge}</td>`;

        // Get remarks based on status
        let remarks = '';
        if (status === 'Hold' && d.holdReason) {
          remarks = `<span style="color: #f59e0b; font-size: 13px;">${d.holdReason}</span>`;
        } else if (status === 'Suspect' && d.suspectReason) {
          remarks = `<span style="color: #dc2626; font-size: 13px;">${d.suspectReason}</span>`;
        } else if (status === 'Rejected' && d.rejectReason) {
          remarks = `<span style="color: #6b7280; font-size: 13px;">${d.rejectReason}</span>`;
        } else {
          remarks = '<span style="color: #9ca3af; font-size: 13px;">-</span>';
        }

        const remarksCell = `<td class="details-col" style="max-width: 200px; word-wrap: break-word;">${remarks}</td>`;

        row.innerHTML = `
                    <td class="details-col">
                        <strong>${customer.name || 'N/A'}</strong><br>
                        ${customer.phone || 'N/A'}<br>
                        ${customer.address || 'N/A'}<br>
                        ${customer.city || ''}, ${customer.pincode || ''}
                    </td>
                    <td class="details-col">
                        <strong>${device.brandName || ''} ${device.modelName || ''}</strong><br>
                        Original: ${money(device.originalQuotePrice)}
                    </td>
                    <td><strong>${money(d.finalPrice)}</strong></td>
                    <td class="details-col">
                        ${schedule.dateLabel || 'N/A'}<br>
                        <span style="font-size: 13px;">${schedule.slot || 'N/A'}</span>
                    </td>
                    ${statusCell}
                    ${remarksCell}
                    ${actionCell}
                `;
        pickupListBody.appendChild(row);
      });
    } catch (e) {
      if (window.Logger) {
        window.Logger.error('Error loading pickup data:', e);
      }
      pickupListBody.innerHTML = `<tr><td colspan="7">Error: ${e.message}</td></tr>`;
    }
  }

  function setupPickupListeners() {
    pickupListBody.addEventListener('click', async e => {
      const btn = e.target;
      if (!btn.classList.contains('action-btn-sm')) {
        return;
      }

      const docId = btn.dataset.docId;
      if (!docId) {
        return;
      }

      // Complete Button
      if (btn.classList.contains('complete-btn')) {
        const userId = btn.dataset.userId;
        const price = parseInt(btn.dataset.price, 10);

        const coinPercentage = window.Config?.coins?.defaultPercentage || 0.05;
        const defaultCoins = Math.round(price * coinPercentage);
        const coinsToAdd = prompt(
          `Pickup complete. How many coins to award this user? (Default is 5% = ${defaultCoins} coins)`,
          defaultCoins
        );

        if (coinsToAdd === null || isNaN(parseInt(coinsToAdd, 10))) {
          return; // Admin cancelled
        }

        const coinAmount = parseInt(coinsToAdd, 10);
        if (coinAmount < 0) {
          alert('Cannot add negative coins.');
          return;
        }

        btn.disabled = true;
        const originalText = btn.innerHTML;
        btn.innerHTML = '⏳ Working...';

        try {
          const pickupRef = db.collection('pickupRequests').doc(docId);
          const userRef = db.collection('users').doc(userId);
          const batch = db.batch();

          batch.update(pickupRef, {
            status: 'Completed',
            completedAt: firebase.firestore.FieldValue.serverTimestamp()
          });
          batch.update(userRef, {
            coins: firebase.firestore.FieldValue.increment(coinAmount)
          });

          await batch.commit();

          alert(`✅ Success! ${coinAmount} coins added to user.`);
          loadPickupRequests(); // Refresh the list
        } catch (error) {
          if (window.Logger) {
            window.Logger.error('Error completing pickup:', error);
          }
          alert('❌ Error: ' + error.message);
          btn.disabled = false;
          btn.innerHTML = originalText;
        }
      } else if (btn.classList.contains('hold-btn')) {
        const reason = prompt('Why are you putting this request on hold?', 'Needs verification');
        if (reason === null) {
          return;
        } // Cancelled

        btn.disabled = true;
        const originalText = btn.innerHTML;
        btn.innerHTML = '⏳ Working...';

        try {
          await db.collection('pickupRequests').doc(docId).update({
            status: 'Hold',
            holdReason: reason,
            holdAt: firebase.firestore.FieldValue.serverTimestamp()
          });

          alert('✅ Request put on hold.');
          loadPickupRequests();
        } catch (error) {
          alert('❌ Error: ' + error.message);
          btn.disabled = false;
          btn.innerHTML = originalText;
        }
      } else if (btn.classList.contains('suspect-btn')) {
        const reason = prompt('Why is this request suspicious?', 'Suspicious activity detected');
        if (reason === null) {
          return;
        } // Cancelled

        if (!confirm('Are you sure you want to mark this as SUSPICIOUS?')) {
          return;
        }

        btn.disabled = true;
        const originalText = btn.innerHTML;
        btn.innerHTML = '⏳ Working...';

        try {
          await db.collection('pickupRequests').doc(docId).update({
            status: 'Suspect',
            suspectReason: reason,
            suspectAt: firebase.firestore.FieldValue.serverTimestamp()
          });

          alert('⚠ Request marked as suspicious.');
          loadPickupRequests();
        } catch (error) {
          alert('❌ Error: ' + error.message);
          btn.disabled = false;
          btn.innerHTML = originalText;
        }
      } else if (btn.classList.contains('reject-btn')) {
        const reason = prompt('Why are you rejecting this request?', 'Does not meet criteria');
        if (reason === null) {
          return;
        } // Cancelled

        if (!confirm('Are you sure you want to REJECT this request?')) {
          return;
        }

        btn.disabled = true;
        const originalText = btn.innerHTML;
        btn.innerHTML = '⏳ Working...';

        try {
          await db.collection('pickupRequests').doc(docId).update({
            status: 'Rejected',
            rejectReason: reason,
            rejectedAt: firebase.firestore.FieldValue.serverTimestamp()
          });

          alert('✅ Request rejected.');
          loadPickupRequests();
        } catch (error) {
          alert('❌ Error: ' + error.message);
          btn.disabled = false;
          btn.innerHTML = originalText;
        }
      } else if (btn.classList.contains('reopen-btn')) {
        if (!confirm("Reopen this request as 'New'?")) {
          return;
        }

        btn.disabled = true;
        const originalText = btn.innerHTML;
        btn.innerHTML = '⏳ Working...';

        try {
          await db.collection('pickupRequests').doc(docId).update({
            status: 'New',
            reopenedAt: firebase.firestore.FieldValue.serverTimestamp()
          });

          alert('✅ Request reopened.');
          loadPickupRequests();
        } catch (error) {
          alert('❌ Error: ' + error.message);
          btn.disabled = false;
          btn.innerHTML = originalText;
        }
      }
    });
  }

  // ===========================================
  // MANAGE PRODUCTS LOGIC (Section 5)
  // ===========================================

  // Populate Category Dropdown
  async function populateCategoryDropdown() {
    if (!db || !productCategory) {
      return;
    }

    try {
      const snap = await db.collection('products').get();
      const categories = new Set();

      snap.forEach(doc => {
        const data = doc.data();
        if (data.category) {
          categories.add(data.category);
        }
      });

      // Clear existing options except the first one
      productCategory.innerHTML = '<option value="">Select Category...</option>';

      // Add existing categories
      Array.from(categories)
        .sort()
        .forEach(cat => {
          const option = document.createElement('option');
          option.value = cat;
          option.textContent = cat;
          productCategory.appendChild(option);
        });

      // Add "Add New Category" option
      const addNewOption = document.createElement('option');
      addNewOption.value = '__ADD_NEW__';
      addNewOption.textContent = '+ Add New Category...';
      productCategory.appendChild(addNewOption);
    } catch (error) {
      if (window.Logger) {
        window.Logger.error('Error populating category dropdown:', error);
      }
    }
  }

  // Populate Brand Dropdown
  async function populateBrandDropdown() {
    if (!db || !productBrand) {
      return;
    }

    try {
      const snap = await db.collection('products').get();
      const brands = new Set();
      const selectedCategory = productCategory ? productCategory.value : null;

      snap.forEach(doc => {
        const data = doc.data();
        // If category is selected, filter brands by category
        if (selectedCategory && selectedCategory !== '' && selectedCategory !== '__ADD_NEW__') {
          if (data.brand && data.category === selectedCategory) {
            brands.add(data.brand);
          }
        } else if (data.brand) {
          brands.add(data.brand);
        }
      });

      // Clear existing options except the first one
      productBrand.innerHTML = '<option value="">Select Brand...</option>';

      // Add existing brands
      Array.from(brands)
        .sort()
        .forEach(brand => {
          const option = document.createElement('option');
          option.value = brand;
          option.textContent = brand;
          productBrand.appendChild(option);
        });

      // Add "Add New Brand" option
      const addNewOption = document.createElement('option');
      addNewOption.value = '__ADD_NEW__';
      addNewOption.textContent = '+ Add New Brand...';
      productBrand.appendChild(addNewOption);
    } catch (error) {
      if (window.Logger) {
        window.Logger.error('Error populating brand dropdown:', error);
      }
    }
  }

  // Setup dropdown listeners
  function setupDropdownListeners() {
    // Category dropdown - handle "Add New" option
    if (productCategory) {
      productCategory.addEventListener('change', async e => {
        if (e.target.value === '__ADD_NEW__') {
          const newCategory = prompt('Enter new category name:');
          if (newCategory && newCategory.trim()) {
            // Add the new category as an option
            const option = document.createElement('option');
            option.value = newCategory.trim();
            option.textContent = newCategory.trim();
            // Insert before the "Add New" option
            const addNewOption = productCategory.querySelector('option[value="__ADD_NEW__"]');
            if (addNewOption) {
              productCategory.insertBefore(option, addNewOption);
            } else {
              productCategory.appendChild(option);
            }
            // Select the new category
            productCategory.value = newCategory.trim();
            // Repopulate brand dropdown based on new category
            await populateBrandDropdown();
          } else {
            // Reset to empty if cancelled
            productCategory.value = '';
          }
        } else if (e.target.value && e.target.value !== '') {
          // Category changed, repopulate brands
          await populateBrandDropdown();
        }
      });
    }

    // Brand dropdown - handle "Add New" option
    if (productBrand) {
      productBrand.addEventListener('change', async e => {
        if (e.target.value === '__ADD_NEW__') {
          const newBrand = prompt('Enter new brand name:');
          if (newBrand && newBrand.trim()) {
            // Add the new brand as an option
            const option = document.createElement('option');
            option.value = newBrand.trim();
            option.textContent = newBrand.trim();
            // Insert before the "Add New" option
            const addNewOption = productBrand.querySelector('option[value="__ADD_NEW__"]');
            if (addNewOption) {
              productBrand.insertBefore(option, addNewOption);
            } else {
              productBrand.appendChild(option);
            }
            // Select the new brand
            productBrand.value = newBrand.trim();
          } else {
            // Reset to empty if cancelled
            productBrand.value = '';
          }
        }
      });
    }
  }

  async function loadProducts() {
    if (!db) {
      productListBody.innerHTML = '<tr><td colspan="5">Error: Firestore not loaded.</td></tr>';
      return;
    }

    try {
      const snap = await db
        .collection('products')
        .orderBy('category')
        .orderBy('brand')
        .orderBy('name')
        .get();
      if (snap.empty) {
        productListBody.innerHTML =
          '<tr><td colspan="5" style="text-align: center;">No products found. Click "Add New Product" to start.</td></tr>';
        return;
      }

      productListBody.innerHTML = ''; // Clear "Loading..."

      snap.forEach(doc => {
        const d = doc.data();
        const docId = doc.id;
        const row = document.createElement('tr');

        // Check permissions for action buttons
        const canEdit = !window.RBAC || window.RBAC.canAddEditProducts();
        const canDelete = !window.RBAC || window.RBAC.canDeleteProducts();

        // Get variants data for Phone/Laptop/iPad
        const variants = (d.variants || []).join('|');
        const variantsWithPrices = encodeURIComponent(JSON.stringify(d.variantsWithPrices || []));

        let actionsHtml = '<td>';
        if (canEdit) {
          actionsHtml += `<button class="action-btn edit-btn" data-doc-id="${docId}" data-price="${d.price}" data-category="${d.category || ''}" data-variants="${variants}" data-variants-prices="${variantsWithPrices}">Edit Price</button>`;
          actionsHtml += `<button class="action-btn edit-name-btn" data-doc-id="${docId}" data-name="${d.name || ''}">Edit Name</button>`;
        }
        if (canDelete) {
          actionsHtml += `<button class="action-btn delete-btn" data-doc-id="${docId}">Delete</button>`;
        }
        if (!canEdit && !canDelete) {
          actionsHtml += '<span style="color: #999;">View Only</span>';
        }
        actionsHtml += '</td>';

        row.innerHTML = `
                    <td>${d.category || 'N/A'}</td>
                    <td>${d.brand || 'N/A'}</td>
                    <td><strong>${d.name || 'N/A'}</strong></td>
                    <td>${money(d.price)}</td>
                    ${actionsHtml}
                `;
        productListBody.appendChild(row);
      });
    } catch (e) {
      if (window.Logger) {
        window.Logger.error('Error loading product data:', e);
      }
      productListBody.innerHTML = `<tr><td colspan="5">Error: ${e.message}</td></tr>`;
    }
  }

  function setupProductFormListener() {
    // Check if user has permission to add/edit products
    if (window.RBAC && !window.RBAC.canAddEditProducts()) {
      // Disable the form
      productForm.querySelectorAll('input, select, button').forEach(el => (el.disabled = true));
      productFormStatus.textContent = "You don't have permission to add products.";
      productFormStatus.style.color = 'var(--muted)';
      productFormStatus.style.display = 'block';
      return;
    }

    productForm.addEventListener('submit', async e => {
      e.preventDefault();

      // Double-check permission
      if (window.RBAC && !window.RBAC.canAddEditProducts()) {
        alert('You do not have permission to add products.');
        return;
      }

      saveProductBtn.disabled = true;
      saveProductBtn.textContent = 'Saving...';
      productFormStatus.style.display = 'none';

      try {
        const newProduct = {
          category: productCategory.value.trim(),
          brand: productBrand.value.trim(),
          name: productName.value.trim(),
          price: Number(productPrice.value),
          image: productImage.value.trim()
        };

        if (
          !newProduct.category ||
          !newProduct.brand ||
          !newProduct.name ||
          !newProduct.price ||
          !newProduct.image
        ) {
          throw new Error('All fields are required.');
        }

        await db.collection('products').add(newProduct);

        productFormStatus.textContent = 'Success! Product added.';
        productFormStatus.style.color = 'var(--ok)';
        productFormStatus.style.display = 'block';

        productForm.reset(); // Clear the form
        loadProducts(); // Refresh the product list
      } catch (error) {
        if (window.Logger) {
          window.Logger.error('Error adding product:', error);
        }
        productFormStatus.textContent = 'Error: ' + error.message;
        productFormStatus.style.color = 'var(--danger)';
        productFormStatus.style.display = 'block';
      } finally {
        saveProductBtn.disabled = false;
        saveProductBtn.textContent = 'Save Product';
      }
    });
  }

  function setupProductListListeners() {
    productListBody.addEventListener('click', async e => {
      const btn = e.target;
      const docId = btn.dataset.docId;
      if (!docId) {
        return;
      }

      // --- Handle Delete ---
      if (btn.classList.contains('delete-btn')) {
        // Check permission
        if (window.RBAC && !window.RBAC.canDeleteProducts()) {
          alert('You do not have permission to delete products.');
          return;
        }

        if (!confirm('Are you sure you want to delete this product?')) {
          return;
        }
        btn.disabled = true;
        try {
          await db.collection('products').doc(docId).delete();
          loadProducts(); // Refresh list
        } catch (error) {
          alert('Error deleting product: ' + error.message);
          btn.disabled = false;
        }
      }

      // --- Handle Edit Price ---
      if (btn.classList.contains('edit-btn')) {
        // Check permission
        if (window.RBAC && !window.RBAC.canAddEditProducts()) {
          alert('You do not have permission to edit products.');
          return;
        }

        const currentPrice = btn.dataset.price;
        const category = btn.dataset.category || '';
        const variantsStr = btn.dataset.variants || '';
        const variantsPricesStr = btn.dataset.variantsPrices || '';

        // Check if this is a variant-enabled category (Phone, Laptop, iPad)
        const variantCategories = ['Phone', 'Laptop', 'iPad'];
        const hasVariants = variantsStr && variantCategories.includes(category);

        if (hasVariants) {
          // Show variant selection for variant-enabled categories
          const variants = variantsStr.split('|').filter(v => v);
          let variantsWithPrices = [];

          try {
            variantsWithPrices = JSON.parse(decodeURIComponent(variantsPricesStr));
          } catch (e) {
            variantsWithPrices = [];
          }

          if (variants.length === 0) {
            // No variants, just update base price
            const newPrice = prompt('Enter the new base price:', currentPrice);
            if (newPrice === null || isNaN(Number(newPrice)) || Number(newPrice) <= 0) {
              return;
            }

            btn.disabled = true;
            try {
              await db.collection('products').doc(docId).update({ price: Number(newPrice) });
              loadProducts();
            } catch (error) {
              alert('Error updating price: ' + error.message);
              btn.disabled = false;
            }
            return;
          }

          // Build variant options list
          let variantOptions = 'Select which price to update:\n\n';
          variantOptions += '0. Base Price (₹' + Number(currentPrice).toLocaleString('en-IN') + ')\n';

          variants.forEach((v, i) => {
            const existingPrice = variantsWithPrices.find(vp => vp.variant === v);
            const price = existingPrice ? '₹' + Number(existingPrice.price).toLocaleString('en-IN') : 'Not set';
            variantOptions += (i + 1) + '. ' + v + ' (' + price + ')\n';
          });

          const selection = prompt(variantOptions + '\nEnter number (0-' + variants.length + '):', '0');

          if (selection === null) return;
          const selNum = parseInt(selection, 10);

          if (isNaN(selNum) || selNum < 0 || selNum > variants.length) {
            alert('Invalid selection');
            return;
          }

          if (selNum === 0) {
            // Update base price
            const newPrice = prompt('Enter new BASE price:', currentPrice);
            if (newPrice === null || isNaN(Number(newPrice)) || Number(newPrice) <= 0) return;

            btn.disabled = true;
            try {
              await db.collection('products').doc(docId).update({ price: Number(newPrice) });
              loadProducts();
            } catch (error) {
              alert('Error updating price: ' + error.message);
              btn.disabled = false;
            }
          } else {
            // Update specific variant price
            const selectedVariant = variants[selNum - 1];
            const existingVariantPrice = variantsWithPrices.find(vp => vp.variant === selectedVariant);
            const currentVariantPrice = existingVariantPrice ? existingVariantPrice.price : currentPrice;

            const newPrice = prompt('Enter new price for ' + selectedVariant + ':', currentVariantPrice);
            if (newPrice === null || isNaN(Number(newPrice)) || Number(newPrice) <= 0) return;

            // Update variantsWithPrices array
            let updatedVariantsPrices = [...variantsWithPrices];
            const existingIndex = updatedVariantsPrices.findIndex(vp => vp.variant === selectedVariant);

            if (existingIndex >= 0) {
              updatedVariantsPrices[existingIndex].price = Number(newPrice);
            } else {
              updatedVariantsPrices.push({ variant: selectedVariant, price: Number(newPrice) });
            }

            btn.disabled = true;
            try {
              await db.collection('products').doc(docId).update({
                variantsWithPrices: updatedVariantsPrices
              });
              alert('✅ Price updated for ' + selectedVariant);
              loadProducts();
            } catch (error) {
              alert('Error updating variant price: ' + error.message);
              btn.disabled = false;
            }
          }
        } else {
          // For DSLR and other categories - simple price update
          const newPrice = prompt('Enter the new price:', currentPrice);

          if (newPrice === null || isNaN(Number(newPrice)) || Number(newPrice) <= 0) {
            return; // User cancelled or entered invalid price
          }

          btn.disabled = true;
          try {
            await db
              .collection('products')
              .doc(docId)
              .update({
                price: Number(newPrice)
              });
            loadProducts(); // Refresh list
          } catch (error) {
            alert('Error updating price: ' + error.message);
            btn.disabled = false;
          }
        }
      }

      // --- Handle Edit Name ---
      if (btn.classList.contains('edit-name-btn')) {
        // Check permission
        if (window.RBAC && !window.RBAC.canAddEditProducts()) {
          alert('You do not have permission to edit products.');
          return;
        }

        const currentName = btn.dataset.name;
        const newName = prompt('Enter the new product name:', currentName);

        if (newName === null || !newName.trim()) {
          return; // User cancelled or entered empty name
        }

        btn.disabled = true;
        try {
          await db.collection('products').doc(docId).update({
            name: newName.trim()
          });
          loadProducts(); // Refresh list
        } catch (error) {
          alert('Error updating name: ' + error.message);
          btn.disabled = false;
        }
      }
    });
  }

  // ===========================================
  // HELPER FUNCTIONS
  // ===========================================
  function money(n) {
    if (n === null) {
      return 'N/A';
    }
    return `₹${Number(n || 0).toLocaleString('en-IN')}`;
  }
});

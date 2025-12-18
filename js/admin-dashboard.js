// js/admin-dashboard.js (v3 - Full Product Management)

document.addEventListener('DOMContentLoaded', () => {
  // Global Elements
  const logoutButton = document.getElementById('logout-button');
  let db; // Firestore database instance

  // Tab Elements
  const showPickupsBtn = document.getElementById('showPickupsBtn');
  const showProductsBtn = document.getElementById('showProductsBtn');
  const showUsersBtn = document.getElementById('showUsersBtn');
  const showPricingBtn = document.getElementById('showPricingBtn');
  const pickupsPanel = document.getElementById('pickupsPanel');
  const productsPanel = document.getElementById('productsPanel');
  const usersPanel = document.getElementById('usersPanel');
  const pricingPanel = document.getElementById('pricingPanel');
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
      if (usersPanel) usersPanel.classList.remove('active');
      if (pricingPanel) pricingPanel.classList.remove('active');
      showPickupsBtn.classList.add('active');
      showProductsBtn.classList.remove('active');
      if (showUsersBtn) showUsersBtn.classList.remove('active');
      if (showPricingBtn) showPricingBtn.classList.remove('active');
      loadPickupRequests(); // Refresh data
    });

    showProductsBtn.addEventListener('click', () => {
      pickupsPanel.classList.remove('active');
      productsPanel.classList.add('active');
      if (usersPanel) usersPanel.classList.remove('active');
      if (pricingPanel) pricingPanel.classList.remove('active');
      showPickupsBtn.classList.remove('active');
      showProductsBtn.classList.add('active');
      if (showUsersBtn) showUsersBtn.classList.remove('active');
      if (showPricingBtn) showPricingBtn.classList.remove('active');
      loadProducts(); // Load product data
      populateCategoryDropdown(); // Refresh dropdowns
      populateBrandDropdown();
    });

    // User Management Tab (only if available)
    if (showUsersBtn) {
      showUsersBtn.addEventListener('click', () => {
        pickupsPanel.classList.remove('active');
        productsPanel.classList.remove('active');
        if (usersPanel) usersPanel.classList.add('active');
        if (pricingPanel) pricingPanel.classList.remove('active');
        showPickupsBtn.classList.remove('active');
        showProductsBtn.classList.remove('active');
        showUsersBtn.classList.add('active');
        if (showPricingBtn) showPricingBtn.classList.remove('active');

        // Load users if UserManagement is available
        if (window.UserManagement) {
          window.UserManagement.loadUsers();
        }
      });
    }

    // Pricing Calculator Tab (only if available)
    if (showPricingBtn) {
      showPricingBtn.addEventListener('click', () => {
        pickupsPanel.classList.remove('active');
        productsPanel.classList.remove('active');
        if (usersPanel) usersPanel.classList.remove('active');
        if (pricingPanel) pricingPanel.classList.add('active');
        showPickupsBtn.classList.remove('active');
        showProductsBtn.classList.remove('active');
        if (showUsersBtn) showUsersBtn.classList.remove('active');
        showPricingBtn.classList.add('active');

        // Load pricing products dropdown
        populatePricingProductDropdown();
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

    // Show/hide Pricing Calculator tab (admin/superAdmin only)
    if (showPricingBtn) {
      const canManagePricing = window.RBAC.canManageUsers() || window.RBAC.canEditProducts();
      showPricingBtn.style.display = canManagePricing ? '' : 'none';
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

  // ===========================================
  // PRICING CALCULATOR FUNCTIONS
  // ===========================================

  // Category-specific issue definitions
  const CATEGORY_ISSUES = {
    'Phone': [
      { id: 'display_cracked', label: 'Cracked/Broken Display' },
      { id: 'display_scratched', label: 'Scratched Display' },
      { id: 'body_dents', label: 'Body Dents/Damage' },
      { id: 'body_scratches', label: 'Body Scratches' },
      { id: 'battery_weak', label: 'Weak/Dead Battery' },
      { id: 'speaker_broken', label: 'Speaker Not Working' },
      { id: 'buttons_broken', label: 'Buttons Not Working' },
      { id: 'charging_port', label: 'Charging Port Issue' },
      { id: 'camera_issue', label: 'Camera Not Working' },
      { id: 'face_id_issue', label: 'Face ID/Fingerprint Issue' }
    ],
    'DSLR/Lens': [
      { id: 'display_cracked', label: 'LCD Screen Cracked' },
      { id: 'display_scratched', label: 'LCD Screen Scratched' },
      { id: 'body_dents', label: 'Body Dents/Damage' },
      { id: 'body_scratches', label: 'Body Scratches' },
      { id: 'battery_weak', label: 'Battery Issue' },
      { id: 'flashlight_broken', label: 'Flash Not Working' },
      { id: 'memory_slot_issue', label: 'Memory Card Slot Issue' },
      { id: 'buttons_broken', label: 'Buttons/Dials Not Working' },
      { id: 'power_issue', label: 'Power/Startup Issues' },
      { id: 'focus_issue', label: 'Auto Focus Issue' },
      { id: 'lens_fungus', label: 'Lens Fungus' },
      { id: 'lens_scratches', label: 'Lens Scratches' },
      { id: 'error_messages', label: 'Error Messages' },
      { id: 'shutter_issue', label: 'Shutter Problem' }
    ],
    'Laptop': [
      { id: 'display_cracked', label: 'Screen Cracked/Broken' },
      { id: 'display_scratched', label: 'Screen Scratched' },
      { id: 'body_dents', label: 'Body Dents/Damage' },
      { id: 'body_scratches', label: 'Body Scratches' },
      { id: 'battery_weak', label: 'Battery Not Holding Charge' },
      { id: 'keyboard_issue', label: 'Keyboard Issue' },
      { id: 'trackpad_issue', label: 'Trackpad Issue' },
      { id: 'speaker_broken', label: 'Speaker Not Working' },
      { id: 'charging_port', label: 'Charging Port Issue' },
      { id: 'hinge_issue', label: 'Hinge Problem' },
      { id: 'webcam_issue', label: 'Webcam Not Working' }
    ],
    'iPad': [
      { id: 'display_cracked', label: 'Screen Cracked/Broken' },
      { id: 'display_scratched', label: 'Screen Scratched' },
      { id: 'body_dents', label: 'Body Dents/Damage' },
      { id: 'battery_weak', label: 'Battery Issue' },
      { id: 'speaker_broken', label: 'Speaker Not Working' },
      { id: 'buttons_broken', label: 'Buttons Not Working' },
      { id: 'charging_port', label: 'Charging Port Issue' },
      { id: 'camera_issue', label: 'Camera Not Working' },
      { id: 'face_id_issue', label: 'Face ID Issue' }
    ],
    'Tablet': [
      { id: 'display_cracked', label: 'Screen Cracked/Broken' },
      { id: 'display_scratched', label: 'Screen Scratched' },
      { id: 'body_dents', label: 'Body Dents/Damage' },
      { id: 'battery_weak', label: 'Battery Issue' },
      { id: 'speaker_broken', label: 'Speaker Not Working' },
      { id: 'buttons_broken', label: 'Buttons Not Working' },
      { id: 'charging_port', label: 'Charging Port Issue' }
    ],
    'Console': [
      { id: 'power_issue', label: 'Power/Startup Issues' },
      { id: 'disc_drive', label: 'Disc Drive Issue' },
      { id: 'hdmi_issue', label: 'HDMI Port Issue' },
      { id: 'overheating', label: 'Overheating Problem' },
      { id: 'controller_port', label: 'Controller Port Issue' },
      { id: 'body_scratches', label: 'Body Scratches' }
    ]
  };

  // Default issues for unknown categories
  const DEFAULT_ISSUES = [
    { id: 'display_cracked', label: 'Display Cracked' },
    { id: 'body_dents', label: 'Body Damage' },
    { id: 'battery_weak', label: 'Battery Issue' },
    { id: 'power_issue', label: 'Power Issue' }
  ];

  // Category-specific assessment questions (matches user-facing assessment.html)
  const CATEGORY_ASSESSMENT_QUESTIONS = {
    'DSLR/Lens': [
      { id: 'powerOn', label: 'Device powers on and functions properly?' },
      { id: 'bodyDamage', label: 'Body free from major damage?' },
      { id: 'lcdScreen', label: 'LCD/Touchscreen working properly?' },
      { id: 'lensCondition', label: 'Lens free from scratches/fungus/dust?' },
      { id: 'autofocusZoom', label: 'Autofocus and zoom work properly?' }
    ],
    'Phone': [
      { id: 'powerOn', label: 'Device powers on and functions properly?' },
      { id: 'screenCondition', label: 'Screen working without cracks/touch issues?' },
      { id: 'bodyDamage', label: 'Body/frame free from major damage?' },
      { id: 'batteryHealth', label: 'Battery health above 80%?' },
      { id: 'faceIDTouchID', label: 'Face ID/Touch ID working?' },
      { id: 'camerasFunctional', label: 'All cameras working properly?' },
      { id: 'waterDamage', label: 'Free from water damage?' }
    ],
    'Laptop': [
      { id: 'powerOn', label: 'Device powers on and boots properly?' },
      { id: 'screenCondition', label: 'Screen free from dead pixels/cracks?' },
      { id: 'keyboardTrackpad', label: 'Keyboard and trackpad functional?' },
      { id: 'bodyDamage', label: 'Body/chassis free from major damage?' },
      { id: 'batteryCycles', label: 'Battery cycle count under 300?' },
      { id: 'portsFunctional', label: 'All ports working properly?' },
      { id: 'chargingWorks', label: 'Laptop charges properly?' }
    ],
    'iPad': [
      { id: 'powerOn', label: 'Device powers on and functions properly?' },
      { id: 'screenCondition', label: 'Screen working without cracks/touch issues?' },
      { id: 'bodyDamage', label: 'Body free from major damage?' },
      { id: 'batteryHealth', label: 'Battery health above 80%?' },
      { id: 'portsFunctional', label: 'Charging port working properly?' },
      { id: 'camerasFunctional', label: 'All cameras working properly?' },
      { id: 'applePencilSupport', label: 'Apple Pencil works (if supported)?' }
    ]
  };

  const DEFAULT_ASSESSMENT_QUESTIONS = [
    { id: 'powerOn', label: 'Device powers on and functions properly?' },
    { id: 'bodyDamage', label: 'Body free from major damage?' },
    { id: 'screenCondition', label: 'Screen/Display working properly?' }
  ];

  // Helper to get assessment questions for a category
  function getAssessmentQuestionsForCategory(category) {
    return CATEGORY_ASSESSMENT_QUESTIONS[category] || DEFAULT_ASSESSMENT_QUESTIONS;
  }

  // Category-specific physical conditions (matches physical-condition.html options)
  const CATEGORY_PHYSICAL_CONDITIONS = {
    'DSLR/Lens': {
      display: [
        { id: 'display_excellent', label: 'Excellent - No scratches' },
        { id: 'display_good', label: 'Good - Minor scratches' },
        { id: 'display_fair', label: 'Fair - Visible scratches' },
        { id: 'display_cracked', label: 'Cracked/Broken Display' }
      ],
      body: [
        { id: 'body_excellent', label: 'Excellent - Like New' },
        { id: 'body_good', label: 'Good - Minor wear' },
        { id: 'body_fair', label: 'Fair - Visible scratches/dents' },
        { id: 'body_poor', label: 'Poor - Heavy damage' }
      ],
      error: [
        { id: 'error_none', label: 'No Error Messages' },
        { id: 'error_minor', label: 'Minor Errors (occasionally)' },
        { id: 'error_frequent', label: 'Frequent Error Messages' },
        { id: 'error_no_lens', label: 'Without Lens Error' }
      ],
      lens: [
        { id: 'lense_good', label: 'Good Condition' },
        { id: 'lense_focus_issue', label: 'Auto Focus/Manual Focus Issue' },
        { id: 'lense_fungus', label: 'Fungus Issue' },
        { id: 'lense_scratches', label: 'Scratches' }
      ]
    },
    'Phone': {
      display: [
        { id: 'display_flawless', label: 'Flawless - No scratches' },
        { id: 'display_minor', label: 'Minor scratches' },
        { id: 'display_visible', label: 'Visible scratches' },
        { id: 'display_cracked', label: 'Cracked screen' }
      ],
      body: [
        { id: 'body_pristine', label: 'Pristine - Like new' },
        { id: 'body_light', label: 'Light wear/scratches' },
        { id: 'body_moderate', label: 'Moderate scratches/dents' },
        { id: 'body_heavy', label: 'Heavy damage/dents' }
      ],
      frame: [
        { id: 'frame_perfect', label: 'Perfect condition' },
        { id: 'frame_minor', label: 'Minor scuffs' },
        { id: 'frame_visible', label: 'Visible scratches' },
        { id: 'frame_damaged', label: 'Bent/Damaged frame' }
      ]
    },
    'Laptop': {
      display: [
        { id: 'display_perfect', label: 'Perfect - No issues' },
        { id: 'display_minor', label: 'Minor scratches/marks' },
        { id: 'display_spots', label: 'Dead pixels/bright spots' },
        { id: 'display_damaged', label: 'Cracked/Damaged screen' }
      ],
      body: [
        { id: 'body_mint', label: 'Mint condition' },
        { id: 'body_light', label: 'Light wear' },
        { id: 'body_moderate', label: 'Moderate scratches/dents' },
        { id: 'body_heavy', label: 'Heavy damage/dents' }
      ],
      keyboard: [
        { id: 'keyboard_perfect', label: 'All keys perfect' },
        { id: 'keyboard_shine', label: 'Key shine/wear' },
        { id: 'keyboard_sticky', label: 'Some sticky/loose keys' },
        { id: 'keyboard_broken', label: 'Broken/missing keys' }
      ]
    },
    'iPad': {
      display: [
        { id: 'display_flawless', label: 'Flawless - No scratches' },
        { id: 'display_minor', label: 'Minor scratches' },
        { id: 'display_visible', label: 'Visible scratches' },
        { id: 'display_cracked', label: 'Cracked screen' }
      ],
      body: [
        { id: 'body_pristine', label: 'Pristine - Like new' },
        { id: 'body_light', label: 'Light wear/scratches' },
        { id: 'body_moderate', label: 'Moderate scratches/dents' },
        { id: 'body_heavy', label: 'Heavy damage/bent' }
      ],
      ports: [
        { id: 'ports_perfect', label: 'Port works perfectly' },
        { id: 'ports_loose', label: 'Slightly loose connection' },
        { id: 'ports_intermittent', label: 'Intermittent charging' },
        { id: 'ports_broken', label: 'Port not working' }
      ]
    }
  };

  const DEFAULT_PHYSICAL_CONDITIONS = {
    display: [
      { id: 'display_good', label: 'Good Condition' },
      { id: 'display_cracked', label: 'Cracked/Damaged' }
    ],
    body: [
      { id: 'body_good', label: 'Good Condition' },
      { id: 'body_damaged', label: 'Damaged' }
    ]
  };

  // Helper to get physical conditions for a category
  function getPhysicalConditionsForCategory(category) {
    return CATEGORY_PHYSICAL_CONDITIONS[category] || DEFAULT_PHYSICAL_CONDITIONS;
  }

  // Category-specific functional issues (matches functional-issues.js)
  const CATEGORY_FUNCTIONAL_ISSUES = {
    'DSLR/Lens': [
      { id: 'battery', label: 'Battery Weak or Not Working' },
      { id: 'flashlight', label: 'Flashlight Not Working' },
      { id: 'memory_slot', label: 'Memory Card Slot Issue' },
      { id: 'speaker', label: 'Speaker Not Working' },
      { id: 'connectors', label: 'Connectors Not Working' },
      { id: 'buttons', label: 'Buttons Not Working' }
    ],
    'Phone': [
      { id: 'battery', label: 'Battery Drains Fast' },
      { id: 'speaker', label: 'Speaker Not Working' },
      { id: 'microphone', label: 'Microphone Not Working' },
      { id: 'charging', label: 'Charging Port Issue' },
      { id: 'camera', label: 'Camera Not Working' },
      { id: 'touch', label: 'Touch Screen Unresponsive' },
      { id: 'wifi', label: 'WiFi / Bluetooth Issue' },
      { id: 'face_id', label: 'Face ID / Touch ID Not Working' },
      { id: 'buttons', label: 'Buttons Not Working' }
    ],
    'Laptop': [
      { id: 'battery', label: 'Battery Weak / Drains Fast' },
      { id: 'keyboard', label: 'Keyboard Not Working' },
      { id: 'trackpad', label: 'Trackpad Not Working' },
      { id: 'display', label: 'Display Flickering / Dead Pixels' },
      { id: 'speaker', label: 'Speaker Not Working' },
      { id: 'usb_ports', label: 'USB Ports Not Working' },
      { id: 'charging', label: 'Charging Port Issue' },
      { id: 'wifi', label: 'WiFi / Bluetooth Issue' },
      { id: 'webcam', label: 'Webcam Not Working' }
    ],
    'iPad': [
      { id: 'battery', label: 'Battery Drains Fast' },
      { id: 'speaker', label: 'Speaker Not Working' },
      { id: 'charging', label: 'Charging Port Issue' },
      { id: 'camera', label: 'Camera Not Working' },
      { id: 'touch', label: 'Touch Screen Unresponsive' },
      { id: 'wifi', label: 'WiFi / Bluetooth Issue' },
      { id: 'face_id', label: 'Face ID / Touch ID Not Working' },
      { id: 'apple_pencil', label: 'Apple Pencil Not Pairing' },
      { id: 'buttons', label: 'Buttons Not Working' }
    ]
  };

  const DEFAULT_FUNCTIONAL_ISSUES = [
    { id: 'speaker', label: 'Speaker Not Working' },
    { id: 'buttons', label: 'Buttons Not Working' }
  ];

  // Helper to get functional issues for a category
  function getFunctionalIssuesForCategory(category) {
    return CATEGORY_FUNCTIONAL_ISSUES[category] || DEFAULT_FUNCTIONAL_ISSUES;
  }

  // Category-specific bonuses
  const CATEGORY_BONUSES = {
    'Phone': [
      { id: 'original_box', label: 'Original Box' },
      { id: 'original_bill', label: 'Original Bill/Invoice' },
      { id: 'charger', label: 'Charger Included' },
      { id: 'earphones', label: 'Earphones Included' },
      { id: 'warranty_valid', label: 'Valid Warranty' }
    ],
    'DSLR/Lens': [
      { id: 'original_box', label: 'Original Box' },
      { id: 'original_bill', label: 'Original Bill/Invoice' },
      { id: 'charger', label: 'Charger/Battery Grip' },
      { id: 'additional_lens', label: 'Additional Lens' },
      { id: 'camera_bag', label: 'Camera Bag' },
      { id: 'warranty_valid', label: 'Valid Warranty' }
    ],
    'Laptop': [
      { id: 'original_box', label: 'Original Box' },
      { id: 'original_bill', label: 'Original Bill/Invoice' },
      { id: 'charger', label: 'Charger Included' },
      { id: 'laptop_bag', label: 'Laptop Bag' },
      { id: 'warranty_valid', label: 'Valid Warranty' }
    ],
    'iPad': [
      { id: 'original_box', label: 'Original Box' },
      { id: 'original_bill', label: 'Original Bill/Invoice' },
      { id: 'charger', label: 'Charger Included' },
      { id: 'apple_pencil', label: 'Apple Pencil' },
      { id: 'keyboard', label: 'Keyboard Case' },
      { id: 'warranty_valid', label: 'Valid Warranty' }
    ]
  };

  const DEFAULT_BONUSES = [
    { id: 'original_box', label: 'Original Box' },
    { id: 'original_bill', label: 'Original Bill/Invoice' },
    { id: 'charger', label: 'Charger Included' },
    { id: 'warranty_valid', label: 'Valid Warranty' }
  ];

  // Helper to get issues for a category
  function getIssuesForCategory(category) {
    return CATEGORY_ISSUES[category] || DEFAULT_ISSUES;
  }

  // Helper to get bonuses for a category
  function getBonusesForCategory(category) {
    return CATEGORY_BONUSES[category] || DEFAULT_BONUSES;
  }

  // Store all products for filtering
  let allPricingProducts = [];

  // Populate category and brand filter dropdowns
  async function populatePricingFilters() {
    const categorySelect = document.getElementById('pricing-category-filter');
    const brandSelect = document.getElementById('pricing-brand-filter');
    if (!categorySelect || !brandSelect || !db) return;

    try {
      const snapshot = await db.collection('products').get();
      const categories = new Set();
      const brands = new Set();

      snapshot.forEach(doc => {
        const data = doc.data();
        if (data.category) categories.add(data.category);
        if (data.brand) brands.add(data.brand);
      });

      // Populate category dropdown
      categorySelect.innerHTML = '<option value="">All Categories</option>';
      [...categories].sort().forEach(cat => {
        categorySelect.innerHTML += `<option value="${cat}">${cat}</option>`;
      });

      // Populate brand dropdown
      brandSelect.innerHTML = '<option value="">All Brands</option>';
      [...brands].sort().forEach(brand => {
        brandSelect.innerHTML += `<option value="${brand}">${brand}</option>`;
      });

      // Add filter change listeners
      categorySelect.onchange = filterPricingProducts;
      brandSelect.onchange = filterPricingProducts;

    } catch (error) {
      console.error('Error loading pricing filters:', error);
    }
  }

  // Filter products based on selected category and brand
  function filterPricingProducts() {
    const categoryFilter = document.getElementById('pricing-category-filter').value;
    const brandFilter = document.getElementById('pricing-brand-filter').value;
    const productSelect = document.getElementById('pricing-product-select');

    productSelect.innerHTML = '<option value="">-- Select a Product --</option>';

    let filteredProducts = allPricingProducts;

    if (categoryFilter) {
      filteredProducts = filteredProducts.filter(p => p.category === categoryFilter);
    }
    if (brandFilter) {
      filteredProducts = filteredProducts.filter(p => p.brand === brandFilter);
    }

    filteredProducts.forEach(p => {
      const option = document.createElement('option');
      option.value = p.id;
      // Avoid duplicate brand name (e.g., "Canon Canon EOS 200D")
      const brand = p.brand || '';
      const name = p.name || '';
      option.textContent = name.toLowerCase().startsWith(brand.toLowerCase())
        ? name
        : `${brand} ${name}`.trim();
      option.dataset.name = p.name;
      option.dataset.brand = p.brand;
      option.dataset.category = p.category;
      option.dataset.price = p.price || 0;
      productSelect.appendChild(option);
    });

    // Hide form if product was deselected
    document.getElementById('pricing-form-container').style.display = 'none';
    document.getElementById('pricing-empty-state').style.display = 'block';
  }

  // Populate product dropdown for pricing
  async function populatePricingProductDropdown() {
    const select = document.getElementById('pricing-product-select');
    if (!select || !db) return;

    select.innerHTML = '<option value="">Loading products...</option>';

    try {
      const snapshot = await db.collection('products').orderBy('name').get();
      allPricingProducts = []; // Reset

      snapshot.forEach(doc => {
        const data = doc.data();
        allPricingProducts.push({
          id: doc.id,
          name: data.name,
          brand: data.brand,
          category: data.category,
          price: data.price || 0
        });
      });

      // Populate filters first
      await populatePricingFilters();

      // Then populate products (unfiltered initially)
      filterPricingProducts();

      // Add change listener for product selection
      select.onchange = () => {
        const selectedOption = select.options[select.selectedIndex];
        if (selectedOption.value) {
          loadProductPricing(selectedOption.value, {
            name: selectedOption.dataset.name,
            brand: selectedOption.dataset.brand,
            category: selectedOption.dataset.category,
            price: Number(selectedOption.dataset.price) || 0
          });
        } else {
          document.getElementById('pricing-form-container').style.display = 'none';
          document.getElementById('pricing-empty-state').style.display = 'block';
        }
      };
    } catch (error) {
      select.innerHTML = '<option value="">Error loading products</option>';
      console.error('Error loading products for pricing:', error);
    }
  }

  // Load pricing for a specific product
  async function loadProductPricing(productId, productInfo) {
    const formContainer = document.getElementById('pricing-form-container');
    const emptyState = document.getElementById('pricing-empty-state');
    const bonusesGrid = document.getElementById('pricing-bonuses-grid');

    // Show form, hide empty state
    formContainer.style.display = 'block';
    emptyState.style.display = 'none';

    // Set product info - avoid duplicate brand name (e.g., "Canon Canon EOS 200D")
    const brand = productInfo.brand || '';
    const name = productInfo.name || '';
    const displayName = name.toLowerCase().startsWith(brand.toLowerCase())
      ? name
      : `${brand} ${name}`.trim();
    document.getElementById('pricing-product-name').textContent = displayName;
    document.getElementById('pricing-base-price').textContent =
      `₹${Number(productInfo.price).toLocaleString('en-IN')}`;

    // Load existing pricing from Firestore
    let existingPricing = {};
    try {
      const pricingDoc = await db.collection('productPricing').doc(productId).get();
      if (pricingDoc.exists) {
        existingPricing = pricingDoc.data();
      }
    } catch (error) {
      console.error('Error loading pricing:', error);
    }

    // Get category-specific data
    const categoryBonuses = getBonusesForCategory(productInfo.category);
    const categoryAssessmentQuestions = getAssessmentQuestionsForCategory(productInfo.category);
    const categoryPhysicalConditions = getPhysicalConditionsForCategory(productInfo.category);

    // Render assessment question fields
    const assessmentGrid = document.getElementById('pricing-assessment-grid');
    if (assessmentGrid) {
      assessmentGrid.innerHTML = categoryAssessmentQuestions.map(question => `
        <div class="form-group">
          <label for="assessment-${question.id}">${question.label}</label>
          <input type="number" 
                 id="assessment-${question.id}" 
                 class="form-input pricing-assessment-input" 
                 data-question-id="${question.id}"
                 value="${existingPricing.assessmentDeductions?.[question.id]?.deduction || 0}" 
                 min="0" 
                 placeholder="₹ Deduction">
        </div>
      `).join('');
    }

    // Render physical condition options (grouped by category - Display, Body, Error, Lens)
    const conditionsContainer = document.getElementById('pricing-conditions-container');
    if (conditionsContainer) {
      let html = '';
      Object.entries(categoryPhysicalConditions).forEach(([groupName, options]) => {
        const groupTitle = groupName.charAt(0).toUpperCase() + groupName.slice(1);
        html += `
          <div style="margin-bottom: 24px; padding: 16px; background: #f8f9fa; border-radius: 8px;">
            <h4 style="margin: 0 0 12px 0; color: #333;">${groupTitle} Condition</h4>
            <div class="product-form-grid">
              ${options.map(opt => `
                <div class="form-group">
                  <label for="condition-${opt.id}">${opt.label}</label>
                  <input type="number" 
                         id="condition-${opt.id}" 
                         class="form-input pricing-condition-input" 
                         data-condition-id="${opt.id}"
                         data-condition-group="${groupName}"
                         value="${existingPricing.conditionDeductions?.[opt.id]?.deduction || 0}" 
                         min="0" 
                         placeholder="₹ Deduction">
                </div>
              `).join('')}
            </div>
          </div>
        `;
      });
      conditionsContainer.innerHTML = html;
    }

    // Render functional issues fields
    const categoryFunctionalIssues = getFunctionalIssuesForCategory(productInfo.category);
    const functionalGrid = document.getElementById('pricing-functional-grid');
    if (functionalGrid) {
      functionalGrid.innerHTML = categoryFunctionalIssues.map(issue => `
        <div class="form-group">
          <label for="functional-${issue.id}">${issue.label}</label>
          <input type="number" 
                 id="functional-${issue.id}" 
                 class="form-input pricing-functional-input" 
                 data-functional-id="${issue.id}"
                 value="${existingPricing.functionalIssueDeductions?.[issue.id]?.deduction || 0}" 
                 min="0" 
                 placeholder="₹ Deduction">
        </div>
      `).join('');
    }

    // Render bonus fields
    bonusesGrid.innerHTML = categoryBonuses.map(bonus => `
      <div class="form-group">
        <label for="bonus-${bonus.id}">${bonus.label}</label>
        <input type="number" 
               id="bonus-${bonus.id}" 
               class="form-input pricing-bonus-input" 
               data-bonus-id="${bonus.id}"
               value="${existingPricing.bonuses?.[bonus.id]?.addition || 0}" 
               min="0" 
               placeholder="₹ Addition">
      </div>
    `).join('');

    // Load age deductions
    document.getElementById('age-less-than-3').value = existingPricing.ageDeductions?.['less-than-3'] || 0;
    document.getElementById('age-4-to-12').value = existingPricing.ageDeductions?.['4-to-12'] || 0;
    document.getElementById('age-above-12').value = existingPricing.ageDeductions?.['above-12'] || 0;

    // Store product ID and category for save
    formContainer.dataset.productId = productId;
    formContainer.dataset.productName = productInfo.name;
    formContainer.dataset.productBrand = productInfo.brand;
    formContainer.dataset.productCategory = productInfo.category;
    formContainer.dataset.basePrice = productInfo.price;
  }

  // Save product pricing
  async function saveProductPricing() {
    const formContainer = document.getElementById('pricing-form-container');
    const productId = formContainer.dataset.productId;
    const statusEl = document.getElementById('pricing-form-status');

    if (!productId) {
      alert('No product selected');
      return;
    }

    // Get category for this product
    const productCategory = formContainer.dataset.productCategory || '';
    const categoryIssues = getIssuesForCategory(productCategory);
    const categoryBonuses = getBonusesForCategory(productCategory);
    const categoryAssessmentQuestions = getAssessmentQuestionsForCategory(productCategory);

    // Collect assessment question deductions
    const assessmentDeductions = {};
    document.querySelectorAll('.pricing-assessment-input').forEach(input => {
      const questionId = input.dataset.questionId;
      const deduction = Number(input.value) || 0;
      const questionConfig = categoryAssessmentQuestions.find(q => q.id === questionId);
      assessmentDeductions[questionId] = {
        deduction: deduction,
        label: questionConfig?.label || questionId
      };
    });

    // Collect physical condition deductions
    const conditionDeductions = {};
    const categoryPhysicalConditions = getPhysicalConditionsForCategory(productCategory);
    document.querySelectorAll('.pricing-condition-input').forEach(input => {
      const conditionId = input.dataset.conditionId;
      const groupName = input.dataset.conditionGroup;
      const deduction = Number(input.value) || 0;
      // Find label from conditions
      let label = conditionId;
      if (categoryPhysicalConditions[groupName]) {
        const conditionConfig = categoryPhysicalConditions[groupName].find(c => c.id === conditionId);
        if (conditionConfig) label = conditionConfig.label;
      }
      conditionDeductions[conditionId] = {
        deduction: deduction,
        label: label,
        group: groupName
      };
    });

    // Collect functional issue deductions
    const functionalIssueDeductions = {};
    const categoryFunctionalIssues = getFunctionalIssuesForCategory(productCategory);
    document.querySelectorAll('.pricing-functional-input').forEach(input => {
      const functionalId = input.dataset.functionalId;
      const deduction = Number(input.value) || 0;
      const issueConfig = categoryFunctionalIssues.find(i => i.id === functionalId);
      functionalIssueDeductions[functionalId] = {
        deduction: deduction,
        label: issueConfig?.label || functionalId
      };
    });

    // Collect bonuses
    const bonuses = {};
    document.querySelectorAll('.pricing-bonus-input').forEach(input => {
      const bonusId = input.dataset.bonusId;
      const addition = Number(input.value) || 0;
      const bonusConfig = categoryBonuses.find(b => b.id === bonusId);
      bonuses[bonusId] = {
        addition: addition,
        label: bonusConfig?.label || bonusId
      };
    });

    // Collect age deductions
    const ageDeductions = {
      'less-than-3': Number(document.getElementById('age-less-than-3').value) || 0,
      '4-to-12': Number(document.getElementById('age-4-to-12').value) || 0,
      'above-12': Number(document.getElementById('age-above-12').value) || 0
    };

    const pricingData = {
      productId: productId,
      productName: formContainer.dataset.productName,
      productBrand: formContainer.dataset.productBrand,
      basePrice: Number(formContainer.dataset.basePrice) || 0,
      assessmentDeductions: assessmentDeductions,
      conditionDeductions: conditionDeductions,
      functionalIssueDeductions: functionalIssueDeductions,
      bonuses: bonuses,
      ageDeductions: ageDeductions,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedBy: firebase.auth().currentUser?.email || 'unknown'
    };

    // Show saving status
    statusEl.textContent = 'Saving...';
    statusEl.style.display = 'block';
    statusEl.style.color = '#666';

    try {
      await db.collection('productPricing').doc(productId).set(pricingData, { merge: true });
      statusEl.textContent = '✅ Pricing saved successfully!';
      statusEl.style.color = 'green';
      setTimeout(() => { statusEl.style.display = 'none'; }, 3000);
    } catch (error) {
      statusEl.textContent = '❌ Error saving: ' + error.message;
      statusEl.style.color = 'red';
    }
  }

  // Attach save button listener
  const savePricingBtn = document.getElementById('save-pricing-btn');
  if (savePricingBtn) {
    savePricingBtn.addEventListener('click', saveProductPricing);
  }
});

// js/account.js - Enhanced with Order History and Pickup Tracking
document.addEventListener("DOMContentLoaded", () => {
  let db;
  let userRef;
  let currentUser = null;

  const nameInput = document.getElementById('account-name');
  const emailInput = document.getElementById('account-email');
  const phoneInput = document.getElementById('account-phone');
  const coinBalance = document.getElementById('account-coin-balance');
  const form = document.getElementById('account-form');
  const saveBtn = document.getElementById('save-profile-btn');
  const logoutBtn = document.getElementById('logout-btn');
  const statusEl = document.getElementById('account-form-status');
  const welcomeMessage = document.getElementById('welcome-message');

  // Tab elements
  const tabButtons = document.querySelectorAll('.account-tab');
  const ordersLoading = document.getElementById('orders-loading');
  const ordersList = document.getElementById('orders-list');
  const ordersEmpty = document.getElementById('orders-empty');

  // Tab switching
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.dataset.tab;

      // Update active tab button
      tabButtons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      // Update active tab content
      document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
      });
      document.getElementById(`tab-${tabId}`).classList.add('active');

      // Load orders when switching to orders tab
      if (tabId === 'orders' && currentUser) {
        loadOrders();
      }
    });
  });

  if (!firebase.auth || !firebase.firestore) {
    if (window.Logger) {
      window.Logger.error("Firebase not loaded");
    }
    return;
  }

  db = firebase.firestore();

  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      // User is signed in.
      currentUser = user;
      userRef = db.collection('users').doc(user.uid);
      loadUserData(user);
    } else {
      // No user is signed in. Redirect to login.
      if (window.Logger) {
        window.Logger.log('No user signed in. Redirecting to login.');
      }
      window.location.href = 'login.html';
    }
  });

  async function loadUserData(user) {
    try {
      const userDoc = await userRef.get();
      if (userDoc.exists) {
        const data = userDoc.data();
        nameInput.value = data.displayName || '';
        emailInput.value = data.email || '';
        phoneInput.value = data.phoneNumber || user.phoneNumber || 'N/A';
        coinBalance.textContent = data.coins || 0;

        // Update welcome message
        if (data.displayName && welcomeMessage) {
          welcomeMessage.textContent = `Welcome back, ${data.displayName.split(' ')[0]}!`;
        }
      } else {
        // This case should be rare if js/login.js runs first
        phoneInput.value = user.phoneNumber || 'N/A';
        coinBalance.textContent = 0;
      }
    } catch (error) {
      if (window.Logger) {
        window.Logger.error("Error loading user data:", error);
      }
      statusEl.textContent = 'Error loading data.';
      statusEl.style.color = 'var(--danger)';
      statusEl.style.display = 'block';
    }
  }

  // Load user's pickup requests / orders
  async function loadOrders() {
    if (!currentUser) return;

    ordersLoading.style.display = 'flex';
    ordersList.style.display = 'none';
    ordersEmpty.style.display = 'none';

    try {
      // Query without orderBy to avoid needing a composite index
      // We'll sort client-side instead
      const pickupRequestsRef = db.collection('pickupRequests')
        .where('userId', '==', currentUser.uid);

      const snapshot = await pickupRequestsRef.get();

      if (snapshot.empty) {
        ordersLoading.style.display = 'none';
        ordersEmpty.style.display = 'block';
        return;
      }

      // Collect orders and sort by createdAt descending (client-side)
      const orders = [];
      snapshot.forEach(doc => {
        orders.push({ id: doc.id, ...doc.data() });
      });

      // Sort by createdAt descending (newest first)
      orders.sort((a, b) => {
        const dateA = a.createdAt?.toDate?.() || new Date(0);
        const dateB = b.createdAt?.toDate?.() || new Date(0);
        return dateB - dateA;
      });

      // Build order cards
      let ordersHTML = '';
      orders.forEach(order => {
        ordersHTML += createOrderCard(order.id, order);
      });

      ordersList.innerHTML = ordersHTML;
      ordersLoading.style.display = 'none';
      ordersList.style.display = 'flex';

    } catch (error) {
      if (window.Logger) {
        window.Logger.error("Error loading orders:", error);
      }
      ordersLoading.style.display = 'none';
      ordersEmpty.innerHTML = `
        <i class="fa-solid fa-exclamation-triangle"></i>
        <h3>Error loading orders</h3>
        <p>${error.message}</p>
      `;
      ordersEmpty.style.display = 'block';
    }
  }

  // Create order card HTML
  function createOrderCard(orderId, order) {
    const device = order.device || {};
    const customer = order.customer || {};
    const schedule = order.schedule || {};
    const status = order.status || 'pending';
    const finalPrice = order.finalPrice || 0;
    const createdAt = order.createdAt?.toDate?.() || new Date();

    // Status configuration
    const statusConfig = {
      'pending': { label: 'Pending', class: 'pending', icon: 'fa-clock' },
      'scheduled': { label: 'Scheduled', class: 'scheduled', icon: 'fa-calendar-check' },
      'picked-up': { label: 'Picked Up', class: 'picked-up', icon: 'fa-truck' },
      'inspected': { label: 'Inspected', class: 'scheduled', icon: 'fa-magnifying-glass' },
      'completed': { label: 'Completed', class: 'completed', icon: 'fa-circle-check' },
      'paid': { label: 'Paid', class: 'completed', icon: 'fa-indian-rupee-sign' },
      'cancelled': { label: 'Cancelled', class: 'cancelled', icon: 'fa-times-circle' }
    };

    const currentStatus = statusConfig[status] || statusConfig['pending'];

    // Build timeline
    const timelineSteps = [
      { key: 'pending', label: 'Booked', icon: 'fa-check' },
      { key: 'scheduled', label: 'Scheduled', icon: 'fa-calendar' },
      { key: 'picked-up', label: 'Picked Up', icon: 'fa-truck' },
      { key: 'completed', label: 'Paid', icon: 'fa-indian-rupee-sign' }
    ];

    const statusOrder = ['pending', 'scheduled', 'picked-up', 'inspected', 'completed', 'paid'];
    const currentIndex = statusOrder.indexOf(status);

    let timelineHTML = '<div class="status-timeline">';
    timelineSteps.forEach((step, index) => {
      let stepClass = '';
      if (status === 'cancelled') {
        stepClass = '';
      } else if (index < Math.floor(currentIndex / 1.5)) {
        stepClass = 'completed';
      } else if (index === Math.floor(currentIndex / 1.5)) {
        stepClass = 'current';
      }

      timelineHTML += `
        <div class="timeline-step ${stepClass}">
          <div class="timeline-dot">
            <i class="fa-solid ${step.icon}"></i>
          </div>
          <span class="timeline-label">${step.label}</span>
        </div>
      `;
    });
    timelineHTML += '</div>';

    // Format date
    const dateOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    const formattedDate = createdAt.toLocaleDateString('en-IN', dateOptions);

    // Pickup schedule info
    let scheduleInfo = '';
    if (schedule.dateLabel && schedule.slot) {
      scheduleInfo = `<br><small>Pickup: ${schedule.dateLabel} at ${schedule.slot}</small>`;
    }

    return `
      <div class="order-card" data-order-id="${orderId}">
        <div class="order-card-header">
          <div class="order-device-image">
            ${device.imageUrl ?
        `<img src="${device.imageUrl}" alt="${device.brandName || ''} ${device.modelName || ''}" onerror="this.parentNode.innerHTML='<i class=\\'fa-solid fa-camera\\'></i>'"/>` :
        '<i class="fa-solid fa-camera"></i>'}
          </div>
          <div class="order-details">
            <h4>${device.brandName || 'Device'} ${device.modelName || ''}</h4>
            <p class="order-meta">
              Order ID: ${orderId.substring(0, 8).toUpperCase()}
              ${scheduleInfo}
            </p>
            <p class="order-price">₹${finalPrice.toLocaleString('en-IN')}</p>
          </div>
          <div class="order-status-section">
            <span class="order-status ${currentStatus.class}">
              <i class="fa-solid ${currentStatus.icon}"></i>
              ${currentStatus.label}
            </span>
            <p class="order-date">${formattedDate}</p>
          </div>
        </div>
        ${status !== 'cancelled' ? timelineHTML : ''}
      </div>
    `;
  }

  // Form submission
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    saveBtn.disabled = true;
    saveBtn.textContent = 'Saving...';
    statusEl.style.display = 'none';

    try {
      const dataToSave = {
        displayName: nameInput.value.trim(),
        email: emailInput.value.trim()
      };

      // Use set with merge:true to create or update
      await userRef.set(dataToSave, { merge: true });

      statusEl.textContent = 'Profile saved successfully!';
      statusEl.style.color = 'var(--ok)';
      statusEl.style.display = 'block';

      // Update welcome message
      if (dataToSave.displayName && welcomeMessage) {
        welcomeMessage.textContent = `Welcome back, ${dataToSave.displayName.split(' ')[0]}!`;
      }

    } catch (error) {
      if (window.Logger) {
        window.Logger.error("Error saving profile:", error);
      }
      statusEl.textContent = 'Error: ' + error.message;
      statusEl.style.color = 'var(--danger)';
      statusEl.style.display = 'block';
    } finally {
      saveBtn.disabled = false;
      saveBtn.textContent = 'Save Profile';
    }
  });

  // Logout
  logoutBtn.addEventListener('click', () => {
    firebase.auth().signOut().then(() => {
      if (window.Logger) {
        window.Logger.log('User logged out.');
      }
      window.location.href = 'index.html';
    }).catch((error) => {
      if (window.Logger) {
        window.Logger.error('Sign out error:', error);
      }
    });
  });

});
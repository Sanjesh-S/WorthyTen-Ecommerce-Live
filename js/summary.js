// js/summary.js (FIXED time slot bug)

document.addEventListener('DOMContentLoaded', () => {

  // Use cities from Config if available, otherwise fallback
  const TAMIL_NADU_CITIES = window.Config?.cities || [
    "Chennai", "Coimbatore", "Cuddalore", "Dharmapuri", "Dindigul", "Erode",
    "Hosur", "Kanchipuram", "Karaikudi", "Karur", "Kumbakonam", "Madurai",
    "Nagercoil", "Namakkal", "Pollachi", "Pudukkottai", "Rajapalayam",
    "Ramanathapuram", "Salem", "Sivakasi", "Thanjavur", "Theni",
    "Thoothukudi (Tuticorin)", "Tiruchirappalli (Trichy)", "Tirunelveli",
    "Tiruppur", "Tiruvannamalai", "Udhagamandalam (Ooty)", "Vellore",
    "Viluppuram", "Virudhunagar"
  ];

  // Time slots with start hour for filtering expired slots
  const TIME_SLOTS = [
    { id: "slot1", text: "06:00 AM - 08:00 AM", startHour: 6 },
    { id: "slot2", text: "08:00 AM - 10:00 AM", startHour: 8 },
    { id: "slot3", text: "10:00 AM - 12:00 PM", startHour: 10 },
    { id: "slot4", text: "12:00 PM - 02:00 PM", startHour: 12 },
    { id: "slot5", text: "02:00 PM - 04:00 PM", startHour: 14 },
    { id: "slot6", text: "04:00 PM - 06:00 PM", startHour: 16 },
    { id: "slot7", text: "06:00 PM - 08:00 PM", startHour: 18 },
    { id: "slot8", text: "08:00 PM - 10:00 PM", startHour: 20 }
  ];

  const vd = JSON.parse(sessionStorage.getItem('valuationData') || '{}');

  // Guard: if no base info, send user to start
  if (!vd || !vd.brandName || !vd.modelName) {
    window.location.href = 'index.html';
    return;
  }

  // Price fallbacks
  const basePrice = vd.originalQuotePrice ?? 0;
  const finalPrice =
    vd.priceAfterWarranty ??
    vd.priceAfterAccessories ??
    vd.priceAfterIssues ??
    vd.priceAfterPhysical ??
    vd.priceAfterLenses ??
    vd.priceAfterAssessment ??
    vd.originalQuotePrice ??
    0;

  // --- Main Card Elements ---
  const imgEl = document.getElementById('sumImage');
  const modelEl = document.getElementById('sumModel');
  const finalSellingPriceEl = document.getElementById('finalSellingPrice');
  const deviceBrandModel = document.getElementById('deviceBrandModel');

  // --- Price Summary Widget (Desktop) ---
  const desktopPriceSummaryWidget = document.getElementById('desktopPriceSummaryWidget');
  const priceBreakdown = document.getElementById('priceBreakdown');
  const toggleBreakdown = document.getElementById('toggleBreakdown');

  // --- Sidebar Elements ---
  const evaluationModel = document.getElementById('evaluationModel');
  const breakdownListEl = document.getElementById('summaryBreakdownList'); // Detailed list

  // --- Mobile Footer Elements ---
  const mobileFinalPriceEl = document.getElementById('mobileFinalPrice');

  // --- Mobile Modal Elements ---
  const priceSummaryModal = document.getElementById('priceSummaryModal');
  const modalPriceSummaryWidget = document.getElementById('modalPriceSummaryWidget');
  const closeSummaryModalBtn = document.getElementById('closeSummaryModalBtn');


  // --- Populate Sidebar ---
  if (evaluationModel) {
    const fullName = window.getFullModelName ?
      window.getFullModelName(vd.brandName, vd.modelName) :
      `${vd.brandName || ''} ${vd.modelName || ''}`.trim();

    // Add variant info if available
    const variantText = vd.variants && window.formatVariantDisplay ?
      window.formatVariantDisplay(vd.variants) : '';

    evaluationModel.textContent = fullName + ' ' + variantText;
  }

  // --- Populate Main Card ---
  if (imgEl && vd.imageUrl) imgEl.src = vd.imageUrl;
  if (modelEl) modelEl.textContent = `${vd.brandName || ''} ${vd.modelName || ''}`.trim();
  if (finalSellingPriceEl) finalSellingPriceEl.textContent = money(finalPrice);
  if (deviceBrandModel) deviceBrandModel.textContent = `${vd.brandName || ''} ${vd.modelName || ''}`.trim();

  // --- Populate Mobile Footer ---
  if (mobileFinalPriceEl) mobileFinalPriceEl.textContent = money(finalPrice);


  // --- Breakdown Logic ---
  const breakdownRows = [];
  let lastPrice = basePrice;

  // 1. Base Price
  breakdownRows.push(createRow('Base Quote', basePrice, 'base'));

  // 2. Assessment
  if (vd.priceAfterAssessment != null && vd.priceAfterAssessment !== lastPrice) {
    const delta = vd.priceAfterAssessment - lastPrice;
    breakdownRows.push(createRow('Assessment', delta, delta >= 0 ? 'bonus' : 'deduction'));
    lastPrice = vd.priceAfterAssessment;
  }

  // 2.5. Lens Selection (if applicable)
  if (vd.priceAfterLenses != null && vd.priceAfterLenses !== lastPrice) {
    const delta = vd.priceAfterLenses - lastPrice;
    // Get lens names for display
    let lensLabel = 'Additional Lens';
    if (vd.selectedLenses && Array.isArray(vd.selectedLenses) && vd.selectedLenses.length > 0) {
      // Try to get lens names from compatibility data
      const compatibleLenses = window.getCompatibleLenses ?
        window.getCompatibleLenses(vd.brandName, vd.modelName) : [];
      const selectedLensNames = vd.selectedLenses
        .map(id => {
          const lens = compatibleLenses.find(l => l.id === id);
          return lens ? lens.name : id;
        })
        .filter(Boolean);
      if (selectedLensNames.length > 0) {
        lensLabel = `Additional Lens${selectedLensNames.length > 1 ? 'es' : ''}: ${selectedLensNames.join(', ')}`;
      }
    }
    breakdownRows.push(createRow(lensLabel, delta, delta >= 0 ? 'bonus' : 'deduction'));
    lastPrice = vd.priceAfterLenses;
  }

  // 3. Physical
  if (vd.priceAfterPhysical != null && vd.priceAfterPhysical !== lastPrice) {
    const delta = vd.priceAfterPhysical - lastPrice;
    breakdownRows.push(createRow('Physical Condition', delta, delta >= 0 ? 'bonus' : 'deduction'));
    lastPrice = vd.priceAfterPhysical;
  }

  // 4. Issues
  if (vd.priceAfterIssues != null && vd.priceAfterIssues !== lastPrice) {
    const delta = vd.priceAfterIssues - lastPrice;
    breakdownRows.push(createRow('Functional Issues', delta, delta >= 0 ? 'bonus' : 'deduction'));
    lastPrice = vd.priceAfterIssues;
  }

  // 5. Accessories
  if (vd.priceAfterAccessories != null && vd.priceAfterAccessories !== lastPrice) {
    const delta = vd.priceAfterAccessories - lastPrice;
    breakdownRows.push(createRow('Accessories', delta, delta >= 0 ? 'bonus' : 'deduction'));
    lastPrice = vd.priceAfterAccessories;
  }

  // 6. Warranty
  if (vd.priceAfterWarranty != null && vd.priceAfterWarranty !== lastPrice) {
    const delta = vd.priceAfterWarranty - lastPrice;
    breakdownRows.push(createRow('Warranty', delta, delta >= 0 ? 'bonus' : 'deduction'));
    lastPrice = vd.priceAfterWarranty;
  }

  // --- Populate Sidebar Detailed Breakdown ---
  if (breakdownListEl) {
    breakdownListEl.innerHTML = breakdownRows.join('');

    // Add lens selection details if available
    if (vd.selectedLenses && Array.isArray(vd.selectedLenses) && vd.selectedLenses.length > 0) {
      const compatibleLenses = window.getCompatibleLenses ?
        window.getCompatibleLenses(vd.brandName, vd.modelName) : [];
      vd.selectedLenses.forEach(lensId => {
        const lens = compatibleLenses.find(l => l.id === lensId);
        if (lens) {
          const lensItem = document.createElement('li');
          lensItem.className = 'evaluation-item bonus';
          lensItem.innerHTML = `
            <strong>Additional Lens: ${lens.name}</strong>
            <span>+${money(lens.bonus)}</span>
          `;
          breakdownListEl.appendChild(lensItem);
        }
      });
    } else if (vd.hasAdditionalLens === false) {
      const noLensItem = document.createElement('li');
      noLensItem.className = 'evaluation-item';
      noLensItem.innerHTML = `
        <span class="evaluation-answer">• No Additional Lens</span>
      `;
      breakdownListEl.appendChild(noLensItem);
    }
  }

  // --- NEW: Build and Populate Price Summary Widgets (Desktop + Mobile) ---
  const totalAdjustments = finalPrice - basePrice;
  const priceSummaryHTML = `
    <div class="summary-row">
      <span>Base Price</span>
      <strong>${money(basePrice)}</strong>
    </div>
    <div class="summary-row">
      <span>Adjustments</span>
      <strong>${totalAdjustments >= 0 ? '+' : '-'} ${money(Math.abs(totalAdjustments))}</strong>
    </div>
    <div class="summary-row">
      <span>Pickup Charges</span>
      <strong>Free <s class="muted">₹100</s></strong>
    </div>
    <div class="summary-row total">
      <span>Total Amount</span>
      <strong>${money(finalPrice)}</strong>
    </div>
  `;

  if (desktopPriceSummaryWidget) {
    // Inject into desktop price breakdown section
    desktopPriceSummaryWidget.innerHTML = priceSummaryHTML;
  }
  if (modalPriceSummaryWidget) {
    // Inject into mobile modal
    modalPriceSummaryWidget.innerHTML = priceSummaryHTML;
  }

  // --- Price Breakdown Toggle ---
  if (toggleBreakdown && priceBreakdown) {
    toggleBreakdown.addEventListener('click', () => {
      const isExpanded = toggleBreakdown.getAttribute('aria-expanded') === 'true';
      const span = toggleBreakdown.querySelector('.breakdown-text');
      const toggleIcon = toggleBreakdown.querySelector('.breakdown-arrow');

      if (isExpanded) {
        priceBreakdown.style.display = 'none';
        toggleBreakdown.setAttribute('aria-expanded', 'false');
        if (span) span.textContent = 'Show Price Breakdown';
        if (toggleIcon) {
          toggleIcon.classList.remove('fa-chevron-up');
          toggleIcon.classList.add('fa-chevron-down');
        }
      } else {
        priceBreakdown.style.display = 'block';
        toggleBreakdown.setAttribute('aria-expanded', 'true');
        if (span) span.textContent = 'Hide Price Breakdown';
        if (toggleIcon) {
          toggleIcon.classList.remove('fa-chevron-down');
          toggleIcon.classList.add('fa-chevron-up');
        }
      }
    });
  }

  function createRow(label, amount, typeClass) {
    let amountStr = money(amount);
    if (typeClass === 'bonus' && amount > 0) amountStr = `+ ${amountStr}`;
    if (typeClass === 'deduction' && amount < 0) amountStr = `- ${money(Math.abs(amount))}`;
    return `<li class="${typeClass}"><span>${escapeHtml(label)}</span><strong>${amountStr}</strong></li>`;
  }

  // --- Mobile Modal Listeners ---
  closeSummaryModalBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    if (priceSummaryModal) priceSummaryModal.style.display = 'none';
  });

  priceSummaryModal?.addEventListener('click', (e) => {
    if (e.target === priceSummaryModal) { // Only if clicking the backdrop
      priceSummaryModal.style.display = 'none';
    }
  });


  // --- Modal & Booking Logic ---

  // All modal steps
  const pickupModal = document.getElementById('pickupModal');
  const step1 = document.getElementById('pickup-step-1');
  const step2 = document.getElementById('pickup-step-2');
  const step3 = document.getElementById('pickup-step-3');
  const step4 = document.getElementById('pickup-step-4'); // Success

  // All form elements
  const pickupForm1 = document.getElementById('pickupForm-Step1');
  const pickupForm2 = document.getElementById('pickupForm-Step2');
  const custName = document.getElementById('custName');
  const custPhone = document.getElementById('custPhone');
  const custEmail = document.getElementById('custEmail');
  const custPincode = document.getElementById('custPincode');
  const custCity = document.getElementById('custCity');
  const custState = document.getElementById('custState');
  const custAddress = document.getElementById('custAddress');
  const custLandmark = document.getElementById('custLandmark');
  const pincodeLoader = document.getElementById('pincodeLoader');
  const pincodeError = document.getElementById('pincode-error');
  const serviceAreaNotice = document.getElementById('serviceAreaNotice');
  const stateGroup = document.getElementById('stateGroup');
  const dateSlotsContainer = document.getElementById('date-slots-container');
  const timeSlotsContainer = document.getElementById('time-slots-container');

  // --- MODIFIED: Get ALL "Sell Now" buttons ---
  const bookPickupBtnDesktop = document.getElementById('bookPickupBtnDesktop');
  const bookPickupBtnMobile = document.getElementById('bookPickupBtnMobile');

  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const goToStep2Btn = document.getElementById('goToStep2Btn');
  const backToStep1Btn = document.getElementById('backToStep1Btn');
  const goToStep3Btn = document.getElementById('goToStep3Btn');
  const backToStep2Btn = document.getElementById('backToStep2Btn');
  const submitPickupBtn = document.getElementById('submitPickupBtn');
  const closeConfirmBtn = document.getElementById('closeConfirmBtn');

  // Temp storage for form data
  let pickupData = {};
  let pincodeDebounceTimer = null;

  // --- NEW: Pincode Auto-Detection ---
  custPincode?.addEventListener('input', (e) => {
    const pincode = e.target.value.replace(/\D/g, ''); // Only digits
    e.target.value = pincode;

    // Clear previous error
    if (pincodeError) pincodeError.textContent = '';
    if (custCity) {
      custCity.value = '';
      custCity.classList.remove('city-detected', 'valid');
    }
    if (custState) custState.value = '';
    if (stateGroup) stateGroup.style.display = 'none';
    if (serviceAreaNotice) serviceAreaNotice.style.display = 'none';

    // Only fetch when 6 digits
    if (pincode.length === 6) {
      clearTimeout(pincodeDebounceTimer);
      pincodeDebounceTimer = setTimeout(() => fetchPincodeDetails(pincode), 300);
    }
  });

  async function fetchPincodeDetails(pincode) {
    if (pincodeLoader) pincodeLoader.style.display = 'inline';
    if (pincodeError) pincodeError.textContent = '';

    try {
      // Using India Post API
      const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
      const data = await response.json();

      if (data && data[0] && data[0].Status === 'Success' && data[0].PostOffice && data[0].PostOffice.length > 0) {
        const postOffice = data[0].PostOffice[0];
        const city = postOffice.District || postOffice.Division || postOffice.Name;
        const state = postOffice.State;

        // Update city field
        if (custCity) {
          custCity.value = city;
          custCity.classList.add('city-detected', 'valid');
        }

        // Update state field
        if (custState) {
          custState.value = state;
        }
        if (stateGroup) stateGroup.style.display = 'block';

        // Check if in service area (Tamil Nadu)
        if (serviceAreaNotice) {
          if (state === 'Tamil Nadu') {
            serviceAreaNotice.className = 'service-area-notice success';
            serviceAreaNotice.innerHTML = `
              <i class="fa-solid fa-circle-check"></i>
              <span><strong>Great!</strong> We provide free pickup in ${city}, Tamil Nadu. Our agent will collect your device from your doorstep.</span>
            `;
            serviceAreaNotice.style.display = 'flex';
          } else {
            serviceAreaNotice.className = 'service-area-notice';
            serviceAreaNotice.innerHTML = `
              <i class="fa-solid fa-circle-info"></i>
              <span>We currently provide pickup services in Tamil Nadu only. For ${state}, please visit our nearest store or contact us for shipping options.</span>
            `;
            serviceAreaNotice.style.display = 'flex';
          }
        }

        // Mark pincode as valid
        custPincode.classList.add('valid');
        custPincode.classList.remove('invalid');

      } else {
        // Invalid pincode
        if (pincodeError) pincodeError.textContent = 'Invalid pincode. Please enter a valid 6-digit pincode.';
        custPincode.classList.add('invalid');
        custPincode.classList.remove('valid');
      }
    } catch (error) {
      console.error('Pincode fetch error:', error);
      if (pincodeError) pincodeError.textContent = 'Unable to verify pincode. Please enter city manually.';
      // Allow manual entry
      if (custCity) custCity.removeAttribute('readonly');
    } finally {
      if (pincodeLoader) pincodeLoader.style.display = 'none';
    }
  }

  // --- MODIFIED: Open Modal Function ---
  function openBookingModal(e) {
    e.preventDefault();

    // Wait for Firebase to be ready, then check auth state
    function checkAuthAndOpen() {
      if (!firebase || !firebase.auth) {
        // Firebase not loaded yet, wait a bit
        setTimeout(checkAuthAndOpen, 100);
        return;
      }

      // Check if user is logged in using currentUser first (faster)
      const currentUser = firebase.auth().currentUser;
      if (currentUser) {
        // User is already logged in - open pickup modal immediately
        if (!pickupModal) return;
        // Pre-fill phone number if available
        if (custPhone && currentUser.phoneNumber) {
          custPhone.value = currentUser.phoneNumber.replace('+91', '');
        }
        showStep(step1);
        pickupModal.style.display = 'flex';
        return;
      }

      // If not logged in, wait for auth state change
      const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
        unsubscribe(); // Only check once
        if (!user) {
          // User not logged in - show login modal
          if (window.LoginModal && typeof window.LoginModal.show === 'function') {
            window.LoginModal.show();
          } else {
            // Fallback: redirect to login with return URL
            try {
              sessionStorage.setItem('loginReturnUrl', window.location.pathname);
            } catch (e) { }
            window.location.href = 'login.html';
          }
          return;
        }

        // User is logged in - open pickup modal
        if (!pickupModal) return;
        // Pre-fill phone number if available
        if (custPhone && user.phoneNumber) {
          custPhone.value = user.phoneNumber.replace('+91', '');
        }
        showStep(step1);
        pickupModal.style.display = 'flex';
      });
    }

    checkAuthAndOpen();
  }

  // --- MODIFIED: Attach listener to BOTH buttons ---
  bookPickupBtnDesktop?.addEventListener('click', openBookingModal);
  bookPickupBtnMobile?.addEventListener('click', openBookingModal);


  // --- Close Modal ---
  modalCloseBtn?.addEventListener('click', hideModal);
  closeConfirmBtn?.addEventListener('click', () => {
    sessionStorage.removeItem('valuationData');
    sessionStorage.removeItem('isVerified');
    window.location.href = 'index.html';
  });

  function hideModal() {
    if (pickupModal) pickupModal.style.display = 'none';
  }

  // --- Step 1: Location Logic ---
  pickupForm1?.addEventListener('submit', (e) => {
    e.preventDefault();
    // Save step 1 data
    pickupData.name = custName?.value || '';
    pickupData.phone = custPhone?.value || '';
    pickupData.email = custEmail?.value || '';
    pickupData.city = custCity?.value || '';
    pickupData.state = custState?.value || '';
    pickupData.pincode = custPincode?.value || '';
    pickupData.address = custAddress?.value || '';
    pickupData.landmark = custLandmark?.value || '';

    // Generate slots and go to step 2
    generateDateSlots();
    timeSlotsContainer.innerHTML = '<p>Please select a date first.</p>';
    goToStep3Btn.disabled = true;
    showStep(step2);
  });

  // --- Step 2: Scheduling Logic ---
  backToStep1Btn?.addEventListener('click', () => showStep(step1));

  pickupForm2?.addEventListener('submit', (e) => {
    e.preventDefault();
    // Save step 2 data
    const selectedDate = document.querySelector('input[name="pickupDate"]:checked');
    const selectedTime = document.querySelector('input[name="pickupTime"]:checked');

    if (!selectedDate || !selectedTime) {
      alert("Please select a date and time slot.");
      return;
    }

    pickupData.date = selectedDate.dataset.fullDate;
    pickupData.dateLabel = selectedDate.value;
    pickupData.timeLabel = selectedTime.value;

    // Populate confirmation and go to step 3
    populateConfirmation();
    showStep(step3);
  });

  function generateDateSlots() {
    dateSlotsContainer.innerHTML = '';
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    for (let i = 0; i < 3; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);

      const id = `date${i}`;
      const dayName = (i === 0) ? 'Today' : (i === 1) ? 'Tomorrow' : days[date.getDay()];
      const label = `${months[date.getMonth()]} ${date.getDate()}`;

      const slotHTML = `
        <div class="slot-option">
          <input type="radio" id="${id}" name="pickupDate" value="${dayName}, ${label}" data-full-date="${date.toISOString().split('T')[0]}" data-is-today="${i === 0}">
          <label for="${id}">${dayName}<span class="slot-day">${label}</span></label>
        </div>`;
      dateSlotsContainer.innerHTML += slotHTML;
    }

    dateSlotsContainer.querySelectorAll('input[name="pickupDate"]').forEach(radio => {
      radio.addEventListener('change', generateTimeSlots);
    });
  }

  function generateTimeSlots() {
    timeSlotsContainer.innerHTML = '';
    goToStep3Btn.disabled = true;

    // Check if "Today" is selected
    const selectedDateInput = document.querySelector('input[name="pickupDate"]:checked');
    const isToday = selectedDateInput?.dataset.isToday === 'true';

    // Get current hour
    const currentHour = new Date().getHours();

    // Filter available slots
    let availableSlots = TIME_SLOTS;
    if (isToday) {
      // Only show slots that haven't started yet (add 1 hour buffer for booking)
      availableSlots = TIME_SLOTS.filter(slot => slot.startHour > currentHour);
    }

    if (availableSlots.length === 0) {
      timeSlotsContainer.innerHTML = `
        <div class="no-slots-message">
          <i class="fa-solid fa-clock"></i>
          <p>No available slots for today. Please select tomorrow or another date.</p>
        </div>`;
      return;
    }

    availableSlots.forEach(slot => {
      const slotHTML = `
        <div class="slot-option">
          <input type="radio" id="${slot.id}" name="pickupTime" value="${slot.text}">
          <label for="${slot.id}">${slot.text}</label>
        </div>`;
      timeSlotsContainer.innerHTML += slotHTML;
    });

    timeSlotsContainer.querySelectorAll('input[name="pickupTime"]').forEach(radio => {
      radio.addEventListener('change', () => {
        goToStep3Btn.disabled = false;
      });
    });
  }

  // --- Step 3: Confirmation Logic ---
  backToStep2Btn?.addEventListener('click', () => showStep(step2));

  function populateConfirmation() {
    document.querySelector('#review-device span').textContent = `${vd.brandName || ''} ${vd.modelName || ''}`.trim();
    document.querySelector('#review-price span').textContent = money(finalPrice);
    document.querySelector('#review-name span').textContent = pickupData.name;
    document.querySelector('#review-contact span').textContent = pickupData.phone + (pickupData.email ? ` | ${pickupData.email}` : '');

    // Build full address with landmark
    let fullAddress = pickupData.address;
    if (pickupData.landmark) fullAddress += ` (Near: ${pickupData.landmark})`;
    fullAddress += `, ${pickupData.city}, ${pickupData.state || 'Tamil Nadu'} - ${pickupData.pincode}`;
    document.querySelector('#review-address span').textContent = fullAddress;

    document.querySelector('#review-slot span').textContent = `${pickupData.dateLabel} at ${pickupData.timeLabel}`;
  }

  submitPickupBtn?.addEventListener('click', () => {
    // ===================================================
    // NEW: Get the logged-in user's ID
    // ===================================================
    const user = firebase.auth().currentUser;
    if (!user) {
      alert("Your session has expired. Please log in again to confirm.");
      hideModal();
      if (window.LoginModal && typeof window.LoginModal.show === 'function') {
        window.LoginModal.show();
      }
      return;
    }
    // ===================================================

    // 1. Get user details from our temp object
    const pickupDetails = {
      name: pickupData.name,
      email: pickupData.email || '',
      address: pickupData.address,
      landmark: pickupData.landmark || '',
      city: pickupData.city,
      state: pickupData.state || 'Tamil Nadu',
      pincode: pickupData.pincode,
      phone: pickupData.phone,
    };

    // 2. Get scheduling details
    const scheduleDetails = {
      date: pickupData.date,
      slot: pickupData.timeLabel,
      dateLabel: pickupData.dateLabel
    };

    // 3. Combine into one record
    const pickupRequest = {
      // ===================================================
      // NEW: Add the user ID
      // ===================================================
      userId: user.uid, // This is the link to the 'users' collection
      // ===================================================
      customer: pickupDetails,
      schedule: scheduleDetails,
      device: { ...vd },
      finalPrice: finalPrice,
      status: "pending",
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    };

    // 4. Save to Firebase Firestore
    saveToFirestore(pickupRequest);
  });

  async function saveToFirestore(data) {
    submitPickupBtn.disabled = true;
    submitPickupBtn.textContent = 'Saving...';

    try {
      if (!window.firebase || !window.firebase.firestore) {
        throw new Error("Firestore SDK not loaded.");
      }

      const db = window.firebase.firestore();
      await db.collection("pickupRequests").add(data);

      // Success! Show confirmation
      showStep(step4);

    } catch (error) {
      if (window.Logger) {
        window.Logger.error("Error adding document: ", error);
      }
      alert("There was an error booking your pickup. Please try again.");
    } finally {
      submitPickupBtn.disabled = false;
      submitPickupBtn.textContent = 'Confirm Pickup';
    }
  }

  // --- Helper Functions ---

  function showStep(stepToShow) {
    [step1, step2, step3, step4].forEach(step => {
      if (step) step.style.display = 'none';
    });
    if (stepToShow) stepToShow.style.display = 'block';
  }

  function money(n) { return `₹${Number(n || 0).toLocaleString('en-IN')}`; }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
  }

  // --- Print Quote Handler ---
  const printQuoteBtn = document.getElementById('printQuoteBtn');
  if (printQuoteBtn) {
    printQuoteBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // --- Share Quote Handler ---
  const shareQuoteBtn = document.getElementById('shareQuoteBtn');
  if (shareQuoteBtn) {
    shareQuoteBtn.addEventListener('click', () => {
      const shareText = `Check out my device quote from WorthyTen: ${vd.brandName || ''} ${vd.modelName || ''} - ${money(finalPrice)}`;

      if (navigator.share) {
        navigator.share({
          title: 'My Device Quote - WorthyTen',
          text: shareText,
          url: window.location.href
        }).catch(err => {
          if (window.Logger) {
            window.Logger.log('Error sharing:', err);
          }
        });
      } else {
        // Fallback: Copy to clipboard
        navigator.clipboard.writeText(shareText + '\n' + window.location.href).then(() => {
          alert('Quote details copied to clipboard!');
        }).catch(() => {
          alert('Unable to share. Please copy the URL manually.');
        });
      }
    });
  }
});
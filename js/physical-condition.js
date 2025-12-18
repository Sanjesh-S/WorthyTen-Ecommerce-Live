// js/physical-condition.js
// NOTE: All price deductions are now sourced from Firestore productPricing collection

document.addEventListener("DOMContentLoaded", () => {
  // Load data
  const s = sessionStorage.getItem('valuationData');
  if (!s) { window.location.href = 'index.html'; return; }
  const vd = JSON.parse(s);
  // Use priceAfterLenses if available (from lens selection), otherwise use priceAfterAssessment
  const basePrice = Number(vd.priceAfterLenses ?? (vd.priceAfterAssessment || 0));

  // Back
  document.getElementById('backToAssessment')?.addEventListener('click', (e) => {
    e.preventDefault();
    history.back();
  });

  // Where to show the proceed CTA
  const finalQuoteContainer = document.getElementById('finalQuoteContainer');
  const proceedBtn = document.getElementById('proceedToIssuesBtn');

  // --- Sidebar Elements ---
  const evaluationImage = document.getElementById('evaluationImage');
  const evaluationModel = document.getElementById('evaluationModel');
  const evaluationList = document.getElementById('evaluation-summary-list');

  // --- Populate Sidebar Info ---
  if (evaluationImage && vd.imageUrl) evaluationImage.src = vd.imageUrl;
  if (evaluationModel) {
    const fullName = window.getFullModelName ?
      window.getFullModelName(vd.brandName, vd.modelName) :
      `${vd.brandName || ''} ${vd.modelName || ''}`.trim();

    // Add variant info if available
    const variantText = vd.variants && window.formatVariantDisplay ?
      window.formatVariantDisplay(vd.variants) : '';

    evaluationModel.textContent = fullName + ' ' + variantText;
  }

  // Normalize category name
  let category = vd.category || 'DSLR/Lens';
  const categoryNormalizer = {
    'DSLR Cameras': 'DSLR/Lens',
    'DSLR Camera': 'DSLR/Lens',
    'Camera': 'DSLR/Lens',
    'Cameras': 'DSLR/Lens',
    'DSLR': 'DSLR/Lens',
    'DSLR/Lens': 'DSLR/Lens',
    'Phone': 'Phone',
    'Phones': 'Phone',
    'Mobile': 'Phone',
    'Laptop': 'Laptop',
    'Laptops': 'Laptop',
    'MacBook': 'Laptop'
  };
  if (categoryNormalizer[category]) {
    category = categoryNormalizer[category];
    vd.category = category; // Update in valuation data
  }

  // Get category-based physical conditions (no deduction values - those come from Firestore)
  const categoryConditions = window.getPhysicalConditions ?
    window.getPhysicalConditions(category) :
    {
      display: [{ id: 'display_good', label: 'Good Condition', img: 'images/display-good.svg' }],
      body: [{ id: 'body_good', label: 'No Defects', img: 'images/body-no-defects.svg' }]
    };

  const conditions = categoryConditions;

  // Dynamically build selections and category names from loaded conditions
  const selections = {};
  const selectionLabels = {};
  const selectionIds = {}; // Store selected condition IDs for Firestore lookup
  const categoryNames = {};

  Object.keys(conditions).forEach(key => {
    selections[key] = null;
    selectionLabels[key] = null;
    selectionIds[key] = null;
    // Capitalize first letter for display
    categoryNames[key] = key.charAt(0).toUpperCase() + key.slice(1) + ' Condition';
  });

  function card(c, cat) {
    // Support both icon (Font Awesome) and img (image file) properties
    const visualElement = c.icon
      ? `<i class="${c.icon} condition-icon"></i>`
      : `<img src="${c.img}" alt="${c.label}" class="condition-image" loading="lazy" width="140" height="140" onerror="this.style.display='none'">`;

    return `
    <div class="condition-card" data-id="${c.id}" data-category="${cat}" data-label="${c.label}">
      ${visualElement}
      <p class="condition-label">${c.label}</p>
    </div>`;
  }

  // Gracefully support either #lensConditionGrid or #lenseConditionGrid in your HTML
  function render() {
    const get = (x) => document.getElementById(x);
    const set = (el, html) => { if (el) el.innerHTML = html; };

    // Render only the conditions that exist for this category
    if (conditions.display) {
      set(get('displayConditionGrid'),
        conditions.display.map(c => card(c, 'display')).join(''));
    } else {
      // Hide section if not applicable
      const displaySection = get('displayConditionGrid')?.closest('.condition-section');
      if (displaySection) displaySection.style.display = 'none';
    }

    if (conditions.body) {
      set(get('bodyConditionGrid'),
        conditions.body.map(c => card(c, 'body')).join(''));
    } else {
      const bodySection = get('bodyConditionGrid')?.closest('.condition-section');
      if (bodySection) bodySection.style.display = 'none';
    }

    if (conditions.error) {
      set(get('errorConditionGrid'),
        conditions.error.map(c => card(c, 'error')).join(''));
    } else {
      // Hide error section if not applicable (not a camera)
      const errorSection = get('errorConditionGrid')?.closest('.condition-section');
      if (errorSection) errorSection.style.display = 'none';
    }

    if (conditions.lens) {
      const lensEl = get('lensConditionGrid') || get('lenseConditionGrid');
      set(lensEl, conditions.lens.map(c => card(c, 'lens')).join(''));
    } else {
      // Hide lens section if not applicable (not a camera)
      const lensSection = (get('lensConditionGrid') || get('lenseConditionGrid'))?.closest('.condition-section');
      if (lensSection) lensSection.style.display = 'none';
    }

    // Handle phone-specific frame condition
    if (conditions.frame) {
      // Check if frame section exists, if not, create it dynamically
      let frameSection = get('frameConditionGrid')?.closest('.condition-section');
      if (!frameSection) {
        // Insert after body section
        const bodySection = get('bodyConditionGrid')?.closest('.condition-section');
        if (bodySection) {
          frameSection = document.createElement('div');
          frameSection.className = 'condition-section';
          frameSection.innerHTML = `
            <h2 class="condition-title">Frame Condition</h2>
            <div class="condition-grid" id="frameConditionGrid"></div>
          `;
          bodySection.after(frameSection);
        }
      }
      set(get('frameConditionGrid'),
        conditions.frame.map(c => card(c, 'frame')).join(''));
    }

    // Handle laptop-specific keyboard condition
    if (conditions.keyboard) {
      // Check if keyboard section exists, if not, create it dynamically
      let keyboardSection = get('keyboardConditionGrid')?.closest('.condition-section');
      if (!keyboardSection) {
        // Insert after body section
        const bodySection = get('bodyConditionGrid')?.closest('.condition-section');
        if (bodySection) {
          keyboardSection = document.createElement('div');
          keyboardSection.className = 'condition-section';
          keyboardSection.innerHTML = `
            <h2 class="condition-title">Keyboard Condition</h2>
            <div class="condition-grid" id="keyboardConditionGrid"></div>
          `;
          bodySection.after(keyboardSection);
        }
      }
      set(get('keyboardConditionGrid'),
        conditions.keyboard.map(c => card(c, 'keyboard')).join(''));
    }

    // Handle iPad-specific ports condition
    if (conditions.ports) {
      let portsSection = get('portsConditionGrid')?.closest('.condition-section');
      if (!portsSection) {
        const bodySection = get('bodyConditionGrid')?.closest('.condition-section');
        if (bodySection) {
          portsSection = document.createElement('div');
          portsSection.className = 'condition-section';
          portsSection.innerHTML = `
            <h2 class="condition-title">Ports Condition</h2>
            <div class="condition-grid" id="portsConditionGrid"></div>
          `;
          bodySection.after(portsSection);
        }
      }
      set(get('portsConditionGrid'),
        conditions.ports.map(c => card(c, 'ports')).join(''));
    }

    // Add click event listeners to all condition cards after rendering
    document.querySelectorAll('.condition-card').forEach(card => {
      card.addEventListener('click', handleCardClick);
    });

    // Initial sidebar render
    updateEvaluationSidebar();
  }

  // Store product pricing from Firestore
  let productPricingData = null;

  // Load product-specific pricing from Firestore
  async function loadProductPricing() {
    if (!window.firebase || !firebase.firestore) return null;
    try {
      const db = firebase.firestore();
      const snapshot = await db.collection('productPricing')
        .where('productName', '==', vd.modelName)
        .where('productBrand', '==', vd.brandName)
        .limit(1).get();
      if (!snapshot.empty) {
        productPricingData = snapshot.docs[0].data();
      }
    } catch (error) {
      console.error('Error loading product pricing:', error);
    }
    return productPricingData;
  }

  // Initialize pricing lookup
  loadProductPricing();

  // Map condition IDs to Firestore issue IDs
  const CONDITION_TO_ISSUE_MAP = {
    // Display conditions
    'display_excellent': null, // No deduction
    'display_good': 'display_scratched',
    'display_fair': 'display_scratched',
    'display_cracked': 'display_cracked',
    'display_flawless': null,
    'display_minor': 'display_scratched',
    'display_visible': 'display_scratched',
    'display_perfect': null,
    'display_spots': 'display_scratched',
    'display_damaged': 'display_cracked',

    // Body conditions
    'body_excellent': null,
    'body_good': 'body_scratches',
    'body_fair': 'body_scratches',
    'body_poor': 'body_dents',
    'body_pristine': null,
    'body_light': 'body_scratches',
    'body_moderate': 'body_scratches',
    'body_heavy': 'body_dents',
    'body_mint': null,

    // Error conditions (DSLR)
    'error_none': null,
    'error_minor': 'error_messages',
    'error_frequent': 'error_messages',
    'error_no_lens': 'error_messages',

    // Lens conditions (DSLR)
    'lense_good': null,
    'lense_focus_issue': 'focus_issue',
    'lense_fungus': 'lens_fungus',
    'lense_scratches': 'lens_scratches',

    // Frame conditions (Phone)
    'frame_perfect': null,
    'frame_minor': 'body_scratches',
    'frame_visible': 'body_scratches',
    'frame_damaged': 'body_dents',

    // Keyboard conditions (Laptop)
    'keyboard_perfect': null,
    'keyboard_shine': null,
    'keyboard_sticky': 'keyboard_issue',
    'keyboard_broken': 'keyboard_issue',

    // Ports conditions (iPad)
    'ports_perfect': null,
    'ports_loose': 'charging_port',
    'ports_intermittent': 'charging_port',
    'ports_broken': 'charging_port'
  };

  function allChosen() {
    // Check all available condition categories for this device type
    return Object.keys(conditions).every(k => selections[k] !== null);
  }

  function recalc() {
    let current = basePrice;

    // Only apply deductions if we have Firestore pricing data with conditionDeductions
    if (productPricingData && productPricingData.conditionDeductions) {
      Object.entries(selectionIds).forEach(([cat, conditionId]) => {
        if (!conditionId) return;

        // Look up deduction directly by condition ID
        if (productPricingData.conditionDeductions[conditionId]) {
          const deduction = Number(productPricingData.conditionDeductions[conditionId].deduction) || 0;
          current -= deduction;
        }
        // If condition not configured in admin, no deduction
      });
    }
    // If no productPricingData, no deductions - price stays at base

    // Floor at minimum (5% of base to avoid negative/zero)
    const finalPrice = Math.round(Math.max(current, basePrice * 0.05));
    vd.priceAfterPhysical = finalPrice;
    sessionStorage.setItem('valuationData', JSON.stringify(vd));
    try { window.updateOfferDrawer?.(vd); } catch { }
  }

  // --- Sidebar Update Function ---
  function updateEvaluationSidebar() {
    if (!evaluationList) return;
    evaluationList.innerHTML = ''; // Clear the list

    // Show ONLY selected physical conditions (like assessment page)
    Object.keys(selections).forEach(cat => {
      if (selectionLabels[cat]) {
        evaluationList.innerHTML += `
        <div class="evaluation-item">
          <span class="evaluation-question">${categoryNames[cat]}</span>
          <span class="evaluation-answer">• ${selectionLabels[cat]}</span>
        </div>`;
      }
    });
  }

  function updateProceedButton() {
    // Button is always visible, validation is on click
  }

  // Fixed click handler
  function handleCardClick(e) {
    const card = e.currentTarget;
    const cat = card.dataset.category;
    const conditionId = card.dataset.id;
    const label = card.dataset.label;

    // Update selection
    selections[cat] = true; // Mark as selected
    selectionLabels[cat] = label;
    selectionIds[cat] = conditionId; // Store the condition ID for Firestore lookup

    // Remove selected class from all cards in this category
    document.querySelectorAll(`.condition-card[data-category="${cat}"]`).forEach(c => {
      c.classList.remove('selected');
    });

    // Add selected class to clicked card
    card.classList.add('selected');

    // Recalculate and update UI
    recalc();
    updateProceedButton();
    updateEvaluationSidebar();
  }

  // Next button
  proceedBtn?.addEventListener('click', (e) => {
    e.preventDefault();

    // Validation check
    const firstUnanswered = Object.keys(selections).find(k => selections[k] === null);
    if (firstUnanswered) {
      alert(`Please select an option for ${categoryNames[firstUnanswered]}.`);
      return;
    }

    // Store selected condition IDs for reference
    vd.physicalConditions = selectionIds;
    sessionStorage.setItem('valuationData', JSON.stringify(vd));
    window.location.href = 'functional-issues.html';
  });

  // Initialize
  render();
  recalc();
  updateProceedButton();
});
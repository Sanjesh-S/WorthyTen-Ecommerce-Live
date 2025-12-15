// js/physical-condition.js (v6 - FIXED)
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

  // --- NEW: Sidebar Elements ---
  const evaluationImage = document.getElementById('evaluationImage');
  const evaluationModel = document.getElementById('evaluationModel');
  const evaluationList = document.getElementById('evaluation-summary-list');

  // --- NEW: Populate Sidebar Info ---
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

  // Get category-based physical conditions
  const categoryConditions = window.getPhysicalConditions ?
    window.getPhysicalConditions(category) :
    {
      display: [{ id: 'display_good', label: 'Good Condition', img: 'images/display-good.svg', deduction: 0 }],
      body: [{ id: 'body_good', label: 'No Defects', img: 'images/body-no-defects.svg', deduction: 0 }]
    };

  const conditions = categoryConditions;

  // Dynamically build selections and category names from loaded conditions
  const selections = {};
  const selectionLabels = {};
  const categoryNames = {};

  Object.keys(conditions).forEach(key => {
    selections[key] = null;
    selectionLabels[key] = null;
    // Capitalize first letter for display
    categoryNames[key] = key.charAt(0).toUpperCase() + key.slice(1) + ' Condition';
  });

  function card(c, cat) {
    return `
      <div class="condition-card" data-id="${c.id}" data-category="${cat}" data-deduction="${c.deduction}" data-label="${c.label}">
        <img src="${c.img}" alt="${c.label}" class="condition-image" loading="lazy" width="140" height="140">
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

    // Add click event listeners to all condition cards after rendering
    document.querySelectorAll('.condition-card').forEach(card => {
      card.addEventListener('click', handleCardClick);
    });

    // NEW: Initial sidebar render
    updateEvaluationSidebar();
  }

  // NEW: Store product pricing from Firestore
  let productPricingData = null;

  // NEW: Load product-specific pricing from Firestore
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

  function allChosen() {
    // Check all available condition categories for this device type
    return Object.keys(conditions).every(k => selections[k] !== null);
  }

  function recalc() {
    let current = basePrice;

    Object.entries(selections).forEach(([cat, deduction]) => {
      if (deduction === null) return;

      // Use fixed amount from productPricing ONLY
      if (productPricingData && productPricingData.issues) {
        const selectedCard = document.querySelector(`.condition-card[data-category="${cat}"].selected`);
        const selectedId = selectedCard?.dataset.id || '';

        // Look for a matching issue in productPricing
        let fixedDeduction = 0;
        Object.entries(productPricingData.issues).forEach(([issueId, issueData]) => {
          if (selectedId.includes(issueId.replace('_', '')) || issueId.includes(cat)) {
            if (issueData.deduction > 0) {
              fixedDeduction = Number(issueData.deduction);
            }
          }
        });
        current -= fixedDeduction;
      }
      // No percentage fallback - if no pricing configured, no deduction
    });

    const finalPrice = Math.round(Math.max(current, basePrice * 0.05));
    vd.priceAfterPhysical = finalPrice;
    vd.usedFixedPricing = true;
    sessionStorage.setItem('valuationData', JSON.stringify(vd));
    try { window.updateOfferDrawer?.(vd); } catch { }
  }

  // --- NEW: Sidebar Update Function ---
  function updateEvaluationSidebar() {
    if (!evaluationList) return;
    evaluationList.innerHTML = ''; // Clear the list

    // Map assessment question IDs to their text
    const questionMap = {
      powerOn: 'Does your camera power on and function properly?',
      bodyDamage: 'Is the camera body free from major damage (cracks, dents, water damage)?',
      lcdScreen: 'Is the LCD/Touchscreen working without cracks or display issues?',
      lensCondition: 'Is the lens (if included) free from scratches, fungus, or dust?',
      autofocusZoom: 'Does autofocus and zoom work properly on your camera/lens?',
      hasAdditionalLens: 'Do you have any additional lens?'
    };

    // Show previous step's summary
    if (vd.assessmentAnswers) {
      Object.keys(vd.assessmentAnswers).forEach((key, index) => {
        const questionText = questionMap[key] || key;
        const answerText = vd.assessmentAnswers[key] === 'yes' ? 'Yes' : 'No';
        evaluationList.innerHTML += `
              <div class="evaluation-item">
                <span class="evaluation-question">${index + 1}. ${questionText}</span>
                <span class="evaluation-answer">• ${answerText}</span>
              </div>`;
      });
    }

    // Show current selections
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
    // This function is no longer needed as button is always visible
    // and validation is on click
  }

  // Fixed click handler
  function handleCardClick(e) {
    const card = e.currentTarget; // Use currentTarget instead of closest
    const cat = card.dataset.category;
    const deduction = parseFloat(card.dataset.deduction);
    const label = card.dataset.label;

    // Update selection
    selections[cat] = deduction;
    selectionLabels[cat] = label; // NEW: Store label for sidebar

    // Remove selected class from all cards in this category
    document.querySelectorAll(`.condition-card[data-category="${cat}"]`).forEach(c => {
      c.classList.remove('selected');
    });

    // Add selected class to clicked card
    card.classList.add('selected');

    // Recalculate and update UI
    recalc();
    updateProceedButton();
    updateEvaluationSidebar(); // NEW: Update sidebar
  }

  // Next button
  proceedBtn?.addEventListener('click', (e) => {
    e.preventDefault();

    // NEW: Validation check
    const firstUnanswered = Object.keys(selections).find(k => selections[k] === null);
    if (firstUnanswered) {
      alert(`Please select an option for ${categoryNames[firstUnanswered]}.`);
      return;
    }

    sessionStorage.setItem('valuationData', JSON.stringify(vd));
    window.location.href = 'functional-issues.html';
  });

  // Initialize
  render();
  recalc();
  updateProceedButton();
});
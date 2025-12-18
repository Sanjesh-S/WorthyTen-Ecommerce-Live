// js/functional-issues.js (v6)
document.addEventListener("DOMContentLoaded", () => {
  // Data
  const s = sessionStorage.getItem('valuationData');
  if (!s) { window.location.href = 'index.html'; return; }
  const vd = JSON.parse(s);
  const basePrice = Number(vd.priceAfterPhysical || 0);

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


  // Back
  document.getElementById('backToPhysical')?.addEventListener('click', (e) => { e.preventDefault(); history.back(); });

  // UI
  const issuesGrid = document.getElementById('issuesGrid');
  const noIssuesBtn = document.getElementById('noIssuesBtn');
  const proceedBtn = document.getElementById('proceedToAccessoriesBtn');

  // Category-specific functional issues
  const categoryIssues = {
    'DSLR/Lens': [
      { id: 'battery', label: 'Battery weak or Not working or Duplicate', icon: 'fa-solid fa-battery-half' },
      { id: 'flashlight', label: 'Flashlight not Working', icon: 'fa-solid fa-lightbulb' },
      { id: 'memory_slot', label: 'Memory Card Slot issue', icon: 'fa-solid fa-sd-card' },
      { id: 'speaker', label: 'Speaker not working', icon: 'fa-solid fa-volume-xmark' },
      { id: 'connectors', label: 'Connectors not working', icon: 'fa-solid fa-plug' },
      { id: 'buttons', label: 'Buttons not working', icon: 'fa-regular fa-circle-dot' }
    ],
    'Laptop': [
      { id: 'battery', label: 'Battery weak / Drains fast', icon: 'fa-solid fa-battery-quarter' },
      { id: 'keyboard', label: 'Keyboard not working', icon: 'fa-solid fa-keyboard' },
      { id: 'trackpad', label: 'Trackpad not working', icon: 'fa-solid fa-hand-pointer' },
      { id: 'display', label: 'Display flickering / Dead pixels', icon: 'fa-solid fa-desktop' },
      { id: 'speaker', label: 'Speaker not working', icon: 'fa-solid fa-volume-xmark' },
      { id: 'usb_ports', label: 'USB Ports not working', icon: 'fa-brands fa-usb' },
      { id: 'charging', label: 'Charging port issue', icon: 'fa-solid fa-plug' },
      { id: 'wifi', label: 'WiFi / Bluetooth issue', icon: 'fa-solid fa-wifi' },
      { id: 'webcam', label: 'Webcam not working', icon: 'fa-solid fa-video' }
    ],
    'Phone': [
      { id: 'battery', label: 'Battery drains fast', icon: 'fa-solid fa-battery-quarter' },
      { id: 'speaker', label: 'Speaker not working', icon: 'fa-solid fa-volume-xmark' },
      { id: 'microphone', label: 'Microphone not working', icon: 'fa-solid fa-microphone-slash' },
      { id: 'charging', label: 'Charging port issue', icon: 'fa-solid fa-plug' },
      { id: 'camera', label: 'Camera not working', icon: 'fa-solid fa-camera' },
      { id: 'touch', label: 'Touch screen unresponsive', icon: 'fa-solid fa-hand-pointer' },
      { id: 'wifi', label: 'WiFi / Bluetooth issue', icon: 'fa-solid fa-wifi' },
      { id: 'face_id', label: 'Face ID / Touch ID not working', icon: 'fa-solid fa-face-smile' },
      { id: 'buttons', label: 'Buttons not working', icon: 'fa-regular fa-circle-dot' }
    ],
    'iPad': [
      { id: 'battery', label: 'Battery drains fast', icon: 'fa-solid fa-battery-quarter' },
      { id: 'speaker', label: 'Speaker not working', icon: 'fa-solid fa-volume-xmark' },
      { id: 'charging', label: 'Charging port issue', icon: 'fa-solid fa-plug' },
      { id: 'camera', label: 'Camera not working', icon: 'fa-solid fa-camera' },
      { id: 'touch', label: 'Touch screen unresponsive', icon: 'fa-solid fa-hand-pointer' },
      { id: 'wifi', label: 'WiFi / Bluetooth issue', icon: 'fa-solid fa-wifi' },
      { id: 'face_id', label: 'Face ID / Touch ID not working', icon: 'fa-solid fa-face-smile' },
      { id: 'apple_pencil', label: 'Apple Pencil not pairing', icon: 'fa-solid fa-pen' },
      { id: 'buttons', label: 'Buttons not working', icon: 'fa-regular fa-circle-dot' }
    ]
  };

  // Normalize category name to match config
  let category = vd.category || 'DSLR/Lens';
  const categoryNormalizer = {
    'DSLR Cameras': 'DSLR/Lens',
    'DSLR Camera': 'DSLR/Lens',
    'Camera': 'DSLR/Lens',
    'Cameras': 'DSLR/Lens',
    'DSLR': 'DSLR/Lens',
    'phone': 'Phone',
    'laptop': 'Laptop',
    'ipad': 'iPad'
  };
  category = categoryNormalizer[category] || category;

  // Get issues for current category
  const issues = categoryIssues[category] || categoryIssues['DSLR/Lens'];
  console.log('Functional Issues - Category:', category, 'Issues count:', issues.length);

  const selected = new Set();
  let noIssuesSelected = false; // NEW: Track "No Issues" state

  function renderIssues() {
    issuesGrid.innerHTML = issues.map(i => `
      <div class="issue-card" data-id="${i.id}" data-label="${i.label}">
        <i class="${i.icon} issue-icon"></i>
        <p class="issue-label">${i.label}</p>
      </div>
    `).join('');
    updateProceedState();
    updateEvaluationSidebar(); // NEW: Initial sidebar render
  }

  // --- NEW: Sidebar Update Function ---
  function updateEvaluationSidebar() {
    if (!evaluationList) return;
    evaluationList.innerHTML = ''; // Clear the list

    // You can add logic here to show previous steps if needed
    // For now, it just shows this step's selections

    evaluationList.innerHTML += `
      <div class="evaluation-item">
        <span class="evaluation-question">Functional Issues</span>
      </div>`;

    if (noIssuesSelected) {
      evaluationList.innerHTML += `
        <div class="evaluation-item">
          <span class="evaluation-answer">• No Functional Issues</span>
        </div>`;
    } else if (selected.size > 0) {
      selected.forEach(id => {
        const issue = issues.find(i => i.id === id);
        if (issue) {
          evaluationList.innerHTML += `
            <div class="evaluation-item">
              <span class="evaluation-answer">• ${issue.label}</span>
            </div>`;
        }
      });
    } else {
      // Nothing selected yet
      evaluationList.innerHTML += `
        <div class="evaluation-item">
          <span class="evaluation-answer" style="color: var(--muted); font-weight: 500;">• (Select issues or "No Issues")</span>
        </div>`;
    }
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

  function recalc() {
    let current = basePrice;

    // Map local issue IDs to productPricing functional issue IDs
    const issueIdMapping = {
      'battery': 'battery_weak',
      'flashlight': 'flashlight_broken',
      'memory_slot': 'memory_slot_issue',
      'speaker': 'speaker_broken',
      'connectors': 'connectors_broken',
      'buttons': 'buttons_broken'
    };

    selected.forEach(id => {
      const mappedId = issueIdMapping[id] || id;

      // Use fixed amount from productPricing functionalIssueDeductions
      if (productPricingData && productPricingData.functionalIssueDeductions && productPricingData.functionalIssueDeductions[mappedId]) {
        const fixedDeduction = Number(productPricingData.functionalIssueDeductions[mappedId].deduction) || 0;
        current -= fixedDeduction;
      }
      // No percentage fallback - if no pricing configured, no deduction
    });

    const final = Math.round(Math.max(current, basePrice * 0.05));
    vd.priceAfterIssues = final;
    vd.usedFixedPricing = true;
    sessionStorage.setItem('valuationData', JSON.stringify(vd));
    try { window.updateOfferDrawer?.(vd); } catch { }
  }

  function updateProceedState() {
    // This function no longer controls button state
  }

  // Clicks
  issuesGrid.addEventListener('click', (e) => {
    const card = e.target.closest('.issue-card'); if (!card) return;
    const id = card.dataset.id;
    card.classList.toggle('selected');

    noIssuesBtn?.classList.remove('selected');
    noIssuesSelected = false; // NEW

    selected.has(id) ? selected.delete(id) : selected.add(id);
    recalc(); updateProceedState();
    updateEvaluationSidebar(); // NEW
  });

  noIssuesBtn?.addEventListener('click', () => {
    issuesGrid.querySelectorAll('.issue-card.selected').forEach(c => c.classList.remove('selected'));
    selected.clear();
    noIssuesBtn.classList.add('selected');
    noIssuesSelected = true; // NEW
    recalc(); updateProceedState();
    updateEvaluationSidebar(); // NEW
  });

  proceedBtn?.addEventListener('click', (e) => {
    e.preventDefault();

    // NEW: Validation
    if (selected.size === 0 && !noIssuesSelected) {
      alert('Please select any functional issues or "No Functional Issues".');
      return;
    }

    sessionStorage.setItem('valuationData', JSON.stringify(vd));
    window.location.href = 'accessories.html';
  });

  renderIssues();
  recalc();
  updateProceedState();
});
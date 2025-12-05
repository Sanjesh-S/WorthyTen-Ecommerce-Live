// js/lens-selection.js
// Handles lens selection page logic

document.addEventListener("DOMContentLoaded", () => {
  const s = sessionStorage.getItem('valuationData');
  if (!s) { 
    window.location.href = 'index.html'; 
    return; 
  }

  let vd; 
  try { 
    vd = JSON.parse(s); 
  } catch { 
    window.location.href = 'index.html'; 
    return; 
  }
  
  // Normalize category name
  let category = vd.category || 'DSLR/Lens';
  const categoryNormalizer = {
    'DSLR Cameras': 'DSLR/Lens',
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
    sessionStorage.setItem('valuationData', JSON.stringify(vd));
  }
  
  // Check if category supports lens selection and user chose additional lens
  const supportsLens = window.supportsLensSelection ? window.supportsLensSelection(category) : false;
  
  if (!supportsLens || typeof vd.hasAdditionalLens === 'undefined' || vd.hasAdditionalLens !== true) {
    // If category doesn't support lens or user didn't choose additional lens, skip to physical condition
    window.location.href = 'physical-condition.html';
    return;
  }
  
  // Check if assessment is complete
  if (typeof vd.priceAfterAssessment !== 'number' || isNaN(vd.priceAfterAssessment)) {
    window.location.href = 'assessment.html'; 
    return;
  }
  
  const basePrice = Number(vd.priceAfterAssessment || 0);
  
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

  // Back button
  document.getElementById('backToAssessment')?.addEventListener('click', (e) => { 
    e.preventDefault(); 
    history.back(); 
  });

  const lensSelect = document.getElementById('lensSelect');
  const nextButton = document.getElementById('proceedToPhysicalBtn');

  if (!lensSelect || !nextButton) return;

  let selected = new Set(vd.selectedLenses || []);
  let compatibleLenses = [];

  if (window.Logger) {
    window.Logger.log('Lens selection - Brand:', vd.brandName, 'Model:', vd.modelName);
  }

  // Show loading state
  lensSelect.innerHTML = '<option value="" disabled selected>Loading compatible lenses...</option>';
  lensSelect.disabled = true;

  function render() {
    if (compatibleLenses.length === 0) {
      lensSelect.innerHTML = '<option value="" disabled>No compatible lenses found for this camera model</option>';
      lensSelect.disabled = true;
      if (window.Logger) {
        window.Logger.warn('No compatible lenses found for', vd.brandName, vd.modelName);
      }
      return;
    }

    // Clear existing options
    lensSelect.innerHTML = '';
    lensSelect.disabled = false;
    
    // Add lens options
    compatibleLenses.forEach(lens => {
      const option = document.createElement('option');
      option.value = lens.id;
      option.textContent = lens.name;
      option.selected = selected.has(lens.id);
      lensSelect.appendChild(option);
    });
    
    updateEvaluationSidebar();
  }
  
  // --- Sidebar Update Function ---
  function updateEvaluationSidebar() {
    if (!evaluationList) return;
    evaluationList.innerHTML = ''; // Clear the list
    
    evaluationList.innerHTML += `
      <div class="evaluation-item">
        <span class="evaluation-question">Additional Lens</span>
      </div>`;

    if (selected.size > 0) {
      selected.forEach(id => {
        const lens = compatibleLenses.find(l => l.id === id);
        if (lens) {
          evaluationList.innerHTML += `
            <div class="evaluation-item">
              <span class="evaluation-answer">• ${lens.name}</span>
            </div>`;
        }
      });
    } else {
      evaluationList.innerHTML += `
        <div class="evaluation-item">
          <span class="evaluation-answer" style="color: var(--muted); font-weight: 500;">• (Select lenses)</span>
        </div>`;
    }
  }

  function recalc() {
    let bonus = 0;
    selected.forEach(id => { 
      const lens = compatibleLenses.find(x => x.id === id); 
      if (lens) bonus += lens.bonus; 
    });
    const final = Math.round(basePrice + bonus);
    vd.priceAfterLenses = final;
    vd.selectedLenses = Array.from(selected);
    sessionStorage.setItem('valuationData', JSON.stringify(vd));
    try { window.updateOfferDrawer?.(vd); } catch {}
  }

  // Handle lens selection change (multiple select)
  lensSelect.addEventListener('change', (e) => {
    selected.clear();
    // Get all selected options
    Array.from(lensSelect.selectedOptions).forEach(option => {
      if (option.value) {
        selected.add(option.value);
      }
    });
    
    recalc();
    updateEvaluationSidebar();
  });

  // Search functionality for lenses
  const lensSearchInput = document.getElementById('lensSearchInput');
  if (lensSearchInput) {
    lensSearchInput.addEventListener('input', (e) => {
      const searchTerm = e.target.value.toLowerCase().trim();
      
      // Clear and re-populate dropdown with filtered results
      lensSelect.innerHTML = '';
      
      const filteredLenses = compatibleLenses.filter(lens => 
        lens.name.toLowerCase().includes(searchTerm)
      );
      
      if (filteredLenses.length === 0) {
        const option = document.createElement('option');
        option.value = '';
        option.textContent = searchTerm ? 'No lenses match your search' : 'No compatible lenses found';
        option.disabled = true;
        lensSelect.appendChild(option);
      } else {
        filteredLenses.forEach(lens => {
          const option = document.createElement('option');
          option.value = lens.id;
          option.textContent = lens.name;
          option.selected = selected.has(lens.id);
          lensSelect.appendChild(option);
        });
      }
    });
  }

  nextButton.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Save current selection (even if empty - user can proceed without selecting)
    sessionStorage.setItem('valuationData', JSON.stringify(vd));
    window.location.href = 'physical-condition.html';
  });

  // Initialize - Load lenses from Firebase
  async function init() {
    try {
      // Use smart pattern-based detection (best)
      if (window.getCompatibleLensesSmartly) {
        compatibleLenses = await window.getCompatibleLensesSmartly(vd.brandName, vd.modelName);
      }
      // Fallback to dynamic Firebase-based
      else if (window.getCompatibleLensesFromFirebase) {
        compatibleLenses = await window.getCompatibleLensesFromFirebase(vd.brandName, vd.modelName);
      }
      // Fallback to old static method
      else {
        compatibleLenses = window.getCompatibleLenses ? 
          window.getCompatibleLenses(vd.brandName, vd.modelName) : [];
      }

      if (window.Logger) {
        window.Logger.log('Compatible lenses found:', compatibleLenses.length);
      }

      render();
      recalc();
    } catch (error) {
      console.error('Error loading lenses:', error);
      if (window.Logger) {
        window.Logger.error('Error loading lenses:', error);
      }
      lensSelect.innerHTML = '<option value="" disabled>Error loading lenses. Please try again.</option>';
      lensSelect.disabled = true;
    }
  }

  init();
});


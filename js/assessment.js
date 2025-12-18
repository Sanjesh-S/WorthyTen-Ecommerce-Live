/**
 * Assessment Page Logic
 * Handles device condition assessment questions and price calculations
 * NOTE: All price deductions are now sourced from Firestore productPricing collection
 * @file js/assessment.js
 */

document.addEventListener("DOMContentLoaded", () => {
  const valuationDataString = sessionStorage.getItem('valuationData');
  if (!valuationDataString) { window.location.href = 'index.html'; return; }
  const valuationData = JSON.parse(valuationDataString);

  // Back
  document.getElementById('backToQuote')?.addEventListener('click', (e) => {
    e.preventDefault();
    history.back();
  });

  // Header data
  document.getElementById('modelNameText').textContent = valuationData.modelName || '';

  // Use helper function to avoid duplicate brand names (e.g., "Canon Canon EOS 5D Mark II")
  const fullModelDisplay = window.getFullModelName
    ? window.getFullModelName(valuationData.brandName, valuationData.modelName)
    : (valuationData.modelName || '').trim();
  document.getElementById('fullModelName').textContent = fullModelDisplay;

  if (valuationData.imageUrl) document.getElementById('productImage').src = valuationData.imageUrl;

  // --- Sidebar Elements ---
  const evaluationImage = document.getElementById('evaluationImage');
  const evaluationModel = document.getElementById('evaluationModel');
  const evaluationList = document.getElementById('evaluation-summary-list');

  // --- Populate Sidebar Info ---
  if (evaluationImage && valuationData.imageUrl) evaluationImage.src = valuationData.imageUrl;
  if (evaluationModel) {
    const fullName = window.getFullModelName ?
      window.getFullModelName(valuationData.brandName, valuationData.modelName) :
      `${valuationData.brandName || ''} ${valuationData.modelName || ''}`.trim();

    // Add variant info if available
    const variantText = valuationData.variants && window.formatVariantDisplay ?
      window.formatVariantDisplay(valuationData.variants) : '';

    evaluationModel.textContent = fullName + ' ' + variantText;
  }


  // Get or detect category
  let category = valuationData.category;

  // Normalize category names (backward compatibility fix)
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

  if (category && categoryNormalizer[category]) {
    category = categoryNormalizer[category];
  }

  // Smart category detection for backward compatibility
  if (!category) {
    const brand = valuationData.brandName || '';
    const model = valuationData.modelName || '';

    if (brand === 'Apple' && (model.includes('iPhone') || model.includes('iPad'))) {
      category = 'Phone';
    } else if (brand === 'Apple' && model.includes('MacBook')) {
      category = 'Laptop';
    } else if (['Canon', 'Nikon', 'Sony', 'Fujifilm', 'GoPro', 'DJI', 'Panasonic', 'Olympus', 'Pentax'].includes(brand)) {
      category = 'Camera';
    } else {
      category = 'Camera'; // Ultimate fallback
    }

    if (window.Logger) {
      window.Logger.log('Category auto-detected:', category, 'based on brand:', brand);
    }
  }

  // Store normalized category
  valuationData.category = category;
  sessionStorage.setItem('valuationData', JSON.stringify(valuationData));

  if (window.Logger) {
    window.Logger.log('Category normalized to:', category);
  }

  // Get category-based questions from config (no deduction values - those come from Firestore)
  let questions = window.getAssessmentQuestions ?
    window.getAssessmentQuestions(category) :
    [
      { id: 'powerOn', text: 'Does your camera power on and function properly?', instruction: 'We currently only accept devices that switch on' },
      { id: 'bodyDamage', text: 'Is the camera body free from major damage (cracks, dents, water damage)?', instruction: 'Check your device\'s body or buttons condition carefully' },
      { id: 'lcdScreen', text: 'Is the LCD/Touchscreen working without cracks or display issues?', instruction: 'Check your device\'s display condition carefully' },
      { id: 'lensCondition', text: 'Is the lens (if included) free from scratches, fungus, or dust?', instruction: 'Check your lens condition carefully' },
      { id: 'autofocusZoom', text: 'Does autofocus and zoom work properly on your camera/lens?', instruction: 'Check your device\'s autofocus and zoom functionality carefully' },
      { id: 'hasAdditionalLens', text: 'Do you have any additional lens?', instruction: 'Choose this option if you have additional lens of the same brand', isLensQuestion: true }
    ];

  // Remove "additional lens" question for fixed-lens cameras
  if (category === 'Camera' || category === 'DSLR/Lens' || category === 'DSLR Cameras') {
    // Use smart detection if available, fallback to old method
    let isFixed = false;

    if (window.detectCameraMountSmart) {
      const mountInfo = window.detectCameraMountSmart(valuationData.brandName, valuationData.modelName);
      isFixed = mountInfo && mountInfo.mountType === 'fixedLens';
    } else if (window.isFixedLensCamera) {
      isFixed = window.isFixedLensCamera(valuationData.brandName, valuationData.modelName);
    }

    if (isFixed) {
      questions = questions.filter(q => !q.isLensQuestion);
      if (window.Logger) {
        window.Logger.log('Fixed-lens camera detected:', valuationData.brandName, valuationData.modelName, '- removed additional lens question');
      }
    }
  }

  if (window.Logger) {
    window.Logger.log('Assessment - Category:', category, 'Questions:', questions.length);
  }

  const questionsContainer = document.getElementById('questionsContainer');
  const finalQuoteContainer = document.getElementById('finalQuoteContainer');
  const proceedBtn = document.getElementById('proceedBtn');

  const userAnswers = {}; // { [id]: "yes" | "no" }

  function renderQuestions() {
    questionsContainer.innerHTML = questions.map((q, i) => `
      <div class="question-item">
        <p class="question-text">${q.text}</p>
        <p class="question-instruction">${q.instruction}</p>
        <div class="answer-options">
          <label class="radio-option-box">
            <input type="radio" name="${q.id}" value="yes" data-question-id="${q.id}" data-answer="yes">
            <span>Yes</span>
          </label>
          <label class="radio-option-box">
            <input type="radio" name="${q.id}" value="no" data-question-id="${q.id}" data-answer="no">
            <span>No</span>
          </label>
        </div>
      </div>
    `).join('');
  }

  // Store product pricing from Firestore
  let productPricingData = null;

  // Load product-specific pricing from Firestore
  async function loadProductPricing() {
    if (!window.firebase || !firebase.firestore) {
      if (window.Logger) window.Logger.warn('Firestore not available for pricing lookup');
      return null;
    }

    try {
      const db = firebase.firestore();
      // Try to find pricing by product name
      const snapshot = await db.collection('productPricing')
        .where('productName', '==', valuationData.modelName)
        .where('productBrand', '==', valuationData.brandName)
        .limit(1)
        .get();

      if (!snapshot.empty) {
        productPricingData = snapshot.docs[0].data();
        if (window.Logger) {
          window.Logger.log('Loaded product pricing:', productPricingData.productName);
        }
        return productPricingData;
      } else {
        if (window.Logger) {
          window.Logger.log('No custom pricing found for:', valuationData.modelName);
        }
      }
    } catch (error) {
      if (window.Logger) {
        window.Logger.error('Error loading product pricing:', error);
      }
    }
    return null;
  }

  // Initialize pricing lookup
  loadProductPricing();

  function calculatePriceAndStore() {
    let currentPrice = Number(valuationData.originalQuotePrice || 0);

    // Only apply deductions if we have Firestore pricing data with assessmentDeductions
    if (productPricingData && productPricingData.assessmentDeductions) {
      questions.forEach(q => {
        // Skip lens question in price calculation (it's only for routing)
        if (q.isLensQuestion) return;

        if (userAnswers[q.id] === 'no') {
          // Look up deduction directly by question ID
          if (productPricingData.assessmentDeductions[q.id]) {
            const deductionAmount = Number(productPricingData.assessmentDeductions[q.id].deduction) || 0;
            currentPrice -= deductionAmount;
          }
          // If question not configured in admin dashboard, no deduction is applied
        }
      });
    }
    // If no productPricingData, no deductions are applied - price stays at base

    // Floor at minimum price (5% of original to avoid negative/zero)
    const minPrice = Number(valuationData.originalQuotePrice || 0) * 0.05;
    const finalPriceRounded = Math.round(Math.max(currentPrice, minPrice));
    valuationData.priceAfterAssessment = finalPriceRounded;
    sessionStorage.setItem('valuationData', JSON.stringify(valuationData));
  }

  // --- Sidebar Update Function ---
  function updateEvaluationSidebar() {
    if (!evaluationList) return;
    evaluationList.innerHTML = ''; // Clear the list

    questions.forEach(q => {
      if (userAnswers[q.id]) {
        const answerText = userAnswers[q.id] === 'yes' ? 'Yes' : 'No';
        const itemHTML = `
          <div class="evaluation-item">
            <span class="evaluation-question">${q.text}</span>
            <span class="evaluation-answer">• ${answerText}</span>
          </div>
        `;
        evaluationList.innerHTML += itemHTML;
      }
    });
  }

  function updateProceedVisibility() {
    // Validation is handled on click, button is always visible
  }

  // Handle radio button changes
  questionsContainer.addEventListener('change', (ev) => {
    const radio = ev.target;
    if (!radio.matches('input[type="radio"]')) return;

    const qid = radio.getAttribute('data-question-id');
    const answer = radio.getAttribute('data-answer');

    userAnswers[qid] = answer;

    // Update visual state - remove selected class from all boxes in this question group
    const questionItem = radio.closest('.question-item');
    questionItem.querySelectorAll('.radio-option-box').forEach(box => {
      box.classList.remove('selected');
    });
    // Add selected class to the checked box
    radio.closest('.radio-option-box').classList.add('selected');

    calculatePriceAndStore();
    updateProceedVisibility();
    updateEvaluationSidebar();
  });

  // Proceed
  proceedBtn?.addEventListener('click', (e) => {
    e.preventDefault();

    // Validation check
    const firstUnanswered = questions.find(q => !userAnswers[q.id]);
    if (firstUnanswered) {
      alert('Please select an option for:\n"' + firstUnanswered.text + '"');
      return; // Stop execution
    }

    // Store lens question answer (only for cameras)
    valuationData.hasAdditionalLens = userAnswers.hasAdditionalLens === 'yes';

    // persist answers for later steps
    valuationData.assessmentAnswers = userAnswers;
    sessionStorage.setItem('valuationData', JSON.stringify(valuationData));

    // Navigate based on additional lens answer
    if (valuationData.hasAdditionalLens) {
      // User has additional lens - go to lens selection page
      window.location.href = 'lens-selection.html';
    } else {
      // No additional lens - go directly to physical condition
      window.location.href = 'physical-condition.html';
    }
  });

  // ===== RESTORE SAVED ANSWERS =====
  // Fix for back button issue - restore answers from sessionStorage
  function restoreSavedAnswers() {
    const savedAnswers = valuationData.assessmentAnswers;
    if (!savedAnswers || Object.keys(savedAnswers).length === 0) {
      return;
    }

    if (window.Logger) {
      window.Logger.log('Restoring saved assessment answers:', savedAnswers);
    }

    // Restore each answer
    Object.entries(savedAnswers).forEach(([questionId, answer]) => {
      // Update userAnswers state
      userAnswers[questionId] = answer;

      // Find and check the corresponding radio button
      const radio = document.querySelector(`input[name="${questionId}"][value="${answer}"]`);
      if (radio) {
        radio.checked = true;

        // Update visual state - add selected class to the parent label
        const questionItem = radio.closest('.question-item');
        if (questionItem) {
          questionItem.querySelectorAll('.radio-option-box').forEach(box => {
            box.classList.remove('selected');
          });
          radio.closest('.radio-option-box').classList.add('selected');
        }
      }
    });

    // Update sidebar and price
    calculatePriceAndStore();
    updateEvaluationSidebar();
  }

  // Initial render
  if (questions && questions.length > 0) {
    renderQuestions();
    restoreSavedAnswers(); // Restore answers after rendering
    updateProceedVisibility();
  } else {
    // Fallback: If no questions loaded, show error
    if (questionsContainer) {
      questionsContainer.innerHTML = `
        <div style="padding: 20px; text-align: center; color: var(--danger);">
          <p><strong>Error loading assessment questions.</strong></p>
          <p>Please <a href="index.html" style="color: var(--brand);">go back to homepage</a> and try again.</p>
          <p style="font-size: 12px; color: var(--muted); margin-top: 10px;">
            Debug: Category = "${category}", 
            Questions Available = ${window.getAssessmentQuestions ? 'Yes' : 'No'}
          </p>
        </div>
      `;
    }
  }
});
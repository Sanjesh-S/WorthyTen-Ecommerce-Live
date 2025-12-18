// js/category-config.js
// Category-specific configuration for questions, accessories, and physical conditions
// NOTE: Deduction values are now stored in Firestore productPricing collection, managed via admin dashboard

const categoryConfig = {
  'DSLR/Lens': {
    displayName: "DSLR/Lens",

    // Assessment questions for cameras (deductions handled by Firestore productPricing)
    assessmentQuestions: [
      {
        id: 'powerOn',
        text: 'Does your camera power on and function properly?',
        instruction: 'We currently only accept devices that switch on'
      },
      {
        id: 'bodyDamage',
        text: 'Is the camera body free from major damage (cracks, dents, water damage)?',
        instruction: 'Check your device\'s body or buttons condition carefully'
      },
      {
        id: 'lcdScreen',
        text: 'Is the LCD/Touchscreen working without cracks or display issues?',
        instruction: 'Check your device\'s display condition carefully'
      },
      {
        id: 'lensCondition',
        text: 'Is the lens (if included) free from scratches, fungus, or dust?',
        instruction: 'Check your lens condition carefully'
      },
      {
        id: 'autofocusZoom',
        text: 'Does autofocus and zoom work properly on your camera/lens?',
        instruction: 'Check your device\'s autofocus and zoom functionality carefully'
      },
      {
        id: 'hasAdditionalLens',
        text: 'Do you have any additional lens?',
        instruction: 'Choose this option if you have additional lens of the same brand',
        isLensQuestion: true
      }
    ],

    // Physical condition categories for cameras (deductions handled by Firestore productPricing)
    physicalConditions: {
      display: [
        { id: 'display_excellent', label: 'Excellent - No scratches', icon: 'fa-solid fa-display text-success' },
        { id: 'display_good', label: 'Good - Minor scratches', icon: 'fa-solid fa-check-circle text-info' },
        { id: 'display_fair', label: 'Fair - Visible scratches', icon: 'fa-solid fa-exclamation-circle text-warning' },
        { id: 'display_cracked', label: 'Cracked/Broken Display', icon: 'fa-solid fa-times-circle text-danger' }
      ],
      body: [
        { id: 'body_excellent', label: 'Excellent - Like New', icon: 'fa-solid fa-camera text-success' },
        { id: 'body_good', label: 'Good - Minor wear', icon: 'fa-solid fa-camera text-info' },
        { id: 'body_fair', label: 'Fair - Visible scratches/dents', icon: 'fa-solid fa-camera text-warning' },
        { id: 'body_poor', label: 'Poor - Heavy damage', icon: 'fa-solid fa-camera text-danger' }
      ],
      error: [
        { id: 'error_none', label: 'No Error Messages', icon: 'fa-solid fa-circle-check text-success' },
        { id: 'error_minor', label: 'Minor Errors (occasionally)', icon: 'fa-solid fa-exclamation-triangle text-warning' },
        { id: 'error_frequent', label: 'Frequent Error Messages', icon: 'fa-solid fa-bug text-danger' },
        { id: 'error_no_lens', label: 'Without Lens Error Condition', icon: 'fa-solid fa-eye-slash text-muted' }
      ],
      lens: [
        { id: 'lense_good', label: 'Good Condition', icon: 'fa-solid fa-circle text-success' },
        { id: 'lense_focus_issue', label: 'Auto Focus/ Manual Focus Issue', icon: 'fa-solid fa-bullseye text-warning' },
        { id: 'lense_fungus', label: 'Fungus issue', icon: 'fa-solid fa-virus text-danger' },
        { id: 'lense_scratches', label: 'Scratches', icon: 'fa-solid fa-slash text-warning' }
      ]
    },

    // Accessories for cameras (bonuses handled by Firestore productPricing)
    accessories: [
      { id: 'adapter', label: 'Original Adapter', img: 'images/acc-adapter.svg' },
      { id: 'battery', label: 'Original Battery', img: 'images/acc-battery.svg' },
      { id: 'box', label: 'Original Box', img: 'images/acc-box.svg' },
      { id: 'bag', label: 'Original Bag', img: 'images/acc-bag.svg' },
      { id: 'cable', label: 'Original Cable', img: 'images/acc-cable.svg' },
      { id: 'tripod', label: 'Original Tripod', img: 'images/acc-tripod.svg' },
      { id: 'manual', label: 'Original Manual', img: 'images/acc-manual.svg' }
    ]
  },

  Phone: {
    displayName: "Phone",

    // Assessment questions for phones (deductions handled by Firestore productPricing)
    assessmentQuestions: [
      {
        id: 'powerOn',
        text: 'Does your phone power on and function properly?',
        instruction: 'We currently only accept devices that switch on'
      },
      {
        id: 'screenCondition',
        text: 'Is the screen working without cracks or touch issues?',
        instruction: 'Check for any cracks, dead spots, or unresponsive areas'
      },
      {
        id: 'bodyDamage',
        text: 'Is the phone body/frame free from major damage or bending?',
        instruction: 'Check the frame, back panel, and edges carefully'
      },
      {
        id: 'batteryHealth',
        text: 'Is the battery health above 80%?',
        instruction: 'Check Settings > Battery > Battery Health (iPhone)'
      },
      {
        id: 'faceIDTouchID',
        text: 'Is Face ID / Touch ID working properly?',
        instruction: 'Test Face ID or Touch ID functionality'
      },
      {
        id: 'camerasFunctional',
        text: 'Are all cameras (front and back) working properly?',
        instruction: 'Test all camera lenses for clarity and focus'
      },
      {
        id: 'waterDamage',
        text: 'Is the phone free from water damage?',
        instruction: 'Check water damage indicators (usually in SIM tray)'
      }
    ],

    // Physical condition categories for phones (deductions handled by Firestore productPricing)
    physicalConditions: {
      display: [
        { id: 'display_flawless', label: 'Flawless - No scratches', img: 'images/phone-display-excellent.svg' },
        { id: 'display_minor', label: 'Minor scratches', img: 'images/phone-display-good.svg' },
        { id: 'display_visible', label: 'Visible scratches', img: 'images/phone-display-fair.svg' },
        { id: 'display_cracked', label: 'Cracked screen', img: 'images/phone-display-cracked.svg' }
      ],
      body: [
        { id: 'body_pristine', label: 'Pristine - Like new', img: 'images/phone-body-excellent.svg' },
        { id: 'body_light', label: 'Light wear/scratches', img: 'images/phone-body-good.svg' },
        { id: 'body_moderate', label: 'Moderate scratches/dents', img: 'images/phone-body-fair.svg' },
        { id: 'body_heavy', label: 'Heavy damage/dents', img: 'images/phone-body-poor.svg' }
      ],
      frame: [
        { id: 'frame_perfect', label: 'Perfect condition', img: 'images/phone-frame-excellent.svg' },
        { id: 'frame_minor', label: 'Minor scuffs', img: 'images/phone-frame-good.svg' },
        { id: 'frame_visible', label: 'Visible scratches', img: 'images/phone-frame-fair.svg' },
        { id: 'frame_damaged', label: 'Bent/Damaged frame', img: 'images/phone-frame-poor.svg' }
      ]
    },

    // Accessories for phones (bonuses handled by Firestore productPricing)
    accessories: [
      { id: 'box', label: 'Original Box', img: 'images/acc-box.svg' },
      { id: 'charger', label: 'Original Charger', img: 'images/acc-charger.svg' },
      { id: 'cable', label: 'Original Cable', img: 'images/acc-cable.svg' },
      { id: 'earphones', label: 'Original EarPods/AirPods', img: 'images/acc-earphones.svg' },
      { id: 'case', label: 'Phone Case', img: 'images/acc-case.svg' },
      { id: 'screen_protector', label: 'Screen Protector (Applied)', img: 'images/acc-screen-protector.svg' }
    ]
  },

  Laptop: {
    displayName: "Laptop",

    // Assessment questions for laptops (deductions handled by Firestore productPricing)
    assessmentQuestions: [
      {
        id: 'powerOn',
        text: 'Does your laptop power on and boot properly?',
        instruction: 'We currently only accept devices that switch on'
      },
      {
        id: 'screenCondition',
        text: 'Is the screen free from dead pixels, backlight issues, or cracks?',
        instruction: 'Check the display carefully under different backgrounds'
      },
      {
        id: 'keyboardTrackpad',
        text: 'Are the keyboard and trackpad fully functional?',
        instruction: 'Test all keys and trackpad gestures'
      },
      {
        id: 'bodyDamage',
        text: 'Is the laptop body/chassis free from major damage or dents?',
        instruction: 'Check the lid, base, and hinges carefully'
      },
      {
        id: 'batteryCycles',
        text: 'Is the battery cycle count under 300?',
        instruction: 'Check About This Mac > System Report > Power (Mac)'
      },
      {
        id: 'portsFunctional',
        text: 'Are all ports (USB, Thunderbolt, etc.) working properly?',
        instruction: 'Test all available ports with accessories'
      },
      {
        id: 'chargingWorks',
        text: 'Does the laptop charge properly?',
        instruction: 'Test charging functionality'
      }
    ],

    // Physical condition categories for laptops (deductions handled by Firestore productPricing)
    physicalConditions: {
      display: [
        { id: 'display_perfect', label: 'Perfect - No issues', img: 'images/laptop-display-excellent.svg' },
        { id: 'display_minor', label: 'Minor scratches/marks', img: 'images/laptop-display-good.svg' },
        { id: 'display_spots', label: 'Dead pixels/bright spots', img: 'images/laptop-display-fair.svg' },
        { id: 'display_damaged', label: 'Cracked/Damaged screen', img: 'images/laptop-display-cracked.svg' }
      ],
      body: [
        { id: 'body_mint', label: 'Mint condition', img: 'images/laptop-body-excellent.svg' },
        { id: 'body_light', label: 'Light wear', img: 'images/laptop-body-good.svg' },
        { id: 'body_moderate', label: 'Moderate scratches/dents', img: 'images/laptop-body-fair.svg' },
        { id: 'body_heavy', label: 'Heavy damage/dents', img: 'images/laptop-body-poor.svg' }
      ],
      keyboard: [
        { id: 'keyboard_perfect', label: 'All keys perfect', img: 'images/laptop-keyboard-excellent.svg' },
        { id: 'keyboard_shine', label: 'Key shine/wear', img: 'images/laptop-keyboard-good.svg' },
        { id: 'keyboard_sticky', label: 'Some sticky/loose keys', img: 'images/laptop-keyboard-fair.svg' },
        { id: 'keyboard_broken', label: 'Broken/missing keys', img: 'images/laptop-keyboard-poor.svg' }
      ]
    },

    // Accessories for laptops (bonuses handled by Firestore productPricing)
    accessories: [
      { id: 'box', label: 'Original Box', img: 'images/acc-box.svg' },
      { id: 'charger', label: 'Original Charger', img: 'images/acc-charger.svg' },
      { id: 'cable', label: 'Original Cable', img: 'images/acc-cable.svg' },
      { id: 'sleeve', label: 'Laptop Sleeve/Bag', img: 'images/acc-sleeve.svg' },
      { id: 'packaging', label: 'Original Packaging (Complete)', img: 'images/acc-packaging.svg' },
      { id: 'applecare', label: 'Active AppleCare+', img: 'images/acc-applecare.svg' }
    ]
  },

  iPad: {
    displayName: "iPad",

    // Assessment questions for iPads (deductions handled by Firestore productPricing)
    assessmentQuestions: [
      {
        id: 'powerOn',
        text: 'Does your iPad power on and function properly?',
        instruction: 'We currently only accept devices that switch on'
      },
      {
        id: 'screenCondition',
        text: 'Is the screen working without cracks or touch issues?',
        instruction: 'Check for any cracks, dead spots, or unresponsive areas'
      },
      {
        id: 'bodyDamage',
        text: 'Is the iPad body free from major damage (bends, dents)?',
        instruction: 'Check the aluminum body and edges carefully'
      },
      {
        id: 'batteryHealth',
        text: 'Is the battery health above 80%?',
        instruction: 'Check Settings > Battery > Battery Health (if available)'
      },
      {
        id: 'portsFunctional',
        text: 'Is the charging port (Lightning/USB-C) working properly?',
        instruction: 'Test charging functionality'
      },
      {
        id: 'camerasFunctional',
        text: 'Are all cameras (front and back) working properly?',
        instruction: 'Test all camera lenses for clarity and focus'
      },
      {
        id: 'applePencilSupport',
        text: 'Does Apple Pencil work with your iPad (if supported)?',
        instruction: 'Test Apple Pencil pairing and drawing'
      }
    ],

    // Physical condition categories for iPads (deductions handled by Firestore productPricing)
    physicalConditions: {
      display: [
        { id: 'display_flawless', label: 'Flawless - No scratches', img: 'images/ipad-display-excellent.svg' },
        { id: 'display_minor', label: 'Minor scratches', img: 'images/ipad-display-good.svg' },
        { id: 'display_visible', label: 'Visible scratches', img: 'images/ipad-display-fair.svg' },
        { id: 'display_cracked', label: 'Cracked screen', img: 'images/ipad-display-cracked.svg' }
      ],
      body: [
        { id: 'body_pristine', label: 'Pristine - Like new', img: 'images/ipad-body-excellent.svg' },
        { id: 'body_light', label: 'Light wear/scratches', img: 'images/ipad-body-good.svg' },
        { id: 'body_moderate', label: 'Moderate scratches/dents', img: 'images/ipad-body-fair.svg' },
        { id: 'body_heavy', label: 'Heavy damage/bent', img: 'images/ipad-body-poor.svg' }
      ],
      ports: [
        { id: 'ports_perfect', label: 'Port works perfectly', img: 'images/ipad-ports-excellent.svg' },
        { id: 'ports_loose', label: 'Slightly loose connection', img: 'images/ipad-ports-good.svg' },
        { id: 'ports_intermittent', label: 'Intermittent charging', img: 'images/ipad-ports-fair.svg' },
        { id: 'ports_broken', label: 'Port not working', img: 'images/ipad-ports-poor.svg' }
      ]
    },

    // Accessories for iPads (bonuses handled by Firestore productPricing)
    accessories: [
      { id: 'box', label: 'Original Box', img: 'images/acc-box.svg' },
      { id: 'charger', label: 'Original Charger', img: 'images/acc-charger.svg' },
      { id: 'cable', label: 'Original Cable', img: 'images/acc-cable.svg' },
      { id: 'apple_pencil', label: 'Apple Pencil', img: 'images/acc-apple-pencil.svg' },
      { id: 'magic_keyboard', label: 'Magic Keyboard', img: 'images/acc-keyboard.svg' },
      { id: 'smart_folio', label: 'Smart Folio/Case', img: 'images/acc-case.svg' },
      { id: 'applecare', label: 'Active AppleCare+', img: 'images/acc-applecare.svg' }
    ]
  }
};

/**
 * Get configuration for a specific category
 * @param {string} category - Category name (DSLR/Lens, Phone, Laptop)
 * @returns {Object} Category configuration or null if not found
 */
function getCategoryConfig(category) {
  if (!category) {
    console.warn('getCategoryConfig: category is missing');
    return null;
  }

  // Handle special category names
  if (category === 'DSLR Cameras' || category === 'DSLR Camera' || category === 'DSLR/Lens') {
    return categoryConfig['DSLR/Lens'];
  }

  // Normalize category name
  const normalizedCategory = category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();

  if (!categoryConfig[normalizedCategory]) {
    console.warn(`getCategoryConfig: Category "${normalizedCategory}" not found`);
    return null;
  }

  return categoryConfig[normalizedCategory];
}

/**
 * Get assessment questions for a category
 * @param {string} category - Category name
 * @returns {Array} Array of question objects
 */
function getAssessmentQuestions(category) {
  const config = getCategoryConfig(category);
  return config ? config.assessmentQuestions : [];
}

/**
 * Get physical conditions for a category
 * @param {string} category - Category name
 * @returns {Object} Object with condition categories
 */
function getPhysicalConditions(category) {
  const config = getCategoryConfig(category);
  return config ? config.physicalConditions : {};
}

/**
 * Get accessories for a category
 * @param {string} category - Category name
 * @returns {Array} Array of accessory objects
 */
function getAccessories(category) {
  const config = getCategoryConfig(category);
  return config ? config.accessories : [];
}

/**
 * Check if category supports lens selection
 * @param {string} category - Category name
 * @returns {boolean} True if category supports lens selection
 */
function supportsLensSelection(category) {
  return category === 'DSLR/Lens' || category === 'DSLR Cameras' || category === 'DSLR Camera' || category === 'Camera' || category === 'Cameras' || category === 'DSLR';
}

// Export globally
window.categoryConfig = categoryConfig;
window.getCategoryConfig = getCategoryConfig;
window.getAssessmentQuestions = getAssessmentQuestions;
window.getPhysicalConditions = getPhysicalConditions;
window.getAccessories = getAccessories;
window.supportsLensSelection = supportsLensSelection;

console.log('Category configuration loaded for:', Object.keys(categoryConfig).join(', '));

// Also support "Camera" and "DSLR Cameras" as aliases for backward compatibility
if (!categoryConfig['Camera']) {
  categoryConfig['Camera'] = categoryConfig['DSLR/Lens'];
}
if (!categoryConfig['DSLR Cameras']) {
  categoryConfig['DSLR Cameras'] = categoryConfig['DSLR/Lens'];
}

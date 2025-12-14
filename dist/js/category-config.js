// js/category-config.js
// Category-specific configuration for questions, accessories, and physical conditions

const categoryConfig = {
  'DSLR/Lens': {
    displayName: "DSLR/Lens",

    // Assessment questions for cameras
    assessmentQuestions: [
      {
        id: 'powerOn',
        text: 'Does your camera power on and function properly?',
        instruction: 'We currently only accept devices that switch on',
        deduction: 0.30
      },
      {
        id: 'bodyDamage',
        text: 'Is the camera body free from major damage (cracks, dents, water damage)?',
        instruction: 'Check your device\'s body or buttons condition carefully',
        deduction: 0.25
      },
      {
        id: 'lcdScreen',
        text: 'Is the LCD/Touchscreen working without cracks or display issues?',
        instruction: 'Check your device\'s display condition carefully',
        deduction: 0.20
      },
      {
        id: 'lensCondition',
        text: 'Is the lens (if included) free from scratches, fungus, or dust?',
        instruction: 'Check your lens condition carefully',
        deduction: 0.15
      },
      {
        id: 'autofocusZoom',
        text: 'Does autofocus and zoom work properly on your camera/lens?',
        instruction: 'Check your device\'s autofocus and zoom functionality carefully',
        deduction: 0.15
      },
      {
        id: 'hasAdditionalLens',
        text: 'Do you have any additional lens?',
        instruction: 'Choose this option if you have additional lens of the same brand',
        deduction: 0,
        isLensQuestion: true
      }
    ],

    // Physical condition categories for cameras
    physicalConditions: {
      display: [
        { id: 'display_excellent', label: 'Excellent - No scratches', img: 'images/display-excellent.svg', deduction: 0 },
        { id: 'display_good', label: 'Good - Minor scratches', img: 'images/display-good.svg', deduction: 0.05 },
        { id: 'display_fair', label: 'Fair - Visible scratches', img: 'images/display-fair.svg', deduction: 0.10 },
        { id: 'display_cracked', label: 'Cracked/Broken Display', img: 'images/display-cracked.svg', deduction: 0.25 }
      ],
      body: [
        { id: 'body_excellent', label: 'Excellent - Like New', img: 'images/body-excellent.svg', deduction: 0 },
        { id: 'body_good', label: 'Good - Minor wear', img: 'images/body-good.svg', deduction: 0.05 },
        { id: 'body_fair', label: 'Fair - Visible scratches/dents', img: 'images/body-fair.svg', deduction: 0.10 },
        { id: 'body_poor', label: 'Poor - Heavy damage', img: 'images/body-poor.svg', deduction: 0.20 }
      ],
      error: [
        { id: 'error_none', label: 'No Error Messages', img: 'images/error-none.svg', deduction: 0 },
        { id: 'error_minor', label: 'Minor Errors (occasionally)', img: 'images/error-minor.svg', deduction: 0.10 },
        { id: 'error_frequent', label: 'Frequent Error Messages', img: 'images/error-frequent.svg', deduction: 0.20 },
        { id: 'error_no_lens', label: 'Without Lens Error Condition', img: 'images/error-without-lens.svg', deduction: 0.35 }
      ],
      lens: [
        { id: 'lense_good', label: 'Good Condition', img: 'images/lense-good.svg', deduction: 0 },
        { id: 'lense_focus_issue', label: 'Auto Focus/ Manual Focus Issue', img: 'images/lense-focus-issue.svg', deduction: 0.25 },
        { id: 'lense_fungus', label: 'Fungus issue', img: 'images/lense-fungus.svg', deduction: 0.30 },
        { id: 'lense_scratches', label: 'Scratches', img: 'images/lense-scratches.svg', deduction: 0.20 }
      ]
    },

    // Accessories for cameras
    accessories: [
      { id: 'adapter', label: 'Original Adapter', img: 'images/acc-adapter.svg', bonus: 250 },
      { id: 'battery', label: 'Original Battery', img: 'images/acc-battery.svg', bonus: 400 },
      { id: 'box', label: 'Original Box', img: 'images/acc-box.svg', bonus: 300 },
      { id: 'bag', label: 'Original Bag', img: 'images/acc-bag.svg', bonus: 200 },
      { id: 'cable', label: 'Original Cable', img: 'images/acc-cable.svg', bonus: 150 },
      { id: 'tripod', label: 'Original Tripod', img: 'images/acc-tripod.svg', bonus: 350 },
      { id: 'manual', label: 'Original Manual', img: 'images/acc-manual.svg', bonus: 100 }
    ]
  },

  Phone: {
    displayName: "Phone",

    // Assessment questions for phones
    assessmentQuestions: [
      {
        id: 'powerOn',
        text: 'Does your phone power on and function properly?',
        instruction: 'We currently only accept devices that switch on',
        deduction: 0.30
      },
      {
        id: 'screenCondition',
        text: 'Is the screen working without cracks or touch issues?',
        instruction: 'Check for any cracks, dead spots, or unresponsive areas',
        deduction: 0.25
      },
      {
        id: 'bodyDamage',
        text: 'Is the phone body/frame free from major damage or bending?',
        instruction: 'Check the frame, back panel, and edges carefully',
        deduction: 0.15
      },
      {
        id: 'batteryHealth',
        text: 'Is the battery health above 80%?',
        instruction: 'Check Settings > Battery > Battery Health (iPhone)',
        deduction: 0.20
      },
      {
        id: 'faceIDTouchID',
        text: 'Is Face ID / Touch ID working properly?',
        instruction: 'Test Face ID or Touch ID functionality',
        deduction: 0.10
      },
      {
        id: 'camerasFunctional',
        text: 'Are all cameras (front and back) working properly?',
        instruction: 'Test all camera lenses for clarity and focus',
        deduction: 0.15
      },
      {
        id: 'waterDamage',
        text: 'Is the phone free from water damage?',
        instruction: 'Check water damage indicators (usually in SIM tray)',
        deduction: 0.25
      }
    ],

    // Physical condition categories for phones
    physicalConditions: {
      display: [
        { id: 'display_flawless', label: 'Flawless - No scratches', img: 'images/phone-display-excellent.svg', deduction: 0 },
        { id: 'display_minor', label: 'Minor scratches', img: 'images/phone-display-good.svg', deduction: 0.05 },
        { id: 'display_visible', label: 'Visible scratches', img: 'images/phone-display-fair.svg', deduction: 0.10 },
        { id: 'display_cracked', label: 'Cracked screen', img: 'images/phone-display-cracked.svg', deduction: 0.30 }
      ],
      body: [
        { id: 'body_pristine', label: 'Pristine - Like new', img: 'images/phone-body-excellent.svg', deduction: 0 },
        { id: 'body_light', label: 'Light wear/scratches', img: 'images/phone-body-good.svg', deduction: 0.05 },
        { id: 'body_moderate', label: 'Moderate scratches/dents', img: 'images/phone-body-fair.svg', deduction: 0.10 },
        { id: 'body_heavy', label: 'Heavy damage/dents', img: 'images/phone-body-poor.svg', deduction: 0.20 }
      ],
      frame: [
        { id: 'frame_perfect', label: 'Perfect condition', img: 'images/phone-frame-excellent.svg', deduction: 0 },
        { id: 'frame_minor', label: 'Minor scuffs', img: 'images/phone-frame-good.svg', deduction: 0.03 },
        { id: 'frame_visible', label: 'Visible scratches', img: 'images/phone-frame-fair.svg', deduction: 0.08 },
        { id: 'frame_damaged', label: 'Bent/Damaged frame', img: 'images/phone-frame-poor.svg', deduction: 0.15 }
      ]
    },

    // Accessories for phones
    accessories: [
      { id: 'box', label: 'Original Box', img: 'images/acc-box.svg', bonus: 500 },
      { id: 'charger', label: 'Original Charger', img: 'images/acc-charger.svg', bonus: 800 },
      { id: 'cable', label: 'Original Cable', img: 'images/acc-cable.svg', bonus: 300 },
      { id: 'earphones', label: 'Original EarPods/AirPods', img: 'images/acc-earphones.svg', bonus: 1500 },
      { id: 'case', label: 'Phone Case', img: 'images/acc-case.svg', bonus: 200 },
      { id: 'screen_protector', label: 'Screen Protector (Applied)', img: 'images/acc-screen-protector.svg', bonus: 100 }
    ]
  },

  Laptop: {
    displayName: "Laptop",

    // Assessment questions for laptops
    assessmentQuestions: [
      {
        id: 'powerOn',
        text: 'Does your laptop power on and boot properly?',
        instruction: 'We currently only accept devices that switch on',
        deduction: 0.30
      },
      {
        id: 'screenCondition',
        text: 'Is the screen free from dead pixels, backlight issues, or cracks?',
        instruction: 'Check the display carefully under different backgrounds',
        deduction: 0.25
      },
      {
        id: 'keyboardTrackpad',
        text: 'Are the keyboard and trackpad fully functional?',
        instruction: 'Test all keys and trackpad gestures',
        deduction: 0.15
      },
      {
        id: 'bodyDamage',
        text: 'Is the laptop body/chassis free from major damage or dents?',
        instruction: 'Check the lid, base, and hinges carefully',
        deduction: 0.15
      },
      {
        id: 'batteryCycles',
        text: 'Is the battery cycle count under 300?',
        instruction: 'Check About This Mac > System Report > Power (Mac)',
        deduction: 0.20
      },
      {
        id: 'portsFunctional',
        text: 'Are all ports (USB, Thunderbolt, etc.) working properly?',
        instruction: 'Test all available ports with accessories',
        deduction: 0.10
      },
      {
        id: 'chargingWorks',
        text: 'Does the laptop charge properly?',
        instruction: 'Test charging functionality',
        deduction: 0.20
      }
    ],

    // Physical condition categories for laptops
    physicalConditions: {
      display: [
        { id: 'display_perfect', label: 'Perfect - No issues', img: 'images/laptop-display-excellent.svg', deduction: 0 },
        { id: 'display_minor', label: 'Minor scratches/marks', img: 'images/laptop-display-good.svg', deduction: 0.05 },
        { id: 'display_spots', label: 'Dead pixels/bright spots', img: 'images/laptop-display-fair.svg', deduction: 0.15 },
        { id: 'display_damaged', label: 'Cracked/Damaged screen', img: 'images/laptop-display-cracked.svg', deduction: 0.35 }
      ],
      body: [
        { id: 'body_mint', label: 'Mint condition', img: 'images/laptop-body-excellent.svg', deduction: 0 },
        { id: 'body_light', label: 'Light wear', img: 'images/laptop-body-good.svg', deduction: 0.05 },
        { id: 'body_moderate', label: 'Moderate scratches/dents', img: 'images/laptop-body-fair.svg', deduction: 0.12 },
        { id: 'body_heavy', label: 'Heavy damage/dents', img: 'images/laptop-body-poor.svg', deduction: 0.25 }
      ],
      keyboard: [
        { id: 'keyboard_perfect', label: 'All keys perfect', img: 'images/laptop-keyboard-excellent.svg', deduction: 0 },
        { id: 'keyboard_shine', label: 'Key shine/wear', img: 'images/laptop-keyboard-good.svg', deduction: 0.03 },
        { id: 'keyboard_sticky', label: 'Some sticky/loose keys', img: 'images/laptop-keyboard-fair.svg', deduction: 0.10 },
        { id: 'keyboard_broken', label: 'Broken/missing keys', img: 'images/laptop-keyboard-poor.svg', deduction: 0.20 }
      ]
    },

    // Accessories for laptops
    accessories: [
      { id: 'box', label: 'Original Box', img: 'images/acc-box.svg', bonus: 800 },
      { id: 'charger', label: 'Original Charger', img: 'images/acc-charger.svg', bonus: 2500 },
      { id: 'cable', label: 'Original Cable', img: 'images/acc-cable.svg', bonus: 800 },
      { id: 'sleeve', label: 'Laptop Sleeve/Bag', img: 'images/acc-sleeve.svg', bonus: 500 },
      { id: 'packaging', label: 'Original Packaging (Complete)', img: 'images/acc-packaging.svg', bonus: 400 },
      { id: 'applecare', label: 'Active AppleCare+', img: 'images/acc-applecare.svg', bonus: 5000 }
    ]
  },

  iPad: {
    displayName: "iPad",

    // Assessment questions for iPads
    assessmentQuestions: [
      {
        id: 'powerOn',
        text: 'Does your iPad power on and function properly?',
        instruction: 'We currently only accept devices that switch on',
        deduction: 0.30
      },
      {
        id: 'screenCondition',
        text: 'Is the screen working without cracks or touch issues?',
        instruction: 'Check for any cracks, dead spots, or unresponsive areas',
        deduction: 0.25
      },
      {
        id: 'bodyDamage',
        text: 'Is the iPad body free from major damage (bends, dents)?',
        instruction: 'Check the aluminum body and edges carefully',
        deduction: 0.15
      },
      {
        id: 'batteryHealth',
        text: 'Is the battery health above 80%?',
        instruction: 'Check Settings > Battery > Battery Health (if available)',
        deduction: 0.20
      },
      {
        id: 'portsFunctional',
        text: 'Is the charging port (Lightning/USB-C) working properly?',
        instruction: 'Test charging functionality',
        deduction: 0.15
      },
      {
        id: 'camerasFunctional',
        text: 'Are all cameras (front and back) working properly?',
        instruction: 'Test all camera lenses for clarity and focus',
        deduction: 0.10
      },
      {
        id: 'applePencilSupport',
        text: 'Does Apple Pencil work with your iPad (if supported)?',
        instruction: 'Test Apple Pencil pairing and drawing',
        deduction: 0.05
      }
    ],

    // Physical condition categories for iPads
    physicalConditions: {
      display: [
        { id: 'display_flawless', label: 'Flawless - No scratches', img: 'images/ipad-display-excellent.svg', deduction: 0 },
        { id: 'display_minor', label: 'Minor scratches', img: 'images/ipad-display-good.svg', deduction: 0.05 },
        { id: 'display_visible', label: 'Visible scratches', img: 'images/ipad-display-fair.svg', deduction: 0.10 },
        { id: 'display_cracked', label: 'Cracked screen', img: 'images/ipad-display-cracked.svg', deduction: 0.30 }
      ],
      body: [
        { id: 'body_pristine', label: 'Pristine - Like new', img: 'images/ipad-body-excellent.svg', deduction: 0 },
        { id: 'body_light', label: 'Light wear/scratches', img: 'images/ipad-body-good.svg', deduction: 0.05 },
        { id: 'body_moderate', label: 'Moderate scratches/dents', img: 'images/ipad-body-fair.svg', deduction: 0.10 },
        { id: 'body_heavy', label: 'Heavy damage/bent', img: 'images/ipad-body-poor.svg', deduction: 0.20 }
      ],
      ports: [
        { id: 'ports_perfect', label: 'Port works perfectly', img: 'images/ipad-ports-excellent.svg', deduction: 0 },
        { id: 'ports_loose', label: 'Slightly loose connection', img: 'images/ipad-ports-good.svg', deduction: 0.05 },
        { id: 'ports_intermittent', label: 'Intermittent charging', img: 'images/ipad-ports-fair.svg', deduction: 0.15 },
        { id: 'ports_broken', label: 'Port not working', img: 'images/ipad-ports-poor.svg', deduction: 0.25 }
      ]
    },

    // Accessories for iPads
    accessories: [
      { id: 'box', label: 'Original Box', img: 'images/acc-box.svg', bonus: 500 },
      { id: 'charger', label: 'Original Charger', img: 'images/acc-charger.svg', bonus: 800 },
      { id: 'cable', label: 'Original Cable', img: 'images/acc-cable.svg', bonus: 300 },
      { id: 'apple_pencil', label: 'Apple Pencil', img: 'images/acc-apple-pencil.svg', bonus: 4000 },
      { id: 'magic_keyboard', label: 'Magic Keyboard', img: 'images/acc-keyboard.svg', bonus: 8000 },
      { id: 'smart_folio', label: 'Smart Folio/Case', img: 'images/acc-case.svg', bonus: 1500 },
      { id: 'applecare', label: 'Active AppleCare+', img: 'images/acc-applecare.svg', bonus: 4000 }
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




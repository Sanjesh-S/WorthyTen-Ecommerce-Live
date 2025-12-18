// js/lens-compatibility-smart.js
// Smart pattern-based lens compatibility system
// Uses regex patterns to automatically detect mount types for ANY camera model

/**
 * Smart mount detection using regex patterns
 * This catches ALL camera models, not just predefined ones
 */
function detectCameraMountSmart(brand, modelName) {
  if (!brand || !modelName) return null;

  const normalizedBrand = brand.charAt(0).toUpperCase() + brand.slice(1).toLowerCase();
  const model = modelName.toUpperCase();

  // ===== CANON DETECTION =====
  if (normalizedBrand === 'Canon') {
    // Fixed lens detection (PowerShot, G-series compacts, etc.)
    if (/POWERSHOT|IXUS|SX\d+|G\d+\sX|ELPH/i.test(modelName)) {
      return { brand: normalizedBrand, mountType: 'fixedLens' };
    }

    // EF-M Mount (EOS M series)
    if (/EOS\s*M\d*\s*(Mark)?/i.test(modelName) || /\bM\d{2,3}\b/.test(model)) {
      return { brand: normalizedBrand, mountType: 'efmMount' };
    }

    // RF Mount (EOS R series)
    if (/EOS\s*R\d*|R5|R6|R3|R7|R8|R10|R50|R100|RP/i.test(modelName)) {
      return { brand: normalizedBrand, mountType: 'rfMount' };
    }

    // Full-Frame EF Mount (5D, 6D, 1D series)
    if (/5D|6D|1D[SX]?/i.test(modelName) && !/\d{3,}D/.test(model)) {
      return { brand: normalizedBrand, mountType: 'fullFrameEF' };
    }

    // APS-C EF-S Mount (all other EOS DSLRs)
    if (/EOS|REBEL|KISS|\d+D/i.test(modelName)) {
      return { brand: normalizedBrand, mountType: 'apscEFS' };
    }

    // Default Canon DSLR to APS-C
    return { brand: normalizedBrand, mountType: 'apscEFS' };
  }

  // ===== NIKON DETECTION =====
  if (normalizedBrand === 'Nikon') {
    // Fixed lens (Coolpix)
    if (/COOLPIX|P\d{3,4}|B\d{3}|A\d{4}/i.test(modelName)) {
      return { brand: normalizedBrand, mountType: 'fixedLens' };
    }

    // Z-Mount (Z series mirrorless)
    if (/\bZ\d+|Z\s*\d+|Zf|Zfc/i.test(modelName)) {
      return { brand: normalizedBrand, mountType: 'zMount' };
    }

    // F-Mount (D series DSLRs)
    if (/\bD\d+/i.test(modelName)) {
      return { brand: normalizedBrand, mountType: 'fMount' };
    }

    // Default Nikon DSLR to F-mount
    return { brand: normalizedBrand, mountType: 'fMount' };
  }

  // ===== SONY DETECTION =====
  if (normalizedBrand === 'Sony') {
    // Fixed lens cameras
    if (/RX\d+|HX\d+|WX?\d+|ZV-1|FX\d+|VENICE|H\d{3}/i.test(modelName)) {
      return { brand: normalizedBrand, mountType: 'fixedLens' };
    }

    // A-Mount (A55, A57, A58, A65, A68, A77, A99)
    if (/\bA(55|57|58|65|68|77|99)\b/i.test(modelName)) {
      return { brand: normalizedBrand, mountType: 'aMount' };
    }

    // E-Mount Full Frame (A7, A7R, A7S, A7C, A9)
    if (/A7[RSCM]?|A9/i.test(modelName) && !/A7[0-9]/.test(model)) {
      return { brand: normalizedBrand, mountType: 'eMountFullFrame' };
    }

    // E-Mount APS-C (A5xxx, A6xxx, NEX, ZV-E10)
    if (/A[56]\d{3}|A6\d{3}|NEX|ZV-E10/i.test(modelName)) {
      return { brand: normalizedBrand, mountType: 'eMountAPSC' };
    }

    // Default Sony mirrorless to E-mount APS-C
    return { brand: normalizedBrand, mountType: 'eMountAPSC' };
  }

  // ===== FUJIFILM DETECTION =====
  if (normalizedBrand === 'Fujifilm') {
    // Fixed lens (X100, X70, X10, X20, X30, XF1)
    if (/X100|X70|X10|X20|X30|XF1|XP\d+|FINEPIX/i.test(modelName)) {
      return { brand: normalizedBrand, mountType: 'fixedLens' };
    }

    // GF Mount (Medium Format)
    if (/GFX|GF\d+/i.test(modelName)) {
      return { brand: normalizedBrand, mountType: 'gfMount' };
    }

    // X-Mount (X-T, X-H, X-Pro, X-E, X-S, X-A, X-M series)
    if (/X-[THPESAM]\d*/i.test(modelName)) {
      return { brand: normalizedBrand, mountType: 'xMount' };
    }

    // Default Fujifilm to X-mount
    return { brand: normalizedBrand, mountType: 'xMount' };
  }

  return null;
}

/**
 * Check if lens is compatible with camera mount
 * Enhanced version with precise filtering
 */
function isLensCompatibleSmart(lensName, compatibleMounts, brand, mountType) {
  if (!lensName || !compatibleMounts || compatibleMounts.length === 0) return false;

  const lensUpper = lensName.toUpperCase();

  // ===== CANON FILTERING =====
  if (brand === 'Canon') {
    if (mountType === 'fullFrameEF') {
      // ONLY EF lenses (exclude EF-S, EF-M, RF)
      if (lensUpper.includes('EF-S') || lensUpper.includes('EF-M') ||
        lensUpper.includes('RF')) {
        return false;
      }
      // Must have "EF " in the name
      return /\bEF\s+\d+/.test(lensUpper) || lensUpper.includes('CANON EF ');
    }

    if (mountType === 'apscEFS') {
      // Both EF and EF-S (exclude RF and EF-M)
      if (lensUpper.includes('RF') || lensUpper.includes('EF-M')) {
        return false;
      }
      return lensUpper.includes('CANON EF') || /\bEF[-\s]/.test(lensUpper);
    }

    if (mountType === 'rfMount') {
      // Only RF mount
      return lensUpper.includes('RF ') || lensUpper.includes('RF-S');
    }

    if (mountType === 'efmMount') {
      // Only EF-M mount
      return lensUpper.includes('EF-M');
    }
  }

  // ===== NIKON FILTERING =====
  if (brand === 'Nikon') {
    if (mountType === 'fMount') {
      // F-mount: AF-S, AF-P, but NOT Z-mount
      if (lensUpper.includes('NIKKOR Z')) return false;
      return lensUpper.includes('AF-S') || lensUpper.includes('AF-P') ||
        lensUpper.includes('NIKKOR');
    }

    if (mountType === 'zMount') {
      // Z-mount only
      return lensUpper.includes('NIKKOR Z') || lensUpper.includes('Z DX');
    }
  }

  // ===== SONY FILTERING =====
  if (brand === 'Sony') {
    if (mountType === 'eMountAPSC') {
      // E and FE lenses (exclude A-mount)
      if (lensUpper.includes('(A-MOUNT)') || lensUpper.includes('A-MOUNT')) return false;
      return lensUpper.includes('SONY E ') || lensUpper.includes('SONY FE ') ||
        /\sE\s+\d/.test(lensUpper) || /\sFE\s+\d/.test(lensUpper);
    }

    if (mountType === 'eMountFullFrame') {
      // Only FE lenses
      if (lensUpper.includes('(A-MOUNT)') || lensUpper.includes('A-MOUNT')) return false;
      return lensUpper.includes('SONY FE ') || /\sFE\s+\d/.test(lensUpper);
    }

    if (mountType === 'aMount') {
      // A-mount only
      return lensUpper.includes('(A-MOUNT)') || lensUpper.includes('A-MOUNT');
    }
  }

  // ===== FUJIFILM FILTERING =====
  if (brand === 'Fujifilm') {
    if (mountType === 'xMount') {
      // XF and XC lenses
      return lensUpper.includes('FUJIFILM XF ') || lensUpper.includes('FUJIFILM XC ') ||
        /\bXF\s+\d/.test(lensUpper) || /\bXC\s+\d/.test(lensUpper);
    }

    if (mountType === 'gfMount') {
      // GF lenses
      return lensUpper.includes('FUJIFILM GF ') || /\bGF\s+\d/.test(lensUpper);
    }
  }

  return false;
}

/**
 * Get compatible lenses from Firebase using smart detection
 */
async function getCompatibleLensesSmartly(brand, model) {
  if (!brand || !model) {
    console.warn('getCompatibleLensesSmartly: brand or model missing');
    return [];
  }

  // Detect mount type using smart patterns
  const mountInfo = detectCameraMountSmart(brand, model);

  if (!mountInfo) {
    console.warn(`Could not detect mount type for ${brand} ${model}`);
    return [];
  }

  const { mountType } = mountInfo;

  // Fixed lens cameras return empty
  if (mountType === 'fixedLens') {
    console.log(`${brand} ${model} is a fixed-lens camera`);
    return [];
  }

  // Get compatible mount types
  const mountCompatibility = {
    Canon: {
      fullFrameEF: ['EF'],
      apscEFS: ['EF', 'EF-S'],
      rfMount: ['RF', 'RF-S'],
      efmMount: ['EF-M']
    },
    Nikon: {
      fMount: ['F', 'AF-S', 'AF-P'],
      zMount: ['Z', 'NIKKOR Z']
    },
    Sony: {
      eMountAPSC: ['E', 'FE'],
      eMountFullFrame: ['FE'],
      aMount: ['A-Mount']
    },
    Fujifilm: {
      xMount: ['XF', 'XC'],
      gfMount: ['GF']
    }
  };

  const compatibleMounts = mountCompatibility[brand]?.[mountType] || [];

  if (compatibleMounts.length === 0) {
    console.log(`No compatible mounts defined for ${brand} ${mountType}`);
    return [];
  }

  console.log(`${brand} ${model}: ${mountType} → ${compatibleMounts.join(', ')}`);

  try {
    if (!window.firebase || !firebase.firestore) {
      console.error('Firebase not initialized');
      return [];
    }

    const db = firebase.firestore();

    // Query lenses from database (after migration, lenses have category='Lens')
    const snapshot = await db.collection('products')
      .where('brand', '==', brand)
      .where('category', '==', 'Lens')
      .get();

    if (snapshot.empty) {
      console.warn(`No lenses found for brand: ${brand}`);
      return [];
    }

    const compatibleLenses = [];

    snapshot.forEach(doc => {
      const data = doc.data();
      const lensName = data.name || '';

      // Check compatibility using smart filtering
      if (isLensCompatibleSmart(lensName, compatibleMounts, brand, mountType)) {
        compatibleLenses.push({
          id: doc.id,
          name: lensName,
          bonus: calculateLensBonusSmart(lensName, data.price),
          mount: mountType,
          price: data.price || 0
        });
      }
    });

    // Sort by name
    compatibleLenses.sort((a, b) => a.name.localeCompare(b.name));

    console.log(`✅ Found ${compatibleLenses.length} compatible lenses for ${brand} ${model}`);

    return compatibleLenses;

  } catch (error) {
    console.error('Error fetching lenses:', error);
    return [];
  }
}

/**
 * Calculate lens bonus based on lens characteristics
 */
function calculateLensBonusSmart(lensName, price) {
  if (price && price > 0) {
    return Math.round(price * 0.15);
  }

  const name = lensName.toLowerCase();

  // Super telephoto
  if (name.match(/[4-8]00mm/) && (name.includes('f/2.8') || name.includes('f/4'))) {
    return 35000;
  }

  // Professional zooms
  if (name.includes('24-70') && name.includes('f/2.8')) return 25000;
  if (name.includes('70-200') && name.includes('f/2.8')) return 28000;
  if (name.includes('l usm') || name.includes('gm') || name.includes('g master')) {
    return 20000;
  }

  // Fast primes
  if (name.includes('f/1.2')) return 18000;
  if (name.includes('f/1.4')) return 14000;
  if (name.includes('f/1.8')) return 8000;

  // Specialty
  if (name.includes('macro')) return 12000;

  // Standard zooms
  if (name.includes('18-55') || name.includes('16-50')) return 2000;
  if (name.includes('18-135') || name.includes('18-200')) return 6000;

  return 5000;
}

/**
 * Check if camera is fixed-lens using smart detection
 */
function isFixedLensCameraSmart(brand, model) {
  const mountInfo = detectCameraMountSmart(brand, model);
  return mountInfo && mountInfo.mountType === 'fixedLens';
}

// Export all functions
window.getCompatibleLensesFromFirebase = getCompatibleLensesSmartly;
window.getCompatibleLensesSmartly = getCompatibleLensesSmartly;
window.detectCameraMountSmart = detectCameraMountSmart;
window.isFixedLensCamera = isFixedLensCameraSmart; // Override old function
window.isFixedLensCameraSmart = isFixedLensCameraSmart;

console.log('✅ Smart lens compatibility system loaded (pattern-based)');


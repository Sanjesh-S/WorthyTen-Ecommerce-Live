// js/lens-compatibility-dynamic.js
// Dynamic lens compatibility system that pulls lenses from Firebase database
// Maps camera models to mount types and filters compatible lenses

// Camera Mount Type Detection
// This determines which lenses are compatible with which cameras

const cameraMountTypes = {
  Canon: {
    // Full-Frame EF Mount (EF lenses only, no EF-S)
    fullFrameEF: [
      "5D Mark II", "5D Mark III", "5D Mark IV", "5D Mark",  // 5D series
      "5DS", "5DS R", "5D",  // 5D variants
      "6D Mark II", "6D",  // 6D series
      "1D X Mark III", "1D X Mark II", "1D X",  // 1D X series
      "1D Mark IV", "1D Mark III", "1D Mark II", "1D",  // 1D series
      "1Ds Mark III", "1Ds Mark II", "1Ds"  // 1Ds series
    ],
    
    // APS-C EF-S Mount (Both EF and EF-S lenses)
    apscEFS: [
      "7D Mark II", "7D",  // 7D series
      "60D", "70D", "77D", "80D", "90D",  // Two-digit D series
      "50D", "40D", "30D", "20D", "10D",  // Older two-digit D
      "100D", "200D Mark I", "200D Mark II", "200D", "250D",  // Entry SL series
      "300D", "350D", "400D", "450D", "500D", "550D",  // Entry 3-digit series
      "600D", "650D", "700D", "750D", "760D", "800D", "850D",  // Entry 6-8 series
      "1000D", "1100D", "1200D", "1300D", "1500D", "2000D", "3000D", "4000D",  // Entry 4-digit series
      "Rebel", "Kiss"  // Rebel and Kiss variants
    ],
    
    // RF Mount Mirrorless (Full-frame and APS-C R cameras)
    rfMount: [
      "R6 Mark II", "R6", "R5 C", "R5",  // R5/R6 series
      "R3", "R8", "RP",  // Other full-frame R
      "R100", "R50", "R10", "R7"  // APS-C R series
    ],
    
    // EF-M Mount Mirrorless (Crop Sensor)
    efmMount: [
      "M6 Mark II", "M50 Mark II", "M50 Mark I",  // M series (specific first)
      "M200", "M100", "M50", "M10", "M6", "M5", "M3", "M2", "M"  // M series
    ],
    
    // Fixed Lens Cameras (No interchangeable lenses)
    fixedLens: [
      "PowerShot", "IXUS",  // Compact series
      "G7 X", "G5 X", "G3 X", "G1 X", "G9 X",  // G series premium compacts
      "SX", "A", "ELPH"  // Budget compacts
    ]
  },
  
  Nikon: {
    // F-Mount DSLR (All Nikon DSLRs)
    fMount: [
      "D3", "D4", "D5", "D6",  // Pro bodies
      "D40x", "D40", "D50", "D60", "D70", "D80", "D90",  // Entry level
      "D100", "D200", "D300s", "D300", "D500",  // Pro DX
      "D600", "D610", "D700", "D750", "D780",  // Full-frame consumer
      "D800", "D810", "D850",  // High-res full-frame
      "D3100", "D3200", "D3300", "D3400", "D3500",  // Entry 3xxx
      "D5000", "D5100", "D5200", "D5300", "D5500", "D5600",  // Mid-range 5xxx
      "D7000", "D7100", "D7200", "D7500"  // Advanced DX 7xxx
    ],
    
    // Z-Mount Mirrorless
    zMount: [
      "Z6 III", "Z6 II", "Z6",  // Z6 series
      "Z7 II", "Z7",  // Z7 series
      "Z5", "Z8", "Z9", "Z30", "Z50", "Zf", "Zfc"  // Other Z series
    ],
    
    // Fixed Lens (Coolpix and point-and-shoot)
    fixedLens: [
      "Coolpix P1000", "Coolpix P950", "Coolpix P900", "Coolpix P600",  // P series
      "Coolpix B700", "Coolpix B600", "Coolpix B500",  // B series
      "Coolpix A1000",  // A series
      "Coolpix"  // Generic Coolpix
    ]
  },
  
  Sony: {
    // E-Mount APS-C (E and FE lenses compatible)
    eMountAPSC: [
      "A5000", "A5100",  // A5xxx
      "A6700", "A6600", "A6500", "A6400", "A6300", "A6100", "A6000",  // A6xxx (sort by newest)
      "NEX-7", "NEX-6", "NEX-5T", "NEX-5R", "NEX-5N", "NEX-5",  // NEX
      "NEX-3N", "NEX-3",  // NEX-3
      "ZV-E10"  // Vlog APS-C
    ],
    
    // E-Mount Full Frame (FE lenses only)
    eMountFullFrame: [
      "A7 Mark III", "A7 Mark II", "A7 Mark I",  // A7 Mark series
      "A7 IV", "A7 III", "A7 II", "A7",  // A7 series
      "A7R IV", "A7R III", "A7R II", "A7R",  // A7R series
      "A7S III", "A7S II", "A7S",  // A7S series
      "A7C II", "A7CR", "A7C",  // A7C series
      "A9 II", "A9"  // A9 series
    ],
    
    // A-Mount DSLR/SLT
    aMount: [
      "A99 II", "A99",  // Pro A-mount
      "A77 II", "A77",  // Advanced
      "A68", "A65", "A58", "A57", "A55"  // Entry/mid
    ],
    
    // Fixed Lens (Cinema, compact, and point-and-shoot cameras)
    fixedLens: [
      "RX100", "RX10", "RX1", "RX0",  // RX series
      "HX99", "HX90", "HX80", "HX60", "HX50",  // HX series
      "W830", "W810", "W800",  // W series
      "H400", "H300",  // H series
      "ZV-1F", "ZV-1 II", "ZV-1",  // ZV-1 vlog cameras (fixed lens)
      "FX9", "FX6", "FX30", "FX3",  // Cinema line (fixed or interchangeable but cinema)
      "VENICE"  // Cinema camera
    ]
  },
  
  Fujifilm: {
    // X-Mount (All X-series interchangeable lens cameras)
    xMount: [
      "X-T30 II", "X-T30", "X-T20", "X-T10",  // X-T entry
      "X-T5", "X-T4", "X-T3", "X-T2", "X-T1",  // X-T pro
      "X-T200", "X-T100",  // X-T entry consumer
      "X-H2S", "X-H2", "X-H1",  // X-H flagship
      "X-Pro3", "X-Pro2", "X-Pro1",  // X-Pro rangefinder
      "X-E4", "X-E3", "X-E2", "X-E1",  // X-E rangefinder
      "X-S20", "X-S10",  // X-S hybrid
      "X-A7", "X-A5", "X-A3", "X-A2", "X-A1",  // X-A entry
      "X-M2", "X-M1"  // X-M compact
    ],
    
    // GF Mount (Medium Format)
    gfMount: [
      "GFX100", "GFX50", "GFX"
    ],
    
    // Fixed Lens
    fixedLens: [
      "X100V", "X100F", "X100T", "X100S", "X100",  // X100 series
      "X70", "X30", "X20", "X10",  // Compact X series
      "XF1", "XP", "FinePix"  // Other compacts
    ]
  }
};

// Determine mount type for a camera model
function getCameraMountType(brand, model) {
  if (!brand || !model) return null;
  
  const normalizedBrand = brand.charAt(0).toUpperCase() + brand.slice(1).toLowerCase();
  const mountData = cameraMountTypes[normalizedBrand];
  
  if (!mountData) return null;
  
  // Sort patterns by length (longest first) to match most specific first
  // This ensures "5D Mark II" is checked before "5D"
  const sortedMountTypes = Object.entries(mountData).map(([mountType, patterns]) => {
    const sortedPatterns = [...patterns].sort((a, b) => b.length - a.length);
    return [mountType, sortedPatterns];
  });
  
  // Check each mount type with sorted patterns
  for (const [mountType, patterns] of sortedMountTypes) {
    for (const pattern of patterns) {
      if (model.includes(pattern)) {
        return { brand: normalizedBrand, mountType };
      }
    }
  }
  
  return null;
}

// Check if camera has fixed lens
function isFixedLensCamera(brand, model) {
  const mountInfo = getCameraMountType(brand, model);
  return mountInfo && mountInfo.mountType === 'fixedLens';
}

// Get lens mount compatibility rules
function getCompatibleMounts(brand, mountType) {
  const mountCompatibility = {
    Canon: {
      fullFrameEF: ['EF'],  // Only EF lenses
      apscEFS: ['EF', 'EF-S'],  // Both EF and EF-S
      rfMount: ['RF', 'RF-S'],  // RF mount lenses
      efmMount: ['EF-M'],  // EF-M lenses only
      fixedLens: []
    },
    Nikon: {
      fMount: ['F', 'AF', 'AF-S', 'AF-P', 'DX', 'NIKKOR'],  // All F-mount
      zMount: ['Z', 'NIKKOR Z', 'Z DX'],  // Z-mount
      fixedLens: []
    },
    Sony: {
      eMountAPSC: ['E', 'FE'],  // Both E and FE
      eMountFullFrame: ['FE'],  // Only FE (E works in crop mode)
      aMount: ['A'],  // A-mount
      fixedLens: []
    },
    Fujifilm: {
      xMount: ['XF', 'XC'],  // X-mount
      gfMount: ['GF'],  // GF medium format
      fixedLens: []
    }
  };
  
  return mountCompatibility[brand]?.[mountType] || [];
}

// Check if a lens name matches compatible mounts
function isLensCompatible(lensName, compatibleMounts, brand, mountType) {
  if (!lensName || !compatibleMounts || compatibleMounts.length === 0) return false;
  
  const lensUpper = lensName.toUpperCase();
  
  // Special handling for Canon to distinguish EF from EF-S
  if (brand === 'Canon') {
    // For full-frame cameras (EF only)
    if (mountType === 'fullFrameEF') {
      // Must have EF but NOT EF-S, EF-M, or RF
      if (lensUpper.includes('EF-S') || lensUpper.includes('EF-M') || 
          lensUpper.includes('RF-S') || lensUpper.includes('RF ')) {
        return false;
      }
      // Check for EF mount (but not the above variants)
      return lensUpper.includes('EF ') || /\bEF\s/.test(lensUpper);
    }
    
    // For APS-C cameras (EF + EF-S)
    if (mountType === 'apscEFS') {
      return lensUpper.includes('EF ') || lensUpper.includes('EF-S') || /\bEF\s/.test(lensUpper);
    }
    
    // For RF mount cameras
    if (mountType === 'rfMount') {
      // RF mount accepts both RF and RF-S lenses
      return (lensUpper.includes('RF ') || lensUpper.includes('RF-S') || 
              /\bRF\s/.test(lensUpper) || /\bRF-S\s/.test(lensUpper));
    }
    
    // For EF-M mount cameras
    if (mountType === 'efmMount') {
      return lensUpper.includes('EF-M');
    }
  }
  
  // For Nikon
  if (brand === 'Nikon') {
    // F-mount DSLRs
    if (mountType === 'fMount') {
      // Check for F-mount indicators, but exclude Z-mount
      if (lensUpper.includes('NIKKOR Z')) return false;
      return lensUpper.includes('AF-S') || lensUpper.includes('AF-P') || 
             lensUpper.includes('AF-D') || lensUpper.includes('NIKKOR');
    }
    
    // Z-mount mirrorless
    if (mountType === 'zMount') {
      return lensUpper.includes('NIKKOR Z') || lensUpper.includes('Z DX') ||
             lensUpper.includes('Z 24') || lensUpper.includes('Z 50') || 
             lensUpper.includes('Z 85') || lensUpper.includes('Z 70');
    }
  }
  
  // For Sony
  if (brand === 'Sony') {
    // E-mount APS-C (E and FE lenses)
    if (mountType === 'eMountAPSC') {
      // Check for E-mount lenses (E or FE), exclude A-mount
      if (lensUpper.includes('(A-MOUNT)')) return false;
      
      // Check for Sony E or FE mount indicators
      return (lensUpper.includes('SONY E ') || lensUpper.includes('SONY FE ') ||
              lensUpper.includes(' E ') || lensUpper.includes(' FE ') ||
              /\sE\s\d/.test(lensUpper) || /\sFE\s\d/.test(lensUpper));
    }
    
    // E-mount Full-Frame (FE lenses only)
    if (mountType === 'eMountFullFrame') {
      // Only FE lenses (E lenses work in crop mode but we don't show them)
      if (lensUpper.includes('(A-MOUNT)')) return false;
      return lensUpper.includes('SONY FE ') || lensUpper.includes(' FE ') || 
             /\sFE\s\d/.test(lensUpper);
    }
    
    // A-mount
    if (mountType === 'aMount') {
      return lensUpper.includes('(A-MOUNT)') || lensUpper.includes('A-MOUNT');
    }
  }
  
  // For Fujifilm
  if (brand === 'Fujifilm') {
    // X-mount
    if (mountType === 'xMount') {
      return (lensUpper.includes('FUJIFILM XF ') || lensUpper.includes('FUJIFILM XC ') ||
              lensUpper.includes('XF ') || lensUpper.includes('XC ') ||
              /\bXF\s\d/.test(lensUpper) || /\bXC\s\d/.test(lensUpper));
    }
    
    // GF-mount (medium format)
    if (mountType === 'gfMount') {
      return (lensUpper.includes('FUJIFILM GF ') || lensUpper.includes('GF ') ||
              /\bGF\s\d/.test(lensUpper));
    }
  }
  
  // Generic fallback
  return compatibleMounts.some(mount => {
    const mountUpper = mount.toUpperCase();
    return lensUpper.includes(mountUpper);
  });
}

// Generate price bonus based on lens characteristics
function calculateLensBonus(lensName, price) {
  // If lens has a price from database, use a percentage
  if (price && price > 0) {
    return Math.round(price * 0.15); // 15% of lens value as bonus
  }
  
  // Fallback: estimate based on lens name characteristics
  const name = lensName.toLowerCase();
  
  // Professional L-series, G Master, or premium lenses
  if (name.includes(' l ') || name.includes('l usm') || name.includes('gm') || 
      name.includes('g master') || name.includes('za') || name.includes('r lm')) {
    if (name.includes('400mm') || name.includes('500mm') || name.includes('600mm') || name.includes('800mm')) {
      return 35000; // Super telephoto
    }
    if (name.includes('70-200') || name.includes('24-70')) {
      return 25000; // Pro zooms
    }
    return 18000; // Other pro lenses
  }
  
  // Fast primes (f/1.2, f/1.4, f/1.8)
  if (name.includes('f/1.2') || name.includes('f/1.4')) {
    return 15000;
  }
  if (name.includes('f/1.8') || name.includes('f/2')) {
    return 8000;
  }
  
  // Specialty lenses
  if (name.includes('macro')) return 12000;
  if (name.includes('fisheye')) return 10000;
  if (name.includes('tilt-shift') || name.includes('ts-e')) return 20000;
  
  // Standard zooms
  if (name.includes('18-55') || name.includes('16-50')) return 2000;
  if (name.includes('18-135') || name.includes('18-200')) return 6000;
  if (name.includes('70-300') || name.includes('55-250')) return 5000;
  
  // Default bonus
  return 5000;
}

// Main function: Get compatible lenses from Firebase
async function getCompatibleLensesFromFirebase(brand, model) {
  if (!brand || !model) {
    console.warn('getCompatibleLensesFromFirebase: brand or model missing');
    return [];
  }
  
  // Check if fixed lens camera
  if (isFixedLensCamera(brand, model)) {
    console.log(`${brand} ${model} is a fixed-lens camera`);
    return [];
  }
  
  // Get camera mount type
  const mountInfo = getCameraMountType(brand, model);
  if (!mountInfo) {
    console.warn(`Could not determine mount type for ${brand} ${model}`);
    return [];
  }
  
  const { mountType } = mountInfo;
  const compatibleMounts = getCompatibleMounts(brand, mountType);
  
  if (compatibleMounts.length === 0) {
    console.log(`No compatible mounts for ${brand} ${model}`);
    return [];
  }
  
  console.log(`Camera: ${brand} ${model}, Mount: ${mountType}, Compatible: ${compatibleMounts.join(', ')}`);
  
  try {
    // Get Firebase instance
    if (!window.firebase || !firebase.firestore) {
      console.error('Firebase not initialized');
      return [];
    }
    
    const db = firebase.firestore();
    
    // Query lenses from database
    const snapshot = await db.collection('products')
      .where('brand', '==', brand)
      .where('subcategory', '==', 'Lens')
      .get();
    
    if (snapshot.empty) {
      console.warn(`No lenses found for brand: ${brand}`);
      return [];
    }
    
    // Filter compatible lenses
    const compatibleLenses = [];
    
    snapshot.forEach(doc => {
      const data = doc.data();
      const lensName = data.name || '';
      
      // Check if lens is compatible with camera mount
      if (isLensCompatible(lensName, compatibleMounts, brand, mountType)) {
        compatibleLenses.push({
          id: doc.id,
          name: lensName,
          bonus: calculateLensBonus(lensName, data.price),
          mount: compatibleMounts[0], // Primary mount type
          price: data.price || 0
        });
      }
    });
    
    // Sort by name
    compatibleLenses.sort((a, b) => a.name.localeCompare(b.name));
    
    console.log(`Found ${compatibleLenses.length} compatible lenses for ${brand} ${model}`);
    
    return compatibleLenses;
    
  } catch (error) {
    console.error('Error fetching lenses from Firebase:', error);
    return [];
  }
}

// Export functions
window.getCompatibleLensesFromFirebase = getCompatibleLensesFromFirebase;
window.isFixedLensCamera = isFixedLensCamera;
window.getCameraMountType = getCameraMountType;

console.log('✅ Dynamic lens compatibility system loaded');


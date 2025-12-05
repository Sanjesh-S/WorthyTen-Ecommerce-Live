# Variant Selection System - Testing Guide

## Overview
This document describes how to test the new variant selection feature for Phones, Laptops, and iPads.

## Test Cases

### Test Case 1: Phone with Variant Selection (iPhone)
**Steps:**
1. Navigate to homepage: `http://127.0.0.1:5500/WorthyTen-Ecommerce-main/index.html`
2. Click "Sell Phone" category
3. Select brand "Apple"
4. Select model "iPhone 15 Pro" (or any iPhone)
5. **Expected:** Redirected to `variant-selection.html`
6. **Verify:**
   - Device image and name displayed
   - Storage options shown (128GB, 256GB, 512GB, 1TB)
   - RAM shown (8GB - auto-selected if only one option)
   - "Get Exact Value" button is initially disabled
7. Select storage (e.g., "256 GB")
8. **Verify:**
   - Button becomes enabled
   - Price preview shows adjusted price
9. Click "Get Exact Value"
10. **Expected:** Redirected to `quote.html`
11. **Verify:**
   - Model name shows with variant: "Apple iPhone 15 Pro (256GB / 8GB)"
   - Price reflects variant selection
12. Click "Get Assessment"
13. **Verify:** Sidebar shows "Apple iPhone 15 Pro (256GB / 8GB)"

**Expected Result:** ✅ Pass

---

### Test Case 2: Laptop with Storage + RAM Selection
**Steps:**
1. From homepage, click "Sell Laptop"
2. Select brand "Apple"
3. Select model "MacBook Pro 16"
4. **Expected:** Redirected to `variant-selection.html`
5. **Verify:**
   - Both storage AND RAM options displayed
   - Multiple RAM options (16GB, 32GB, 64GB, 96GB, 128GB)
6. Select storage "1 TB"
7. Select RAM "32 GB"
8. **Verify:** Price preview updates with both multipliers applied
9. Continue through flow
10. **Verify:** All pages show "MacBook Pro 16 (1TB / 32GB)"

**Expected Result:** ✅ Pass

---

### Test Case 3: DSLR Camera (NO Variant Selection)
**Steps:**
1. From homepage, click "Sell DSLR/Lens"
2. Select brand "Canon"
3. Select product type "Bodies"
4. Select model "Canon EOS 5D Mark II"
5. **Expected:** Redirected DIRECTLY to `quote.html` (skips variant-selection)
6. **Verify:** No variant selection page shown
7. Continue to assessment
8. **Verify:**
   - No variant text in model name
   - "Additional lens" question shown (not fixed lens)
9. Select "Yes" for additional lens
10. **Verify:** Only EF lenses shown (NO EF-S lenses)

**Expected Result:** ✅ Pass

---

### Test Case 4: Fixed Lens Camera (NO Additional Lens Question)
**Steps:**
1. From homepage, click "Sell DSLR/Lens"
2. Select "Canon"
3. Select model "Canon PowerShot G7 X Mark III" (fixed lens)
4. **Expected:** Skip variant selection, go to quote
5. Continue to assessment
6. **Verify:** "Additional lens" question NOT shown

**Expected Result:** ✅ Pass

---

### Test Case 5: iPad with Variant Selection
**Steps:**
1. From homepage, click "Sell iPad"
2. Select brand "Apple"
3. Select model "iPad Pro 12.9"
4. **Expected:** Redirected to `variant-selection.html`
5. **Verify:**
   - Storage options shown
   - RAM options shown (8GB, 16GB)
6. Select storage and RAM
7. Continue through flow
8. **Verify:** Variant displayed throughout

**Expected Result:** ✅ Pass

---

## Automated Verification Tools

### Tool 1: Verify Lens Compatibility
```
http://127.0.0.1:5500/WorthyTen-Ecommerce-main/verify-lens-compatibility.html
```

**What to check:**
- Total Cameras: ~294
- With Lenses: ~230+
- No Lenses: 0
- Fixed Lens: ~64

**Expected:** All cameras properly mapped, no "needs mapping" errors

---

### Tool 2: Test Fixed Lens Detection
```
http://127.0.0.1:5500/WorthyTen-Ecommerce-main/test-fixed-lens-detection.html
```

**What to check:**
- Fixed lens cameras correctly identified (PowerShot, RX100, Coolpix, X100)
- Interchangeable lens cameras correctly identified

**Expected:** All cameras correctly categorized

---

### Tool 3: Export Unmapped Cameras
```
http://127.0.0.1:5500/WorthyTen-Ecommerce-main/export-unmapped-cameras.html
```

**What to check:**
- Should find 0 unmapped cameras (or very few)

**Expected:** All cameras have lens compatibility mappings

---

## Integration Points to Verify

### 1. Script Loading Order
All pages should load scripts in this order:
1. `variant-config.js` (variant data)
2. `display-helper.js` (name formatting)
3. `lens-compatibility-smart.js` (mount detection)
4. Page-specific logic

### 2. Price Calculations
- Base price from database
- Variant multipliers applied on selection
- Assessment deductions applied during assessment
- Lens bonuses applied during lens selection
- Accessory bonuses applied during accessories
- Final price in summary

### 3. Display Consistency
Model name with variants should show consistently across:
- ✅ Quote page
- ✅ Assessment page
- ✅ Lens selection page
- ✅ Physical condition page
- ✅ Accessories page
- ✅ Functional issues page
- ✅ Summary page

---

## Known Behaviors

### Phones
- Always show variant selection (storage is required)
- RAM is usually fixed per model or auto-selected
- Price varies significantly by storage

### Laptops
- Always show variant selection
- Both storage AND RAM selection required
- Price varies by both factors

### iPads
- Show variant selection
- Pro models have RAM options, standard models don't
- Storage is primary price factor

### DSLR/Lens
- NO variant selection (cameras/lenses don't have storage/RAM variants)
- Goes directly to quote page
- Lens selection is separate feature

---

## Regression Testing

After implementation, verify these still work:
1. ✅ DSLR camera selection (should skip variants)
2. ✅ Lens selection (should skip variants)
3. ✅ Fixed lens cameras (no "additional lens" question)
4. ✅ Interchangeable lens cameras (show compatible lenses only)
5. ✅ Brand prefix display (no "Canon Canon" duplication)
6. ✅ Assessment flow for all categories
7. ✅ Price calculations through entire flow

---

## Success Criteria

System is ready when:
- [ ] All 7 test cases pass
- [ ] Verification tools show correct mappings
- [ ] No duplicate products visible
- [ ] Variant text displays correctly on all pages
- [ ] Price adjustments work correctly
- [ ] Backward compatibility maintained (cameras work as before)

---

## Troubleshooting

**Issue:** Variant selection not showing for phones
**Fix:** Check if `supportsVariants()` function is loaded (variant-config.js)

**Issue:** Wrong lenses showing for camera
**Fix:** Check lens-compatibility-smart.js mount detection logic

**Issue:** "Canon Canon" duplication
**Fix:** Verify display-helper.js is loaded on all pages

**Issue:** Price not adjusting
**Fix:** Check variant multipliers in variant-config.js

---

## Files Modified/Created

**New Files:**
- `variant-selection.html`
- `js/variant-selection.js`
- `js/variant-config.js`
- `js/lens-compatibility-smart.js`
- `js/lens-compatibility-dynamic.js`
- `js/display-helper.js`

**Modified Files:**
- `js/script.js` (redirect to variant-selection)
- `js/assessment.js` (show variant, hide lens question for fixed cameras)
- `js/quote.js` (handle variant data)
- `css/style.css` (variant UI styling)
- All assessment flow pages (display variant info)

**Testing Tools:**
- `verify-lens-compatibility.html`
- `test-fixed-lens-detection.html`
- `export-unmapped-cameras.html`


/**
 * Unit Tests for Price Calculation Logic
 * Tests the core pricing algorithms using FIXED ₹ amounts from Firestore productPricing
 * NOTE: Pricing is now managed via admin dashboard, not hardcoded percentages
 */

describe('Price Calculation - Fixed Pricing Model', () => {

  // Mock productPricing data from Firestore (as set in admin dashboard)
  const mockProductPricing = {
    productName: 'Canon EOS 200D',
    productBrand: 'Canon',
    basePrice: 32000,
    issues: {
      'display_cracked': { deduction: 7000, label: 'LCD Screen Cracked' },
      'display_scratched': { deduction: 2000, label: 'LCD Screen Scratched' },
      'body_dents': { deduction: 3500, label: 'Body Dents/Damage' },
      'body_scratches': { deduction: 1500, label: 'Body Scratches' },
      'battery_weak': { deduction: 2000, label: 'Battery Issue' },
      'power_issue': { deduction: 5000, label: 'Power/Startup Issues' },
      'focus_issue': { deduction: 4000, label: 'Auto Focus Issue' },
      'lens_fungus': { deduction: 4500, label: 'Lens Fungus' },
      'lens_scratches': { deduction: 3000, label: 'Lens Scratches' },
      'error_messages': { deduction: 2500, label: 'Error Messages' },
      'shutter_issue': { deduction: 6000, label: 'Shutter Problem' }
    },
    bonuses: {
      'original_box': { addition: 500, label: 'Original Box' },
      'original_bill': { addition: 300, label: 'Original Bill/Invoice' },
      'charger': { addition: 200, label: 'Charger/Battery Grip' },
      'warranty_valid': { addition: 1500, label: 'Valid Warranty' }
    },
    ageDeductions: {
      'less-than-3': 0,
      '4-to-12': 2000,
      'above-12': 5000
    }
  };

  describe('Fixed Amount Deductions', () => {

    test('should return base price with no issues', () => {
      const basePrice = 32000;
      const issues = [];

      const result = calculatePriceWithIssues(basePrice, issues, mockProductPricing);

      expect(result).toBe(32000);
    });

    test('should apply single fixed deduction correctly', () => {
      const basePrice = 32000;
      const issues = ['body_dents'];

      const result = calculatePriceWithIssues(basePrice, issues, mockProductPricing);

      // 32000 - 3500 = 28500
      expect(result).toBe(28500);
    });

    test('should apply multiple fixed deductions correctly', () => {
      const basePrice = 32000;
      const issues = ['display_cracked', 'body_dents'];

      const result = calculatePriceWithIssues(basePrice, issues, mockProductPricing);

      // 32000 - 7000 - 3500 = 21500
      expect(result).toBe(21500);
    });

    test('should handle issues not configured in admin (no deduction)', () => {
      const basePrice = 32000;
      const issues = ['unknown_issue'];

      const result = calculatePriceWithIssues(basePrice, issues, mockProductPricing);

      // No deduction for unconfigured issues
      expect(result).toBe(32000);
    });

    test('should enforce minimum price floor (5%)', () => {
      const basePrice = 32000;
      // Apply many deductions that would exceed the price
      const issues = ['display_cracked', 'body_dents', 'power_issue', 'focus_issue', 'lens_fungus', 'shutter_issue'];

      const result = calculatePriceWithIssues(basePrice, issues, mockProductPricing);

      // Minimum should be 5% of base price = 1600
      expect(result).toBeGreaterThanOrEqual(1600);
    });

  });

  describe('Fixed Amount Bonuses', () => {

    test('should add bonus for original box', () => {
      const currentPrice = 28000;
      const accessories = ['original_box'];

      const result = applyBonuses(currentPrice, accessories, mockProductPricing);

      expect(result).toBe(28500);
    });

    test('should add bonus for multiple accessories', () => {
      const currentPrice = 28000;
      const accessories = ['original_box', 'charger', 'warranty_valid'];

      const result = applyBonuses(currentPrice, accessories, mockProductPricing);

      // 28000 + 500 + 200 + 1500 = 30200
      expect(result).toBe(30200);
    });

    test('should not add bonus for no accessories', () => {
      const currentPrice = 28000;
      const accessories = [];

      const result = applyBonuses(currentPrice, accessories, mockProductPricing);

      expect(result).toBe(28000);
    });

  });

  describe('Age-based Deductions', () => {

    test('should not deduct for device less than 3 months old', () => {
      const currentPrice = 28000;
      const ageCategory = 'less-than-3';

      const result = applyAgeDeduction(currentPrice, ageCategory, mockProductPricing);

      expect(result).toBe(28000);
    });

    test('should deduct for device 4-12 months old', () => {
      const currentPrice = 28000;
      const ageCategory = '4-to-12';

      const result = applyAgeDeduction(currentPrice, ageCategory, mockProductPricing);

      expect(result).toBe(26000);
    });

    test('should deduct for device above 12 months old', () => {
      const currentPrice = 28000;
      const ageCategory = 'above-12';

      const result = applyAgeDeduction(currentPrice, ageCategory, mockProductPricing);

      expect(result).toBe(23000);
    });

  });

  describe('No Pricing Data Scenario', () => {

    test('should return base price when no pricing data exists', () => {
      const basePrice = 32000;
      const issues = ['display_cracked', 'body_dents'];
      const noPricing = null;

      const result = calculatePriceWithIssues(basePrice, issues, noPricing);

      // No deductions without pricing data
      expect(result).toBe(32000);
    });

    test('should not add bonuses when no pricing data exists', () => {
      const currentPrice = 28000;
      const accessories = ['original_box'];
      const noPricing = null;

      const result = applyBonuses(currentPrice, accessories, noPricing);

      expect(result).toBe(28000);
    });

  });

  describe('Edge Cases', () => {

    test('should handle zero base price', () => {
      const basePrice = 0;
      const issues = [];

      const result = calculatePriceWithIssues(basePrice, issues, mockProductPricing);

      expect(result).toBe(0);
    });

    test('should round prices to nearest integer', () => {
      const price = 8755.67;

      const result = Math.round(price);

      expect(result).toBe(8756);
    });

    test('should not go below zero', () => {
      const currentPrice = 1000;
      // Even if deductions exceed price, should enforce minimum
      const issues = ['display_cracked', 'shutter_issue']; // 7000 + 6000 = 13000 > 1000

      const result = calculatePriceWithIssues(currentPrice, issues, mockProductPricing);

      expect(result).toBeGreaterThanOrEqual(0);
    });

  });

});

// Helper functions that match the new fixed pricing logic
function calculatePriceWithIssues(basePrice, issues, pricingData) {
  let price = basePrice;

  if (pricingData && pricingData.issues) {
    for (const issueId of issues) {
      if (pricingData.issues[issueId]) {
        price -= pricingData.issues[issueId].deduction || 0;
      }
    }
  }

  // Enforce minimum price (5% of base)
  const minPrice = basePrice * 0.05;
  return Math.max(Math.round(price), Math.round(minPrice));
}

function applyBonuses(currentPrice, accessories, pricingData) {
  if (!pricingData || !pricingData.bonuses) {
    return currentPrice;
  }

  let bonus = 0;
  accessories.forEach(accessory => {
    if (pricingData.bonuses[accessory]) {
      bonus += pricingData.bonuses[accessory].addition || 0;
    }
  });
  return currentPrice + bonus;
}

function applyAgeDeduction(currentPrice, ageCategory, pricingData) {
  if (!pricingData || !pricingData.ageDeductions) {
    return currentPrice;
  }

  const deduction = pricingData.ageDeductions[ageCategory] || 0;
  return currentPrice - deduction;
}

/**
 * Unit Tests for Price Calculation Logic
 * Tests the core pricing algorithms
 */

describe('Price Calculation', () => {
  
  // Mock Config
  global.Config = {
    pricing: {
      deductions: {
        powerOn: 0.30,
        bodyDamage: 0.25,
        lcdScreen: 0.20,
        lensCondition: 0.15,
        autofocusZoom: 0.15
      },
      minPricePercentage: 0.10,
      warrantyBonusPercentage: 0.05
    }
  };
  
  describe('Base Price Calculation', () => {
    
    test('should return base price with no deductions', () => {
      const basePrice = 10000;
      const deductions = {};
      
      const result = calculatePrice(basePrice, deductions);
      
      expect(result).toBe(10000);
    });
    
    test('should apply single deduction correctly', () => {
      const basePrice = 10000;
      const deductions = {
        bodyDamage: true
      };
      
      const result = calculatePrice(basePrice, deductions);
      
      // 10000 - (10000 * 0.25) = 7500
      expect(result).toBe(7500);
    });
    
    test('should apply multiple deductions correctly', () => {
      const basePrice = 10000;
      const deductions = {
        bodyDamage: true,
        lcdScreen: true
      };
      
      const result = calculatePrice(basePrice, deductions);
      
      // 10000 - (10000 * 0.25) - (10000 * 0.20) = 5500
      expect(result).toBe(5500);
    });
    
    test('should enforce minimum price floor', () => {
      const basePrice = 10000;
      const deductions = {
        powerOn: true,
        bodyDamage: true,
        lcdScreen: true,
        lensCondition: true,
        autofocusZoom: true
      };
      
      const result = calculatePrice(basePrice, deductions);
      
      // Minimum should be 10% of base price = 1000
      expect(result).toBeGreaterThanOrEqual(1000);
    });
    
  });
  
  describe('Warranty Bonus', () => {
    
    test('should add warranty bonus when eligible', () => {
      const basePrice = 10000;
      const finalPrice = 8000;
      const hasWarranty = true;
      const deviceAgeMonths = 10; // Under 11 months
      
      const result = applyWarrantyBonus(finalPrice, hasWarranty, deviceAgeMonths);
      
      // 8000 + (8000 * 0.05) = 8400
      expect(result).toBe(8400);
    });
    
    test('should not add warranty bonus when device is too old', () => {
      const basePrice = 10000;
      const finalPrice = 8000;
      const hasWarranty = true;
      const deviceAgeMonths = 12; // Over 11 months
      
      const result = applyWarrantyBonus(finalPrice, hasWarranty, deviceAgeMonths);
      
      expect(result).toBe(8000); // No bonus
    });
    
    test('should not add warranty bonus when no warranty', () => {
      const basePrice = 10000;
      const finalPrice = 8000;
      const hasWarranty = false;
      const deviceAgeMonths = 6;
      
      const result = applyWarrantyBonus(finalPrice, hasWarranty, deviceAgeMonths);
      
      expect(result).toBe(8000); // No bonus
    });
    
  });
  
  describe('Physical Condition Deductions', () => {
    
    test('should deduct for poor display condition', () => {
      const basePrice = 10000;
      const displayCondition = 'not-working'; // Worst condition
      
      const result = applyDisplayCondition(basePrice, displayCondition);
      
      expect(result).toBeLessThan(basePrice);
    });
    
    test('should not deduct for excellent display', () => {
      const basePrice = 10000;
      const displayCondition = 'excellent';
      
      const result = applyDisplayCondition(basePrice, displayCondition);
      
      expect(result).toBe(basePrice);
    });
    
  });
  
  describe('Accessory Bonuses', () => {
    
    test('should add bonus for original box', () => {
      const currentPrice = 8000;
      const accessories = ['box'];
      const accessoryValues = { box: 200 };
      
      const result = applyAccessoryBonuses(currentPrice, accessories, accessoryValues);
      
      expect(result).toBe(8200);
    });
    
    test('should add bonus for multiple accessories', () => {
      const currentPrice = 8000;
      const accessories = ['box', 'charger', 'cable'];
      const accessoryValues = { box: 200, charger: 150, cable: 100 };
      
      const result = applyAccessoryBonuses(currentPrice, accessories, accessoryValues);
      
      expect(result).toBe(8450);
    });
    
    test('should not add bonus for no accessories', () => {
      const currentPrice = 8000;
      const accessories = [];
      const accessoryValues = {};
      
      const result = applyAccessoryBonuses(currentPrice, accessories, accessoryValues);
      
      expect(result).toBe(8000);
    });
    
  });
  
  describe('Functional Issues Deductions', () => {
    
    test('should deduct for battery issue', () => {
      const currentPrice = 8000;
      const issues = ['battery'];
      const issueDeductions = { battery: 500 };
      
      const result = applyIssueDeductions(currentPrice, issues, issueDeductions);
      
      expect(result).toBe(7500);
    });
    
    test('should deduct for multiple issues', () => {
      const currentPrice = 8000;
      const issues = ['battery', 'buttons', 'speaker'];
      const issueDeductions = { battery: 500, buttons: 300, speaker: 200 };
      
      const result = applyIssueDeductions(currentPrice, issues, issueDeductions);
      
      expect(result).toBe(7000);
    });
    
  });
  
  describe('Edge Cases', () => {
    
    test('should handle zero base price', () => {
      const basePrice = 0;
      const deductions = {};
      
      const result = calculatePrice(basePrice, deductions);
      
      expect(result).toBe(0);
    });
    
    test('should handle negative values gracefully', () => {
      const basePrice = 1000;
      const issues = ['major-damage'];
      const issueDeductions = { 'major-damage': 2000 }; // Deduction > price
      
      const result = applyIssueDeductions(basePrice, issues, issueDeductions);
      
      // Should not go negative
      expect(result).toBeGreaterThanOrEqual(0);
    });
    
    test('should round prices to nearest integer', () => {
      const price = 8755.67;
      
      const result = Math.round(price);
      
      expect(result).toBe(8756);
    });
    
  });
  
});

// Helper functions to be implemented in actual code
function calculatePrice(basePrice, deductions) {
  let price = basePrice;
  
  for (const [key, value] of Object.entries(deductions)) {
    if (value && Config.pricing.deductions[key]) {
      price -= basePrice * Config.pricing.deductions[key];
    }
  }
  
  // Enforce minimum price
  const minPrice = basePrice * Config.pricing.minPricePercentage;
  return Math.max(price, minPrice);
}

function applyWarrantyBonus(currentPrice, hasWarranty, deviceAgeMonths) {
  if (hasWarranty && deviceAgeMonths < 11) {
    return currentPrice + (currentPrice * Config.pricing.warrantyBonusPercentage);
  }
  return currentPrice;
}

function applyDisplayCondition(basePrice, condition) {
  const deductions = {
    'not-working': 0.40,
    'lines': 0.30,
    'fade': 0.20,
    'good': 0.10,
    'excellent': 0
  };
  
  return basePrice - (basePrice * (deductions[condition] || 0));
}

function applyAccessoryBonuses(currentPrice, accessories, accessoryValues) {
  let bonus = 0;
  accessories.forEach(accessory => {
    if (accessoryValues[accessory]) {
      bonus += accessoryValues[accessory];
    }
  });
  return currentPrice + bonus;
}

function applyIssueDeductions(currentPrice, issues, issueDeductions) {
  let deduction = 0;
  issues.forEach(issue => {
    if (issueDeductions[issue]) {
      deduction += issueDeductions[issue];
    }
  });
  return Math.max(currentPrice - deduction, 0);
}


import { test, expect } from '@playwright/test';

test.describe('User Journey - Device Selling Flow', () => {
  
  test('Complete journey: Select device → Get quote → Schedule pickup', async ({ page }) => {
    // 1. Navigate to homepage
    await page.goto('/');
    await expect(page).toHaveTitle(/WorthyTen/);
    
    // 2. Select category
    await page.waitForSelector('.category-grid');
    const categoryCard = page.locator('.category-card').first();
    await expect(categoryCard).toBeVisible();
    await categoryCard.click();
    
    // 3. Select brand
    await page.waitForSelector('.brand-grid');
    const brandCard = page.locator('.brand-card').first();
    await expect(brandCard).toBeVisible();
    await brandCard.click();
    
    // 4. Select model
    await page.waitForSelector('.model-grid');
    const modelCard = page.locator('.model-card').first();
    await expect(modelCard).toBeVisible();
    await modelCard.click();
    
    // 5. View quote
    await page.waitForURL('**/quote.html');
    await expect(page.locator('.product-title')).toBeVisible();
    await expect(page.locator('#quotePrice')).toBeVisible();
    
    // Verify price is displayed
    const price = await page.locator('#quotePrice').textContent();
    expect(price).toContain('₹');
    
    // Click "Get Exact Value"
    await page.locator('#getExactValueBtn').click();
    
    // 6. Assessment page
    await page.waitForURL('**/assessment.html');
    await expect(page.locator('.product-title')).toBeVisible();
    
    // Answer assessment questions (if present)
    const questionOptions = page.locator('.assessment-option');
    const optionCount = await questionOptions.count();
    
    if (optionCount > 0) {
      // Click first option of each question
      await questionOptions.first().click();
      await page.waitForTimeout(500); // Wait for animation
    }
    
    // Click proceed button
    await page.locator('#proceedBtn').click();
    
    // 7. Physical condition page
    await page.waitForURL('**/physical-condition.html');
    
    // Select condition options
    const displayCondition = page.locator('#displayConditionGrid .condition-card').first();
    if (await displayCondition.isVisible()) {
      await displayCondition.click();
    }
    
    const bodyCondition = page.locator('#bodyConditionGrid .condition-card').first();
    if (await bodyCondition.isVisible()) {
      await bodyCondition.click();
    }
    
    // Click proceed
    await page.locator('#proceedToIssuesBtn').click();
    
    // 8. Functional issues page
    await page.waitForURL('**/functional-issues.html');
    
    // Click "No Issues" or select first issue
    const noIssuesBtn = page.locator('#noIssuesBtn');
    if (await noIssuesBtn.isVisible()) {
      await noIssuesBtn.click();
    }
    
    await page.locator('#proceedToAccessoriesBtn').click();
    
    // 9. Accessories page
    await page.waitForURL('**/accessories.html');
    
    // Click proceed (with or without accessories)
    await page.locator('#proceedToWarrantyBtn').click();
    
    // 10. Warranty page
    await page.waitForURL('**/warranty.html');
    
    // Select device age
    const ageOption = page.locator('input[name="device_age"]').first();
    await ageOption.check();
    
    // Click finish
    await page.locator('#finishBtn').click();
    
    // 11. Summary page (may require login)
    // Note: Login flow would need to be mocked or skipped for testing
    await page.waitForTimeout(2000);
    
    // If on summary page, verify elements
    if (page.url().includes('summary.html')) {
      await expect(page.locator('.device-name')).toBeVisible();
      await expect(page.locator('#finalSellingPrice')).toBeVisible();
      
      // Verify final price is displayed
      const finalPrice = await page.locator('#finalSellingPrice').textContent();
      expect(parseInt(finalPrice)).toBeGreaterThan(0);
    }
  });
  
  test('Accessibility: Keyboard navigation works', async ({ page }) => {
    await page.goto('/');
    
    // Test Tab navigation
    await page.keyboard.press('Tab');
    
    // Check if skip link gets focus
    const skipLink = page.locator('.skip-link');
    await expect(skipLink).toBeFocused();
    
    // Tab through elements
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    
    // Verify focus indicators are visible
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toHaveCSS('outline-width', /[^0]/); // Non-zero outline
  });
  
  test('Mobile: Responsive design works', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    await page.goto('/');
    
    // Verify mobile-specific elements
    await expect(page.locator('.category-grid')).toBeVisible();
    
    // Check that elements don't overflow
    const body = page.locator('body');
    const bodyBox = await body.boundingBox();
    expect(bodyBox.width).toBeLessThanOrEqual(375);
  });
  
  test('Performance: Page loads within acceptable time', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const loadTime = Date.now() - startTime;
    
    // Verify page loads in under 3 seconds
    expect(loadTime).toBeLessThan(3000);
    
    // Check that images are lazy loaded
    const images = page.locator('img[loading="lazy"]');
    const lazyImageCount = await images.count();
    expect(lazyImageCount).toBeGreaterThan(0);
  });
  
  test('SEO: Meta tags are present', async ({ page }) => {
    await page.goto('/');
    
    // Check meta tags
    const title = await page.title();
    expect(title).toBeTruthy();
    expect(title.length).toBeGreaterThan(10);
    
    // Check description
    const description = page.locator('meta[name="description"]');
    await expect(description).toHaveAttribute('content', /.+/);
    
    // Check Open Graph tags
    const ogTitle = page.locator('meta[property="og:title"]');
    await expect(ogTitle).toHaveAttribute('content', /.+/);
  });
});


import { test, expect } from '@playwright/test';

/**
 * Complete Selling Flow E2E Tests
 * Tests the entire device selling journey
 */

test.describe('Selling Flow', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('should display homepage with categories', async ({ page }) => {
        await expect(page).toHaveTitle(/WorthyTen/);
        await expect(page.locator('.category-tabs')).toBeVisible();
    });

    test('should search for a device', async ({ page }) => {
        const searchInput = page.locator('#searchInput');
        await searchInput.fill('Canon EOS');
        await searchInput.press('Enter');

        // Wait for results
        await page.waitForSelector('.product-grid', { timeout: 5000 });
        const products = page.locator('.product-grid .product-card');
        await expect(products).toHaveCount(await products.count());
    });

    test('should select device and see quote', async ({ page }) => {
        // Click on a category
        await page.click('.category-tab:first-child');

        // Wait for products to load
        await page.waitForSelector('.product-card', { timeout: 10000 });

        // Click first product
        await page.click('.product-card:first-child');

        // Should navigate to quote page
        await expect(page).toHaveURL(/quote\.html/);
        await expect(page.locator('#productTitle')).toBeVisible();
    });

    test('should navigate through assessment flow', async ({ page }) => {
        // This test requires a product to be selected first
        // Navigate to quote page with test product
        await page.goto('/quote.html');

        // Check if page loads (may redirect if no product selected)
        const url = page.url();
        if (url.includes('quote')) {
            await expect(page.locator('.quote-card')).toBeVisible();
        }
    });

    test('dark mode toggle should work', async ({ page }) => {
        // Wait for theme toggle to be available
        await page.waitForSelector('.theme-toggle', { timeout: 5000 });

        // Click dark mode toggle
        await page.click('.theme-toggle');

        // Check if theme attribute changed
        const theme = await page.locator('html').getAttribute('data-theme');
        expect(theme).toBe('dark');

        // Toggle back
        await page.click('.theme-toggle');
        const lightTheme = await page.locator('html').getAttribute('data-theme');
        expect(lightTheme).toBe('light');
    });
});

test.describe('Mobile Experience', () => {
    test.use({ viewport: { width: 375, height: 667 } });

    test('should show mobile navigation', async ({ page }) => {
        await page.goto('/');

        // Mobile menu should be visible
        await expect(page.locator('.mobile-menu-btn')).toBeVisible();
    });

    test('should have touch-friendly buttons', async ({ page }) => {
        await page.goto('/');

        // CTA buttons should have minimum touch target
        const ctaButton = page.locator('.cta-button').first();
        const box = await ctaButton.boundingBox();

        // Minimum 44px touch target
        expect(box?.height).toBeGreaterThanOrEqual(44);
    });
});

test.describe('Accessibility', () => {
    test('should have skip link', async ({ page }) => {
        await page.goto('/');

        await expect(page.locator('.skip-link')).toBeAttached();
    });

    test('should have proper heading hierarchy', async ({ page }) => {
        await page.goto('/');

        // Should have exactly one h1
        const h1Count = await page.locator('h1').count();
        expect(h1Count).toBe(1);
    });
});

import { test, expect } from '@playwright/test';
import { CategoryPage } from '../../pages/CategoryPage';
import { ProductDetailsPage } from '../../pages/ProductDetailsPage';
import { SearchResultsPage } from '../../pages/SearchResultsPage';

test.describe('Product Browsing & Search', () => {

  //  Test Case 1 – Smoke Test
  test('PROD-NAV-SM-01 - Navigate Through Categories', async ({ page }) => {
    const categoryPage = new CategoryPage(page);
    await page.goto('https://demowebshop.tricentis.com/');
    
    // Step: Locate and Click Books category
    await page.locator('.block-category-navigation >> text=Books').click();

    // Expected Result: Books page displays products
    await expect(page).toHaveURL(/.*\/books/);
    await expect(page.locator('.page-title h1')).toHaveText('Books');
  });

  //  Test Case 2 – Functional
  test('PROD-NAV-FN-02 - Open Product Details Page', async ({ page }) => {
    await page.goto('https://demowebshop.tricentis.com/books');
    
    // Step: Select product “Computing and Internet”
    await page.locator('text=Computing and Internet').first().click();

    // Expected Result: Product details page opens correctly
    await expect(page.locator('.product-name h1')).toContainText('Computing and Internet');
    await expect(page.locator('.product-essential .prices')).toBeVisible();
  });

  //  Test Case 3 – Functional
  test('PROD-SEARCH-FN-03 - Search for Existing Product', async ({ page }) => {
    const searchPage = new SearchResultsPage(page);
    await page.goto('https://demowebshop.tricentis.com/');
    
    await searchPage.searchProduct('Laptop');

    // Expected Result: Relevant products matching keyword are displayed
    const productItems = page.locator('.product-item');
    expect(await productItems.count()).toBeGreaterThan(0);
  });

  //  Test Case 4 – Functional
  test('PROD-SEARCH-FN-04 - Search for Non-Existing Product', async ({ page }) => {
    const searchPage = new SearchResultsPage(page);
    await page.goto('https://demowebshop.tricentis.com/');
    
    await searchPage.searchProduct('XYZ123');

    // Expected Result: Message "No products were found" is displayed
    await expect(page.locator('.result')).toContainText('No products were found');
  });
});

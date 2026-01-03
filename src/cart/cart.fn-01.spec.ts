import { test, expect } from '@playwright/test';
import { CategoryPage } from '../../pages/CategoryPage';
import { CartPage } from '../../pages/CartPage';
import { LoginPage } from '../../pages/LoginPage';

test('CART-FN-01 | Update Product Quantity in Shopping Cart', async ({ page }) => {
  const categoryPage = new CategoryPage(page);
  const cartPage = new CartPage(page);
  const loginPage = new LoginPage(page);

  // Preconditions

  //user is logged in
  await loginPage.login(
    'ekadric@student.ius.edu.ba', 'project');

  
  await cartPage.openCartPage();
  await cartPage.clearCartIfNeeded(); // Ensure cart is empty

  
  await page.goto('https://demowebshop.tricentis.com'); 

  //Select Books category from sifebar Categories
  await page
    .locator('.block-category-navigation')
    .locator('a', { hasText: 'Books' })
    .first()
    .click();

  await categoryPage.addToCartFromList('Computing and Internet');
  await page.waitForSelector('.bar-notification.success');

  // Open cart page to begin test steps
  await cartPage.openCartPage();

  
  // Test Steps

  // Step 1: Update product quantity to 2
  await cartPage.updateProductQuantity('Computing and Internet', 2);

  // Expected Results
 
  //quantity is updated to 2
  const quantity = await cartPage.getProductQuantity('Computing and Internet');
  expect(quantity).toBe(2);

  //subtotal and total are updated correctly
  const totals = await cartPage.getCartTotals();
  expect(totals.subTotal).toContain('20.00');
  expect(totals.total).toContain('20.00');
});

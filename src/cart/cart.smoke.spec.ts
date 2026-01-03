import { test, expect } from '@playwright/test';
import { CategoryPage } from '../../pages/CategoryPage';
import { CartPage } from '../../pages/CartPage';
import { LoginPage } from '../../pages/LoginPage';


test('CART-SM-01 | Add Product to Shopping Cart (Smoke Test)', async ({ page }) => {
  const categoryPage = new CategoryPage(page);
  const cartPage = new CartPage(page);

  const loginPage = new LoginPage(page);

 
  // Preconditions 
  await loginPage.login('ekadric@student.ius.edu.ba','project');

  
  await cartPage.openCartPage();
  await cartPage.clearCartIfNeeded(); // shopping cart is empty

  
  // Test Steps
 
  
  await page.goto('https://demowebshop.tricentis.com'); //navigating to homepage

  
  // Select Books category (sidebar Categories)
  // NOTE:
  // direct locator is used here to avoid modifying shared CategoryPage.

  await page
  .locator('.block-category-navigation')
  .locator('a', { hasText: 'Books' })
  .first()
  .click();

  // Add product to cart
  await categoryPage.addToCartFromList('Computing and Internet');
  await page.waitForSelector('.bar-notification.success');


  
  await cartPage.openCartPage(); //open Shopping Cart page


  // Expected Results


  
  await expect(
    cartPage.rowByProductName('Computing and Internet')
  ).toBeVisible();  //product is displayed in cart

  // quantity is 1 by default
  const quantity = await cartPage.getProductQuantity('Computing and Internet');
  expect(quantity).toBe(1);

  // Total price is equal to 10.00
  const totals = await cartPage.getCartTotals();
  expect(totals.subTotal).toContain('10.00');
  expect(totals.total).toContain('10.00');

  // Cart counter is 1 in header
  await expect.poll(async () => {
    return await cartPage.getHeaderCartCount();
  }).toBe(1);
});

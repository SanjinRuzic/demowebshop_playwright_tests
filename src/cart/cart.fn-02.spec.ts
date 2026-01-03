import { test, expect } from '@playwright/test';
import { CategoryPage } from '../../pages/CategoryPage';
import { CartPage } from '../../pages/CartPage';
import { LoginPage } from '../../pages/LoginPage';

test('CART-FN-02 | Remove Product from Shopping Cart', async ({ page }) => {
  const categoryPage = new CategoryPage(page);
  const cartPage = new CartPage(page);
  const loginPage = new LoginPage(page);

  // Preconditions
 

  // User is logged in
  await loginPage.login('ekadric@student.ius.edu.ba','project' );

  
  await cartPage.openCartPage();
  await cartPage.clearCartIfNeeded(); // to ensure cart is empty

  await page.goto('https://demowebshop.tricentis.com');

  // Select Books category from sidebar categories  
  await page
    .locator('.block-category-navigation')
    .locator('a', { hasText: 'Books' })
    .first()
    .click();

  await categoryPage.addToCartFromList('Computing and Internet');
  await page.waitForSelector('.bar-notification.success');

  await cartPage.openCartPage();

  
  // Test Steps

  // Step 1 andd 2: removing product from cart
  await cartPage.removeProduct('Computing and Internet');

  
  // Expected Results
  

  // Cart is empty
  const isEmpty = await cartPage.isCartEmpty();
  expect(isEmpty).toBe(true);

  // Cart counter shows 0
  await expect.poll(async () => {
    return await cartPage.getHeaderCartCount();
  }).toBe(0);
});

import { test, expect } from '@playwright/test';
import { CategoryPage } from '../../pages/CategoryPage';
import { CartPage } from '../../pages/CartPage';
import { LoginPage } from '../../pages/LoginPage';

test('CART-FN-03 | Verify Shopping Cart Totals', async ({ page }) => {
  const categoryPage = new CategoryPage(page);
  const cartPage = new CartPage(page);
  const loginPage = new LoginPage(page);

 
  // Preconditions

  
  await loginPage.login( 'ekadric@student.ius.edu.ba','project' );

 
  await cartPage.openCartPage();
  await cartPage.clearCartIfNeeded();  // Ensure cart is empty

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

  // Setting quantity to 2
  await cartPage.updateProductQuantity('Computing and Internet', 2);

 
  //Expected Results
 
  const totals = await cartPage.getCartTotals();

  expect(totals.subTotal).toContain('20.00');
  expect(totals.shipping).toContain('0.00');
  expect(totals.tax).toContain('0.00');
  expect(totals.total).toContain('20.00');
});

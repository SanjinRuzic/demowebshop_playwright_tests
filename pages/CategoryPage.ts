import { Page, Locator } from '@playwright/test';

export class CategoryPage {
  readonly page: Page;
  readonly productLinks: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productLinks = page.locator('.product-title a');
  }

  
    //Shared utility used in multiple tests.
    // Keep generic and reusable where possible.
   
  async gotoCategory(categoryName: string) {
    await this.page.locator(`a:has-text("${categoryName}")`).click();
  }

   // Opens a product detail page from the listing.
   // Used in different test flows, adjust carefully if needed.
   
  async openProduct(productName: string) {
    const product = this.page.locator('.product-item', { hasText: productName });
    await product.locator('a').first().click();
  }

    // adds item to cart directly from category view.
    // Referenced in cart-related tests, try to keep consistent.
  async addToCartFromList(productName: string) {
    const product = this.page.locator('.product-item', { hasText: productName });
    await product.locator('input[value="Add to cart"]').click();
  }
}

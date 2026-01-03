import { Page, Locator } from '@playwright/test';

export class CartPage {
  readonly page: Page;

  // cart elements
  readonly cartRows: Locator;
  readonly updateCartButton: Locator;
  readonly removeCheckboxes: Locator;

  // totals section
  readonly subTotal: Locator;
  readonly shipping: Locator;
  readonly tax: Locator;
  readonly total: Locator;

  // empty state
  readonly emptyCartMessage: Locator;

  // header cart link
  readonly cartHeaderLink: Locator;

  constructor(page: Page) {
    this.page = page;

    this.cartRows = page.locator('table.cart tbody tr');
    this.updateCartButton = page.locator('input[name="updatecart"]');
    this.removeCheckboxes = page.locator('input[name^="removefromcart"]');

    // locating summary totals
    this.subTotal = page.locator(
      '.cart-total .cart-total-left:has-text("Sub-Total") + .cart-total-right'
    );
    
    this.shipping = page.locator(
      '.cart-total .cart-total-left:has-text("Shipping") + .cart-total-right'
    );
    
    this.tax = page.locator(
      '.cart-total .cart-total-left:has-text("Tax") + .cart-total-right'
    );
    
    // grab the last total in case there are multiple matches
    this.total = page.locator(
      '.cart-total tr:has(.cart-total-left:has-text("Total")) .cart-total-right'
    ).last();

    this.emptyCartMessage = page.locator('.order-summary-content');
    this.cartHeaderLink = page.locator('a.ico-cart:has-text("(")');
  }

  async openCartPage() {
      await this.page.goto('https://demowebshop.tricentis.com/cart');
      await this.page.waitForLoadState('networkidle');
  }

  // find specific product row by name
  rowByProductName(productName: string): Locator {
    return this.cartRows.filter({ hasText: productName }).first();
  }

  async getProductQuantity(productName: string): Promise<number> {
    const row = this.rowByProductName(productName);
    const value = await row.locator('input.qty-input').inputValue();
    return Number(value);
  }

  async updateProductQuantity(productName: string, quantity: number) {
    const row = this.rowByProductName(productName);
    await row.locator('input.qty-input').fill(quantity.toString());
    await this.updateCartButton.click();
  }

  async removeProduct(productName: string) {
    const row = this.rowByProductName(productName);
    await row.locator('input[name^="removefromcart"]').check();
    await this.updateCartButton.click();
  }

  //extract cart count from header text
  async getHeaderCartCount(): Promise<number> {
    const text = (await this.cartHeaderLink.textContent()) ?? '';
    const match = text.match(/\((\d+)\)/);
    return match ? Number(match[1]) : 0;
  }

  async getCartTotals() {
    return {
      subTotal: (await this.subTotal.textContent())?.trim() ?? '',
      shipping: (await this.shipping.textContent())?.trim() ?? '',
      tax: (await this.tax.textContent())?.trim() ?? '',
      total: (await this.total.textContent())?.trim() ?? '',
    };
  }

  async isCartEmpty(): Promise<boolean> {
    return await this.emptyCartMessage.isVisible();
  }

  //clear all items from cart
  async clearCartIfNeeded() {
    if (await this.cartRows.count() === 0) return;

    const count = await this.removeCheckboxes.count();
    for (let i = 0; i < count; i++) {
      await this.removeCheckboxes.nth(i).check();
    }
    await this.updateCartButton.click();
  }
}
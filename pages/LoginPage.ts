import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly loginError: Locator;
    readonly accountHeader: Locator;
    readonly logoutLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.emailInput = page.locator('#Email');
        this.passwordInput = page.locator('#Password');
        this.loginButton = page.locator('input[value="Log in"]');

        // Error message on invalid login
        this.loginError = page.locator('.validation-summary-errors');

        // Logged in elements
        this.accountHeader = page.locator('.header-links .account');
        this.logoutLink = page.locator('a[href="/logout"]');
    }

    async open() {
        await this.page.goto('https://demowebshop.tricentis.com/login');
        await this.page.waitForLoadState('domcontentloaded');
    }

    async login(email: string, password: string) {
        await this.open();
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
        await this.page.waitForLoadState('networkidle');
    }

    async expectLoginSuccess(email: string) {
        // Wait for navigation to complete and header to be visible
        await this.page.waitForURL(/^(?!.*login).*$/); // Wait for URL that doesn't contain "login"
        await expect(this.accountHeader).toBeVisible({ timeout: 10000 });
        await expect(this.accountHeader).toHaveText(email);
        await expect(this.logoutLink).toBeVisible();
    }

    async expectLoginFailed() {
        // On failed login, we should stay on login page
        await expect(this.page).toHaveURL(/login/);
        await expect(this.loginError).toBeVisible({ timeout: 5000 });
        await expect(this.accountHeader).toBeHidden();
        await expect(this.logoutLink).toBeHidden();
    }
}
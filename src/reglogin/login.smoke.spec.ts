import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test.describe('Login Smoke Test', () => {
    test('LOGIN-SM-01: Successful login with valid credentials', async ({ page }) => {
        const loginPage = new LoginPage(page);

        const timestamp = Date.now();
        const email = `smoketest${timestamp}@example.com`;
        const password = 'password123';
        const firstName = 'Smoke';
        const lastName = 'Test';

        await page.goto('https://demowebshop.tricentis.com/register');

        await page.locator('#gender-male').click();
        await page.locator('#FirstName').fill(firstName);
        await page.locator('#LastName').fill(lastName);
        await page.locator('#Email').fill(email);
        await page.locator('#Password').fill(password);
        await page.locator('#ConfirmPassword').fill(password);

        await page.locator('#register-button').click();

        await page.waitForLoadState('networkidle');

        const resultText = await page.locator('.result').textContent();
        expect(resultText).toContain('Your registration completed');

        const continueButton = page.locator('input[value="Continue"]');
        if (await continueButton.isVisible()) {
            await continueButton.click();
            await page.waitForLoadState('networkidle');
        }

        await page.locator('a[href="/logout"]').click();
        await page.waitForLoadState('networkidle');

        await loginPage.login(email, password);
        await loginPage.expectLoginSuccess(email);

        const currentURL = page.url();
        expect(currentURL).toBe('https://demowebshop.tricentis.com/');

    });
});
import { test, expect } from '@playwright/test';
import { RegisterPage } from '../../pages/RegisterPage';

test.describe('Registration – Smoke Test', () => {

    test('REG-SM-01: Successful registration with new email', async ({ page }) => {
        const registerPage = new RegisterPage(page);

        const timestamp = Date.now();
        const uniqueEmail = `testuser${timestamp}@example.com`;

        await registerPage.open();

        await registerPage.genderMale.click();

        await registerPage.register({
            firstName: 'John',
            lastName: 'Doe',
            email: uniqueEmail,
            password: 'password123'
        });

        await expect(registerPage.successMessage).toBeVisible({ timeout: 5000 });
        await expect(registerPage.successMessage)
            .toContainText('Your registration completed');

        await expect(registerPage.generalError).toBeHidden();
        await expect(registerPage.fieldErrors).toHaveCount(0);

        const continueButton = page.locator('input[value="Continue"]');
        await continueButton.click();

        await expect(page).toHaveURL('https://demowebshop.tricentis.com/');
    });

});
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test.describe('Login Functional Test', () => {
    test('LOGIN-FN-01: Login with invalid password', async ({ page }) => {
        const loginPage = new LoginPage(page);

        const validEmail = 'testuser@example.com';
        const invalidPassword = 'wrongpassword123';

        await loginPage.login(validEmail, invalidPassword);

        await loginPage.expectLoginFailed();

        const errorText = await loginPage.loginError.textContent();
        expect(errorText?.toLowerCase()).toContain('unsuccessful');

        await expect(page).toHaveURL(/\/login/);

    });
});
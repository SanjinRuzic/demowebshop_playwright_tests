import { test } from '@playwright/test';
import { RegisterPage } from '../../pages/RegisterPage';

test.describe('Registration – Functional Tests', () => {

    test('REG-FN-01: Registration with existing email', async ({ page }) => {
        const registerPage = new RegisterPage(page);
        const existingEmail = 'testuser@example.com';

        await registerPage.open();

        await registerPage.genderFemale.click();

        await registerPage.register({
            firstName: 'Jane',
            lastName: 'Smith',
            email: existingEmail,
            password: 'password123'
        });

        await registerPage.expectRegistrationFailedBecauseEmailExists();

    });

});
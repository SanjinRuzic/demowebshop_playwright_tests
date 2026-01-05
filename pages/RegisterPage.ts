import { Page, Locator, expect } from '@playwright/test';

export class RegisterPage {
    readonly page: Page;

    // Form fields
    readonly genderMale: Locator;
    readonly genderFemale: Locator;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly confirmPasswordInput: Locator;
    readonly registerButton: Locator;

    // Messages
    readonly fieldErrors: Locator;
    readonly generalError: Locator;
    readonly successMessage: Locator;

    constructor(page: Page) {
        this.page = page;

        this.genderMale = page.locator('#gender-male');
        this.genderFemale = page.locator('#gender-female');
        this.firstNameInput = page.locator('#FirstName');
        this.lastNameInput = page.locator('#LastName');
        this.emailInput = page.locator('#Email');
        this.passwordInput = page.locator('#Password');
        this.confirmPasswordInput = page.locator('#ConfirmPassword');
        this.registerButton = page.locator('#register-button');

        // Error & success messages
        this.fieldErrors = page.locator('.field-validation-error');
        this.generalError = page.locator('.message-error');
        this.successMessage = page.locator('.result');
    }

    async open() {
        await this.page.goto('https://demowebshop.tricentis.com/register');
    }

    async fillForm(user: {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
    }) {
        await this.firstNameInput.fill(user.firstName);
        await this.lastNameInput.fill(user.lastName);
        await this.emailInput.fill(user.email);
        await this.passwordInput.fill(user.password);
        await this.confirmPasswordInput.fill(user.password);
    }

    async submit() {
        await this.registerButton.click();
    }

    async register(user: {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
    }) {
        await this.fillForm(user);
        await this.submit();
    }

    async expectRegistrationFailedBecauseEmailExists() {
        await expect(this.generalError).toBeVisible();
        await expect(this.generalError).toContainText(/already exists|registered/i);
        await expect(this.successMessage).toBeHidden();
    }
}
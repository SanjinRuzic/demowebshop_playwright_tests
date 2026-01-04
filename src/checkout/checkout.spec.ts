import { test, expect } from "@playwright/test";

test("Making sure billing address is visible and selectable. ", async ({
                                                                           page,
                                                                       }) => {
    await page.goto("https://demowebshop.tricentis.com/login");
    await page.locator("#Email").fill("amina123@mail.com");
    await page.locator("#Password").fill("123456");
    await page.locator("input[value='Log in']").click();

    await page.goto("https://demowebshop.tricentis.com/onepagecheckout");
    const logo = page.getByText(" Billing Address ");

    expect(logo).toBeTruthy();
    page.getByLabel("Select a billing address from");
});
//
//
//
//
//
//
//
//
test("Making sure shipping address is visible and selectable.", async ({
                                                                           page,
                                                                       }) => {
    await page.goto("https://demowebshop.tricentis.com/login");
    await page.locator("#Email").fill("amina123@mail.com");
    await page.locator("#Password").fill("123456");
    await page.locator("input[value='Log in']").click();

    await page.goto("https://demowebshop.tricentis.com/onepagecheckout");
    const logo = page.getByRole("heading", { name: "Shipping address" });
    expect(logo).toBeTruthy();

    page.getByLabel("billing-address-select");
});

//
//
//
//
//
//
//
//
//
//
//
//
test("Making sure shipping methods are visible and selectable.", async ({
                                                                            page,
                                                                        }) => {
    await page.goto("https://demowebshop.tricentis.com/login");
    await page.locator("#Email").fill("amina123@mail.com");
    await page.locator("#Password").fill("123456");
    await page.locator("input[value='Log in']").click();

    await page.goto("https://demowebshop.tricentis.com/onepagecheckout");
    const logo = page.getByRole("heading", { name: "Shipping method" });
    expect(logo).toBeTruthy();

    page.getByRole("radio", { name: "Ground (0.00)" });
});
//
//
//
//
//
//
//
//
//
//

test("Making sure payment methods are visible and selectable.", async ({
                                                                           page,
                                                                       }) => {
    await page.goto("https://demowebshop.tricentis.com/login");
    await page.locator("#Email").fill("amina123@mail.com");
    await page.locator("#Password").fill("123456");
    await page.locator("input[value='Log in']").click();

    await page.goto("https://demowebshop.tricentis.com/onepagecheckout");

    const logo = page.getByRole("heading", { name: "Payment method" });

    page.getByRole("radio", { name: "Cash On Delivery (COD) (7.00" });
});
//
//
//
//
//
//
//
//
//
//
//
//
//
test("Making sure payment information is visible.", async ({ page }) => {
    await page.goto("https://demowebshop.tricentis.com/login");
    await page.locator("#Email").fill("amina123@mail.com");
    await page.locator("#Password").fill("123456");
    await page.locator("input[value='Log in']").click();

    await page.goto("https://demowebshop.tricentis.com/onepagecheckout");

    const logo = page.getByRole("heading", { name: "Payment information" });

    page.getByRole("heading", { name: "Payment information" });
    page.getByText("You will pay by COD");
});
//
//
//
//
//
//

test("Confirm order is visible", async ({ page }) => {
    page.getByRole("heading", { name: "Confirm order" });
    page.getByText("Billing Address", { exact: true });
    page.getByText("Shipping Address", { exact: true });
    page.getByRole("columnheader", { name: "Product(s)" });
    page.getByRole("button", { name: "Confirm" });
    page.getByRole("heading", { name: "Thank you" });
});
//
//
//
//
//
//
//
//
//
//
//

test("SMOKE User can complete checkout with valid data", async ({ page }) => {
    await page.goto("https://demowebshop.tricentis.com/");
    await page.getByRole("link", { name: "Log in" }).click();
    await page.getByRole("textbox", { name: "Email:" }).click();
    await page.getByRole("textbox", { name: "Email:" }).fill("amina123@mail.com");
    await page.getByRole("textbox", { name: "Password:" }).click();
    await page.getByRole("textbox", { name: "Password:" }).fill("123456");
    await page.getByRole("button", { name: "Log in" }).click();

    await page.goto("https://demowebshop.tricentis.com/");
    await page.getByRole("button", { name: "Add to cart" }).nth(1).click();
    page.getByRole("link", { name: "Shopping cart (1)" });
    await page.getByRole("button", { name: "Checkout" }).click;
    await page.getByRole("button", { name: "Continue" }).click;
    await page.getByRole("button", { name: "Continue" }).click;
    await page.getByRole("button", { name: "Continue" }).click;
    await page.getByRole("button", { name: "Continue" }).click;
    await page.getByRole("button", { name: "Continue" }).click;
    await page.getByRole("button", { name: "Confirm" }).click;
    await page.getByRole("button", { name: "Continue" }).click;
});

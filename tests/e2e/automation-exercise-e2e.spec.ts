import { test, expect } from "./fixtures/pages.fixture";
import { registerUser } from "./helpers/auth.helper";

test("E2E Test Case 1: Register User", async ({
  page,
  homePage,
  signupLoginPage,
  signupPage,
  user,
}) => {
  await registerUser({ page, homePage, signupLoginPage, signupPage, user });
  await expect(homePage.loggedUserText).toHaveText(user.seed);

  await homePage.clickDeleteAccountLink();
  await expect(
    page.getByRole("heading", { name: "ACCOUNT DELETED!" }),
  ).toBeVisible();
  await homePage.clickContinueButton();
});

test("E2E Test Case 2: Login User with correct email and password", async ({
  page,
  homePage,
  signupLoginPage,
  signupPage,
  user,
}) => {
  await registerUser({ page, homePage, signupLoginPage, signupPage, user });
  await homePage.clickLogoutLink();
  await homePage.goto();
  await homePage.expectTitle();
  await homePage.clickSignupLoginLink();
  await signupLoginPage.expectLoginToYourAccountTextVisible();
  await signupLoginPage.fillLoginForm({ email: user.email, seed: user.seed });
  await signupLoginPage.clickLoginButton();
  await expect(homePage.loggedUserText).toHaveText(user.seed);
  await homePage.clickDeleteAccountLink();
  await expect(
    page.getByRole("heading", { name: "ACCOUNT DELETED!" }),
  ).toBeVisible();
});

test("E2E Test Case 3: Login User with incorrect email and password", async ({
  page,
  homePage,
  signupLoginPage,
}) => {
  await homePage.goto();
  await homePage.expectTitle();
  await homePage.clickSignupLoginLink();
  await signupLoginPage.expectLoginToYourAccountTextVisible();
  await signupLoginPage.fillLoginForm({ email: "abc@cba.com", seed: "1234" });
  await signupLoginPage.clickLoginButton();
  await expect(
    page.getByText("Your email or password is incorrect!"),
  ).toBeVisible();
});

test("E2E Test Case 4: Logout User", async ({
  page,
  homePage,
  signupLoginPage,
  signupPage,
  user,
}) => {
  await registerUser({ page, homePage, signupLoginPage, signupPage, user });
  await homePage.clickLogoutLink();
  await signupLoginPage.expectTitle();
});

test("E2E Test Case 5: Register User with existing email", async ({
  page,
  homePage,
  signupLoginPage,
  signupPage,
  user,
}) => {
  await registerUser({ page, homePage, signupLoginPage, signupPage, user });
  await homePage.clickLogoutLink();
  await homePage.goto();
  await homePage.expectTitle();
  await homePage.clickSignupLoginLink();
  await signupLoginPage.expectNewUserSignupTextVisible();
  await signupLoginPage.fillPreSignupForm({
    seed: user.seed,
    email: user.email,
  });
  await signupLoginPage.clickSignupButton();
  await expect(page.getByText("Email Address already exist!")).toBeVisible();
});

test("E2E Test Case 6: Contact Us Form", async ({
  page,
  homePage,
  contactUsPage,
  user,
}) => {
  await homePage.goto();
  await homePage.expectTitle();
  await homePage.expectHomePageVisible();

  await homePage.clickContactUsButton();
  await contactUsPage.expectGetInTouchTextVisible();

  await contactUsPage.fillGetInTouchForm({
    email: user.email,
    seed: user.seed,
  });

  await contactUsPage.submitFormAndAcceptDialog();
  await expect(
    page
      .locator("#contact-page")
      .getByText("Success! Your details have been submitted successfully."),
  ).toBeVisible();
  await contactUsPage.clickHomeButton();
  await homePage.expectHomePageVisible();
});

test("E2E Test Case 7: Verify Test Cases Page", async ({
  page,
  homePage,
  contactUsPage,
}) => {
  await homePage.goto();
  await homePage.expectHomePageVisible();
  await homePage.clickTestCasesLink();
  await expect(page).toHaveTitle(/Test Cases/);
});

test("E2E Test Case 8: Verify All Products and product detail page", async ({
  page,
  homePage,
  productsPage,
  productPage,
}) => {
  await homePage.goto();
  await homePage.expectHomePageVisible();
  await homePage.clickProductsLink();
  await productsPage.expectTitle();
  expect(page.locator(".features_items")).toBeVisible();
  await productsPage.clickViewProductLinkFirst();
  await productPage.expectTitle();
  await expect(page.locator(".product-information h2")).toBeVisible();
  await expect(
    page.locator(".product-information p", { hasText: "Category" }),
  ).toBeVisible();
  await expect(
    page.locator(".product-information span span", { hasText: "Rs." }),
  ).toBeVisible();
  await expect(
    page.locator(".product-information p", { hasText: "Availability" }),
  ).toBeVisible();
  await expect(
    page.locator(".product-information p", { hasText: "Condition" }),
  ).toBeVisible();
  await expect(
    page.locator(".product-information p", { hasText: "Brand" }),
  ).toBeVisible();
});

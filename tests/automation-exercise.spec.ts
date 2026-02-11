import { test, expect } from "./fixtures/pages.fixture";

test.describe("login / register tests", () => {
  
  test.beforeEach(async ({ page, homePage, signupLoginPage, signupPage, user }) => {
    
    // Register user
    await homePage.goto();
    await homePage.expectTitle();
    await homePage.clickSignupLoginLink();
    await signupLoginPage.expectNewUserSignupTextVisible();
    await signupLoginPage.fillPreSignupForm({
      seed: user.seed,
      email: user.email,
    });
    await signupLoginPage.clickSignupButton();
    await signupPage.expectAccountInformationTextVisible();
    await signupPage.fillSignupFormAccountInfo({
      seed: user.seed,
      days: user.days,
      months: user.months,
      years: user.years,
    });
    await signupPage.fillSignupFormAddressInfo({
      seed: user.seed,
      country: user.country,
      state: user.state,
      city: user.city,
      zipcode: user.zipcode,
      mobileNumber: user.mobileNumber,
    });
    await signupPage.clickCreateAccountButton();
    await expect(page.getByText("Account Created!")).toBeVisible();
    await signupPage.clickContinueButton();
  });

  test("Test Case 1: Register User", async ({ page, homePage, user }) => {
    await expect(homePage.loggedUserText).toHaveText(user.seed);

    await homePage.clickDeleteAccountLink();
    await expect(
      page.getByRole("heading", { name: "ACCOUNT DELETED!" }),
    ).toBeVisible();
    await homePage.clickContinueButton();
  });

  test("Test Case 2: Login User with correct email and password", async ({
    page,
    homePage,
    signupLoginPage,
    user
  }) => {
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
});

import { test, expect } from "./fixtures/pages.fixture";
import { registerUser } from "./helpers/auth.helper";

test.describe("tests with initial user registration", () => {
  test.beforeEach(
    async ({ page, homePage, signupLoginPage, signupPage, user }) => {
      await registerUser({ page, homePage, signupLoginPage, signupPage, user });
    },
  );

  test("Test Case 2: Login User with correct email and password", async ({
    page,
    homePage,
    signupLoginPage,
    user,
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

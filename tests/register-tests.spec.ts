import { test, expect } from "./fixtures/pages.fixture";
import { registerUser } from "./helpers/auth.helper";

test.describe("register tests", () => {
  test("Test Case 1: Register User", async ({
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
});
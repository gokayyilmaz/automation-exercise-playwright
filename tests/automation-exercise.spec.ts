import { test, expect } from "./fixtures/pages.fixture";
import { registerUser } from "./helpers/auth.helper";

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

test("Test Case 2: Login User with correct email and password", async ({
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

test("Test Case 3: Login User with incorrect email and password", async ({
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

test("Test Case 4: Logout User", async ({
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

test("Test Case 5: Register User with existing email", async ({
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

test("Test Case 6: Contact Us Form", async ({
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
  await contactUsPage.expectSuccessMessageVisible();
  await contactUsPage.clickHomeButton();
  await homePage.expectHomePageVisible();
});

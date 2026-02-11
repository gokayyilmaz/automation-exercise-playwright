import { test, expect } from "./fixtures/pages.fixture";
import { createRandomUser } from "./utils/user-data.factory";

test("register user", async ({
  page,
  homePage,
  signupLoginPage,
  signupPage,
}) => {
  const user = createRandomUser();

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
  await expect(homePage.loggedUserText).toHaveText(user.seed);

  await homePage.clickDeleteAccountLink();
  await expect(
    page.getByRole("heading", { name: "ACCOUNT DELETED!" }),
  ).toBeVisible();
  await homePage.clickContinueButton();
});

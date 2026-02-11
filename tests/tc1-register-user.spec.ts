import { test, expect } from "@playwright/test";
import { createRandomUser } from "./utils/test-data";
import { HomePage } from "./pages/home-page";
import { SignupLoginPage } from "./pages/signup-login-page";
import { SignupPage } from "./pages/signup-page";

test("register user", async ({ page }) => {
  const user = createRandomUser();
  const home = new HomePage(page);
  const signupLogin = new SignupLoginPage(page);
  const signup = new SignupPage(page);

  await home.goto();
  await home.expectTitle();
  await home.clickSignupLoginLink();
  await signupLogin.expectNewUserSignupTextVisible();

  await signupLogin.fillPreSignupForm({ seed: user.seed, email: user.email });
  await signupLogin.clickSignupButton();
  await signup.expectAccountInformationTextVisible();

  await signup.fillSignupFormAccountInfo({
    seed: user.seed,
    days: user.days,
    months: user.months,
    years: user.years,
  });
  await signup.fillSignupFormAddressInfo({
    seed: user.seed,
    country: user.country,
    state: user.state,
    city: user.city,
    zipcode: user.zipcode,
    mobileNumber: user.mobileNumber,
  });
  await signup.clickCreateAccountButton()
  await expect(page.getByText("Account Created!")).toBeVisible();
  await signup.clickContinueButton()
  await expect(home.loggedUserText).toHaveText(user.seed);
  
  await home.clickDeleteAccountLink()
  await expect(
    page.getByRole("heading", { name: "ACCOUNT DELETED!" }),
  ).toBeVisible();
  await home.clickContinueButton()
});

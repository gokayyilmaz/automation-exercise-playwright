import { expect, type Page } from "@playwright/test";
import { type HomePage } from "../pages/home.page";
import { type SignupLoginPage } from "../pages/signup-login.page";
import { type SignupPage } from "../pages/signup.page";
import { type UserData } from "../utils/user-data.factory";

type RegisterUserParams = {
  page: Page;
  homePage: HomePage;
  signupLoginPage: SignupLoginPage;
  signupPage: SignupPage;
  user: UserData;
};

export async function registerUser(params: RegisterUserParams) {
  const { page, homePage, signupLoginPage, signupPage, user } = params;
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
}

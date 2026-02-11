import { test as base } from "@playwright/test";
import { HomePage } from "../pages/home.page";
import { SignupLoginPage } from "../pages/signup-login.page";
import { SignupPage } from "../pages/signup.page";
import { createRandomUser, type UserData } from "../utils/user-data.factory";

type PageFixtures = {
  homePage: HomePage;
  signupLoginPage: SignupLoginPage;
  signupPage: SignupPage;
  user: UserData;
};

export const test = base.extend<PageFixtures>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },

  signupLoginPage: async ({ page }, use) => {
    const signupLoginPage = new SignupLoginPage(page);
    await use(signupLoginPage);
  },

  signupPage: async ({ page }, use) => {
    const signupPage = new SignupPage(page);
    await use(signupPage);
  },

  user: async({}, use) => {
    await use(createRandomUser());
  }
});

export { expect } from "@playwright/test";

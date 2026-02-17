import { test as base } from "@playwright/test";
import { createRandomUser, type UserData } from "../utils/user-data.factory";
import { HomePage } from "../pages/home.page";
import { SignupLoginPage } from "../pages/signup-login.page";
import { SignupPage } from "../pages/signup.page";
import { ContactUsPage } from "../pages/contact-us.page";
import { ProductsPage } from "../pages/products.page";
import { ProductPage } from "../pages/product.page";

type PageFixtures = {
  user: UserData;
  homePage: HomePage;
  signupLoginPage: SignupLoginPage;
  signupPage: SignupPage;
  contactUsPage: ContactUsPage;
  productsPage: ProductsPage;
  productPage: ProductPage;
};

export const test = base.extend<PageFixtures>({
  user: async ({}, use) => {
    await use(createRandomUser());
  },
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

  contactUsPage: async ({ page }, use) => {
    const contactUsPage = new ContactUsPage(page);
    await use(contactUsPage);
  },

  productsPage: async ({ page }, use) => {
    const productsPage = new ProductsPage(page);
    await use(productsPage);
  },

  productPage: async ({ page }, use) => {
    const productPage = new ProductPage(page);
    await use(productPage);
  },
});

export { expect } from "@playwright/test";

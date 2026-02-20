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

test("Test Case 7: Verify Test Cases Page", async ({
  page,
  homePage,
  contactUsPage,
}) => {
  await homePage.goto();
  await homePage.expectHomePageVisible();
  await homePage.clickTestCasesLink();
  await expect(page).toHaveTitle(/Test Cases/);
});

test("Test Case 8: Verify All Products and product detail page", async ({
  page,
  homePage,
  productsPage,
  productPage,
}) => {
  await homePage.goto();
  await homePage.expectHomePageVisible();
  await homePage.clickProductsLink();
  await productsPage.expectTitle();
  await expect(page.locator(".features_items")).toBeVisible();
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

test("Test Case 9: Search Product", async ({
  page,
  homePage,
  productsPage,
}) => {
  await homePage.goto();
  await homePage.expectHomePageVisible();
  await homePage.clickProductsLink();
  await productsPage.expectTitle();
  await expect(page.locator(".features_items")).toBeVisible();
  await productsPage.fillSearchProductTextbox("shirt");
  await productsPage.clickSearchButton();
  await expect(
    page.getByRole("heading", { name: "SEARCHED PRODUCTS" }),
  ).toBeVisible();
  const results = await productsPage.getProductNames();
  expect(results.length).toBeGreaterThan(0);
  for (const result of results) {
    expect(result).toMatch(new RegExp("shirt|top", "i"));
  }
});

test("Test Case 10: Verify Subscription in home page", async ({
  page,
  user,
  homePage,
}) => {
  await homePage.goto();
  await homePage.expectHomePageVisible();
  await homePage.scroolToFooter();
  await expect(
    page.getByRole("heading", { name: "SUBSCRIPTION" }),
  ).toBeVisible();
  await homePage.fillSubscribeEmailTextbox(user.email);
  await homePage.clickSubscribeButton();
  await expect(
    page.getByText("You have been successfully subscribed!"),
  ).toBeVisible();
});

test("Test Case 11: Verify Subscription in Cart page", async ({
  page,
  user,
  homePage,
  cartPage,
}) => {
  await homePage.goto();
  await homePage.expectHomePageVisible();
  await homePage.clickCartButton();
  await cartPage.scroolToFooter();
  await expect(
    page.getByRole("heading", { name: "SUBSCRIPTION" }),
  ).toBeVisible();
  await cartPage.fillSubscribeEmailTextbox(user.email);
  await cartPage.clickSubscribeButton();
  await expect(
    page.getByText("You have been successfully subscribed!"),
  ).toBeVisible();
});

test("Test Case 12: Add Products in Cart", async ({
  page,
  homePage,
  productsPage,
  cartPage,
}) => {
  await homePage.goto();
  await homePage.expectHomePageVisible();
  await homePage.clickProductsLink();
  const productPrices = [
    await productsPage.getProductPrice(0),
    await productsPage.getProductPrice(1),
  ];
  await productsPage.hoverAndAddToCartTheProduct(0);
  await productsPage.clickContinueShoppingButton();
  await productsPage.hoverAndAddToCartTheProduct(1);
  await productsPage.clickViewCartLink();

  const productsRows = page.locator("#cart_info_table tbody tr");
  await expect(productsRows).toHaveCount(2);
  const numberOfProductsInCart = await productsRows.count();

  for (let i = 0; i < numberOfProductsInCart; i++) {
    const productRow = page.locator(`#product-${i + 1}`);
    await expect(productRow.locator(".cart_price")).toHaveText(productPrices[i]);
    await expect(productRow.locator(".cart_quantity")).toHaveText("1");
    await expect(productRow.locator(".cart_total")).toHaveText(productPrices[i]);
  }
});

test("Test Case 13: Verify Product quantity in Cart", async ({
  page,
  homePage,
  productPage,
}) => {
  await homePage.goto();
  await homePage.expectHomePageVisible();
  await homePage.clickViewProductButtonFirst();
  await productPage.expectTitle();
  await productPage.fillQuantityInput("4");
  await productPage.clickAddToCartButton();
  await productPage.clickViewCartButton();
  await expect(page.locator(".cart_quantity button")).toHaveText("4");
});

import { expect, type Locator, type Page } from "@playwright/test";

export class SignupLoginPage {
  readonly page: Page;
  readonly newUserSignupText: Locator;
  readonly loginToYourAccountText: Locator;
  readonly signupNameTextbox: Locator;
  readonly signupEmailTextbox: Locator;
  readonly signupButton: Locator;
  readonly loginEmailTextbox: Locator;
  readonly loginPasswordTextbox: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.newUserSignupText = page.getByText("New User Signup!");
    this.loginToYourAccountText = page.getByText("Login to your account");
    this.signupNameTextbox = page.getByTestId("signup-name");
    this.signupEmailTextbox = page.getByTestId("signup-email");
    this.signupButton = page.getByRole("button", { name: "Signup" });
    this.loginEmailTextbox = page.getByTestId("login-email")
    this.loginPasswordTextbox = page.getByTestId("login-password")
    this.loginButton = page.getByRole("button", { name: "Login" });
  }

  async expectNewUserSignupTextVisible() {
    await expect(this.newUserSignupText).toBeVisible();
  }

  async expectLoginToYourAccountTextVisible() {
    await expect(this.loginToYourAccountText).toBeVisible();
  }

  async expectTitle() {
    await expect(this.page).toHaveTitle("Automation Exercise - Signup / Login")
  }

  async fillPreSignupForm(data: { seed: string; email: string }) {
    await this.signupNameTextbox.fill(data.seed);
    await this.signupEmailTextbox.fill(data.email);
  }

  async clickSignupButton() {
    await this.signupButton.click();
  }

  async fillLoginForm(data: { email: string; seed: string }) {
    await this.loginEmailTextbox.fill(data.email);
    await this.loginPasswordTextbox.fill(data.seed);
  }

  async clickLoginButton() {
    await this.loginButton.click();
  }
}

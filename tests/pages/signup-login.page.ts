import { expect, type Locator, type Page } from "@playwright/test";

export class SignupLoginPage {
  readonly page: Page;
  readonly newUserSignup: Locator;
  readonly signupNameTextbox: Locator;
  readonly signupEmailTextbox: Locator;
  readonly signupButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.newUserSignup = page.getByText("New User Signup!");
    this.signupNameTextbox = page.getByTestId("signup-name");
    this.signupEmailTextbox = page.getByTestId("signup-email");
    this.signupButton = page.getByRole("button", { name: "Signup" });
  }

  async expectNewUserSignupTextVisible() {
    await expect(this.newUserSignup).toBeVisible();
  }

  async fillPreSignupForm(data: { seed: string; email: string }) {
    await this.signupNameTextbox.fill(data.seed);
    await this.signupEmailTextbox.fill(data.email);
  }

  async clickSignupButton() {
    await this.signupButton.click();
  }
}

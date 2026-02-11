import { expect, type Locator, type Page } from "@playwright/test";

export class HomePage {
  readonly page: Page;
  readonly signupLoginLink: Locator;
  readonly loggedUserText: Locator;
  readonly deleteAccountLink: Locator;
  readonly continueButton: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signupLoginLink = page.getByRole("link", { name: /Signup \/ Login/ });
    this.loggedUserText = page.locator('a:has-text("Logged in as") b');
    this.deleteAccountLink = page.locator('a[href="/delete_account"]');
    this.logoutLink = page.locator('a[href="/logout"]');
    this.continueButton = page.getByRole("link", { name: "Continue" });
  }

  async goto() {
    await this.page.goto("https://automationexercise.com/");
  }

  async clickSignupLoginLink() {
    await this.signupLoginLink.click();
  }

  async expectTitle() {
    await expect(this.page).toHaveTitle("Automation Exercise");
  }

  async clickDeleteAccountLink() {
    await this.deleteAccountLink.click();
  }

  async clickLogoutLink() {
    await this.logoutLink.click();
  }

  async clickContinueButton() {
    await this.continueButton.click();
  }
}

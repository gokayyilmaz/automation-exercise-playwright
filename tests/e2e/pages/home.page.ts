import { expect, type Locator, type Page } from "@playwright/test";

export class HomePage {
  readonly page: Page;
  readonly signupLoginLink: Locator;
  readonly loggedUserText: Locator;
  readonly deleteAccountLink: Locator;
  readonly continueButton: Locator;
  readonly logoutLink: Locator;
  readonly contactUsButton: Locator;
  readonly homeSlider: Locator;
  readonly testCasesLink: Locator;
  readonly productsLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signupLoginLink = page.getByRole("link", { name: /Signup \/ Login/ });
    this.loggedUserText = page.locator('a:has-text("Logged in as") b');
    this.deleteAccountLink = page.locator('a[href="/delete_account"]');
    this.logoutLink = page.locator('a[href="/logout"]');
    this.continueButton = page.getByRole("link", { name: "Continue" });
    this.contactUsButton = page.getByRole("link", { name: "Contact us" });
    this.homeSlider = page.locator("#slider");
    this.testCasesLink = page
      .locator("#header")
      .getByRole("link", { name: "Test Cases" });
    this.productsLink = page.locator("a[href='/products']");
  }

  async goto() {
    await this.page.goto("http://automationexercise.com/");
  }

  async clickSignupLoginLink() {
    await this.signupLoginLink.click();
  }

  async expectTitle() {
    await expect(this.page).toHaveTitle("Automation Exercise");
  }

  async expectHomePageVisible() {
    await expect(this.homeSlider).toBeVisible();
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

  async clickContactUsButton() {
    await this.contactUsButton.click();
  }

  async clickTestCasesLink() {
    await this.testCasesLink.click();
    await this.dismissAdPopupIfVisible();
  }

  async clickProductsLink() {
    await this.productsLink.click();
    await this.dismissAdPopupIfVisible();
  }

  private async dismissAdPopupIfVisible() {
    const iframes = this.page.locator("iframe[name^='aswift_']");
    const iframesCount = await iframes.count();

    for (let i = 0; i < iframesCount; i++) {
      const dismissButton = iframes
        .nth(i)
        .contentFrame()
        .locator("#dismiss-button");

      if (await dismissButton.isVisible()) {
        await dismissButton.click();
        return;
      }
    }
  }
}

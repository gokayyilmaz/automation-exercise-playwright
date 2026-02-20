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
  readonly footer: Locator;
  readonly subscribeEmailTextbox: Locator;
  readonly subscribeButton: Locator;
  readonly cartButton: Locator;
  readonly viewProductButtonFirst;

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
    this.footer = page.locator(".footer-bottom");
    this.subscribeEmailTextbox = page.getByRole("textbox", {
      name: "Your email address",
    });
    this.subscribeButton = page.locator("#subscribe");
    this.cartButton = page.locator("#header").locator('a[href="/view_cart"]');
    this.viewProductButtonFirst = page
      .getByRole("link", { name: /View Product/ })
      .nth(0);
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
    const dismissSelector = "#dismiss-button";
    const timeoutMs = 5_000;
    const pollIntervalMs = 250;
    const deadline = Date.now() + timeoutMs;

    while (Date.now() < deadline) {
      for (const frame of this.page.frames()) {
        const dismissButton = frame.locator(dismissSelector).first();

        if (await dismissButton.isVisible().catch(() => false)) {
          await dismissButton.click({ force: true }).catch(() => undefined);

          if (!(await dismissButton.isVisible().catch(() => false))) {
            return;
          }
        }
      }

      await this.page.waitForTimeout(pollIntervalMs);
    }
  }

  async scroolToFooter() {
    await this.footer.scrollIntoViewIfNeeded();
  }

  async fillSubscribeEmailTextbox(email: string) {
    await this.subscribeEmailTextbox.fill(email);
  }

  async clickSubscribeButton() {
    await this.subscribeButton.click();
  }

  async clickCartButton() {
    await this.cartButton.click();
  }

  async clickViewProductButtonFirst() {
    await this.viewProductButtonFirst.click();
    await this.dismissAdPopupIfVisible();
  }
}

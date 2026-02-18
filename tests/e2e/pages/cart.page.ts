import { expect, type Locator, type Page } from "@playwright/test";

export class CartPage {
  readonly page: Page;
  readonly footer: Locator;
  readonly subscribeEmailTextbox: Locator;
  readonly subscribeButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.footer = page.locator(".footer-bottom");
    this.subscribeEmailTextbox = page.getByRole("textbox", {
      name: "Your email address",
    });
    this.subscribeButton = page.locator("#subscribe");
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

}

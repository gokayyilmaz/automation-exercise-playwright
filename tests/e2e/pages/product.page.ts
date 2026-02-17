import { expect, type Locator, type Page } from "@playwright/test";

export class ProductPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async expectTitle() {
    await expect(this.page).toHaveTitle(
      "Automation Exercise - Product Details",
    );
  }
}

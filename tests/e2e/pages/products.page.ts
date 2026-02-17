import { expect, type Locator, type Page } from "@playwright/test";

export class ProductsPage {
  readonly page: Page;
  readonly viewProductLinkFirst: Locator;

  constructor(page: Page) {
    this.page = page;
    this.viewProductLinkFirst = page
      .getByRole("link", { name: "View Product" })
      .nth(0);
  }

  async expectTitle() {
    await expect(this.page).toHaveTitle("Automation Exercise - All Products");
  }

  async clickViewProductLinkFirst() {
    await this.viewProductLinkFirst.click();
  }
}

import { expect, type Locator, type Page } from "@playwright/test";

export class ProductsPage {
  readonly page: Page;
  readonly viewProductLinkFirst: Locator;
  readonly searchProductTextbox: Locator;
  readonly searchButton: Locator;
  readonly productNames: Locator;

  constructor(page: Page) {
    this.page = page;
    this.viewProductLinkFirst = page
      .getByRole("link", { name: "View Product" })
      .nth(0);
    this.searchProductTextbox = page.locator("#search_product");
    this.searchButton = page.locator("#submit_search");
    this.productNames = page.locator(".productinfo p");
  }

  async expectTitle() {
    await expect(this.page).toHaveTitle("Automation Exercise - All Products");
  }

  async clickViewProductLinkFirst() {
    await this.viewProductLinkFirst.click();
  }

  async fillSearchProductTextbox(searchText: string) {
    await this.searchProductTextbox.fill(searchText);
  }

  async clickSearchButton() {
    await this.searchButton.click();
  }

  async getProductNames() {
    return this.productNames.allInnerTexts();
  }
}

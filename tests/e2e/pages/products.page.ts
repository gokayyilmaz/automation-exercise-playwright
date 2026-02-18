import { expect, type Locator, type Page } from "@playwright/test";

export class ProductsPage {
  readonly page: Page;
  readonly viewProductLinkFirst: Locator;
  readonly searchProductTextbox: Locator;
  readonly searchButton: Locator;
  readonly productNames: Locator;
  readonly productCard: Locator;
  readonly productOverlay: Locator;
  readonly continueShoppingButton: Locator;
  readonly viewCartLink: Locator
  readonly productPrice: Locator

  constructor(page: Page) {
    this.page = page;
    this.viewProductLinkFirst = page
      .getByRole("link", { name: "View Product" })
      .nth(0);
    this.searchProductTextbox = page.locator("#search_product");
    this.searchButton = page.locator("#submit_search");
    this.productNames = page.locator(".productinfo p");
    this.productCard = page.locator(".productinfo");
    this.productOverlay = page.locator(".product-overlay .add-to-cart");
    this.continueShoppingButton = page.getByRole("button", {
      name: "Continue Shopping",
    });
    this.viewCartLink = page.getByRole("link", {name: "View Cart"})
    this.productPrice = page.locator(".productinfo h2")
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

  async hoverAndAddToCartTheProduct(productNumber: number) {
    await this.productCard.nth(productNumber).hover();
    await this.productOverlay.nth(productNumber).click();
  }

  async clickContinueShoppingButton() {
    await this.continueShoppingButton.click();
  }

  async clickViewCartLink() {
    await this.viewCartLink.click()
  }

  async getProductPrice(productNumber: number) {
    return await this.productPrice.nth(productNumber).innerText()
  }
}

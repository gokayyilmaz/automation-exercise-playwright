import { expect, type Locator, type Page } from "@playwright/test";

export class ProductPage {
  readonly page: Page;
  readonly quantityInput: Locator
  readonly addToCartButton: Locator
  readonly viewCartButton: Locator

  constructor(page: Page) {
    this.page = page;
    this.quantityInput = page.locator("#quantity")
    this.addToCartButton = page.getByRole("button", {name: /Add to cart/})
    this.viewCartButton = page.getByRole("link", {name: "View Cart"})
  }

  async expectTitle() {
    await expect(this.page).toHaveTitle(
      "Automation Exercise - Product Details",
    );
  }
  
  async fillQuantityInput(q: string) {
    await this.quantityInput.fill(q)
  }

  async clickAddToCartButton() {
    await this.addToCartButton.click()
  }

  async clickViewCartButton() {
    await this.viewCartButton.click()
  }
}

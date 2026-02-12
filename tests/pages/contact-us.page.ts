import { expect, type Locator, type Page } from "@playwright/test";

export class ContactUsPage {
  readonly page: Page;
  readonly getInTouchText: Locator;
  readonly nameTextbox: Locator;
  readonly emailTextbox: Locator;
  readonly subjectTextbox: Locator;
  readonly yourMessageHereTextbox: Locator;
  readonly uploadFileInput: Locator;
  readonly submitButton: Locator;
  readonly successMessage: Locator;
  readonly homeButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.getInTouchText = page.getByText("Get In Touch");
    this.nameTextbox = page.getByRole("textbox", { name: "Name" });
    this.emailTextbox = page.getByTestId("email");
    this.subjectTextbox = page.getByRole("textbox", { name: "Subject" });
    this.yourMessageHereTextbox = page.getByRole("textbox", {
      name: "Your Message Here",
    });
    this.uploadFileInput = page.locator('input[name="upload_file"]');
    this.submitButton = page.locator('input[data-qa="submit-button"]');
    this.successMessage = page.locator(
      "#contact-page .status.alert.alert-success",
    );
    this.homeButton = page.locator("#form-section").getByRole("link", {
      name: "Home",
    });
  }

  async goto() {
    await this.page.goto("https://automationexercise.com/");
  }

  async expectGetInTouchTextVisible() {
    await expect(this.getInTouchText).toBeVisible();
  }

  async fillGetInTouchForm(data: { email: string; seed: string }) {
    await this.nameTextbox.fill(data.seed);
    await this.emailTextbox.fill(data.email);
    await this.subjectTextbox.fill(data.seed);
    await this.yourMessageHereTextbox.fill(data.seed);
    await this.uploadFileInput.setInputFiles("tests/utils/sample.txt");
  }

  async waitForSubmitHandlerReady() {
    await this.page.waitForFunction(() => {
      const windowWithJquery = window as unknown as {
        jQuery?: {
          _data?: (
            element: Element,
            key: string,
          ) => {
            submit?: unknown[];
          };
        };
      };

      const form = document.querySelector("#contact-us-form");

      return Boolean(
        form &&
        windowWithJquery.jQuery &&
        windowWithJquery.jQuery._data &&
        windowWithJquery.jQuery._data(form, "events")?.submit?.length,
      );
    });
  }

  async submitFormAndAcceptDialog() {
    await this.waitForSubmitHandlerReady();

    const dialogAccepted = this.page
      .waitForEvent("dialog", { timeout: 10000 })
      .then(async (dialog) => {
        await dialog.accept();
      });

    await this.submitButton.click();
    await dialogAccepted;
  }

  async expectSuccessMessageVisible() {
    await expect(this.successMessage).toBeVisible();
  }

  async clickHomeButton() {
    await this.homeButton.click();
  }
}

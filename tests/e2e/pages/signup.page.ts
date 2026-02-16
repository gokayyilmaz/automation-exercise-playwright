import { expect, type Locator, type Page } from "@playwright/test";

export class SignupPage {
  readonly page: Page;
  readonly enterAccountInformationText: Locator;
  readonly genderMrRadio: Locator;
  readonly passwordTextbox: Locator;
  readonly daysCombobox: Locator;
  readonly monthsCombobox: Locator;
  readonly yearsCombobox: Locator;
  readonly newsLetterCheckbox: Locator;
  readonly offersCheckbox: Locator;
  readonly firstNameTextbox: Locator;
  readonly lastNameTextbox: Locator;
  readonly companyTextbox: Locator;
  readonly address1Textbox: Locator;
  readonly address2Textbox: Locator;
  readonly countryCombobox: Locator;
  readonly stateTextbox: Locator;
  readonly cityTextbox: Locator;
  readonly zipcodeTextbox: Locator;
  readonly mobileNumberTextbox: Locator;
  readonly createAccountButton: Locator;
  readonly continueButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.enterAccountInformationText = page.getByText(
      "Enter Account Information",
    );
    this.genderMrRadio = page.locator("#id_gender1");
    this.passwordTextbox = page.locator("#password");
    this.daysCombobox = page.locator("#days");
    this.monthsCombobox = page.locator("#months");
    this.yearsCombobox = page.locator("#years");
    this.newsLetterCheckbox = page.getByRole("checkbox", {
      name: "Sign up for our newsletter!",
    });
    this.offersCheckbox = page.getByRole("checkbox", {
      name: "Receive special offers from our partners!",
    });
    this.firstNameTextbox = page.locator("#first_name");
    this.lastNameTextbox = page.locator("#last_name");
    this.companyTextbox = page.locator("#company");
    this.address1Textbox = page.locator("#address1");
    this.address2Textbox = page.locator("#address2");
    this.countryCombobox = page.locator("#country");
    this.stateTextbox = page.locator("#state");
    this.cityTextbox = page.locator("#city");
    this.zipcodeTextbox = page.locator("#zipcode");
    this.mobileNumberTextbox = page.locator("#mobile_number");
    this.createAccountButton = page.getByRole("button", {
      name: "Create Account",
    });
    this.continueButton = page.getByRole("link", { name: "Continue" })
  }

  async expectAccountInformationTextVisible() {
    await expect(this.enterAccountInformationText).toBeVisible();
  }

  async fillSignupFormAccountInfo(data: {
    seed: string;
    days: string;
    months: string;
    years: string;
  }) {
    await this.genderMrRadio.check();
    await this.passwordTextbox.fill(data.seed);
    await this.daysCombobox.selectOption(data.days);
    await this.monthsCombobox.selectOption(data.months);
    await this.yearsCombobox.selectOption(data.years);
    await this.newsLetterCheckbox.check();
    await this.offersCheckbox.check();
  }

  async fillSignupFormAddressInfo(data: {
    seed: string;
    country: string;
    state: string;
    city: string;
    zipcode: string;
    mobileNumber: string;
  }) {
    await this.firstNameTextbox.fill(data.seed);
    await this.lastNameTextbox.fill(data.seed);
    await this.companyTextbox.fill(data.seed);
    await this.address1Textbox.fill(data.seed);
    await this.address2Textbox.fill(data.seed);
    await this.countryCombobox.selectOption(data.country);
    await this.stateTextbox.fill(data.state);
    await this.cityTextbox.fill(data.city);
    await this.zipcodeTextbox.fill(data.zipcode);
    await this.mobileNumberTextbox.fill(data.mobileNumber);
  }

  async clickCreateAccountButton() {
    await this.createAccountButton.click();
  }

  async clickContinueButton() {
    await this.continueButton.click()
  }

}

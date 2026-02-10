import { test, expect } from "@playwright/test";

test("register user", async ({ page }) => {
  await page.goto("https://automationexercise.com/");
  await expect(page).toHaveTitle("Automation Exercise");

  await page.getByRole("link", { name: /Signup \/ Login/ }).click();
  await expect(page.getByText("New User Signup!")).toBeVisible();

  const randText = `${Date.now()}${Math.random().toString(36).slice(2, 8)}`;
  const name = randText;
  const email = `user_${randText}@testmail.com`;
  await page.getByTestId("signup-name").fill(name);
  await page.getByTestId("signup-email").fill(email);
  await page.getByRole("button", { name: "Signup" }).click();
  await expect(page.getByText("Enter Account Information")).toBeVisible();

  await page.locator("#id_gender1").check();
  await page.locator("#password").fill(randText);
  await page.locator("#days").selectOption("26");
  await page.locator("#months").selectOption("7");
  await page.locator("#years").selectOption("1996");
  await page
    .getByRole("checkbox", { name: "Sign up for our newsletter!" })
    .check();
  await page
    .getByRole("checkbox", {
      name: "Receive special offers from our partners!",
    })
    .check();

  await page.locator("#first_name").fill(randText);
  await page.locator("#last_name").fill(randText);
  await page.locator("#company").fill(randText);
  await page.locator("#address1").fill(randText);
  await page.locator("#address2").fill(randText);
  await page.locator("#country").selectOption("United States");
  await page.locator("#state").fill("California");
  await page.locator("#city").fill("San Francisco");
  await page.locator("#zipcode").fill("11111");
  await page.locator("#mobile_number").fill("5995555555");
  await page.getByRole("button", { name: "Create Account" }).click();
  await expect(page.getByText("Account Created!")).toBeVisible();

  await page.getByRole("link", { name: "Continue" }).click();
  const loggedUser = page.locator('a:has-text("Logged in as") b');
  await expect(loggedUser).toHaveText(randText);
  await page.locator('a[href="/delete_account"]').click();
  await expect(
    page.getByRole("heading", { name: "ACCOUNT DELETED!" }),
  ).toBeVisible();
  await page.getByRole("link", { name: "Continue" }).click();
  
});

import { test, expect } from "@playwright/test";

test("Test Case 1: Get All Products List", async ({ request }) => {
  const response = await request.get(
    "https://automationexercise.com/api/productsList",
  );

  // Check status code
  expect(response.status()).toBe(200);

  // Check products property in body
  const body = await response.json();
  expect(body).toHaveProperty("products");

  // Check products is an array
  expect(Array.isArray(body.products)).toBeTruthy();

  // Check products array is not empty
  expect(body.products.length).toBeGreaterThan(0);

  // Check last product has properties
  const lastProduct = body.products.at(-1);
  expect(lastProduct).toHaveProperty("id");
  expect(lastProduct).toHaveProperty("name");
  expect(lastProduct).toHaveProperty("price");
  expect(lastProduct).toHaveProperty("brand");
});

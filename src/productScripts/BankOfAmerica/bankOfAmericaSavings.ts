import { chromium } from "playwright";
import { fileURLToPath } from "url";

// Todo: Delete this test file
const __filename = fileURLToPath(import.meta.url);

const bankOfAmericaSavings1 = async () => {
  console.log("AJC AJC AJC");
  const browser = await chromium.launch({
    headless: false,
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://demo.playwright.dev/todomvc/");
  await page.goto("https://demo.playwright.dev/todomvc/#/");
  await page.getByPlaceholder("What needs to be done?").click();
  await page.getByRole("heading", { name: "todos" }).click();
  await page.getByPlaceholder("What needs to be done?").click();
  await page.getByPlaceholder("What needs to be done?").fill("asfda");
  await page.getByPlaceholder("What needs to be done?").press("Enter");
  await page.getByRole("link", { name: "Active" }).click();
  await context.close();

  await browser.close();
  return {};
};

export { bankOfAmericaSavings1 };

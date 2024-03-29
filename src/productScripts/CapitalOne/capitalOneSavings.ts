import { chromium } from "playwright";
import {
	ProductScriptResponseError,
	ProductScriptResponseSuccess,
} from "types";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

const capitalOneSavings1 = async (
	headless = true,
	throwError = false,
): Promise<ProductScriptResponseSuccess | ProductScriptResponseError> => {
	if (throwError) throw new Error("Some error");
	const browser = await chromium.launch({ headless }); // Or 'firefox' or 'webkit'.

	try {
		const context = await browser.newContext();
		const page = await context.newPage();
		await page.goto("https://www.capitalone.com/bank");
		await page
			.locator("shared-secondary-navigation")
			.getByRole("link", { name: "Performance Savings" })
			.click();
		const product_name = (
			await page
				.getByRole("heading", { name: "Performance Savings" })
				.textContent()
		).trim();
		await page.getByLabel("Skip to Rate section").click();
		const minimum_balance = (
			await page.getByRole("cell", { name: "Any balance" }).innerHTML()
		).trim();
		const maximum_balance = (
			await page.getByRole("cell", { name: "Any balance" }).innerHTML()
		).trim();
		const apy = (
			await page.getByRole("cell", { name: "%" }).innerText()
		).trim();
		await context.close();
		await browser.close();

		return {
			institution_name: "capital one",
			account_type: "savings",
			success: true,
			error: false,
			path: __filename,
			apy,
			product_name,
			minimum_balance,
			maximum_balance,
		};
	} catch (e) {
		// Do not include any console logs of errors. Those are handled in the scraper.js file.
		// Errors encountered in this script should not break, but should log to the .txt file
		return {
			success: false,
			error: e.stack,
			path: __filename,
		};
	} finally {
		await browser.close();
	}
};

export { capitalOneSavings1 };

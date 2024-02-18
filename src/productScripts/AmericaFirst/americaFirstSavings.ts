import { chromium } from "playwright";
import {
	ProductScriptResponseError,
	ProductScriptResponseSuccess,
} from "types";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

const americaFirstShareSavings1 = async (
	headless = true,
	throwError = false,
): Promise<ProductScriptResponseSuccess | ProductScriptResponseError> => {
	// Throw Error is a variable used to test the error handling.
	if (throwError) throw new Error("Some error");
	const browser = await chromium.launch({ headless }); // Or 'firefox' or 'webkit'.
	try {
		const context = await browser.newContext();
		const page = await context.newPage();
		await page.goto(
			"https://www.americafirst.com/rates/account-rates.html#Savings-Account-Rates",
		);
		const product_name = await page
			.getByRole("cell", { name: "Share Savings", exact: true })
			.textContent();
		const apy = await page
			.getByRole("cell", { name: "0.05%" })
			.first()
			.textContent();
		const minimum_balance = await page
			.getByRole("cell", { name: "$1.00" })
			.first()
			.textContent();
		const maximum_balance = -1;

		return {
			institution_name: "America First",
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

export { americaFirstShareSavings1 };

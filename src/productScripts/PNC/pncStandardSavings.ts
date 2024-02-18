import { chromium } from "playwright";
import { fileURLToPath } from "url";

import { ZIP_CODES } from "../../constants.js";

const __filename = fileURLToPath(import.meta.url);

// Breaks if run in headless mode
const pncStandardSavings1 = async (headless = false, throwError = false) => {
	// Throw Error is a variable used to test the error handling.
	if (throwError) throw new Error("Some error");
	const browser = await chromium.launch({ headless }); // Or 'firefox' or 'webkit'.

	const context = await browser.newContext();
	try {
		// const context = await browser.createIncognitoBrowserContext();
		const page = await context.newPage();

		await page.goto(
			`https://www.pnc.com/en/rates/savings/${ZIP_CODES.SanFrancisco_CA}/NA`,
		);

		const product_name = await page
			.getByRole("heading", { name: "Standard Savings" })
			.textContent();
		const apy = await page
			.getByRole("cell", { name: "0.02%" })
			// eslint-disable-next-line @typescript-eslint/no-magic-numbers
			.nth(1)
			.innerText();
		const minimum_balance = await page
			.getByRole("cell", { name: "$1.00 - $" })
			.first()
			.textContent();
		const maximum_balance = await page
			.getByRole("cell", { name: "$2,500.00 and above" })
			// eslint-disable-next-line @typescript-eslint/no-magic-numbers
			.nth(1)
			.textContent();

		return {
			institution_name: "PNC",
			account_type: "Savings",
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

export { pncStandardSavings1 };

import fs from "fs";
import { input, select } from "@inquirer/prompts";

const bankName = await input({ message: "Enter a Bank Name " });
const productType = await select({
	message: "Select a product type",
	choices: [
		{
			name: "Checking",
			value: "Checking",
			description:
				"Checking Accounts generally provide low interest yields, but have minimal restrictions on withdrawing money.",
		},
		{
			name: "Savings",
			value: "Savings",
			description:
				"Savings Accounts generally provide better interest yields, but restrict how often money can be withdrawn.",
		},
		{
			name: "Money Market",
			value: "Money Market",
			description:
				"Money Market accounts are like a hybrid checking-savings account.",
		},
		{
			name: "Time Deposit",
			value: "Time Deposit",
			description:
				"Also known as Certificates of Deposit, time deposits provide higher yields on deposits but restrict access to the funds for a period of time.",
		},
	],
});

const firstCharacterOfWord = 0;
const beginningIndexOfRemainingString = 1;
const pascalCaseBankName = bankName
	.split(" ")
	.map(
		(i) =>
			i.charAt(firstCharacterOfWord).toUpperCase() +
			i.slice(beginningIndexOfRemainingString).toLowerCase(),
	)
	.join("");
const camelCaseBankName =
	pascalCaseBankName.charAt(firstCharacterOfWord).toLowerCase() +
	pascalCaseBankName.slice(beginningIndexOfRemainingString);
const productDirectory = `./src/ProductScripts/${pascalCaseBankName}`;
const productScriptName = camelCaseBankName + productType.split(" ").join("");
const pathToProductScript = `${productDirectory}/${productScriptName}.ts`;

// Make the Bank Directory
if (fs.existsSync(pathToProductScript)) {
	// eslint-disable-next-line @/no-console
	console.log(
		`This bank/product combination already exists at ${pathToProductScript}`,
	);
} else {
	if (!fs.existsSync(productDirectory)) {
		fs.mkdirSync(productDirectory, { recursive: true });
	}
	// Make the product script file
	fs.writeFileSync(
		pathToProductScript,
		`
		import { chromium } from "playwright";
		import {
			ProductScriptResponseError,
			ProductScriptResponseSuccess,
		} from "types";

		import { fileURLToPath } from "url";

		const __filename = fileURLToPath(import.meta.url);
 
    const ${productScriptName}1 = async (headless = true,
			throwError = false): Promise<ProductScriptResponseSuccess | ProductScriptResponseError> => {
      if (throwError) throw new Error("Some error");
			const browser = await chromium.launch({ headless }); // Or 'firefox' or 'webkit'.

			try {
				// Step 1: Add your product script here.
				// Step 2: Add the following line to productScripts.ts and remove the leading "//":
						// import ${camelCaseBankName} from "./${pascalCaseBankName}/index.js";
				// Step 3: Add the following line at the bottom of productScripts.ts and remove the leading "//":
						// 	...Object.values(${camelCaseBankName}),
				// Step 4: Add the following line at the top of "./${pascalCaseBankName}/index.js" and remove the leading "//":
						// 	import { ${productScriptName}1 } from "./${productScriptName}/index.js";
				// Step 5: Add your script to the export of "./${pascalCaseBankName}/index.js"
				// Step 6: Edit your script so that u are returning all of the values listed in the return statement. Replace the ".click()" methods with ".textContent()" or ".innerHTML()" to get the contents for you to edit.
				// Step 7: Remove all these comments

				return {
					institution_name: "${bankName.toLowerCase()}",
					account_type: "${productType.toLowerCase()}",
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
    }

    export { ${productScriptName}1 };`,
	);
	// Make the index file
	if (!fs.existsSync(`${productDirectory}/index.ts`)) {
		fs.writeFileSync(
			`${productDirectory}/index.ts`,
			`
      import { ${productScriptName}1 } from './${productScriptName}.js'
  
      export default {
        ${productScriptName}1,
      }`,
		);
	}
	const today = new Date();
	const incrementMonthNumberBy1 = 1;
	const singleDigitMonthLength = 1;
	const month =
		(today.getMonth() + incrementMonthNumberBy1).toString().length ===
		singleDigitMonthLength
			? `0${today.getMonth() + incrementMonthNumberBy1}`
			: today.getMonth() + incrementMonthNumberBy1;
	const dateString = `${today.getDate()}-${month}-${today.getFullYear()}`;
	fs.appendFile(
		"./tracking.csv",
		`${bankName},${productType},${productType.split(" ").join("")},1,${pathToProductScript},${dateString}\n`,
		function (err) {
			if (err) throw err;
			// eslint-disable-next-line @/no-console
			console.log("Saved!");
		},
	);
}

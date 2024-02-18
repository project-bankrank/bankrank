// import templatesToScrape from '../productScripts/productScripts.js';
// Todo: How can i configure my TS to allow the imports to drop the .js extension, or use .ts?
import templatesToScrape from "./productScripts/productScripts.js";
import {
	ProductScriptResponses,
	ProductScriptResponseSuccess,
	TemplateResponseTypes,
} from "./types";
import {
	writeBeginningOrEndingErrorLogMessage,
	writeErrorLog,
	createNewBankDataCsv,
	writeDataToBankDataCsv,
} from "./utils.js";

console.log(`=== Preparing Scraping Engine. ===`);
console.log(
	`\n=== Found ${templatesToScrape.length} products to look up. ===\n`,
);

const atLeast1Error = 0;
try {
	createNewBankDataCsv();
	// Todo: This may not actually be async since it's in a foreach.
	Promise.all(
		templatesToScrape.map((template: () => TemplateResponseTypes) =>
			template(),
		),
	)
		.then((responseFromAllTemplates) => {
			const errorLogTimestamp = new Date().toString();
			writeBeginningOrEndingErrorLogMessage(errorLogTimestamp, true);

			let errorLogCount = 0;
			let successfulLogCount = 0;

			responseFromAllTemplates.forEach((response: ProductScriptResponses) => {
				if (response?.success) {
					successfulLogCount++;
					writeDataToBankDataCsv(response as ProductScriptResponseSuccess); // Todo: There should be a way for us to check that the type is proper without declaring it "As" here.
				} else {
					errorLogCount++;
					writeErrorLog(response);
				}
			});
			writeBeginningOrEndingErrorLogMessage(errorLogTimestamp, false);
			if (errorLogCount > atLeast1Error) {
				console.log(
					`\n${errorLogCount} error(s) were logged to /outputs/errors.txt. You may want to look into them.`,
				);
			}
			console.log(
				`\nFinished Sourcing Data. Successfully obtained data for ${successfulLogCount} product(s).`,
			);
			return;
		})
		.catch((e) => console.log("eee: ", e));
} catch (e) {
	console.log("\n === We encountered an error. See below: === \n", e);
}

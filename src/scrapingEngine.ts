// import templatesToScrape from '../productScripts/productScripts.js';
// Todo: How can i configure my TS to allow the imports to drop the .js extension, or use .ts?
import templatesToScrape from './productScripts/productScripts.js';
import { ProductScriptResponseSuccess } from './types';
import {
  writeBeginningOrEndingErrorLogMessage,
  writeErrorLog,
  createNewBankDataCsv,
  writeDataToBankDataCsv
} from './utils.js';

console.log(`=== Preparing Scraping Engine. ===`);
console.log(`\n=== Found ${templatesToScrape.length} products to look up. ===\n`);

try {
  createNewBankDataCsv();
  // Todo: This may not actually be async since it's in a foreach.
  Promise.all(templatesToScrape.map((template: Function) => template()))
    .then(responseFromAllTemplates => {
      const errorLogTimestamp = new Date().toString();
      writeBeginningOrEndingErrorLogMessage(errorLogTimestamp, true);

      let errorLogCount = 0;
      let successfulLogCount = 0;

      responseFromAllTemplates.forEach((response: ProductScriptResponseSuccess) => {
        if (response?.success) {
          successfulLogCount++;
          writeDataToBankDataCsv(response)
        } else {
          errorLogCount++;
          writeErrorLog(response);
        }

      })
      writeBeginningOrEndingErrorLogMessage(errorLogTimestamp, false);
      if (errorLogCount > 0) {
        console.log(`\n${errorLogCount} error(s) were logged to /outputs/errors.txt. You may want to look into them.`)
      }
      console.log(`\nFinished Sourcing Data. Successfully obtained data for ${successfulLogCount} product(s).`)
      return;
    }).catch(e => console.log('eee: ', e))
} catch (e) {
  console.log("\n === We encountered an error. See below: === \n", e);
}